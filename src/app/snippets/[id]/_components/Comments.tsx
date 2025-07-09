import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquare } from "lucide-react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Comments({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const comments = useQuery(api.snippets.getComments, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await addComment({ snippetId, content });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Something went wrong while adding your comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingCommentId(commentId);
    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete the comment.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="bg-[#121218]/90 border border-[#ffffff0a] rounded-2xl overflow-hidden shadow-inner">
      {/* Header */}
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion <span className="text-sm text-gray-400">({comments.length})</span>
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 space-y-10">
        {user ? (
          <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} />
        ) : (
          <div className="bg-[#0a0a0f]/80 rounded-xl p-6 text-center border border-[#ffffff0a]">
            <p className="text-[#a0a0b0] mb-4">Sign in to join the discussion</p>
            <SignInButton mode="modal">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-6">
          {comments.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center">
              No comments yet. Be the first to start the discussion!
            </p>
          )}

          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={handleDeleteComment}
              isDeleting={deletingCommentId === comment._id}
              currentUserId={user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;
