type Props = {
    topicCount: number;
};

export default function StatsBar({
    topicCount,
}: Props) {
    return (
        <div className="w-[700px] grid grid-cols-3 gap-4 mt-10">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="text-zinc-500 text-sm">
                    Topics
                </div>

                <div className="text-3xl font-bold mt-2">
                    {topicCount}
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="text-zinc-500 text-sm">
                    AI Relationships
                </div>

                <div className="text-3xl font-bold mt-2">
                    {topicCount * 2}
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="text-zinc-500 text-sm">
                    Knowledge Depth
                </div>

                <div className="text-3xl font-bold mt-2">
                    High
                </div>
            </div>

        </div>
    );
}