import { Request, Response } from "express";
import { getAzureOpenAI, getOpenAI } from "../lib/openai";
import { getSupabaseAdmin } from "../lib/supabase";

export async function handleChat(req: Request, res: Response) {
  try {
    const { message, userId, model = "gpt-4o" } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: "Message and userId required" });
    }

    // Use Azure OpenAI by default for production
    const client = model.includes("azure") ? getAzureOpenAI() : getOpenAI();

    const completion = await client.chat.completions.create({
      model: model.includes("azure")
        ? process.env.AZURE_OPENAI_DEPLOYMENT_NAME!
        : model,
      messages: [
        {
          role: "system",
          content:
            "You are SaintVisionAI, a powerful AI assistant. Be helpful, accurate, and professional.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 2048,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || "No response";

    // Save chat to Supabase
    await getSupabaseAdmin().from("chats").insert({
      user_id: userId,
      message,
      response,
      model,
      created_at: new Date().toISOString(),
    });

    res.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat" });
  }
}
