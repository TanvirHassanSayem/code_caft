import NavigationHeader from "@/components/NavigationHeader";
import { useState, useEffect } from "react";
const [theme, setTheme] = useState<"dark" | "light">("dark");
export default function SnippetLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#11111b] to-[#0a0a0f] text-white">
      <NavigationHeader theme={theme} setTheme={setTheme} />

      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
        {/* Ambient Light Effects */}
        <div className="fixed top-[20%] -left-[10%] w-[40vw] h-[40vw] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0 animate-float" />
        <div className="fixed top-[30%] -right-[10%] w-[30vw] h-[30vw] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none z-0 animate-float-delay" />

        <div className="max-w-[1200px] mx-auto space-y-8 relative">
          {/* Header Card - Glass Morphism */}
          <div className="bg-[#121218]/60 border border-white/5 rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-xl transition-all hover:border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/70 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-gradient-to-r from-gray-700/40 via-gray-600/30 to-gray-700/40 rounded-lg animate-pulse bg-[length:200%_100%]" />
                  <div className="flex gap-4">
                    <div className="h-4 w-24 bg-gray-700/30 rounded-full animate-pulse" />
                    <div className="h-4 w-24 bg-gray-700/30 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="h-10 w-24 bg-gray-700/30 rounded-lg animate-pulse" />
            </div>
            <div className="h-[400px] bg-gradient-to-br from-black/20 via-gray-900/30 to-black/20 rounded-xl animate-pulse border border-white/5" />
          </div>

          {/* Comments Section - Modern Card Layout */}
          <div className="bg-[#121218]/60 border border-white/5 rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-xl">
            <div className="h-6 w-32 bg-gradient-to-r from-gray-700/30 via-gray-600/20 to-gray-700/30 rounded-full animate-pulse mb-6" />
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700/40 to-gray-800/50 animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-28 bg-gray-700/30 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-700/20 rounded-full animate-pulse" />
                      <div className="h-4 w-3/4 bg-gray-700/20 rounded-full animate-pulse" />
                    </div>
                    <div className="h-4 w-16 bg-gray-700/20 rounded-full animate-pulse mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Action Button Skeleton */}
          <div className="fixed bottom-8 right-8 h-14 w-14 bg-gradient-to-br from-blue-500/80 to-blue-600/90 rounded-full shadow-xl animate-pulse border border-white/10 backdrop-blur-md" />
        </div>
      </main>
    </div>
  );
}