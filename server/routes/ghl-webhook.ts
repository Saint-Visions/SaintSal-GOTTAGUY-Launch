import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// Initialize Supabase client for webhook handling
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Missing Supabase environment variables for webhook");
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey);
};

// GHL Webhook handler for two-way sync
router.post("/ghl-webhook", async (req, res) => {
  try {
    console.log("🔗 GHL Webhook received:", {
      headers: req.headers,
      body: req.body,
      query: req.query,
    });

    // Verify webhook authenticity if GHL provides headers
    const apiKey = req.headers["x-api-key"] || req.headers["authorization"];
    if (apiKey && apiKey !== process.env.GHL_WEBHOOK_SECRET) {
      console.error("❌ Invalid webhook API key");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract event data
    const { type, locationId, data } = req.body;
    const accountId = req.query.acct || locationId;

    // Log the event for debugging
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from("crm_events").insert({
        event_type: type,
        location_id: locationId,
        account_id: accountId,
        event_data: data,
        raw_payload: req.body,
        created_at: new Date().toISOString(),
      });
    }

    // Process specific event types
    switch (type) {
      case "contact.created":
      case "ContactCreate":
        await handleContactCreated(data, locationId);
        break;

      case "contact.updated":
      case "ContactUpdate":
        await handleContactUpdated(data, locationId);
        break;

      case "opportunity.created":
      case "OpportunityCreate":
        await handleOpportunityCreated(data, locationId);
        break;

      case "appointment.created":
      case "AppointmentCreate":
        await handleAppointmentCreated(data, locationId);
        break;

      default:
        console.log(`📝 Unhandled event type: ${type}`);
    }

    // Always respond with 200 OK quickly to acknowledge receipt
    res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
      eventType: type,
      locationId: locationId,
    });
  } catch (error) {
    console.error("❌ GHL Webhook error:", error);

    // Still return 200 to prevent GHL from disabling the webhook
    res.status(200).json({
      success: false,
      error: "Webhook processing failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Handle contact created events
async function handleContactCreated(contactData: any, locationId: string) {
  try {
    console.log("👤 New contact created:", contactData);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    // Find the user workspace associated with this GHL location
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("user_id, name")
      .eq("ghl_location_id", locationId)
      .single();

    if (workspace) {
      // Store contact in our database for AI access
      await supabase.from("contacts").insert({
        workspace_id: workspace.user_id,
        ghl_contact_id: contactData.id,
        first_name: contactData.firstName,
        last_name: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        source: "ghl_webhook",
        created_at: new Date().toISOString(),
      });

      // Could trigger real-time notification to user here
      console.log(`✅ Contact synced to workspace: ${workspace.name}`);
    }
  } catch (error) {
    console.error("Error handling contact created:", error);
  }
}

// Handle contact updated events
async function handleContactUpdated(contactData: any, locationId: string) {
  try {
    console.log("📝 Contact updated:", contactData);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    // Update existing contact in our database
    await supabase
      .from("contacts")
      .update({
        first_name: contactData.firstName,
        last_name: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        updated_at: new Date().toISOString(),
      })
      .eq("ghl_contact_id", contactData.id);

    console.log("✅ Contact updated in local database");
  } catch (error) {
    console.error("Error handling contact updated:", error);
  }
}

// Handle opportunity created events
async function handleOpportunityCreated(
  opportunityData: any,
  locationId: string,
) {
  try {
    console.log("💰 New opportunity created:", opportunityData);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data: workspace } = await supabase
      .from("workspaces")
      .select("user_id")
      .eq("ghl_location_id", locationId)
      .single();

    if (workspace) {
      await supabase.from("opportunities").insert({
        workspace_id: workspace.user_id,
        ghl_opportunity_id: opportunityData.id,
        name: opportunityData.name,
        value: opportunityData.monetaryValue,
        stage: opportunityData.pipelineStage,
        contact_id: opportunityData.contactId,
        created_at: new Date().toISOString(),
      });

      console.log("✅ Opportunity synced to database");
    }
  } catch (error) {
    console.error("Error handling opportunity created:", error);
  }
}

// Handle appointment created events
async function handleAppointmentCreated(
  appointmentData: any,
  locationId: string,
) {
  try {
    console.log("📅 New appointment created:", appointmentData);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data: workspace } = await supabase
      .from("workspaces")
      .select("user_id")
      .eq("ghl_location_id", locationId)
      .single();

    if (workspace) {
      await supabase.from("appointments").insert({
        workspace_id: workspace.user_id,
        ghl_appointment_id: appointmentData.id,
        title: appointmentData.title,
        start_time: appointmentData.startTime,
        end_time: appointmentData.endTime,
        contact_id: appointmentData.contactId,
        created_at: new Date().toISOString(),
      });

      console.log("✅ Appointment synced to database");
    }
  } catch (error) {
    console.error("Error handling appointment created:", error);
  }
}

export default router;
