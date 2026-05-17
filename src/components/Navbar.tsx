export default function Navbar() {
    return (
        <nav className="w-full border-b border-zinc-800 p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">
                StudyWiki AI
            </h1>

            <label className="bg-white text-black px-5 py-2 rounded-xl cursor-pointer hover:scale-105 transition">

                Upload Notes

                <input
                    type="file"
                    className="hidden"
                    accept=".txt,.md,.json"
                />

            </label>
        </nav>
    );
}