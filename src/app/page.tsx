import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center h-[85vh] px-6">

        <div className="text-center mb-12">

          <div className="inline-block px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 mb-6">
            AI Powered Knowledge Engine
          </div>

          <h1 className="text-7xl font-black tracking-tight">
            StudyWiki AI
          </h1>

          <p className="text-zinc-400 mt-6 text-xl max-w-2xl leading-8">
            Transform study notes into interconnected Wikipedia-style knowledge systems powered by AI.
          </p>

        </div>

        <UploadBox />

      </div>
    </main>
  );
}