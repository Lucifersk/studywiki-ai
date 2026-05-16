import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const question = body.question;
        const topics = body.topics;

        const context = topics
            .map(
                (topic: any) =>
                    `${topic.title}: ${topic.summary}`
            )
            .join("\n");

        const completion = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content:
                        "You are an AI study assistant helping users understand uploaded notes.",
                },
                {
                    role: "user",
                    content: `
Context:
${context}

Question:
${question}
`,
                },
            ],
        });

        return Response.json({
            answer: completion.choices[0].message.content,
        });

    } catch (error) {

        console.log("CHAT ERROR:", error);

        return Response.json({
            error: "Something went wrong",
        });
    }
}