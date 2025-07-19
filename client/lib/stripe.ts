import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    process.env.VITE_STRIPE_PUBLISHABLE_KEY!,
);

export default stripePromise;

// Stripe price IDs
export const STRIPE_PRICE_IDS = {
  FREE: import.meta.env.VITE_STRIPE_FREE_PRICE_ID!,
  UNLIMITED: import.meta.env.VITE_STRIPE_UNLIMITED_PRICE_ID!,
  PRO: import.meta.env.VITE_STRIPE_PRO_PRICE_ID!,
  WHITE_LABEL: import.meta.env.VITE_STRIPE_WHITE_LABEL_PRICE_ID!,
  CUSTOM: import.meta.env.VITE_STRIPE_CUSTOM_PRICE_ID!,
};
