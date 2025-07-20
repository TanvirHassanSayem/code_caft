"use client";

import HeaderProfileBtn from "@/app/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import {
  Blocks,
  Code2,
  Play,
  BookOpen,
  Users,
  Crown,
  ChevronDown,
  Globe,
  Settings,
  ExternalLink,
  FileText,
  Filter,
  Github,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Search,
  Bell,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type NavigationHeaderProps = {
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  searchLanguage?: string | null;
  setSearchLanguage?: (val: string) => void;
  theme: "dark" | "light";
  setTheme: (val: "dark" | "light") => void;
};

function NavigationHeader({
  searchQuery,
  setSearchQuery,
  searchLanguage,
  setSearchLanguage,
  theme,
  setTheme,
}: NavigationHeaderProps) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const programmingLanguages = [
    { name: "JavaScript", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "🟨" },
    { name: "Python", docs: "https://docs.python.org/3/", icon: "🐍" },
    { name: "React", docs: "https://react.dev/", icon: "⚛️" },
    { name: "TypeScript", docs: "https://www.typescriptlang.org/docs/", icon: "🔷" },
    { name: "Node.js", docs: "https://nodejs.org/en/docs/", icon: "🟢" },
    { name: "Java", docs: "https://docs.oracle.com/en/java/", icon: "☕" },
    { name: "C++", docs: "https://en.cppreference.com/w/", icon: "🔧" },
    { name: "Go", docs: "https://golang.org/doc/", icon: "🐹" },
    { name: "Rust", docs: "https://doc.rust-lang.org/", icon: "🦀" },
    { name: "PHP", docs: "https://www.php.net/docs.php", icon: "🐘" },
    { name: "Swift", docs: "https://swift.org/documentation/", icon: "🍎" },
    { name: "Kotlin", docs: "https://kotlinlang.org/docs/", icon: "🎯" }
  ];
  const communityLinks = [
    { name: "Stack Overflow", url: "https://stackoverflow.com/", icon: "🟠", description: "Q&A for developers" },
    { name: "GitHub", url: "https://github.com/", icon: "🐙", description: "Code repositories" },
    { name: "Reddit r/programming", url: "https://reddit.com/r/programming", icon: "🔴", description: "Programming discussions" },
    { name: "Dev.to", url: "https://dev.to/", icon: "💎", description: "Developer community" },
    { name: "HackerNews", url: "https://news.ycombinator.com/", icon: "🟧", description: "Tech news & discussions" },
    { name: "Discord Communities", url: "https://discord.com/", icon: "💬", description: "Real-time chat" },
    { name: "Hashnode", url: "https://hashnode.com/", icon: "📝", description: "Developer blogs" },
    { name: "CodePen", url: "https://codepen.io/", icon: "🖊️", description: "Front-end playground" }
  ];

  const handleThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsResourcesOpen(false);
    setIsCommunityOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/20 bg-gray-950/98 backdrop-blur-3xl backdrop-saturate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center justify-between">
          {/* LEFT: Logo & Nav */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-400 hover:text-gray-300 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative">
              <Blocks className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700 relative z-10 drop-shadow-lg" />
              <div className="relative">
                <span className="block text-base sm:text-lg font-bold bg-gradient-to-r from-blue-400 via-blue-300 via-purple-400 to-cyan-400 text-transparent bg-clip-text group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-cyan-300 transition-all duration-500 animate-gradient-x">
                  CodeCraft
                </span>
                <span className="hidden sm:block text-xs text-blue-400/70 font-medium group-hover:text-blue-300/90 transition-colors duration-300">
                  Professional IDE • Enterprise Ready
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Code */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white bg-gray-800/40 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden">
                  <Code2 className="w-4 h-4 group-hover:rotate-3 group-hover:text-blue-300 transition-all duration-300" />
                  <span className="text-sm font-medium">Code</span>
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                </button>
              </div>
              {/* Resources */}
              <div className="relative group">
                <button 
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white bg-gray-800/40 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/20 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 shadow-lg overflow-hidden"
                >
                  <BookOpen className="w-4 h-4 group-hover:rotate-3 group-hover:text-emerald-300 transition-all duration-300" />
                  <span className="text-sm font-medium">Resources</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Resources Dropdown */}
                {isResourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden z-50">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Official Documentation
                      </h3>
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {programmingLanguages.map((lang, index) => (
                          <a
                            key={index}
                            href={lang.docs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                          >
                            <span className="text-sm">{lang.icon}</span>
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                              {lang.name}
                            </span>
                            <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-400 ml-auto" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Community */}
              <div className="relative group">
                <button 
                  onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white bg-gray-800/40 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 shadow-lg overflow-hidden"
                >
                  <Users className="w-4 h-4 group-hover:rotate-3 group-hover:text-orange-300 transition-all duration-300" />
                  <span className="text-sm font-medium">Community</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isCommunityOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Community Dropdown */}
                {isCommunityOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden z-50">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Developer Communities
                      </h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {communityLinks.map((community, index) => (
                          <a
                            key={index}
                            href={community.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                          >
                            <span className="text-sm">{community.icon}</span>
                            <div className="flex-1">
                              <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                {community.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {community.description}
                              </div>
                            </div>
                            <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* CENTER: Desktop Search Bar */}
          <div className="hidden xl:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800/70 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all duration-300">
                <Search className="ml-3 w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                <select
                  value={searchLanguage ?? "all"}
                  onChange={(e) => setSearchLanguage?.(e.target.value)}
                  className="bg-transparent border-none text-xs text-gray-400 focus:outline-none focus:text-gray-300 px-2 py-2 min-w-20"
                >
                  <option value="all">All</option>
                  {programmingLanguages.map((lang) => (
                    <option key={lang.name} value={lang.name.toLowerCase()}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="w-px h-4 bg-gray-600/50" />
                <input
                  type="text"
                  placeholder="Search code snippets, templates, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="flex-1 px-3 py-2 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
                  onKeyDown={e => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                />
                <div className="flex items-center gap-2 pr-3">
                  <Filter className="w-3 h-3 text-gray-500" />
                  <div className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                    ⌘K
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Actions, Profile, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="xl:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-400 hover:text-gray-300 transition-all duration-300"
            >
              <Search className="w-4 h-4" />
            </button>
            {/* Quick Actions Toolbar - Hide on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <button className="group relative p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-400/50 text-emerald-400 hover:text-emerald-300 transition-all duration-300 shadow-lg overflow-hidden">
                <Play className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <a
                href="https://github.com/TanvirHassanSayem/code_caft"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-400 hover:text-gray-300 transition-all duration-300 shadow-lg overflow-hidden"
              >
                <Github className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </a>
              <button className="group relative p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-400 hover:text-gray-300 transition-all duration-300 shadow-lg overflow-hidden">
                <Bell className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </button>
              {/* Settings - Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="hidden lg:block group relative p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-400 hover:text-gray-300 transition-all duration-300 shadow-lg overflow-hidden"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-yellow-300 group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-400 group-hover:rotate-90 transition-transform duration-500" />
                )}
              </button>
            </div>
            <SignedOut>
              {/* Pro and Sign Up buttons */}
              <Link
                href="/pricing"
                className="relative group flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-amber-500/40 hover:border-amber-400/60 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-500 shadow-lg sm:shadow-xl hover:shadow-2xl hover:shadow-amber-500/25 overflow-hidden"
              >
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-amber-300 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                <div className="relative z-10">
                  <span className="block text-xs sm:text-sm font-bold text-amber-400/90 group-hover:text-amber-300 transition-colors duration-300">
                    Pro
                  </span>
                  <span className="hidden sm:block text-xs text-amber-500/70 group-hover:text-amber-400/80 transition-colors duration-300">
                    Unlimited
                  </span>
                </div>
              </Link>
              <Link
                href="/sign-up"
                className="relative group flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white font-bold transition-all duration-500 shadow-lg sm:shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden transform hover:scale-105"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                <div className="relative z-10">
                  <span className="block text-xs sm:text-sm font-bold">
                    Start
                  </span>
                  <span className="hidden sm:block text-xs opacity-90">
                    Building Now
                  </span>
                </div>
              </Link>
            </SignedOut>
            <HeaderProfileBtn />
          </div>
        </div>

        {/* MOBILE SEARCH BAR (NO FORM) */}
        {mobileSearchOpen && (
          <div className="xl:hidden pb-4">
            <div className="relative group">
              <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-800/70 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all duration-300">
                <Search className="ml-3 w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                <select
                  value={searchLanguage ?? "all"}
                  onChange={(e) => setSearchLanguage?.(e.target.value)}
                  className="bg-transparent border-none text-xs text-gray-400 focus:outline-none focus:text-gray-300 px-2 py-2 min-w-16"
                >
                  <option value="all">All</option>
                  {programmingLanguages.map((lang) => (
                    <option key={lang.name} value={lang.name.toLowerCase()}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <div className="w-px h-4 bg-gray-600/50" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery?.(e.target.value)}
                  className="flex-1 px-3 py-2 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none"
                  onKeyDown={e => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                />
                <Filter className="w-4 h-4 text-gray-500 mr-3" />
              </div>
            </div>
          </div>
        )}

        {/* MOBILE MENU OVERLAY */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-md flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-3 right-4 p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="mt-20 flex-1 px-6 space-y-4 overflow-y-auto">
              {/* Code */}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 border border-gray-700/40 hover:border-blue-500/50 transition">
                <Code2 className="w-5 h-5" />
                <span className="text-base font-semibold">Code</span>
              </button>
              {/* Resources dropdown (simple list) */}
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-teal-600/20 border border-gray-700/40 hover:border-emerald-500/50 transition"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-base font-semibold">Resources</span>
                  <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isResourcesOpen ? "rotate-90" : ""}`} />
                </button>
                {isResourcesOpen && (
                  <div className="mt-2 ml-6 space-y-2">
                    {programmingLanguages.map((lang, index) => (
                      <a
                        key={index}
                        href={lang.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50 text-sm text-gray-300 hover:text-white"
                      >
                        <span>{lang.icon}</span>
                        <span>{lang.name}</span>
                        <ExternalLink className="w-3 h-3 ml-auto text-gray-500" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {/* Community dropdown (simple list) */}
              <div>
                <button
                  onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-red-600/20 border border-gray-700/40 hover:border-orange-500/50 transition"
                >
                  <Users className="w-5 h-5" />
                  <span className="text-base font-semibold">Community</span>
                  <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isCommunityOpen ? "rotate-90" : ""}`} />
                </button>
                {isCommunityOpen && (
                  <div className="mt-2 ml-6 space-y-2">
                    {communityLinks.map((community, index) => (
                      <a
                        key={index}
                        href={community.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50 text-sm text-gray-300 hover:text-white"
                      >
                        <span>{community.icon}</span>
                        <span>{community.name}</span>
                        <ExternalLink className="w-3 h-3 ml-auto text-gray-500" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {/* Optionally, add the Pro/Sign Up and theme toggle here */}
              <div className="flex flex-col gap-3 mt-6">
                <SignedOut>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-amber-500/40 hover:border-amber-400/60 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-400 font-bold transition-all duration-500"
                  >
                    <Crown className="w-5 h-5 text-amber-400 mr-1" />
                    Pro <span className="ml-1 text-xs text-amber-400/90">Unlimited</span>
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white font-bold transition-all duration-500"
                  >
                    <Rocket className="w-5 h-5" />
                    Start <span className="ml-1 text-xs opacity-90">Building Now</span>
                  </Link>
                </SignedOut>
                {/* Theme Toggle */}
                <button
                  onClick={handleThemeToggle}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-800/60 border border-gray-700/50 text-gray-400 hover:text-gray-100 transition"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-400" />
                  )}
                  <span className="font-semibold text-sm">{theme === "dark" ? "Light" : "Dark"} Mode</span>
                </button>
              </div>
              {/* Profile Button if signed in */}
              <div className="mt-4">
                <HeaderProfileBtn />
              </div>
            </nav>
          </div>
        )}
      </div>
      {/* ...your custom styles... */}
    </div>
  );
}

export default NavigationHeader;
