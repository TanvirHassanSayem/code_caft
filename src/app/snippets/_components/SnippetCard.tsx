"use client";

import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/components/StarButton";

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSnippet({ snippetId: snippet._id });
    } catch (error) {
      console.error("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group relative"
    >
      <Link href={`/snippets/${snippet._id}`} className="block h-full">
        <div className="relative h-full bg-[#1e1e2e]/80 backdrop-blur-md rounded-2xl border border-[#313244]/40 hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 overflow-hidden">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur rounded-lg opacity-20 group-hover:opacity-30 transition" />
                  <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition">
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-6 h-6 object-contain"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium capitalize">
                    {snippet.language}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="size-3" />
                    {new Date(snippet._creationTime).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div
                className="absolute top-5 right-5 flex items-center gap-3 z-10"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />
                {user?.id === snippet.userId && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`flex items-center justify-center p-2 rounded-md transition-all text-sm ${
                      isDeleting
                        ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                        : "bg-gray-700/20 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                  >
                    {isDeleting ? (
                      <div className="size-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              {/* Title and Author */}
              <div>
                <h2 className="text-xl font-semibold text-white truncate mb-1 group-hover:text-blue-400 transition-colors">
                  {snippet.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-md bg-gray-700/40">
                      <User className="size-3" />
                    </div>
                    <span className="truncate max-w-[150px]">{snippet.userName}</span>
                  </div>
                </div>
              </div>

              {/* Code Preview */}
              <div className="relative group/code">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                <pre className="relative z-10 bg-black/20 border border-gray-700/30 rounded-lg p-4 overflow-hidden text-sm text-gray-300 font-mono line-clamp-3">
                  {snippet.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default SnippetCard;
