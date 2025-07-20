import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import {
  Blocks,
  Code2,
  Sparkles
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import MobileDropdown from "./MobileDropdown";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative">
      {/* --- Animated Simple Gradient Background --- */}
      <div
        className="
          absolute inset-0 z-0 rounded-xl 
          bg-gradient-to-r from-indigo-800 via-purple-700 to-cyan-700
          bg-[length:200%_200%] animate-gradient-x opacity-60 blur-sm
        "
        aria-hidden
      />
      {/* --- Main Header Container with Content --- */}
      <div className="relative z-[99990] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md shadow-2xl rounded-xl w-full border border-white/10">
        {/* Inner Content with Glass Morphism Effect */}
        <div className="flex items-center justify-between bg-gradient-to-r from-black/40 via-purple-950/30 to-black/40 backdrop-blur-xl p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl">
          
          {/* Logo Section with Cosmic Background */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 min-w-0 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative z-10">
              {/* Animated Cosmic Glow */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/40 to-cyan-500/30 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 animate-pulse" />
              
              {/* Logo Container with Stellar Background */}
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-indigo-900/80 via-purple-800/60 to-pink-900/80 ring-1 ring-purple-400/30 group-hover:ring-cyan-400/50 transition-all duration-500 shadow-2xl">
                <Blocks className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-300 transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* Brand Text with Galaxy Gradient */}
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm md:text-base lg:text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 text-transparent bg-clip-text transition-all duration-500 group-hover:brightness-125">
                  CodeCraft
                </span>
                <span className="hidden sm:block text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] lg:text-[0.75rem] text-purple-200/70 font-medium tracking-wide group-hover:text-cyan-200 transition-all duration-300">
                  Interactive Code Editor
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation with Aurora Effect */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center max-w-2xl mx-4">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:scale-[1.02] flex-shrink-0 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.3),0_0_40px_rgba(147,51,234,0.2),0_0_60px_rgba(6,182,212,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 rounded-lg border-2 border-blue-500/30 animate-ping" />
              <div className="absolute inset-0 rounded-lg border border-purple-500/20 animate-pulse" />
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse blur-sm" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 animate-spin" style={{ animationDuration: '8s' }} />
              <Code2 className="w-3 h-3 md:w-4 md:h-4 relative z-10 group-hover:rotate-3 transition-transform duration-300 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] flex-shrink-0 animate-pulse drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
              <span className="text-xs md:text-sm font-medium relative z-10 text-blue-100 transition-all duration-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9),0_0_20px_rgba(147,51,234,0.6),0_0_30px_rgba(6,182,212,0.4)] group-hover:text-white whitespace-nowrap animate-pulse">
                ✨ Snippets
              </span>
              <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500/60 group-hover:bg-blue-500/80 rounded-full transition-all duration-500 blur-sm animate-pulse" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500/60 group-hover:bg-purple-500/80 rounded-full transition-all duration-500 blur-sm animate-pulse" />
              <div className="absolute top-1 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }} />
              <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-purple-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }} />
            </Link>
          </div>

          {/* Right Side Controls with Nebula Background */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-900/80 via-slate-800/90 to-gray-900/80 rounded-xl shadow-xl border border-slate-600/30">
              
              {/* Theme and Language Selectors */}
              <div className="flex items-center gap-3">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <ThemeSelector />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
                </div>
              </div>

              {/* Pro Badge with Golden Gradient */}
              {!convexUser?.isPro && (
                <Link
                  href="/pricing"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-400/30 hover:border-yellow-400/50 bg-gradient-to-r from-amber-600/20 via-yellow-500/30 to-orange-600/20 hover:from-amber-500/30 hover:via-yellow-400/40 hover:to-orange-500/30 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-amber-500/20 hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 hover:text-yellow-200 transition-colors animate-pulse" />
                  <span className="text-sm font-medium text-amber-200 hover:text-yellow-100 transition-colors">
                    Pro
                  </span>
                </Link>
              )}

              {/* Profile Section with Cosmic Border */}
              <div className="relative pl-4 border-l border-gradient-to-b from-purple-500/30 via-cyan-400/40 to-purple-500/30">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"></div>
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-cyan-500/20 blur-sm animate-pulse"></div>
                  <div className="relative rounded-xl bg-gradient-to-br from-slate-800/80 to-gray-900/90 backdrop-blur-sm border border-slate-600/50 overflow-hidden">
                    <HeaderProfileBtn />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Right Side with Compact Design */}
          <div className="flex md:hidden items-center gap-2 flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-sm animate-pulse" />
              <div className="relative rounded-xl bg-gradient-to-br from-slate-800/80 to-gray-900/90 backdrop-blur-sm border border-slate-600/50 overflow-hidden transform scale-90">
                <HeaderProfileBtn />
              </div>
            </div>
            <MobileDropdown
              user={user ? {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                emailAddresses: user.emailAddresses.map(email => ({
                  emailAddress: email.emailAddress
                }))
              } : null}
              convexUser={convexUser}
              ThemeSelector={ThemeSelector}
              LanguageSelector={LanguageSelector}
              RunButton={(props) => <RunButton {...props} userInput="" />}

            />
          </div>
        </div>

        {/* Subtle Bottom Glow Effect */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-xl"></div>
      </div>
    </div>
  );
}

export default Header;
