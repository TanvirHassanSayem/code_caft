import { Terminal } from "lucide-react";

export function EditorPanelSkeleton() {
  return (
    <div className="relative rounded-xl bg-[#12121a]/90 backdrop-blur border border-white/[0.05] p-4">
      {/* Background gradient blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl blur-2xl -z-10" />

      {/* Editor Area Skeleton */}
      <div className="relative rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        {/* Use min-h and max-h with overflow-auto */}
        <div className="min-h-[300px] md:min-h-[600px] max-h-[70vh] md:max-h-[600px] bg-[#1e1e2e]/50 backdrop-blur-sm p-4 overflow-auto rounded-xl">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 mb-3">
              <div className="w-12 h-4 bg-white/5 rounded" />
              <div
                className="h-4 bg-white/5 rounded"
                style={{ width: `${Math.random() * 60 + 20}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-3 flex justify-end">
        <div className="w-40 h-6 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative rounded-xl bg-[#181825] p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400/50" />
          </div>
          <div className="w-16 h-4 bg-white/5 rounded" />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="relative rounded-xl bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] p-4 min-h-[300px] md:min-h-[600px] max-h-[70vh] md:max-h-[600px] overflow-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-white/5 rounded-xl" />
            <div className="w-48 h-4 mx-auto bg-white/5 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Responsive EditorViewSkeleton with side-by-side on md+ and stacked on small
export function EditorViewSkeleton() {
  return (
    <div className="p-4 space-y-6 md:space-y-0 md:flex md:gap-6">
      <div className="md:flex-1">
        <EditorPanelSkeleton />
      </div>
      <div className="md:flex-1">
        <OutputPanelSkeleton />
      </div>
    </div>
  );
}
