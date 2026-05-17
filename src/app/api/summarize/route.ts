import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const text = body.text;

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an AI that converts study notes into structured Wikipedia-style topics.

Return ONLY valid JSON.

Format:
[
  {
    "title": "Topic Name",
    "summary": "Short explanation",
    "related": ["Topic A", "Topic B"]
  }
]
`,
        },
        {
          role: "user",
          content: `Convert these notes into wiki topics:\n\n${text}`,
        },
      ],

      temperature: 0.5,
    });

    const content =
      completion.choices[0].message.content;

    const topics = JSON.parse(content || "[]");

    // HYDRADB INGEST
    await fetch("https://api.hydradb.com/v1/ingest", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HYDRA_API_KEY}`,
      },

      body: JSON.stringify({
        tenant_id: process.env.HYDRA_TENANT_ID,
        data: topics,
      }),
    });

    return Response.json({
      topics,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      error: "Something went wrong",
    });
  }
}