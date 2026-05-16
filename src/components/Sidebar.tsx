type Topic = {
    title: string;
};

type Props = {
    topics: Topic[];
    onSelect: (title: string) => void;
};

export default function Sidebar({
    topics,
    onSelect,
}: Props) {
    return (
        <div className="w-[280px] h-screen border-r border-zinc-800 bg-black p-6 overflow-y-auto sticky top-0">

            <h2 className="text-2xl font-bold mb-8">
                StudyWiki
            </h2>

            <div className="space-y-2">

                {topics.map((topic, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(topic.title)}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-900 transition text-zinc-300 hover:text-white"
                    >
                        {topic.title}
                    </button>
                ))}

            </div>

        </div>
    );
}