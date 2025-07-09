"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Copy, 
  Terminal, 
  Trash2, 
  Download,
  Maximize2,
  Minimize2,
  FileText,
  Zap,
  Play,
  Settings,
  Info
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

// Define types for better TypeScript support
interface OutputHistoryEntry {
  id: number;
  timestamp: string;
  language: string;
  input: string;
  output: string | null;
  error: string | null;
  executionTime: string;
}

function OutputPanel() {
  const {
    output,
    error,
    isRunning,
    language,
    userInput,
    setUserInput,
    runCode,
  } = useCodeEditorStore();

  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [executionTime, setExecutionTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [outputHistory, setOutputHistory] = useState<OutputHistoryEntry[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hasContent = Boolean(error || output);
  const hasInput = Boolean(userInput && userInput.trim());

  // Timer for execution time
  useEffect(() => {
    if (isRunning) {
      const currentTime = Date.now();
      setStartTime(currentTime);
      timerRef.current = setInterval(() => {
        setExecutionTime((Date.now() - currentTime) / 1000);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScroll && outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, error, autoScroll]);

  // Save output to history
  useEffect(() => {
    if (hasContent && !isRunning) {
      const newEntry: OutputHistoryEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        language: language || 'unknown',
        input: userInput || '',
        output: output || null,
        error: error || null,
        executionTime: executionTime.toFixed(2),
      };
      setOutputHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    }
  }, [output, error, isRunning, language, userInput, executionTime, hasContent]);

  const handleCopy = useCallback(async () => {
    if (!hasContent) return;
    try {
      const content = error || output;
      if (content) {
        await navigator.clipboard.writeText(content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [hasContent, error, output]);

  const handleDownload = useCallback(() => {
    if (!hasContent) return;
    try {
      const content = error || output;
      if (content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `output_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Failed to download:', err);
    }
  }, [hasContent, error, output]);

  const handleClear = useCallback(() => {
    // Reset local state
    setExecutionTime(0);
    setOutputHistory([]);
    // You might need to add a clearOutput method to your store
  }, []);

  const handleRunWithInput = useCallback(async () => {
    setExecutionTime(0);
    await runCode(userInput);
  }, [runCode, userInput]);

  const getStatusColor = useCallback(() => {
    if (isRunning) return 'text-yellow-400';
    if (error) return 'text-red-400';
    if (output) return 'text-emerald-400';
    return 'text-gray-400';
  }, [isRunning, error, output]);

  const getStatusIcon = useCallback(() => {
    if (isRunning) return <Zap className="w-4 h-4 animate-pulse" />;
    if (error) return <AlertTriangle className="w-4 h-4" />;
    if (output) return <CheckCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  }, [isRunning, error, output]);

  return (
    <div className="relative bg-gradient-to-br from-[#181825] to-[#1e1e2e] rounded-xl p-5 ring-1 ring-gray-800/40 shadow-lg transition-all duration-300">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-200 tracking-wide">Output</span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className={getStatusColor()}>{getStatusIcon()}</span>
              {isRunning ? (
                <span>Running... {executionTime.toFixed(1)}s</span>
              ) : hasContent ? (
                <span>Completed in {executionTime.toFixed(2)}s</span>
              ) : (
                <span>Ready</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-blue-400 transition-all duration-200"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white bg-[#1e1e2e] 
            rounded-lg ring-1 ring-gray-800/50 hover:ring-blue-400 transition-all duration-200"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Action Buttons */}
          {hasContent && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white bg-[#1e1e2e] 
                rounded-lg ring-1 ring-gray-800/50 hover:ring-blue-400 transition-all duration-200"
                title="Download output"
              >
                <Download className="w-4 h-4" />
              </button>
              
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

              <button
                onClick={handleClear}
                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-400 bg-[#1e1e2e] 
                rounded-lg ring-1 ring-gray-800/50 hover:ring-red-400 transition-all duration-200"
                title="Clear output"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-4 p-4 bg-[#1e1e2e]/50 rounded-lg border border-[#313244]">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-300">Auto-scroll</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={wordWrap}
                onChange={(e) => setWordWrap(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-300">Word wrap</span>
            </label>
            <div className="col-span-2 flex items-center gap-2">
              <span className="text-gray-300">Font size:</span>
              <input
                type="range"
                min="12"
                max="20"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-gray-400 text-xs w-8">{fontSize}px</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Input Section */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-300">Input (stdin)</span>
          {hasInput && (
            <span className="text-xs text-gray-500 bg-[#1e1e2e] px-2 py-1 rounded">
              {userInput.split('\n').length} lines
            </span>
          )}
        </div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter input values (stdin) here..."
          className="w-full rounded-md bg-[#1e1e2e] border border-[#313244] p-3 text-sm text-white placeholder:text-gray-500
          focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-none"
          rows={4}
          disabled={isRunning}
        />
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleRunWithInput}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm 
            disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-4 h-4" />
            {isRunning ? "Running..." : "Run with Input"}
          </button>
        </div>
      </div>

      {/* Enhanced Output Area */}
      <div
        ref={outputRef}
        className={`relative bg-[#1e1e2e]/50 backdrop-blur-md border border-[#2a2a3b] 
        rounded-xl p-4 overflow-auto font-mono text-gray-200 transition-all duration-300 ${
          isExpanded ? 'h-[800px]' : 'h-[600px]'
        }`}
        style={{ 
          fontSize: `${fontSize}px`,
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre'
        }}
      >
        {isRunning ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">Executing...</span>
              <span className="text-sm text-gray-400">({executionTime.toFixed(1)}s)</span>
            </div>
            <RunningCodeSkeleton />
          </div>
        ) : error ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">Execution Error</span>
              <span className="text-sm text-gray-400">({executionTime.toFixed(2)}s)</span>
            </div>
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
              <pre className="text-red-400/90 whitespace-pre-wrap">{error}</pre>
            </div>
          </div>
        ) : output ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Execution Successful</span>
              <span className="text-sm text-gray-400">({executionTime.toFixed(2)}s)</span>
            </div>
            <div className="bg-emerald-900/10 border border-emerald-800/30 rounded-lg p-4">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
              <Terminal className="w-8 h-8" />
            </div>
            <p className="text-center text-lg font-medium mb-2">Ready to Execute</p>
            <p className="text-center text-sm text-gray-400">
              Run your {language || 'code'} to see the output here
            </p>
            {outputHistory.length > 0 && (
              <div className="mt-6 w-full max-w-md">
                <div className="flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-medium">Recent Executions</span>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {outputHistory.slice(0, 3).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-2 bg-gray-800/30 rounded text-xs">
                      <span className="text-gray-300">{entry.timestamp}</span>
                      <span className={entry.error ? 'text-red-400' : 'text-emerald-400'}>
                        {entry.error ? 'Error' : 'Success'} ({entry.executionTime}s)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;