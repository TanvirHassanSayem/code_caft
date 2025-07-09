import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { isSignedIn } = useAuth();
  
  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const star = useMutation(api.snippets.starSnippet);
  
  const handleStar = async () => {
    if (!isSignedIn) return;
    await star({ snippetId });
  };
  
  return (
    <button
      className={`
        group relative flex items-center gap-2 px-4 py-2 rounded-full
        font-medium text-sm transition-all duration-300 ease-out
        transform hover:scale-105 active:scale-95
        border border-transparent
        shadow-sm hover:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          isStarred
            ? `bg-gradient-to-r from-yellow-400/20 to-amber-400/20 
               text-yellow-600 border-yellow-300/30
               hover:from-yellow-400/30 hover:to-amber-400/30
               hover:border-yellow-400/50 hover:text-yellow-700
               dark:text-yellow-400 dark:hover:text-yellow-300`
            : `bg-gray-100/80 text-gray-600 border-gray-200/50
               hover:bg-gray-200/80 hover:border-gray-300/50
               hover:text-gray-700
               dark:bg-gray-800/80 dark:text-gray-400 dark:border-gray-700/50
               dark:hover:bg-gray-700/80 dark:hover:text-gray-300`
        }
      `}
      onClick={handleStar}
      disabled={!isSignedIn}
      aria-label={isStarred ? "Remove star" : "Add star"}
    >
      {/* Star icon with enhanced animations */}
      <Star
        className={`
          w-4 h-4 transition-all duration-300 ease-out
          ${
            isStarred
              ? `fill-yellow-500 text-yellow-500 
                 drop-shadow-sm animate-pulse
                 group-hover:fill-yellow-400 group-hover:text-yellow-400`
              : `fill-none text-gray-500 
                 group-hover:fill-gray-400 group-hover:text-gray-400
                 group-hover:drop-shadow-sm
                 dark:text-gray-400 dark:group-hover:text-gray-300`
          }
        `}
      />
      
      {/* Star count with better typography */}
      <span
        className={`
          font-semibold tabular-nums transition-colors duration-300
          ${
            isStarred
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-gray-600 dark:text-gray-400"
          }
        `}
      >
        {starCount?.toLocaleString() || "0"}
      </span>
      
      {/* Subtle glow effect for starred state */}
      {isStarred && (
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white/30 scale-0 group-active:scale-100 transition-transform duration-150 opacity-0 group-active:opacity-100" />
    </button>
  );
}

export default StarButton;