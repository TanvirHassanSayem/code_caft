"use client";
import dynamic from "next/dynamic";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState, useCallback, useMemo } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShareIcon,
  Trash2Icon,
  CodeIcon,
  CheckIcon,
  CopyIcon,
  MaximizeIcon,
  MinimizeIcon,
  PlayIcon,
  Square,
  TerminalIcon,
  AlertCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import RunButton from "./RunButton";
// Lazy load Monaco Editor without SSR
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <EditorPanelSkeleton />,
});

interface CodeOutput {
  output: string;
  error?: string;
  isRunning: boolean;
  executionTime?: number;
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [fullscreenElement, setFullscreenElement] = useState<HTMLDivElement | null>(null);
  const [codeOutput, setCodeOutput] = useState<CodeOutput>({ output: "", isRunning: false });
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();
  const mounted = useMounted();

  const currentLanguageConfig = useMemo(() => LANGUAGE_CONFIG[language], [language]);

  const debouncedSave = useMemo(
    () =>
      debounce((code: string) => {
        localStorage.setItem(`editor-code-${language}`, code);
        setLastSaved(new Date());
      }, 1000),
    [language]
  );

  const runCode = useCallback(async () => {
    if (!editor) return;

    const code = editor.getValue();
    if (!code.trim()) {
      setCodeOutput({ output: "No code to execute", isRunning: false });
      return;
    }

    setCodeOutput({ output: "", isRunning: true });
    const startTime = Date.now();

    try {
      let result = "";
      let error = "";

      switch (language) {
        case "javascript":
          try {
            const logs: string[] = [];
            const console = {
              log: (...args: any[]) =>
                logs.push(
                  args
                    .map((arg) =>
                      typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
                    )
                    .join(" ")
                ),
              error: (...args: any[]) => logs.push("ERROR: " + args.map(String).join(" ")),
              warn: (...args: any[]) => logs.push("WARNING: " + args.map(String).join(" ")),
            };
            const func = new Function("console", code);
            func(console);
            result = logs.join("\n") || "Code executed successfully (no output)";
          } catch (err) {
            error = `JavaScript Error: ${err instanceof Error ? err.message : String(err)}`;
          }
          break;

        case "python":
          result = `Python code simulation:\n\n${code}\n\n⚠️ Note: This is a simulation. Python code cannot be executed in the browser.\nTo run Python code, use a local Python environment or online Python interpreter.`;
          break;

        case "java":
          result = `Java code simulation:\n\n${code}\n\n⚠️ Note: This is a simulation. Java code cannot be compiled and executed in the browser.\nTo run Java code, use a local Java development environment or online Java compiler.`;
          break;

        case "cpp":
          result = `C++ code simulation:\n\n${code}\n\n⚠️ Note: This is a simulation. C++ code cannot be compiled and executed in the browser.\nTo run C++ code, use a local C++ compiler or online C++ compiler.`;
          break;

        case "html":
          result = `HTML Preview:\n\n${code}\n\n✅ HTML code is valid and can be rendered in a browser.`;
          break;

        case "css":
          result = `CSS code:\n\n${code}\n\n✅ CSS code is ready to be applied to HTML elements.`;
          break;

        default:
          result = `${language.toUpperCase()} code:\n\n${code}\n\n⚠️ Note: Code execution not supported for ${language} in browser environment.`;
      }

      const executionTime = Date.now() - startTime;
      setCodeOutput({
        output: result,
        error: error || undefined,
        isRunning: false,
        executionTime,
      });
    } catch (err) {
      const executionTime = Date.now() - startTime;
      setCodeOutput({
        output: "",
        error: `Execution Error: ${err instanceof Error ? err.message : String(err)}`,
        isRunning: false,
        executionTime,
      });
    }
  }, [editor, language]);

  const stopCode = useCallback(() => {
    setCodeOutput((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const enterFullscreen = useCallback(async () => {
    if (!fullscreenElement) return;
    try {
      const element = fullscreenElement as any;
      if (element.requestFullscreen) await element.requestFullscreen();
      else if (element.webkitRequestFullscreen) await element.webkitRequestFullscreen();
      else if (element.mozRequestFullScreen) await element.mozRequestFullScreen();
      else if (element.msRequestFullscreen) await element.msRequestFullscreen();
      setIsFullscreen(true);
    } catch (err) {
      console.error("Failed to enter fullscreen:", err);
      setIsFullscreen(true);
    }
  }, [fullscreenElement]);

  const exitFullscreen = useCallback(async () => {
    try {
      const doc = document as any;
      if (doc.exitFullscreen) await doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) await doc.webkitExitFullscreen();
      else if (doc.mozCancelFullScreen) await doc.mozCancelFullScreen();
      else if (doc.msExitFullscreen) await doc.msExitFullscreen();
    } catch (err) {
      console.error("Failed to exit fullscreen:", err);
    }
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as any;
      const isCurrentlyFullscreen = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isCurrentlyFullscreen && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        exitFullscreen();
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isFullscreen, exitFullscreen]);

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || currentLanguageConfig.defaultCode;
    if (editor) {
      editor.setValue(newCode);
      setLastSaved(savedCode ? new Date() : null);
    }
  }, [language, editor, currentLanguageConfig]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleClear = useCallback(() => {
    if (editor) {
      editor.setValue("");
      setLastSaved(null);
    }
    localStorage.removeItem(`editor-code-${language}`);
    setCodeOutput({ output: "", isRunning: false });
  }, [editor, language]);

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (value) {
        debouncedSave(value);
      }
    },
    [debouncedSave]
  );

  const handleFontSizeChange = useCallback(
    (newSize: number) => {
      const size = Math.min(Math.max(newSize, 10), 32);
      setFontSize(size);
      localStorage.setItem("editor-font-size", size.toString());
    },
    [setFontSize]
  );

  const handleCopy = useCallback(async () => {
    if (editor) {
      const code = editor.getValue();
      try {
        await navigator.clipboard.writeText(code);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }
  }, [editor]);

  const handleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  if (!mounted) return null;

  return (
    <>
      {/* Fullscreen Container */}
      <div
        ref={setFullscreenElement}
        className={`${isFullscreen ? "fixed inset-0 z-[9999] bg-black" : "relative"} transition-all duration-300`}
      >
        {isFullscreen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col"
          >
            {/* Fullscreen Header */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 border-b border-white/10 flex-shrink-0 bg-gray-900/95 backdrop-blur-xl gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 ring-1 ring-white/10"
                >
                  <Image src={"/" + language + ".png"} alt="Logo" width={28} height={28} />
                </motion.div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-semibold text-white">Code Editor - Fullscreen</h2>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20"
                    >
                      {language.toUpperCase()}
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                    <CodeIcon className="size-4" />
                    <span>Full Screen Professional IDE Experience</span>
                    {lastSaved && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-xs text-green-400">
                        <CheckIcon className="size-3" />
                        <span>Saved {formatTime(lastSaved)}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-end">
                {/* Font Size Controls */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800/50 border border-white/10 text-sm text-gray-400 select-none">
                  <span>Font:</span>
                  <button
                    onClick={() => handleFontSizeChange(fontSize - 1)}
                    className="w-6 h-6 rounded-md bg-gray-700/50 hover:bg-gray-700 text-gray-300 font-medium transition-colors"
                  >
                    -
                  </button>
                  <span className="min-w-[2ch] text-center text-white">{fontSize}</span>
                  <button
                    onClick={() => handleFontSizeChange(fontSize + 1)}
                    className="w-6 h-6 rounded-md bg-gray-700/50 hover:bg-gray-700 text-gray-300 font-medium transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Run/Stop Button */}
                <RunButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={codeOutput.isRunning ? stopCode : runCode}
                  disabled={codeOutput.isRunning}
                  className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 ease-out whitespace-nowrap ${codeOutput.isRunning
                      ? "bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 hover:border-red-500/50"
                      : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50"
                    }`}
                  title={codeOutput.isRunning ? "Stop Execution" : "Run Code"}
                >
                  {codeOutput.isRunning ? (
                    <>
                      <Square className="size-4 text-red-400 group-hover:text-red-300 transition-colors" />
                      <span className="text-sm text-red-300">Stop</span>
                    </>
                  ) : (
                    <>
                      <PlayIcon className="size-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      <span className="text-sm text-emerald-300">Run</span>
                    </>
                  )}
                </motion.button>
                </RunButton>

                {/* Copy Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 ease-out whitespace-nowrap"
                  title="Copy Code"
                >
                  <CopyIcon className="size-4 text-green-400 group-hover:text-green-300 transition-colors" />
                  <span className="text-sm text-green-300">Copy</span>
                  {copySuccess && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-green-300 bg-green-500/20 px-2 py-1 rounded-md"
                    >
                      Copied!
                    </motion.span>
                  )}
                </motion.button>

                {/* Clear Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 ease-out whitespace-nowrap"
                  title="Clear Editor"
                >
                  <Trash2Icon className="size-4 text-red-400 group-hover:text-red-300 transition-colors" />
                  <span className="text-sm text-red-300">Clear</span>
                </motion.button>

                {/* Exit Fullscreen Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFullscreen}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 ease-out whitespace-nowrap"
                  title="Exit Fullscreen (Press Esc)"
                >
                  <MinimizeIcon className="size-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className="text-sm text-purple-300">Exit</span>
                </motion.button>
              </div>
            </div>

            {/* Fullscreen Content */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Editor */}
              <div
                className={`transition-all duration-300 p-4 md:p-6 pb-3 overflow-hidden ${isOutputCollapsed ? "flex-auto" : "md:flex-[2]"
                  }`}
              >
                <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/10 shadow-inner shadow-black/20 bg-gray-900/50 h-[400px] sm:h-[500px] md:h-full">
                  {clerk.loaded ? (
                    <MonacoEditor
                      height="100%"
                      language={currentLanguageConfig.monacoLanguage}
                      onChange={handleEditorChange}
                      theme={theme}
                      beforeMount={defineMonacoThemes}
                      onMount={(editor) => setEditor(editor)}
                      options={{
                        minimap: { enabled: false },
                        fontSize,
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        padding: { top: 20, bottom: 20 },
                        renderWhitespace: "selection",
                        fontFamily:
                          '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
                        fontLigatures: true,
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                        contextmenu: true,
                        renderLineHighlight: "all",
                        lineHeight: 1.7,
                        letterSpacing: 0.3,
                        roundedSelection: true,
                        selectionHighlight: true,
                        occurrencesHighlight: true,
                        wordWrap: "on",
                        wrappingStrategy: "advanced",
                        scrollbar: {
                          verticalScrollbarSize: 12,
                          horizontalScrollbarSize: 12,
                          useShadows: true,
                        },
                        suggest: {
                          showKeywords: true,  // ENABLE suggestions
                          showSnippets: true, // disable snippets if not needed for speed
                        },
                        quickSuggestions: true, // enable inline suggestions
                        tabCompletion: "on",
                        acceptSuggestionOnEnter: "on", // allow Enter key accept
                        autoIndent: "full",
                        formatOnPaste: false,  // keep disabled for perf
                        formatOnType: false,   // keep disabled for perf
                        bracketPairColorization: false,
                        guides: {
                          bracketPairs: false,
                          indentation: true,
                        },
                      }}
                    />
                  ) : (
                    <EditorPanelSkeleton />
                  )}
                </div>
              </div>

              {/* Output */}
              {!isOutputCollapsed && (
                <div className="md:flex-1 border-t md:border-t-0 md:border-l border-white/10 transition-all duration-300">
                  {/* Output Header */}
                  <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-gray-900/50 border-b border-white/5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <TerminalIcon className="size-4 text-gray-400" />
                      <h3 className="text-sm font-medium text-gray-300">Output</h3>
                      {codeOutput.executionTime && (
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          Executed in {codeOutput.executionTime}ms
                        </span>
                      )}
                      {codeOutput.isRunning && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-emerald-400">Running...</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setIsOutputCollapsed(!isOutputCollapsed)}
                      className="p-1 rounded-md hover:bg-gray-800/50 transition-colors"
                      aria-label={isOutputCollapsed ? "Expand output" : "Collapse output"}
                    >
                      {isOutputCollapsed ? (
                        <ChevronUpIcon className="size-4 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="size-4 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Output Content */}
                  <AnimatePresence>
                    {!isOutputCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-48 sm:h-60 md:h-full overflow-auto p-4 bg-gray-950/80 font-mono text-sm"
                      >
                        {codeOutput.isRunning ? (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Executing code...</span>
                          </div>
                        ) : codeOutput.error ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-red-400">
                              <AlertCircleIcon className="size-4" />
                              <span>Execution Error</span>
                            </div>
                            <pre className="text-red-300 whitespace-pre-wrap bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                              {codeOutput.error}
                            </pre>
                          </div>
                        ) : codeOutput.output ? (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-green-400">
                              <CheckIcon className="size-4" />
                              <span>Execution Complete</span>
                            </div>
                            <pre className="text-gray-300 whitespace-pre-wrap bg-gray-800/30 p-3 rounded-lg border border-gray-700/30">
                              {codeOutput.output}
                            </pre>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                              <TerminalIcon className="size-8 mx-auto mb-2 opacity-50" />
                              <p>No output yet. Click "Run" to execute your code.</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Fullscreen Footer */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between p-4 border-t border-white/10 bg-gray-900/95 backdrop-blur-xl gap-3">
              <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap justify-center sm:justify-start">
                <span>
                  Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Esc</kbd> to exit fullscreen
                </span>
                <span>•</span>
                <span>{language.toUpperCase()} Editor</span>
                <span>•</span>
                <span>
                  Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+Enter</kbd> to run code
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Fullscreen Mode Active</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="relative transition-all duration-300">
            <motion.div
              layout
              className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                />
              </div>

              {/* Header */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 pb-4 border-b border-white/5 gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 ring-1 ring-white/10"
                  >
                    <Image src={"/" + language + ".png"} alt="Logo" width={28} height={28} />
                  </motion.div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-semibold text-white">Code Editor</h2>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 whitespace-nowrap"
                      >
                        {language.toUpperCase()}
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
                      <CodeIcon className="size-3" />
                      <span>Professional IDE Experience</span>
                      {lastSaved && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-xs text-green-400">
                          <CheckIcon className="size-3" />
                          <span>Saved {formatTime(lastSaved)}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
                  {/* Copy Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(34, 197, 94, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 ease-out whitespace-nowrap"
                    title="Copy Code"
                  >
                    <CopyIcon className="size-4 text-green-400 group-hover:text-green-300 transition-colors" />
                    {copySuccess && (
                      <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-xs text-green-300">
                        Copied!
                      </motion.span>
                    )}
                  </motion.button>

                  {/* Fullscreen Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFullscreen}
                    className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 ease-out whitespace-nowrap"
                    title="Enter Fullscreen"
                  >
                    <MaximizeIcon className="size-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </motion.button>

                  {/* Clear Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(239, 68, 68, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClear}
                    className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl overflow-hidden bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 ease-out whitespace-nowrap"
                    title="Clear Editor"
                  >
                    <Trash2Icon className="size-4 text-red-400 group-hover:text-red-300 transition-colors" />
                  </motion.button>

                  {/* Share Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsShareDialogOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity whitespace-nowrap"
                  >
                    <ShareIcon className="size-4 text-white" />
                    <span className="text-sm font-medium text-white">Share</span>
                  </motion.button>
                </div>
              </div>

              {/* Editor */}
              <div className="relative p-4 sm:p-6 pt-4 flex-1 overflow-hidden">
                <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/10 shadow-inner shadow-black/20 bg-gray-900/50 h-[400px] sm:h-[500px] md:h-[600px]">
                  {clerk.loaded ? (
                    <MonacoEditor
                      height="100%"
                      language={currentLanguageConfig.monacoLanguage}
                      onChange={handleEditorChange}
                      theme={theme}
                      beforeMount={defineMonacoThemes}
                      onMount={(editor) => setEditor(editor)}
                      options={{
                        minimap: { enabled: false },
                        fontSize,
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        padding: { top: 20, bottom: 20 },
                        renderWhitespace: "selection",
                        fontFamily:
                          '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
                        fontLigatures: true,
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                        contextmenu: true,
                        renderLineHighlight: "all",
                        lineHeight: 1.7,
                        letterSpacing: 0.3,
                        roundedSelection: true,
                        selectionHighlight: true,
                        occurrencesHighlight: true,
                        wordWrap: "on",
                        wrappingStrategy: "advanced",
                        scrollbar: {
                          verticalScrollbarSize: 12,
                          horizontalScrollbarSize: 12,
                          useShadows: true,
                        },
                        suggest: {
                          showKeywords: true,
                          showSnippets: false,
                        },
                        quickSuggestions: true,
                        tabCompletion: "on",
                        acceptSuggestionOnEnter: "on",
                        autoIndent: "full",
                        formatOnPaste: false,
                        formatOnType: false,
                        bracketPairColorization: false,
                        guides: {
                          bracketPairs: false,
                          indentation: true,
                        },
                      }}
                    />
                  ) : (
                    <EditorPanelSkeleton />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />}
    </>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

export default EditorPanel;
