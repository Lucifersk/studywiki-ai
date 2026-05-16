import { motion } from "framer-motion";

type WikiCardProps = {
    title: string;
    summary: string;
    related: string[];
    onSelect: (topic: string) => void;
};

export default function WikiCard({
    title,
    summary,
    related,
    onSelect,
}: WikiCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-6 w-full hover:border-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/10"
        >

            <h2 className="text-2xl font-bold mb-3">
                {title}
            </h2>

            <p className="text-zinc-300 leading-7 mb-5">
                {summary}
            </p>

            <div className="flex flex-wrap gap-2">

                {related.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(item)}
                        className="bg-zinc-800 hover:bg-white hover:text-black transition text-sm px-3 py-1 rounded-full"
                    >
                        {item}
                    </button>
                ))}

            </div>

        </motion.div>
    );
}