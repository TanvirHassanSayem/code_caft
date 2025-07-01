import EditorPanel from "../_components/EditorPanel";
import Header from "../_components/Header";
import OutputPanel from "../_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-[1800px] mx-auto p-6">
        {/* Header with Glassmorphism Effect */}
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl shadow-2xl mb-8 p-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div className="relative z-10">
            <Header/>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* EditorPanel with Modern Card Design */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-2xl"></div>
              <EditorPanel />
            </div>
          </div>
          
          {/* OutputPanel with Neon Glow Effect */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-2xl"></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <OutputPanel />
            </div>
          </div>
        </div>
        
        {/* Floating Particles Background Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-bounce delay-500"></div>
        </div>
      </div>
    </div>
  );
}