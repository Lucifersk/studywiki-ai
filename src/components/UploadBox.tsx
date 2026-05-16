"use client";

import KnowledgeGraph from "./KnowledgeGraph";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import WikiCard from "./WikiCard";
import Sidebar from "./Sidebar";
import StatsBar from "./StatsBar";
import ChatPanel from "./ChatPanel";

type Topic = {
    title: string;
    summary: string;
    related: string[];
};

export default function UploadBox() {

    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    // SEARCH FILTER
    const filteredTopics = topics.filter((topic) =>
        topic.title.toLowerCase().includes(search.toLowerCase())
    );

    const onDrop = useCallback(async (acceptedFiles: File[]) => {

        const file = acceptedFiles[0];

        setLoading(true);

        const text = await file.text();

        const response = await fetch("/api/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();

        const generatedTopics = data.topics || [];

        setTopics(generatedTopics);

        // AUTO SELECT FIRST TOPIC
        if (generatedTopics.length > 0) {
            setSelectedTopic(generatedTopics[0]);
        }

        setLoading(false);

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    });

    return (
        <div className="flex w-full">

            {/* Sidebar */}
            {topics.length > 0 && (
                <Sidebar
                    topics={topics}
                    onSelect={(title) => {

                        const foundTopic = topics.find(
                            (t) => t.title === title
                        );

                        if (foundTopic) {
                            setSelectedTopic(foundTopic);
                        }

                    }}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center px-10 pb-20">

                {/* Upload */}
                <div
                    {...getRootProps()}
                    className={`border border-dashed rounded-2xl p-12 w-[700px] cursor-pointer transition-all duration-300 mt-10
          ${isDragActive
                            ? "border-white bg-zinc-800"
                            : "border-zinc-700 bg-zinc-900/40"
                        }`}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col items-center justify-center text-center">

                        <div className="bg-white text-black p-4 rounded-full mb-6">
                            <Upload size={32} />
                        </div>

                        <h2 className="text-2xl font-semibold">
                            Upload your notes
                        </h2>

                        <p className="text-zinc-400 mt-3 max-w-md">
                            Generate AI-powered study wiki pages.
                        </p>

                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-[700px] text-center animate-pulse">

                        <h2 className="text-2xl font-bold mb-3">
                            Generating AI Wiki...
                        </h2>

                        <p className="text-zinc-400">
                            Extracting concepts, relationships, and summaries.
                        </p>

                    </div>
                )}

                {/* Search */}
                {topics.length > 0 && (
                    <input
                        type="text"
                        placeholder="Search wiki topics..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[700px] mt-10 bg-black border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-white transition shadow-lg"
                    />
                )}

                {/* Stats */}
                {topics.length > 0 && (
                    <StatsBar topicCount={topics.length} />
                )}

                {/* Topic Cards */}
                <div className="mt-10 grid gap-6 w-[700px]">

                    {filteredTopics.map((topic, index) => (
                        <WikiCard
                            key={index}
                            title={topic.title}
                            summary={topic.summary}
                            related={topic.related}
                            onSelect={(relatedTopic) => {

                                const foundTopic = topics.find(
                                    (t) => t.title === relatedTopic
                                );

                                if (foundTopic) {
                                    setSelectedTopic(foundTopic);
                                }

                            }}
                        />
                    ))}

                </div>

                {/* Empty Search */}
                {filteredTopics.length === 0 && topics.length > 0 && (
                    <div className="mt-10 text-zinc-500">
                        No matching topics found.
                    </div>
                )}

                {/* Selected Topic */}
                {selectedTopic && (
                    <div className="mt-16 w-[800px] bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-10 shadow-2xl">

                        <div className="mb-8">

                            <div className="text-sm text-zinc-500 mb-4">
                                AI Generated Wiki Article
                            </div>

                            <h1 className="text-5xl font-black leading-tight">
                                {selectedTopic.title}
                            </h1>

                        </div>

                        <div className="prose prose-invert max-w-none">

                            <p className="text-zinc-300 leading-9 text-xl">
                                {selectedTopic.summary}
                            </p>

                        </div>

                    </div>
                )}

                {/* Knowledge Graph */}
                {topics.length > 0 && (
                    <KnowledgeGraph topics={topics} />
                )}

                {/* AI Chat */}
                {topics.length > 0 && (
                    <ChatPanel topics={topics} />
                )}

            </div>

        </div>
    );
}