"use client";

import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User, Code2, Sparkles, Zap, Eye } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/components/StarButton";

function SnippetCard({ snippet }: { snippet: Snippet }) {
  const { user } = useUser();
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await deleteSnippet({ snippetId: snippet._id });
      toast.success("Snippet deleted successfully");
    } catch (error) {
      console.error("Error deleting snippet:", error);
      toast.error("Error deleting snippet");
    } finally {
      setIsDeleting(false);
    }
  }, [deleteSnippet, snippet._id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      whileHover="hover"
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="group relative perspective-1000 w-full h-full"
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl opacity-0 blur-lg sm:blur-xl group-hover:opacity-20 sm:group-hover:opacity-30 transition-all duration-700"
        variants={{
          hover: { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] },
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-40 sm:group-hover:opacity-60"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + Math.sin(i) * 30}%`,
            }}
            variants={{
              hover: {
                y: [-15, -25, -15],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              },
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Link href={`/snippets/${snippet._id}`} className="block h-full">
        <motion.div
          className="relative h-full bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-700/50 group-hover:border-cyan-500/50 transition-all duration-500 shadow-xl sm:shadow-2xl group-hover:shadow-cyan-500/20 overflow-hidden min-h-[280px] sm:min-h-[320px]"
          whileHover="hover"
          variants={{}}
        >
          {/* Animated Top Border */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100"
            variants={{
              hover: { scaleX: [0, 1, 0] },
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Holographic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />

          {/* Scanline Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-20 opacity-0 group-hover:opacity-100"
            variants={{
              hover: { y: ["-100%", "500%"] },
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative p-4 sm:p-6 lg:p-8 z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <motion.div
                  className="relative flex-shrink-0"
                  whileHover={{ scale: [1, 1.1, 1.2], rotate: [0, 180, 360] }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                >
                  {/* Rotating Ring */}
                  <motion.div
                    className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 border-2 border-cyan-500/30 rounded-full opacity-0 group-hover:opacity-100"
                    variants={{ hover: { rotate: 360 } }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Pulsing Core */}
                  <motion.div
                    className="relative p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 group-hover:from-cyan-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40 transition-all duration-500"
                    variants={{
                      hover: {
                        boxShadow: [
                          "0 0 0px rgba(6, 182, 212, 0)",
                          "0 0 15px rgba(6, 182, 212, 0.3)",
                          "0 0 0px rgba(6, 182, 212, 0)",
                        ],
                      },
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Image
                      src={`/${snippet.language}.png`}
                      alt={`${snippet.language} logo`}
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain drop-shadow-lg"
                      width={32}
                      height={32}
                      loading="lazy"
                    />
                  </motion.div>
                  {/* Sparkle Effects */}
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 text-cyan-400 opacity-0 group-hover:opacity-100"
                    variants={{
                      hover: { scale: [0, 1.2, 0], rotate: [0, 180, 360] },
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </motion.div>
                <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-0">
                  <motion.span
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-lg sm:rounded-full text-xs sm:text-sm font-bold capitalize border border-cyan-500/30 group-hover:border-cyan-400/60 transition-all duration-300 truncate"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Code2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span className="truncate">{snippet.language}</span>
                    <motion.div
                      className="w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.span>
                  <motion.div
                    className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400 group-hover:text-cyan-300 transition-colors duration-300"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1, x: [0, 3, 5] }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="flex-shrink-0"
                    >
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.div>
                    <span className="truncate text-xs sm:text-sm">
                      {new Date(snippet._creationTime).toLocaleDateString()}
                    </span>
                  </motion.div>
                </div>
              </div>
              {/* Enhanced Action Buttons */}
              <motion.div
                className="flex items-center gap-2 sm:gap-3 z-20 flex-shrink-0 ml-2"
                onClick={(e) => e.preventDefault()}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StarButton snippetId={snippet._id} />
                {user?.id === snippet.userId && (
                  <motion.button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`group/btn relative overflow-hidden flex items-center justify-center p-2 sm:p-2.5 lg:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                      isDeleting
                        ? "bg-red-500/30 text-red-300 cursor-not-allowed"
                        : "bg-slate-700/30 text-slate-400 hover:text-red-400 hover:bg-red-500/20 border border-slate-600/30 hover:border-red-500/50"
                    }`}
                    whileHover={
                      !isDeleting
                        ? { scale: [1, 1.05, 1.1], rotate: [0, -3, 3, 0] }
                        : {}
                    }
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Button Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                      variants={{
                        hover: { scale: [1, 1.1, 1] },
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {isDeleting ? (
                      <motion.div
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-400/30 border-t-red-400 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    )}
                  </motion.button>
                )}
              </motion.div>
            </div>
            {/* Enhanced Content */}
            <motion.div
              className="space-y-4 sm:space-y-6 flex-1 flex flex-col"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {/* Title and Author */}
              <div className="flex-shrink-0">
                <motion.h2
                  className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent truncate mb-2 sm:mb-3 group-hover:from-cyan-300 group-hover:via-white group-hover:to-purple-300 transition-all duration-500"
                  whileHover={{ scale: [1, 1.01, 1.02], x: [0, 3, 5] }}
                >
                  {snippet.title}
                </motion.h2>
                <motion.div
                  className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400 group-hover:text-cyan-300 transition-colors duration-300"
                  whileHover={{ x: [0, 5, 10] }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <motion.div
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-700/50 group-hover:bg-cyan-500/20 transition-all duration-300 flex-shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.div>
                    <span className="truncate max-w-[120px] sm:max-w-[150px] lg:max-w-[200px] font-medium">
                      {snippet.userName}
                    </span>
                  </div>
                </motion.div>
              </div>
              {/* Enhanced Code Preview */}
              <motion.div
                className="relative group/code flex-1 flex flex-col"
                whileHover={{ scale: [1, 1.01, 1.02] }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl opacity-0 group-hover/code:opacity-20 sm:group-hover/code:opacity-30 blur-sm"
                  variants={{
                    hover: { rotate: [0, 360] },
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Code Container */}
                <motion.div
                  className="relative bg-black/40 border border-slate-700/50 group-hover/code:border-cyan-500/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 overflow-hidden backdrop-blur-sm flex-1 flex flex-col min-h-0"
                  whileHover={{
                    boxShadow: [
                      "inset 0 0 10px rgba(6, 182, 212, 0.05)",
                      "inset 0 0 20px rgba(6, 182, 212, 0.1)",
                    ],
                  }}
                >
                  {/* Code Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover/code:opacity-100 transition-all duration-500" />
                  {/* View Icon */}
                  <motion.div
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-cyan-400 opacity-0 group-hover/code:opacity-100"
                    variants={{
                      hover: {
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0],
                      },
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                  <div className="relative z-10 flex-1 min-h-0 overflow-hidden">
                    <pre className="text-xs sm:text-sm text-slate-300 font-mono group-hover/code:text-cyan-100 transition-colors duration-300 leading-relaxed overflow-hidden line-clamp-3 sm:line-clamp-4 whitespace-pre-wrap break-words">
                      {snippet.code}
                    </pre>
                  </div>
                  {/* Typing Indicator */}
                  <motion.div
                    className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 w-1.5 h-3 sm:w-2 sm:h-4 bg-cyan-400 opacity-0 group-hover/code:opacity-70"
                    variants={{
                      hover: {
                        opacity: [0, 0.7, 0],
                      },
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            {/* Interactive Lightning Effect */}
            <motion.div
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-cyan-400 opacity-0 group-hover:opacity-40 sm:group-hover:opacity-60"
              variants={{
                hover: {
                  y: [-5, 5, -5],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                },
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default SnippetCard;
