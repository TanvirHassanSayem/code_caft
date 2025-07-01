"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { AlertTriangle, CheckCircle, Clock, Copy, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, error]);

  return (
    <div className="relative bg-gradient-to-br from-[#181825] to-[#1e1e2e] rounded-xl p-5 ring-1 ring-gray-800/40 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-sm font-semibold text-gray-200 tracking-wide">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-blue-400 transition-all duration-200"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div
        ref={outputRef}
        className="relative bg-[#1e1e2e]/50 backdrop-blur-md border border-[#2a2a3b] 
        rounded-xl p-4 h-[600px] overflow-auto font-mono text-sm text-gray-200 transition-colors duration-300"
      >
        {isRunning ? (
          <RunningCodeSkeleton />
        ) : error ? (
          <div className="flex items-start gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" />
            <div className="space-y-1">
              <div className="font-semibold">Execution Error</div>
              <pre className="whitespace-pre-wrap text-red-400/80">{error}</pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Execution Successful</span>
            </div>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-center">Run your code to see the output here...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
