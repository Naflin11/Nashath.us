import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `
You are the website assistant for Nash Tax & Bookkeeping.

Your job:
- Help visitors with bookkeeping, payroll, tax filing, business registration, and consultation-related questions.
- Be professional, friendly, and concise.
- Give general business information only.
- Do not provide final legal or tax advice.
- For complex or case-specific issues, tell the user to contact Nash Tax & Bookkeeping directly.
- Encourage users to book a consultation when appropriate.

Business tone:
- Warm
- Professional
- Clear
- Trustworthy

Keep answers short and website-friendly.
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      response.output_text || "Sorry, I couldn't generate a response right now.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({
      error: "Something went wrong while processing your request.",
    });
  }
}