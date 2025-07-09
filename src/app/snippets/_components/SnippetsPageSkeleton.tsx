const CardSkeleton = () => (
  <div className="relative group">
    <div className="bg-[#1e1e2e]/80 rounded-2xl border border-[#313244]/40 overflow-hidden h-[280px] shadow-md">
      <div className="p-6 space-y-4">
        {/* Header shimmer */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-700/40 animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-5 bg-gray-700/40 rounded-lg animate-pulse" />
              <div className="w-20 h-3 bg-gray-700/30 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="w-12 h-6 bg-gray-700/30 rounded-lg animate-pulse" />
        </div>

        {/* Title shimmer */}
        <div className="space-y-2">
          <div className="w-3/4 h-6 bg-gray-700/40 rounded-lg animate-pulse" />
          <div className="w-1/2 h-4 bg-gray-700/30 rounded-lg animate-pulse" />
        </div>

        {/* Code block shimmer */}
        <div className="space-y-2 bg-black/20 rounded-lg p-4 border border-gray-700/30">
          <div className="w-full h-4 bg-gray-700/30 rounded animate-pulse" />
          <div className="w-3/4 h-4 bg-gray-700/30 rounded animate-pulse" />
          <div className="w-1/2 h-4 bg-gray-700/30 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

export default function SnippetsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#13131a] to-[#0a0a0f] text-white relative">
      {/* Ambient glowing background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[25%] -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-150" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="w-48 h-8 bg-gray-700/40 rounded-full mx-auto animate-pulse" />
          <div className="w-96 h-12 bg-gray-700/40 rounded-xl mx-auto animate-pulse" />
          <div className="w-72 h-6 bg-gray-700/30 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="max-w-5xl mx-auto mb-12 space-y-6">
          {/* Search bar shimmer */}
          <div className="relative">
            <div className="w-full h-14 bg-[#1e1e2e]/70 border border-[#313244]/50 rounded-xl animate-pulse" />
          </div>

          {/* Filter chips shimmer */}
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-8 bg-gray-700/30 rounded-lg animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Grid Card Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
