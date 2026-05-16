"use client";

import { useState } from "react";

type Topic = {
    title: string;
    summary: string;
    related: string[];
};

type Props = {
    topics: Topic[];
};

export default function ChatPanel({
    topics,
}: Props) {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {

        if (!question) return;

        try {

            setLoading(true);

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question,
                    topics,
                }),
            });

            const data = await response.json();

            console.log(data);

            setAnswer(
                data.answer || data.error || "No response from AI."
            );

        } catch (error) {

            console.log(error);

            setAnswer("Something went wrong.");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="w-[800px] mt-16 bg-black border border-zinc-800 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
                AI Study Assistant
            </h2>

            <div className="flex gap-4">

                <input
                    type="text"
                    placeholder="Ask StudyWiki anything..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 outline-none focus:border-white"
                />

                <button
                    onClick={askQuestion}
                    className="bg-white text-black px-6 rounded-2xl font-semibold hover:scale-105 transition"
                >
                    Ask AI
                </button>

            </div>

            {loading && (
                <div className="mt-6 text-zinc-500 animate-pulse">
                    Thinking...
                </div>
            )}

            {answer && !loading && (
                <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                    <h3 className="text-xl font-bold mb-4">
                        AI Answer
                    </h3>

                    <p className="text-zinc-300 leading-8 whitespace-pre-wrap">
                        {answer}
                    </p>

                </div>
            )}

        </div>
    );
}