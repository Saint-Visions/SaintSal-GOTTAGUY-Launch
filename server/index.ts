import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleChat } from "./routes/chat";
import {
  createCheckoutSession,
  handleWebhook,
  getSubscription,
} from "./routes/subscription";
import ghlWebhookRouter from "./routes/ghl-webhook";
import { ghlActionsRouter } from "./routes/ghl-actions";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use("/api/webhook", express.raw({ type: "application/json" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "SaintVisionAI API v50 - Production Ready!" });
  });

  // Demo route
  app.get("/api/demo", handleDemo);

  // Chat API
  app.post("/api/chat", handleChat);

  // Subscription APIs
  app.post("/api/subscription/checkout", createCheckoutSession);
  app.post("/api/webhook", handleWebhook);
  app.get("/api/subscription/:userId", getSubscription);

  // GoHighLevel Integration APIs
  app.use("/api", ghlWebhookRouter);
  app.use("/api", ghlActionsRouter);

  return app;
}
