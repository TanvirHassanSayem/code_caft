const CardSkeleton = () => (
  <div className="relative group">
    <div className="bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-black/80 backdrop-blur-xl rounded-3xl border border-zinc-700/20 overflow-hidden h-[280px] shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
      
      <div className="relative p-6 space-y-4">
        {/* Header shimmer */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-blue-400/20 animate-pulse shadow-lg" />
            <div className="space-y-2">
              <div className="w-24 h-5 bg-gradient-to-r from-zinc-400/30 to-zinc-500/20 rounded-xl animate-pulse" />
              <div className="w-20 h-3 bg-gradient-to-r from-zinc-500/20 to-zinc-600/15 rounded-xl animate-pulse delay-75" />
            </div>
          </div>
          <div className="w-12 h-6 bg-gradient-to-r from-emerald-400/15 to-blue-400/15 rounded-xl animate-pulse delay-150" />
        </div>

        {/* Title shimmer */}
        <div className="space-y-3">
          <div className="w-3/4 h-6 bg-gradient-to-r from-zinc-300/25 via-zinc-400/20 to-zinc-300/25 rounded-xl animate-pulse" />
          <div className="w-1/2 h-4 bg-gradient-to-r from-zinc-400/20 via-zinc-500/15 to-zinc-400/20 rounded-xl animate-pulse delay-100" />
        </div>

        {/* Code block shimmer */}
        <div className="space-y-3 bg-gradient-to-br from-black/60 via-zinc-900/80 to-black/60 rounded-2xl p-5 border border-zinc-700/30 shadow-inner">
          <div className="w-full h-4 bg-gradient-to-r from-emerald-300/15 via-blue-300/10 to-emerald-300/15 rounded-lg animate-pulse" />
          <div className="w-3/4 h-4 bg-gradient-to-r from-blue-300/10 via-emerald-300/15 to-blue-300/10 rounded-lg animate-pulse delay-75" />
          <div className="w-1/2 h-4 bg-gradient-to-r from-emerald-300/15 via-blue-300/10 to-emerald-300/15 rounded-lg animate-pulse delay-150" />
        </div>
      </div>
    </div>
  </div>
);

export default function SnippetsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white relative overflow-hidden">
      {/* Enhanced ambient glowing background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] -left-1/4 w-[600px] h-[600px] bg-gradient-radial from-emerald-400/20 via-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] -right-1/4 w-[500px] h-[500px] bg-gradient-radial from-blue-400/20 via-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-[15%] left-1/3 w-[400px] h-[400px] bg-gradient-radial from-cyan-400/15 via-cyan-500/8 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.02] z-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section Skeleton */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
          <div className="w-56 h-10 bg-gradient-to-r from-emerald-300/20 via-blue-300/25 to-emerald-300/20 rounded-2xl mx-auto animate-pulse shadow-lg" />
          <div className="w-[500px] h-16 bg-gradient-to-r from-zinc-200/20 via-zinc-300/25 to-zinc-200/20 rounded-3xl mx-auto animate-pulse delay-200" />
          <div className="w-80 h-7 bg-gradient-to-r from-zinc-400/15 via-zinc-500/20 to-zinc-400/15 rounded-xl mx-auto animate-pulse delay-400" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="max-w-5xl mx-auto mb-16 space-y-8">
          {/* Search bar shimmer */}
          <div className="relative">
            <div className="w-full h-16 bg-gradient-to-r from-zinc-800/60 via-zinc-700/80 to-zinc-800/60 backdrop-blur-xl border border-zinc-600/30 rounded-2xl animate-pulse shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-blue-500/5 rounded-2xl"></div>
          </div>

          {/* Filter chips shimmer */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-28 h-10 bg-gradient-to-r from-zinc-600/30 via-zinc-500/40 to-zinc-600/30 rounded-xl animate-pulse shadow-lg"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Grid Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ animationDelay: `${i * 200}ms` }}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}