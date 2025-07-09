import { CodeIcon, SendIcon, EyeIcon, EditIcon } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import CommentContent from "./CommentContent";

interface CommentFormProps {
  onSubmit: (comment: string) => Promise<void>;
  isSubmitting: boolean;
}

function CommentForm({ isSubmitting, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(120, textarea.scrollHeight)}px`;
    }
  }, [comment]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newText = comment.substring(0, start) + "  " + comment.substring(end);
      setComment(newText);
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }

    // Submit with Cmd/Ctrl + Enter
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (comment.trim() && !isSubmitting) {
        handleSubmit(e as any);
      }
    }
  }, [comment, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    await onSubmit(comment);
    setComment("");
    setIsPreview(false);
  };

  const togglePreview = useCallback(() => {
    setIsPreview(!isPreview);
  }, [isPreview]);

  const hasContent = comment.trim().length > 0;
  const charCount = comment.length;
  const maxChars = 10000;

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div 
        className={`
          bg-gradient-to-br from-[#0a0a0f]/90 to-[#0f0f14]/90 
          backdrop-blur-xl rounded-2xl border transition-all duration-300 ease-out
          shadow-2xl shadow-black/20
          ${isFocused || isPreview 
            ? 'border-blue-500/30 shadow-blue-500/10' 
            : 'border-white/[0.08] hover:border-white/[0.12]'
          }
        `}
      >
        {/* Enhanced Toolbar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className={`w-2 h-2 rounded-full transition-colors ${
                hasContent ? 'bg-green-400' : 'bg-gray-600'
              }`} />
              <span className="font-medium">
                {hasContent ? 'Ready to post' : 'Start typing...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500 tabular-nums">
              {charCount}/{maxChars}
            </div>
            <button
              type="button"
              onClick={togglePreview}
              className={`
                flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-medium
                transition-all duration-200 ease-out
                ${isPreview
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                  : "hover:bg-white/[0.08] text-gray-300 border border-transparent hover:border-white/10"
                }
              `}
            >
              {isPreview ? (
                <>
                  <EditIcon className="w-4 h-4" />
                  Edit
                </>
              ) : (
                <>
                  <EyeIcon className="w-4 h-4" />
                  Preview
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative overflow-hidden">
          {isPreview ? (
            <div className="min-h-[120px] max-h-[400px] overflow-y-auto p-6 text-sm text-gray-200 font-mono">
              {hasContent ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <CommentContent content={comment} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-24">
                  <span className="text-gray-500 italic text-center">
                    Nothing to preview yet...<br />
                    <span className="text-xs">Start typing to see your formatted content</span>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Share your thoughts... (Markdown supported)"
              maxLength={maxChars}
              className={`
                w-full bg-transparent text-gray-100 placeholder:text-gray-500
                outline-none resize-none min-h-[120px] max-h-[400px] p-6
                font-mono text-sm leading-relaxed transition-all duration-200
                ${isFocused ? 'placeholder:text-gray-400' : ''}
              `}
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: '#374151 transparent'
              }}
            />
          )}

          {/* Subtle gradient overlay at bottom when scrollable */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#0a0a0f]/20 to-transparent pointer-events-none" />
        </div>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#080809]/80 to-[#0a0a0f]/80 border-t border-white/[0.06]">
          <div className="hidden sm:flex flex-col gap-2">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <CodeIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  Use <code className="px-1.5 py-0.5 bg-white/10 rounded text-blue-300 font-mono">```lang</code> for code blocks
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-4">
              <span>⌘/Ctrl + Enter to submit</span>
              <span>•</span>
              <span>Tab for indentation</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !hasContent}
            className={`
              flex items-center gap-3 px-6 py-3 rounded-xl font-semibold
              transition-all duration-300 ease-out transform
              ${hasContent && !isSubmitting
                ? `bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                   hover:from-blue-400 hover:to-blue-500 hover:scale-105 
                   hover:shadow-lg hover:shadow-blue-500/25 active:scale-95`
                : `bg-gray-700/50 text-gray-400 cursor-not-allowed`
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4" />
                <span>Publish Comment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Character limit warning */}
      {charCount > maxChars * 0.9 && (
        <div className="mt-2 text-xs text-amber-400 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
          <span>
            {charCount > maxChars * 0.95 
              ? `Approaching character limit (${maxChars - charCount} remaining)`
              : 'Getting close to character limit'
            }
          </span>
        </div>
      )}
    </form>
  );
}

export default CommentForm;