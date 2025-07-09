import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { useState, useEffect, useRef } from "react";
import { api } from "../../../convex/_generated/api";
import { X, Share2, Code, FileText, Loader2, Check, Sparkles, Copy, Eye, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface ShareSnippetDialogProps {
  onClose: () => void;
}

function ShareSnippetDialog({ onClose }: ShareSnippetDialogProps) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const code = getCode();

  // Generate smart title suggestions based on code content
  useEffect(() => {
    const generateSuggestions = () => {
      const suggestions: string[] = [];
      
      // Language-specific suggestions
      const langSuggestions = {
        javascript: ["JS Function", "React Component", "Node.js Script", "JavaScript Utility"],
        typescript: ["TypeScript Function", "Type Definition", "TS Component", "Interface"],
        python: ["Python Script", "Data Analysis", "Algorithm", "Python Function"],
        java: ["Java Class", "Spring Boot", "Algorithm", "Java Method"],
        css: ["CSS Styles", "Component Styles", "Animation", "Layout"],
        html: ["HTML Template", "Web Component", "Page Structure", "Form"],
        sql: ["Database Query", "SQL Script", "Data Query", "Table Schema"],
        json: ["JSON Data", "Configuration", "API Response", "Data Structure"],
        markdown: ["Documentation", "README", "Notes", "Guide"],
      };

      // Add language-specific suggestions
      const langKey = language.toLowerCase();
      if (langSuggestions[langKey as keyof typeof langSuggestions]) {
        suggestions.push(...langSuggestions[langKey as keyof typeof langSuggestions]);
      }

      // Code pattern-based suggestions
      if (code.includes("function") || code.includes("def ")) {
        suggestions.push("Custom Function", "Utility Function");
      }
      if (code.includes("class ") || code.includes("interface ")) {
        suggestions.push("Class Definition", "Code Structure");
      }
      if (code.includes("import ") || code.includes("require(")) {
        suggestions.push("Module Example", "Package Demo");
      }
      if (code.includes("export ") || code.includes("module.exports")) {
        suggestions.push("Reusable Component", "Export Module");
      }
      if (code.includes("async ") || code.includes("await ")) {
        suggestions.push("Async Function", "Promise Handler");
      }

      // Generic fallbacks
      suggestions.push("Code Snippet", "Quick Solution", "Implementation", "Code Example");

      // Remove duplicates and limit to 4 suggestions
      setTitleSuggestions([...new Set(suggestions)].slice(0, 4));
    };

    if (code.trim()) {
      generateSuggestions();
    }
  }, [code, language]);

  // Focus title input when dialog opens with animation
  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 100);
  }, []);

  // Close dialog on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title", {
        icon: "📝",
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
        },
      });
      return;
    }

    if (!code.trim()) {
      toast.error("Cannot share empty code", {
        icon: "⚠️",
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
        },
      });
      return;
    }

    setIsSharing(true);

    try {
      const snippetData = {
        title: title.trim(),
        language,
        code,
      };

      const result = await createSnippet(snippetData);
      
      // Create shareable URL with the snippet ID
      const shareableUrl = `${window.location.origin}/snippet/${result}`;
      setSharedUrl(shareableUrl);
      setShowSuccess(true);
      
      toast.success("Snippet shared successfully!", {
        icon: "🎉",
        duration: 4000,
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
        },
      });
      
      // Auto-close after 5 seconds
      setTimeout(() => {
        if (showSuccess) {
          handleClose();
        }
      }, 5000);
      
    } catch (error) {
      console.error("Error creating snippet:", error);
      toast.error("Failed to share snippet. Please try again.", {
        icon: "❌",
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
        },
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setSharedUrl(null);
    setShowSuccess(false);
    setShowSuggestions(false);
    onClose();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", {
        icon: "📋",
        duration: 2000,
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error("Failed to copy to clipboard", {
        icon: "❌",
        style: {
          borderRadius: '10px',
          background: '#1e1e2e',
          color: '#fff',
        },
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTitle(suggestion);
    setShowSuggestions(false);
    titleInputRef.current?.focus();
  };

  const codeStats = {
    lines: code.split('\n').length,
    characters: code.length,
    words: code.split(/\s+/).filter(word => word.length > 0).length,
  };

  // Success state with enhanced animations
  if (showSuccess && sharedUrl) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-[#1e1e2e] to-[#181825] rounded-xl p-6 w-full max-w-md border border-[#313244] shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Check className="w-8 h-8 text-green-500 animate-bounce" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Snippet Shared Successfully!
            </h3>
            <p className="text-gray-400 mb-4">Your code is now available for others to view and learn from.</p>
            
            <div className="bg-[#181825] border border-[#313244] rounded-lg p-4 mb-4 group hover:border-blue-500/50 transition-all duration-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-400">Share this link:</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={sharedUrl}
                  readOnly
                  className="flex-1 bg-transparent text-white text-sm px-2 py-1 rounded border border-[#313244] focus:outline-none group-hover:border-blue-500/50 transition-colors"
                />
                <button
                  onClick={() => copyToClipboard(sharedUrl)}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded hover:from-blue-600 hover:to-blue-700 text-sm transition-all duration-200 flex items-center gap-1 hover:scale-105"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>Public</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Just now</span>
              </div>
            </div>
            
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#313244] to-[#3c3c54] text-white rounded-lg hover:from-[#3c3c54] hover:to-[#45455c] transition-all duration-200 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className={`bg-gradient-to-br from-[#1e1e2e] to-[#181825] rounded-xl p-6 w-full max-w-md border border-[#313244] shadow-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 ${isAnimating ? 'animate-in zoom-in-95 slide-in-from-bottom-4' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <Share2 className="w-4 h-4 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Share Code Snippet
            </h2>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-300 hover:bg-[#313244] p-2 rounded-lg transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleShare} className="space-y-4">
          {/* Title with Smart Suggestions */}
          <div className="relative">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Title *
              <button
                type="button"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                Suggestions
              </button>
            </label>
            
            <input
              ref={titleInputRef}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-[#414155]"
              placeholder="Enter a descriptive title for your snippet"
              maxLength={100}
              required
            />
            
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">{title.length}/100</p>
              {title.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <Check className="w-3 h-3" />
                  <span>Good title!</span>
                </div>
              )}
            </div>

            {/* Smart Suggestions */}
            {showSuggestions && titleSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-[#181825] border border-[#313244] rounded-lg shadow-xl animate-in slide-in-from-top-2 duration-200">
                <div className="p-2">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Smart suggestions based on your code:
                  </p>
                  {titleSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-2 py-1 text-sm text-gray-300 hover:text-white hover:bg-[#313244] rounded transition-colors duration-150"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Code Preview */}
          <div className="bg-gradient-to-r from-[#181825] to-[#1a1a27] border border-[#313244] rounded-lg p-4 hover:border-[#414155] transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center">
                  <Code className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-sm text-gray-300">Language: </span>
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Ready to share</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="text-center p-2 bg-[#1e1e2e] rounded border border-[#313244] group-hover:border-[#414155] transition-colors">
                <div className="text-blue-400 font-medium">{codeStats.lines}</div>
                <div className="text-gray-500">Lines</div>
              </div>
              <div className="text-center p-2 bg-[#1e1e2e] rounded border border-[#313244] group-hover:border-[#414155] transition-colors">
                <div className="text-purple-400 font-medium">{codeStats.characters}</div>
                <div className="text-gray-500">Characters</div>
              </div>
              <div className="text-center p-2 bg-[#1e1e2e] rounded border border-[#313244] group-hover:border-[#414155] transition-colors">
                <div className="text-green-400 font-medium">{codeStats.words}</div>
                <div className="text-gray-500">Words</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-400 hover:text-gray-300 hover:bg-[#313244] rounded-lg transition-all duration-200 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing || !title.trim() || !code.trim()}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:hover:scale-100"
            >
              {isSharing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share Snippet
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="mt-4 pt-4 border-t border-[#313244]">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Public sharing</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>AI-powered suggestions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareSnippetDialog;