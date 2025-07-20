function ProfileHeaderSkeleton() {
  return (
    <div className="relative mb-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 rounded-2xl p-8 border border-indigo-800/40 overflow-hidden shadow-2xl">
      {/* Enhanced animated background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:32px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      
      <div className="relative flex items-center gap-8">
        {/* Premium Avatar Skeleton */}
        <div className="relative">
          {/* Multi-layered glowing ring effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/25 to-cyan-400/25 rounded-full blur-xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse [animation-delay:0.5s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-lg animate-pulse [animation-delay:1.5s]" />
          
          {/* Avatar with premium shimmer effect */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700/90 via-indigo-800/80 to-slate-800/90 relative z-10 border-4 border-indigo-700/60 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent -translate-x-full animate-shimmer" />
          </div>
          
          {/* Enhanced status indicator with gradient */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400/70 to-cyan-400/70 rounded-full z-20 animate-pulse shadow-lg">
            <div className="absolute inset-1 bg-gradient-to-r from-emerald-300/40 to-cyan-300/40 rounded-full animate-pulse [animation-delay:0.3s]" />
            <div className="absolute inset-2 bg-gradient-to-r from-emerald-200/30 to-cyan-200/30 rounded-full animate-pulse [animation-delay:0.6s]" />
          </div>
        </div>

        {/* Premium User Info Skeleton */}
        <div className="space-y-3 flex-1">
          <div className="relative h-8 w-48 bg-gradient-to-r from-slate-700/90 via-indigo-800/80 to-slate-700/90 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-300/15 to-transparent -translate-x-full animate-shimmer [animation-delay:0.2s]" />
          </div>
          <div className="relative h-5 w-32 bg-gradient-to-r from-slate-700/80 via-indigo-800/70 to-slate-700/80 rounded-lg overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/12 to-transparent -translate-x-full animate-shimmer [animation-delay:0.4s]" />
          </div>
          <div className="relative h-4 w-40 bg-gradient-to-r from-slate-600/70 via-indigo-700/60 to-slate-600/70 rounded-lg overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent -translate-x-full animate-shimmer [animation-delay:0.6s]" />
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative p-4 rounded-xl bg-slate-800/30 border border-indigo-700/40 overflow-hidden hover:bg-slate-700/40 hover:border-indigo-600/60 transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            {/* Premium card background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-violet-600/8 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-400/10 to-emerald-400/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/8 to-blue-400/8 rounded-full blur-lg animate-pulse [animation-delay:1s]" />
            
            <div className="relative space-y-4">
              {/* Enhanced Stat Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="relative h-4 w-24 bg-gradient-to-r from-slate-700/90 via-indigo-800/80 to-slate-700/90 rounded-lg overflow-hidden shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-300/15 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2}s`}} />
                  </div>
                  <div className="relative h-8 w-16 bg-gradient-to-r from-slate-700/90 via-indigo-800/80 to-slate-700/90 rounded-lg overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.1}s`}} />
                  </div>
                  <div className="relative h-4 w-32 bg-gradient-to-r from-slate-600/80 via-indigo-700/70 to-slate-600/80 rounded-lg overflow-hidden shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/12 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.2}s`}} />
                  </div>
                </div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700/90 via-indigo-800/80 to-slate-700/90 overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-300/15 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.3}s`}} />
                </div>
              </div>

              {/* Enhanced Stat Footer */}
              <div className="pt-4 border-t border-indigo-700/40 flex items-center gap-2">
                <div className="relative h-4 w-4 bg-gradient-to-r from-slate-700/90 via-indigo-800/80 to-slate-700/90 rounded-full overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/15 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.4}s`}} />
                </div>
                <div className="relative h-4 w-20 bg-gradient-to-r from-slate-700/80 via-indigo-800/70 to-slate-700/80 rounded-lg overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/12 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.5}s`}} />
                </div>
                <div className="relative h-4 w-16 bg-gradient-to-r from-slate-600/70 via-indigo-700/60 to-slate-600/70 rounded-lg overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-300/10 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.6}s`}} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced CSS for premium animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default ProfileHeaderSkeleton;