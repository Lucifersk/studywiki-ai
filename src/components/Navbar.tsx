export default function Navbar() {
    return (
        <nav className="w-full border-b border-zinc-800 p-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">
                StudyWiki AI
            </h1>

            <button className="bg-white text-black px-4 py-2 rounded-lg">
                Upload Notes
            </button>
        </nav>
    );
}