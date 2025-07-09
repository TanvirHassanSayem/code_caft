function ProfileHeaderSkeleton() {
  return (
    <div className="relative mb-8 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-2xl p-8 border border-gray-800/50 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      
      <div className="relative flex items-center gap-8">
        {/* Enhanced Avatar Skeleton */}
        <div className="relative">
          {/* Glowing ring effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse [animation-delay:0.5s]" />
          
          {/* Avatar with shimmer effect */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 relative z-10 border-4 border-gray-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
          </div>
          
          {/* Enhanced status indicator */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500/50 to-purple-600/50 rounded-full z-20 animate-pulse">
            <div className="absolute inset-1 bg-gradient-to-r from-purple-400/30 to-purple-500/30 rounded-full animate-pulse [animation-delay:0.3s]" />
          </div>
        </div>

        {/* Enhanced User Info Skeleton */}
        <div className="space-y-3 flex-1">
          <div className="relative h-8 w-48 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer [animation-delay:0.2s]" />
          </div>
          <div className="relative h-5 w-32 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer [animation-delay:0.4s]" />
          </div>
          <div className="relative h-4 w-40 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer [animation-delay:0.6s]" />
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group relative p-4 rounded-xl bg-gray-800/20 border border-gray-800/50 overflow-hidden hover:bg-gray-800/30 transition-all duration-300"
          >
            {/* Card background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700/5 to-gray-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-xl animate-pulse" />
            
            <div className="relative space-y-4">
              {/* Enhanced Stat Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="relative h-4 w-24 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2}s`}} />
                  </div>
                  <div className="relative h-8 w-16 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.1}s`}} />
                  </div>
                  <div className="relative h-4 w-32 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.2}s`}} />
                  </div>
                </div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-700/80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.3}s`}} />
                </div>
              </div>

              {/* Enhanced Stat Footer */}
              <div className="pt-4 border-t border-gray-800/50 flex items-center gap-2">
                <div className="relative h-4 w-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.4}s`}} />
                </div>
                <div className="relative h-4 w-20 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.5}s`}} />
                </div>
                <div className="relative h-4 w-16 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" style={{animationDelay: `${i * 0.2 + 0.6}s`}} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional CSS for custom animations */}
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
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default ProfileHeaderSkeleton;