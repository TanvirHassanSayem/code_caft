"use client";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
import NavigationHeader from "@/components/NavigationHeader";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileHeaderSkeleton from "./_components/ProfileHeaderSkeleton";
import { User } from 'lucide-react';
import {
  ChevronRight,
  Code,
  ListVideo,
  Loader2,
  Star,
  Trophy,
  TrendingUp,
  Calendar,
  Search,
  Download,
  Share,
  Eye,
  Heart,
  GitBranch,
  Zap,
  Target,
  Award,
  Activity,
  BarChart3,
  Users,
  Flame,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import StarButton from "@/components/StarButton";
import { useMediaQuery } from "@/hooks/use-media-query";

// --- Interfaces and constants ---
interface ExecutionWithViews {
  _id: string;
  _creationTime: number;
  userId: string;
  code: string;
  language: string;
  output?: string;
  error?: string;
  views?: number;
}

interface SnippetWithLikes {
  _id: string;
  _creationTime: number;
  title: string;
  code: string;
  language: string;
  userName: string;
  likes?: number;
}

interface UserStatsExtended {
  totalExecutions: number;
  languagesCount: number;
  languages: string[];
  last24Hours: number;
  favoriteLanguage: string;
  languageStats: Record<string, number>;
  mostStarredLanguage: string;
  currentStreak?: number;
  successfulExecutions?: number;
  languagesUsed?: number;
}

const TABS = [
  { id: "executions", label: "Executions", icon: ListVideo, color: "blue", description: "Your coding history" },
  { id: "starred", label: "Starred", icon: Star, color: "yellow", description: "Favorite snippets" },
  { id: "achievements", label: "Achievements", icon: Trophy, color: "purple", description: "Milestones" },
  { id: "analytics", label: "Analytics", icon: BarChart3, color: "green", description: "Insights" },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "javascript", label: "JS" },
  { id: "python", label: "Python" },
  { id: "typescript", label: "TS" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

const ACHIEVEMENTS = [
  {
    id: "first-execution",
    title: "First Steps",
    description: "Executed your first code snippet",
    icon: Zap,
    color: "blue",
    unlocked: true,
    progress: 100,
    rarity: "Common"
  },
  {
    id: "streak-7",
    title: "Weekly Warrior",
    description: "Coded for 7 days in a row",
    icon: Flame,
    color: "orange",
    unlocked: true,
    progress: 100,
    rarity: "Rare"
  },
  {
    id: "multi-language",
    title: "Polyglot",
    description: "Used 5 different programming languages",
    icon: Users,
    color: "purple",
    unlocked: false,
    progress: 60,
    rarity: "Epic"
  },
  {
    id: "perfectionist",
    title: "Zero Errors",
    description: "50 consecutive successful executions",
    icon: Target,
    color: "green",
    unlocked: false,
    progress: 30,
    rarity: "Legendary"
  },
];

// --- Component starts here ---
export default function ProfilePage() {
  // THEME SUPPORT FOR HEADER!
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

  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"executions" | "starred" | "achievements" | "analytics">("executions");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "language">("recent");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isSmallMobile = useMediaQuery("(max-width: 480px)");

  // 🟢 Run Convex only when user is loaded!
  const userStats = useQuery(api.codeExecutions.getUserStats, user?.id ? { userId: user.id } : "skip") as UserStatsExtended | undefined;
  const starredSnippets = useQuery(api.snippets.getStarredSnippets) as SnippetWithLikes[] | undefined;
  const {
    results: executions = [],
    status: executionStatus,
    isLoading: isLoadingExecutions,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserExecutions,
    user?.id ? { userId: user.id } : "skip",
    { initialNumItems: 5 }
  );
  const userData = useQuery(api.users.getUser, user?.id ? { userId: user.id } : "skip");

  useEffect(() => {
    if (isLoaded && !user) router.push("/");
  }, [isLoaded, user, router]);

  const filteredExecutions = useMemo(() => {
    if (!executions) return [];
    const executionsWithViews = executions as ExecutionWithViews[];
    let filtered = executionsWithViews.filter(execution => {
      const matchesSearch = execution.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        execution.language.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === "all" || execution.language === selectedFilter;
      return matchesSearch && matchesFilter;
    });
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => (b._creationTime ?? 0) - (a._creationTime ?? 0));
        break;
      case "popular":
        filtered.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
        break;
      case "language":
        filtered.sort((a, b) => (a.language ?? "").localeCompare(b.language ?? ""));
        break;
      default:
        break;
    }
    return filtered;
  }, [executions, searchTerm, selectedFilter, sortBy]);

  const handleLoadMore = () => {
    if (executionStatus === "CanLoadMore") loadMore(5);
  };

  const handleShare = (execution: ExecutionWithViews) => {
    navigator.clipboard.writeText(execution.code);
  };

  const handleDownload = (execution: ExecutionWithViews) => {
    const blob = new Blob([execution.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${execution.language}-snippet.${execution.language === 'javascript' ? 'js' : execution.language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e293b] to-[#181b29]">
      <NavigationHeader theme={theme} setTheme={setTheme} />

      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8">
        {/* Profile Header */}
        {userStats && userData && (
          <div className="relative">
            <ProfileHeader userStats={userStats} userData={userData} user={user!} />
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-4 sm:mt-6">
              {/* Executions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-tr from-blue-600/80 via-blue-500/60 to-purple-500/70 rounded-xl p-4 border border-blue-500/30 shadow-blue-900/30 shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-100/80">Executions</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{userStats.totalExecutions}</p>
                  </div>
                  <Code className="w-7 h-7 text-blue-200" />
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-300 mr-1" />
                  <span className="text-xs text-green-200">+12%</span>
                </div>
              </motion.div>
              {/* Success */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-tr from-emerald-600/80 via-emerald-500/60 to-green-500/70 rounded-xl p-4 border border-emerald-500/30 shadow-emerald-900/20 shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-emerald-100/80">Success</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">
                      {userStats.successfulExecutions && userStats.totalExecutions
                        ? Math.round((userStats.successfulExecutions / userStats.totalExecutions) * 100)
                        : 95
                      }%
                    </p>
                  </div>
                  <Target className="w-7 h-7 text-emerald-200" />
                </div>
                <div className="flex items-center mt-2">
                  <Activity className="w-4 h-4 text-emerald-200 mr-1" />
                  <span className="text-xs text-emerald-100">Excellent</span>
                </div>
              </motion.div>
              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-tr from-purple-600/80 via-pink-500/70 to-purple-500/60 rounded-xl p-4 border border-purple-500/30 shadow-pink-900/20 shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-100/80">Languages</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{userStats.languagesUsed || userStats.languagesCount || 3}</p>
                  </div>
                  <Users className="w-7 h-7 text-purple-200" />
                </div>
                <div className="flex items-center mt-2">
                  <GitBranch className="w-4 h-4 text-purple-200 mr-1" />
                  <span className="text-xs text-purple-100">Polyglot</span>
                </div>
              </motion.div>
              {/* Streak */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-tr from-orange-600/80 via-red-500/60 to-yellow-500/60 rounded-xl p-4 border border-orange-500/30 shadow-orange-900/30 shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-orange-100/80">Streak</p>
                    <p className="text-lg sm:text-2xl font-bold text-white">{userStats.currentStreak ?? 5}</p>
                  </div>
                  <Flame className="w-7 h-7 text-orange-200" />
                </div>
                <div className="flex items-center mt-2">
                  <Calendar className="w-4 h-4 text-orange-200 mr-1" />
                  <span className="text-xs text-orange-100">days</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}
        {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}

        {/* Main Card */}
        <div className="bg-gradient-to-br from-[#23284a]/80 via-[#24294a]/90 to-[#181b29]/80 rounded-2xl lg:rounded-3xl shadow-2xl border border-[#233] backdrop-blur-2xl overflow-hidden mt-6 sm:mt-8">
          {/* MOBILE TABS */}
          {isMobile && (
            <div className="relative">
              <div className="p-3 xs:p-4 border-b border-gray-700/50 bg-black/20 flex justify-between items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/30 border border-gray-700/50 text-gray-100 hover:bg-black/40 transition"
                >
                  {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                  <span className="text-sm font-medium">{TABS.find(t => t.id === activeTab)?.label}</span>
                </button>
              </div>
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-gray-700/50 bg-[#22274a]/90 backdrop-blur-sm"
                  >
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 p-3 xs:p-4">
                      {TABS.map((tab) => (
                        <motion.button
                          key={tab.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setMobileMenuOpen(false);
                          }}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all
                            ${activeTab === tab.id
                              ? `text-white bg-gradient-to-r from-${tab.color}-500/40 to-${tab.color}-400/40 border border-${tab.color}-400/70`
                              : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                            }`}
                        >
                          <tab.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{tab.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* DESKTOP TABS */}
          {!isMobile && (
            <div className="border-b border-gray-700/50 bg-black/20">
              <div className="flex flex-wrap gap-2 p-4 sm:p-6">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`group flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                      ${activeTab === tab.id
                        ? `text-white bg-gradient-to-r from-${tab.color}-500/40 to-${tab.color}-400/40 border border-${tab.color}-400/70`
                        : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                      }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r from-${tab.color}-500/20 to-${tab.color}-400/20 rounded-xl border border-${tab.color}-400/30`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <tab.icon className="w-5 h-5 relative z-10" />
                    <div className="relative z-10">
                      <span className="text-base font-semibold">{tab.label}</span>
                      {!isTablet && (
                        <p className="text-xs opacity-70 hidden lg:block">{tab.description}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH/FILTER BARS */}
          {(activeTab === "executions" || activeTab === "starred") && (
            <div className="p-3 xs:p-4 sm:p-6 border-b border-gray-700/50 bg-black/10">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-stretch sm:items-center justify-between">
                <div className="w-full sm:flex-1 sm:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search code..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-black/30 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="flex-1 sm:flex-none sm:w-auto px-3 py-2 bg-black/30 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  >
                    {FILTERS.map((filter) => (
                      <option key={filter.id} value={filter.id}>{filter.label}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="flex-1 sm:flex-none sm:w-auto px-3 py-2 bg-black/30 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  >
                    <option value="recent">Recent</option>
                    <option value="popular">Popular</option>
                    <option value="language">Language</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-3 xs:p-4 sm:p-6"
            >
              {/* EXECUTIONS TAB */}
              {activeTab === "executions" && (
                <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                  {filteredExecutions?.map((execution, index) => (
                    <motion.div
                      key={execution._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 border border-gray-700/60 hover:border-blue-500/50 bg-gradient-to-tr from-[#1a1f3c]/80 to-[#2e3361]/80"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6">
                        <div className="flex items-center gap-4 mb-2 sm:mb-0 flex-1">
                          <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
                            <Image
                              src={"/" + execution.language + ".png"}
                              alt=""
                              className="rounded-lg relative z-10 object-cover ring-2 ring-white/10"
                              width={isSmallMobile ? 32 : 40}
                              height={isSmallMobile ? 32 : 40}
                            />
                          </div>
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-sm font-semibold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {execution.language.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-400 truncate">
                                {new Date(execution._creationTime).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  execution.error
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                                }`}
                              >
                                {execution.error ? "Error" : "Success"}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Eye className="w-3 h-3" />
                                <span>{execution.views ?? 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => handleShare(execution)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                          >
                            <Share className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(execution)}
                            className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 bg-black/30">
                        <div className="bg-black/50 rounded-lg p-4 overflow-hidden border border-gray-700/30">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-gray-400 font-medium">{execution.language.toUpperCase()}</span>
                            <button
                              onClick={() => navigator.clipboard.writeText(execution.code)}
                              className="text-xs text-gray-400 hover:text-white transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                          <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                            <code>{execution.code.length > (isSmallMobile ? 100 : 200) ? execution.code.substring(0, isSmallMobile ? 100 : 200) + '...' : execution.code}</code>
                          </pre>
                        </div>
                        {(execution.output || execution.error) && (
                          <div className="mt-4 p-4 rounded-lg bg-black/50 border border-gray-700/30">
                            <div className="flex items-center gap-2 mb-3">
                              <h4 className="text-sm font-semibold text-gray-300">Output</h4>
                              {!execution.error && (
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                  Success
                                </span>
                              )}
                            </div>
                            <pre
                              className={`text-sm font-mono overflow-x-auto ${execution.error ? "text-red-400" : "text-green-400"}`}
                            >
                              {execution.error || execution.output}
                            </pre>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoadingExecutions && (
                    <div className="text-center py-12 sm:py-16">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500/30 rounded-full animate-pulse" />
                        </div>
                        <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto animate-spin" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mt-4 sm:mt-6 mb-2">
                        Loading your code executions...
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500">Fetching your latest coding adventures</p>
                    </div>
                  )}
                  {!isLoadingExecutions && filteredExecutions.length === 0 && (
                    <div className="text-center py-12 sm:py-16">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                        </div>
                        <Code className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto relative z-10" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-2">
                        {searchTerm || selectedFilter !== "all" ? "No matching executions found" : "No code executions yet"}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 mb-6">
                        {searchTerm || selectedFilter !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "Start coding to see your execution history and track your progress!"}
                      </p>
                      {(!searchTerm && selectedFilter === "all") && (
                        <Link href="/code-editor" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-fuchsia-600 transition">
                          <Code className="w-5 h-5" />
                          Start Coding
                        </Link>
                      )}
                    </div>
                  )}
                  {executionStatus === "CanLoadMore" && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleLoadMore}
                        className="group px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-300 rounded-xl flex items-center gap-3 transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 text-base"
                      >
                        <span className="font-medium">Load More</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STARRED TAB */}
              {activeTab === "starred" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {starredSnippets?.map((snippet, index) => (
                    <motion.div
                      key={snippet._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <Link href={`/snippets/${snippet._id}`}>
                        <div className="bg-gradient-to-br from-yellow-600/20 via-yellow-500/20 to-orange-500/10 rounded-xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-300 overflow-hidden h-full group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-yellow-500/20">
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
                                  <Image
                                    src={`/${snippet.language}.png`}
                                    alt={`${snippet.language} logo`}
                                    className="relative z-10 rounded-lg ring-2 ring-white/10"
                                    width={36}
                                    height={36}
                                  />
                                </div>
                                <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-lg text-sm font-medium border border-yellow-500/30">
                                  {snippet.language}
                                </span>
                              </div>
                              <div
                                className="absolute top-6 right-6 z-10"
                                onClick={(e) => e.preventDefault()}
                              >
                                <StarButton snippetId={snippet._id as Id<"snippets">} />
                              </div>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-yellow-400 transition-colors">
                              {snippet.title}
                            </h2>
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(snippet._creationTime).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-red-400" />
                                <span>{(snippet as any).likes ?? 0}</span>
                              </div>
                            </div>
                          </div>
                          <div className="px-6 pb-6">
                            <div className="bg-black/50 rounded-lg p-4 overflow-hidden border border-gray-700/30">
                              <pre className="text-sm text-gray-300 font-mono line-clamp-4">
                                {snippet.code}
                              </pre>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  <span>{snippet.userName}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span>Starred</span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transform group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {(!starredSnippets || starredSnippets.length === 0) && (
                    <div className="col-span-full text-center py-12 sm:py-16">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl" />
                        </div>
                        <Star className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600 mx-auto relative z-10" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">
                        No starred snippets yet
                      </h3>
                      <p className="text-base text-gray-500 mb-6">
                        Start exploring and star the snippets you find amazing!
                      </p>
                      <Link href="/explore" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium hover:from-yellow-600 hover:to-orange-600 transition-all text-base">
                        <Star className="w-5 h-5" />
                        Explore Snippets
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* ACHIEVEMENTS TAB */}
              {activeTab === "achievements" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Your Coding Journey</h2>
                    <p className="text-base text-gray-400">Track your progress and unlock new achievements</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {ACHIEVEMENTS.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative p-6 rounded-xl border transition-all duration-300 ${
                          achievement.unlocked
                            ? `bg-gradient-to-r from-${achievement.color}-500/20 to-${achievement.color}-600/20 border-${achievement.color}-500/50 hover:border-${achievement.color}-400/70`
                            : "bg-black/30 border-gray-700/50 hover:border-gray-600/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${achievement.unlocked
                            ? `bg-${achievement.color}-500/20 text-${achievement.color}-400`
                            : "bg-gray-700/30 text-gray-500"
                          }`}>
                            <achievement.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className={`text-base font-bold ${achievement.unlocked ? "text-white" : "text-gray-400"
                                }`}>{achievement.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${achievement.rarity === "Common" ? "bg-gray-500/20 text-gray-400" :
                                  achievement.rarity === "Rare" ? "bg-blue-500/20 text-blue-400" :
                                    achievement.rarity === "Epic" ? "bg-purple-500/20 text-purple-400" :
                                      "bg-yellow-500/20 text-yellow-400"
                                }`}>
                                {achievement.rarity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Progress</span>
                                <span className={achievement.unlocked ? "text-green-400" : "text-gray-400"}>
                                  {achievement.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-800/50 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-500 ${achievement.unlocked
                                      ? `bg-gradient-to-r from-${achievement.color}-500 to-${achievement.color}-400`
                                      : "bg-gray-600"
                                    }`}
                                  style={{ width: `${achievement.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {achievement.unlocked && (
                          <div className="absolute top-4 right-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ANALYTICS TAB */}
              {activeTab === "analytics" && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Performance Analytics</h2>
                    <p className="text-base text-gray-400">Insights into your coding patterns and growth</p>
                  </div>
                  {/* Language Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-black/20 rounded-xl p-6 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        Language Distribution
                      </h3>
                      <div className="space-y-3">
                        {[{ name: "JavaScript", percentage: 45, color: "yellow" },
                          { name: "Python", percentage: 30, color: "blue" },
                          { name: "TypeScript", percentage: 15, color: "purple" },
                          { name: "Java", percentage: 10, color: "red" }].map((lang) => (
                          <div key={lang.name} className="flex items-center gap-3">
                            <div className="w-16 text-sm text-gray-400">{lang.name}</div>
                            <div className="flex-1 bg-gray-800/50 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-gradient-to-r from-${lang.color}-500 to-${lang.color}-400`}
                                style={{ width: `${lang.percentage}%` }}
                              />
                            </div>
                            <div className="w-12 text-sm text-gray-400 text-right">{lang.percentage}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-6 border border-gray-700/50">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-400" />
                        Weekly Activity
                      </h3>
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                          <div key={day + i} className="text-center">
                            <div className="text-sm text-gray-400 mb-2">{day}</div>
                            <div
                              className={`w-8 h-8 rounded-lg mx-auto ${i < 5 ? "bg-green-500/30" : "bg-gray-700/30"
                                }`}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 text-center">
                        Great consistency this week! 🔥
                      </p>
                    </div>
                  </div>
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Zap className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Avg. Time</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">1.2s</div>
                      <div className="text-sm text-green-400">↓ 15% faster</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <Target className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Quality</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">92%</div>
                      <div className="text-sm text-green-400">↑ 8% better</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Award className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-base font-semibold text-white">Complexity</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">7.8/10</div>
                      <div className="text-sm text-purple-400">Advanced</div>
                    </div>
                  </div>
                  {/* Recent Trends */}
                  <div className="bg-black/20 rounded-xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      Recent Trends
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-300">Most Used Features</h4>
                        {[{ feature: "Code Execution", usage: "85%" },
                          { feature: "Syntax Highlighting", usage: "78%" },
                          { feature: "Auto-completion", usage: "65%" },
                          { feature: "Error Detection", usage: "52%" },].map((item) => (
                          <div key={item.feature} className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{item.feature}</span>
                            <span className="text-blue-400">{item.usage}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-300">Growth Areas</h4>
                        {[{ area: "Algorithm Complexity", growth: "+23%" },
                          { area: "Code Documentation", growth: "+18%" },
                          { area: "Testing Coverage", growth: "+15%" },
                          { area: "Performance Optimization", growth: "+12%" },].map((item) => (
                          <div key={item.area} className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{item.area}</span>
                            <span className="text-green-400">{item.growth}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
