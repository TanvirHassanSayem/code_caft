"use client";
import { toast } from "react-hot-toast";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./_components/SnippetCard";
import React from "react";

// --- Custom Toast function ---
function showSnippetsCollectionToast() {
  toast.custom((t) => (
    <div
      className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        relative overflow-hidden
        flex items-center gap-4 px-6 py-4
        rounded-2xl shadow-xl border border-violet-300/50
        bg-gradient-to-br from-[#2a174e]/90 via-[#311b53]/90 to-[#1c2d54]/90
        backdrop-blur-[6px] text-white font-semibold
      `}
      style={{ minWidth: 280, maxWidth: 420 }}
    >
      {/* Glowing border accent */}
      <span className="absolute -left-2 -top-2 w-32 h-32 bg-gradient-to-tr from-purple-400 via-pink-500 to-blue-400 opacity-20 rounded-full blur-2xl z-0" />
      {/* Shimmer bar */}
      <span className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-pink-400 via-blue-400 to-purple-400 animate-pulse rounded-full z-10" />
      
      {/* Icon area with glowing effect */}
      <span className="z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-pink-600 to-violet-600 shadow-lg ring-2 ring-blue-400/40 animate-blob animate-duration-3">
        <span className="text-3xl drop-shadow-lg">📚</span>
      </span>

      {/* Content */}
      <div className="z-10 flex flex-col">
        <div className="text-base font-bold tracking-tight text-white drop-shadow-sm">
          Snippets Collection
        </div>
        <div className="text-xs sm:text-sm text-violet-100/90 mt-1 font-medium">
          Here are Full collection of Snippets, <span className="text-blue-200">find what you need</span>
        </div>
      </div>
    </div>
  ), { duration: 3600 });
}

// --- Animated Liquid Background Blobs ---
function AnimatedLiquidBlobs() {
  const blobColors = [
    "url(#liquidGradient1)",
    "url(#liquidGradient2)",
    "url(#liquidGradient3)",
  ];
  const blobs = [
    {
      initial: { x: 100, y: 50, scale: 1 },
      animate: {
        x: [100, 600, 300, 100],
        y: [50, 150, 250, 50],
        scale: [1, 1.2, 0.8, 1],
      },
      d: [
        "M60,300 Q100,200 250,250 Q300,280 200,320 Q120,340 60,300Z",
        "M80,320 Q130,210 250,230 Q280,250 200,330 Q130,370 80,320Z",
        "M70,280 Q120,200 220,250 Q290,280 200,310 Q120,340 70,280Z"
      ],
      color: blobColors[0],
      duration: 16,
      gradient: (
        <linearGradient id="liquidGradient1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="65%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      ),
    },
    {
      initial: { x: 600, y: 160, scale: 0.8 },
      animate: {
        x: [600, 150, 700, 600],
        y: [160, 120, 320, 160],
        scale: [0.8, 1, 1.1, 0.8],
      },
      d: [
        "M240,80 Q270,120 350,130 Q390,180 310,170 Q240,190 180,150 Q110,90 240,80Z",
        "M230,90 Q290,140 380,140 Q370,200 310,160 Q250,180 180,150 Q120,80 230,90Z",
        "M250,100 Q280,110 370,140 Q390,180 320,190 Q240,200 180,150 Q110,100 250,100Z"
      ],
      color: blobColors[1],
      duration: 19,
      gradient: (
        <linearGradient id="liquidGradient2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      ),
    },
    {
      initial: { x: 400, y: 400, scale: 1.1 },
      animate: {
        x: [400, 200, 500, 400],
        y: [400, 300, 200, 400],
        scale: [1.1, 0.7, 1.3, 1.1],
      },
      d: [
        "M340,370 Q390,360 370,450 Q320,480 260,430 Q200,410 240,370 Q310,300 340,370Z",
        "M350,390 Q410,400 390,470 Q340,490 270,440 Q210,410 240,370 Q320,320 350,390Z",
        "M340,370 Q400,360 370,430 Q320,490 260,440 Q190,410 240,370 Q300,320 340,370Z"
      ],
      color: blobColors[2],
      duration: 23,
      gradient: (
        <linearGradient id="liquidGradient3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="70%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      ),
    },
  ];

  return (
    <svg
      width="900"
      height="900"
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none select-none"
      style={{ opacity: 0.17, filter: "url(#gooey)" }}
    >
      <defs>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 24 -12"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        {blobs.map((b, idx) => React.cloneElement(b.gradient, { key: idx }))}
      </defs>
      {blobs.map((blob, idx) => (
        <motion.path
          key={idx}
          d={blob.d[0]}
          fill={blob.color}
          initial={blob.initial}
          animate={{
            ...blob.animate,
            d: blob.d,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: blob.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

export default function SnippetsPage() {
  const snippets = useQuery(api.snippets.getSnippets);
  const toastShown = useRef(false);

  useEffect(() => {
    if (snippets && !toastShown.current) {
      showSnippetsCollectionToast();
      toastShown.current = true;
    }
  }, [snippets]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") setTheme(stored as "light" | "dark");
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
      else setTheme("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const { languages, popularLanguages, filteredSnippets } = useMemo(() => {
    if (!snippets) return { languages: [], popularLanguages: [], filteredSnippets: [] };
    const langs = [...new Set(snippets.map((s) => s.language))];
    const popular = langs.slice(0, 5);
    const filtered = snippets.filter((snippet) => {
      const matchesSearch =
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = !selectedLanguage || snippet.language.toLowerCase() === selectedLanguage.toLowerCase();
      return matchesSearch && matchesLanguage;
    });
    return { languages: langs, popularLanguages: popular, filteredSnippets: filtered };
  }, [snippets, searchQuery, selectedLanguage]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);
  const handleLanguageToggle = useCallback((lang: string) => {
    setSelectedLanguage(prev => lang === prev ? null : lang);
  }, []);
  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedLanguage(null);
  }, []);
  const handleViewToggle = useCallback((newView: "grid" | "list") => {
    setView(newView);
  }, []);

  if (snippets === undefined) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1e1e2e]">
        <NavigationHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchLanguage={selectedLanguage}
          setSearchLanguage={setSelectedLanguage}
          theme={theme}
          setTheme={setTheme}
        />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#1e1e2e] text-black dark:text-white overflow-hidden">
      <AnimatedLiquidBlobs />
      <NavigationHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchLanguage={selectedLanguage}
        setSearchLanguage={setSelectedLanguage}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-xs sm:text-sm text-black dark:text-white font-bold mb-4 sm:mb-6"
          >
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            Community Code Library
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-transparent bg-clip-text mb-4 sm:mb-6 drop-shadow-sm leading-tight"
          >
            Discover & Share Code Snippets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 px-4"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-3 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search snippets by title, language, or author..."
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 backdrop-blur-md bg-[#fff]/70 dark:bg-[#1e1e2e]/70 hover:bg-[#fff]/90 dark:hover:bg-[#1e1e2e]/90 text-black dark:text-white
                  rounded-xl border border-[#ccc] dark:border-[#313244] hover:border-[#888] dark:hover:border-[#515167] transition-all duration-300
                  placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.25)]
                  text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#fff] dark:bg-[#1e1e2e] rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shrink-0">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Languages:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-center gap-2 sm:gap-3 min-w-max">
                {popularLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageToggle(lang)}
                    className={`group relative px-2 sm:px-3 py-1.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md shrink-0 ${
                      selectedLanguage === lang
                        ? "text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 ring-2 ring-blue-500/50"
                        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white bg-[#fff] dark:bg-[#1e1e2e] hover:bg-[#f3f3f7] dark:hover:bg-[#2a2a3d] ring-1 ring-gray-300 dark:ring-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm">{lang}</span>
                    </div>
                  </button>
                ))}
                {selectedLanguage && (
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:ml-auto">
              <span className="text-xs sm:text-sm text-gray-500">
                {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? "s" : ""} found
              </span>
              <div className="flex items-center gap-1 p-1 bg-[#fff] dark:bg-[#1e1e2e] rounded-lg ring-1 ring-gray-200 dark:ring-gray-800">
                <button
                  onClick={() => handleViewToggle("grid")}
                  className={`p-1.5 sm:p-2 rounded-md transition-all ${
                    view === "grid"
                      ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 ring-1 ring-blue-400 shadow-inner"
                      : "text-gray-400 hover:text-black dark:hover:text-white hover:bg-[#f3f3f7] dark:hover:bg-[#2a2a3d]"
                  }`}
                >
                  <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => handleViewToggle("list")}
                  className={`p-1.5 sm:p-2 rounded-md transition-all ${
                    view === "list"
                      ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 ring-1 ring-blue-400 shadow-inner"
                      : "text-gray-400 hover:text-black dark:hover:text-white hover:bg-[#f3f3f7] dark:hover:bg-[#2a2a3d]"
                  }`}
                >
                  <Layers className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          layout
          className={`grid gap-4 sm:gap-6 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}
          transition={{ layout: { duration: 0.4, type: "spring" } }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredSnippets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-md mx-auto mt-16 sm:mt-20 p-6 sm:p-8 rounded-2xl overflow-hidden"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-2 ring-blue-500/30 mb-4 sm:mb-6 animate-pulse">
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-2 sm:mb-3">No snippets found</h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 px-2">
                {searchQuery || selectedLanguage
                  ? "Try adjusting your search query or filters"
                  : "Be the first to share a code snippet with the community"}
              </p>
              {(searchQuery || selectedLanguage) && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#eee] dark:bg-[#262637] text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white rounded-lg transition-colors text-sm sm:text-base"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
