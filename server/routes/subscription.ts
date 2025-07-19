import { Request, Response } from "express";
import { getStripe } from "../lib/stripe";
import { getSupabaseAdmin } from "../lib/supabase";
import { createGhlLocation } from "../lib/ghl-api";

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { priceId, userId, email } = req.body;

    if (!priceId || !userId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.VITE_APP_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL}/upgrade`,
      metadata: {
        userId,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
}

// Phase 2: Plan role mapping for $27/$97/$297/$497 tiers
const PLAN_ROLE_MAP: Record<string, string> = {
  price_1RLChzFZsXxBWnj0VcveVdDf: "unlimited", // $27/mo Unlimited (No CRM)
  price_1RINIMFZsXxBWnjQEYxlyUIy: "crm", // $97/mo CRM Basic (1 GHL Subaccount)
  price_1RpqCvFZsXxBWnj0XZJwP296: "enterprise", // $297/mo Enterprise (5 GHL Subaccounts + Teams)
  price_1Rh5yFZsXxBWnj0w6p9KY0j: "white_label", // $497/mo White Label (10 Subaccounts + Full Branding)
};

export async function handleWebhook(req: Request, res: Response) {
  try {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    try {
      event = getStripe().webhooks.constructEvent(
        req.body,
        sig as string,
        webhookSecret,
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).send("Webhook signature verification failed");
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as any;

        // Get the price ID from the session
        const lineItems = await getStripe().checkout.sessions.listLineItems(
          session.id,
        );
        const priceId = lineItems.data[0]?.price?.id;
        const role = PLAN_ROLE_MAP[priceId] || "unlimited";

        console.log(
          `🔥 Phase 2: User ${session.metadata.userId} upgraded to ${role} plan (${priceId})`,
        );

        // Update Supabase subscription record
        await getSupabaseAdmin()
          .from("subscriptions")
          .upsert({
            user_id: session.metadata.userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription,
            plan_role: role,
            price_id: priceId,
            status: "active",
            updated_at: new Date().toISOString(),
          });

        // Update user metadata with role
        await getSupabaseAdmin().auth.admin.updateUserById(
          session.metadata.userId,
          {
            user_metadata: {
              plan: role,
              stripe_customer_id: session.customer,
              upgraded_at: new Date().toISOString(),
            },
          },
        );

        // Phase 2: Auto-create GHL subaccount for CRM+ plans
        if (role === "crm" || role === "enterprise" || role === "white_label") {
          await createUserGhlSubaccount(session, role);
        }

        break;

      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        const subscription = event.data.object as any;
        const newStatus = subscription.status;

        // Update subscription status
        await getSupabaseAdmin()
          .from("subscriptions")
          .update({
            status: newStatus,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        // If subscription cancelled/expired, downgrade user role
        if (newStatus === "canceled" || newStatus === "unpaid") {
          const { data: subData } = await getSupabaseAdmin()
            .from("subscriptions")
            .select("user_id")
            .eq("stripe_subscription_id", subscription.id)
            .single();

          if (subData?.user_id) {
            await getSupabaseAdmin().auth.admin.updateUserById(
              subData.user_id,
              {
                user_metadata: {
                  plan: "free",
                  downgraded_at: new Date().toISOString(),
                },
              },
            );
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
}

// Phase 2: Auto-create GHL subaccount for CRM+ users
async function createUserGhlSubaccount(session: any, role: string) {
  try {
    console.log(
      `🏢 Creating GHL subaccount(s) for user ${session.metadata.userId} (${role} plan)`,
    );

    // Get user details from Supabase
    const { data: userData } = await getSupabaseAdmin().auth.admin.getUserById(
      session.metadata.userId,
    );

    if (!userData.user) {
      console.error("User not found for GHL subaccount creation");
      return;
    }

    const user = userData.user;
    const businessName =
      user.user_metadata?.business_name ||
      user.user_metadata?.company_name ||
      `${user.user_metadata?.first_name || "User"}'s Business`;

    // Determine number of subaccounts based on plan
    const subaccountLimits = {
      crm: 1, // CRM Basic: 1 account
      enterprise: 5, // Enterprise: 5 accounts
      white_label: 10, // White Label: 10 accounts
    };

    const accountCount =
      subaccountLimits[role as keyof typeof subaccountLimits] || 1;
    const createdAccounts = [];

    // Create primary account
    const primaryLocation = await createGhlLocation({
      name: businessName,
      address: user.user_metadata?.address || "",
      city: user.user_metadata?.city || "",
      state: user.user_metadata?.state || "",
      country: "US",
      website: user.user_metadata?.website || "",
      timezone: user.user_metadata?.timezone || "America/Los_Angeles",
    });

    createdAccounts.push({
      id: primaryLocation.id,
      name: businessName,
      type: "primary",
      created_at: new Date().toISOString(),
    });

    // For Enterprise and White Label: Create additional subaccounts
    if (accountCount > 1) {
      for (let i = 2; i <= accountCount; i++) {
        try {
          const additionalLocation = await createGhlLocation({
            name: `${businessName} - Account ${i}`,
            address: user.user_metadata?.address || "",
            city: user.user_metadata?.city || "",
            state: user.user_metadata?.state || "",
            country: "US",
            website: user.user_metadata?.website || "",
            timezone: user.user_metadata?.timezone || "America/Los_Angeles",
          });

          createdAccounts.push({
            id: additionalLocation.id,
            name: `${businessName} - Account ${i}`,
            type: "additional",
            created_at: new Date().toISOString(),
          });

          // Small delay between account creations to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`❌ Error creating additional account ${i}:`, error);
          // Continue creating other accounts even if one fails
        }
      }
    }

    // Store all GHL location IDs in workspace
    await getSupabaseAdmin()
      .from("workspaces")
      .upsert({
        user_id: session.metadata.userId,
        ghl_location_id: primaryLocation.id, // Primary account ID
        ghl_subaccounts: createdAccounts, // All account details
        business_name: businessName,
        plan_role: role,
        account_limit: accountCount,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    console.log(
      `✅ ${createdAccounts.length} GHL subaccount(s) created for ${businessName} (${role} plan)`,
    );
    createdAccounts.forEach(account => {
      console.log(`   - ${account.name}: ${account.id}`);
    });
  } catch (error) {
    console.error("❌ Error creating GHL subaccount:", error);
    // Don't fail the webhook - log and continue
  }
}

export async function getSubscription(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const { data: subscription } = await getSupabaseAdmin()
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .single();

    res.json({ subscription });
  } catch (error) {
    console.error("Get subscription error:", error);
    res.status(500).json({ error: "Failed to get subscription" });
  }
}
