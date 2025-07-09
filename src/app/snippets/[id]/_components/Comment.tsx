import { Trash2Icon, UserIcon } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import CommentContent from "./CommentContent";

interface CommentProps {
  comment: {
    _id: Id<"snippetComments">;
    _creationTime: number;
    userId: string;
    userName: string;
    snippetId: Id<"snippets">;
    content: string;
  };
  onDelete: (commentId: Id<"snippetComments">) => void;
  isDeleting: boolean;
  currentUserId?: string;
}

function Comment({ comment, currentUserId, isDeleting, onDelete }: CommentProps) {
  return (
    <div className="group relative">
      {/* Animated Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/70 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
        
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-5 gap-4 relative z-10">
          <div className="flex items-center gap-4">
            {/* Enhanced Avatar */}
            <div className="relative">
              <div className="size-11 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/50 flex items-center justify-center shadow-lg">
                <UserIcon className="w-5 h-5 text-slate-300" />
              </div>
              {/* Avatar Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </div>
            
            {/* User Info */}
            <div className="min-w-0">
              <p className="text-sm font-semibold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent truncate">
                {comment.userName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1 h-1 rounded-full bg-slate-500 animate-pulse" />
                <p className="text-xs text-slate-400 font-medium">
                  {new Date(comment._creationTime).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Delete Button */}
          {comment.userId === currentUserId && (
            <div className="relative">
              <button
                onClick={() => onDelete(comment._id)}
                disabled={isDeleting}
                className={`
                  relative p-2.5 rounded-xl transition-all duration-300 group/btn
                  ${isDeleting 
                    ? "cursor-not-allowed opacity-60" 
                    : "opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/20"
                  }
                  border border-transparent backdrop-blur-sm
                `}
                title="Delete comment"
              >
                {/* Button Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                
                {isDeleting ? (
                  <div className="relative z-10">
                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                  </div>
                ) : (
                  <Trash2Icon className="relative z-10 w-4 h-4 text-red-400 group-hover/btn:text-red-300 transition-colors duration-200" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative z-10">
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <CommentContent content={comment.content} />
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}

export default Comment;