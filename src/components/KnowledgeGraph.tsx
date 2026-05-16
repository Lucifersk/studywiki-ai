"use client";

import ReactFlow, {
    Background,
    Controls,
    MiniMap,
} from "reactflow";

import "reactflow/dist/style.css";

type Topic = {
    title: string;
    summary: string;
    related: string[];
};

type Props = {
    topics: Topic[];
};

export default function KnowledgeGraph({ topics }: Props) {

    const nodes = topics.map((topic, index) => ({
        id: topic.title,

        position: {
            x: (index % 3) * 250,
            y: Math.floor(index / 3) * 180,
        },

        data: {
            label: (
                <div className="px-4 py-2 rounded-xl bg-black border border-white text-white shadow-lg shadow-white/10">
                    {topic.title}
                </div>
            ),
        },

        style: {
            background: "transparent",
            border: "none",
            width: 180,
        },
    }));

    const edges = topics.flatMap((topic) =>
        topic.related.map((related, index) => ({
            id: `${topic.title}-${related}-${index}`,
            source: topic.title,
            target: related,

            animated: true,

            style: {
                stroke: "#ffffff",
                strokeOpacity: 0.3,
            },
        }))
    );

    return (
        <div className="w-full h-[600px] bg-black rounded-3xl border border-zinc-800 mt-16 overflow-hidden">

            <div className="p-6 border-b border-zinc-800">

                <h2 className="text-3xl font-bold">
                    Knowledge Graph
                </h2>

                <p className="text-zinc-500 mt-2">
                    AI-generated concept relationships
                </p>

            </div>

            <div className="h-[520px]">

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    fitView
                >

                    <MiniMap />

                    <Controls />

                    <Background color="#222" />

                </ReactFlow>

            </div>

        </div>
    );
}