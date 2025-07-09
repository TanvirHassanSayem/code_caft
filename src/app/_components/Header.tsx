// import { currentUser } from "@clerk/nextjs/server";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../../../convex/_generated/api";
// import Link from "next/link";
// import { Blocks, Code2, Sparkles, Menu, X, User, Settings, Palette, Globe, Zap } from "lucide-react";
// import { SignedIn } from "@clerk/nextjs";
// import ThemeSelector from "./ThemeSelector";
// import LanguageSelector from "./LanguageSelector";
// import RunButton from "./RunButton";
// import HeaderProfileBtn from "./HeaderProfileBtn";
// import MobileDropdown from "./MobileDropdown";

// async function Header() {
//   const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
//   const user = await currentUser();
//   const convexUser = await convex.query(api.users.getUser, {
//     userId: user?.id || "",
//   });

//   return (
//     <div className="relative z-10 bg-slate-400 backdrop-blur-md shadow-lg rounded-lg w-full">
//       <div className="flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl p-3 sm:p-4 md:p-5 lg:p-6 mb-4 rounded-lg">

//         {/* Logo Section - Always visible, responsive */}
//         <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 min-w-0 flex-shrink-0">
//           <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative z-10">
//             {/* Gradient glow background */}
//             <div className="absolute -inset-1 sm:-inset-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

//             {/* Icon container with glass & ring */}
//             <div className="relative p-1 sm:p-1.5 md:p-2 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1e1e2e] to-[#0f0f1f] ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300 shadow-xl">
//               <Blocks className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 transform group-hover:rotate-[8deg] group-hover:scale-110 transition-transform duration-500" />
//             </div>

//             {/* Text block - responsive */}
//             <div className="flex flex-col min-w-0">
//               <span className="text-xs sm:text-sm md:text-base lg:text-[1.1rem] font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 text-transparent bg-clip-text transition-all duration-500 group-hover:brightness-125">
//                 CodeCraft
//               </span>
//               <span className="hidden sm:block text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] lg:text-[0.75rem] text-blue-300/70 font-medium tracking-wide group-hover:text-blue-200 transition-all duration-300">
//                 Interactive Code Editor
//               </span>
//             </div>
//           </Link>
//         </div>

//         {/* Center Navigation - Visible on tablet and up */}
//         <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center max-w-2xl mx-4">

//           {/* Snippets Link - Enhanced with auto-glow */}
//           <Link
//             href="/snippets"
//             className="relative group flex items-center gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-0.5 hover:scale-[1.02] flex-shrink-0 animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.3),0_0_40px_rgba(147,51,234,0.2),0_0_60px_rgba(6,182,212,0.1)]"
//           >
//             {/* Enhanced base effects */}
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700" />
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

//             {/* Automatic pulsing glow rings */}
//             <div className="absolute inset-0 rounded-lg border-2 border-blue-500/30 animate-ping" />
//             <div className="absolute inset-0 rounded-lg border border-purple-500/20 animate-pulse" />
//             <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse blur-sm" />

//             {/* Rotating glow effect */}
//             <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 animate-spin" style={{ animationDuration: '8s' }} />

//             <Code2 className="w-3 h-3 md:w-4 md:h-4 relative z-10 group-hover:rotate-3 transition-transform duration-300 text-blue-400 group-hover:text-blue-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] flex-shrink-0 animate-pulse drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
//             <span className="text-xs md:text-sm font-medium relative z-10 text-blue-100 transition-all duration-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9),0_0_20px_rgba(147,51,234,0.6),0_0_30px_rgba(6,182,212,0.4)] group-hover:text-white whitespace-nowrap animate-pulse">
//               ✨ Snippets
//             </span>

//             {/* Enhanced corner accents with auto-glow */}
//             <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500/60 group-hover:bg-blue-500/80 rounded-full transition-all duration-500 blur-sm animate-pulse" />
//             <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-500/60 group-hover:bg-purple-500/80 rounded-full transition-all duration-500 blur-sm animate-pulse" />

//             {/* Floating sparkles */}
//             <div className="absolute top-1 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }} />
//             <div className="absolute bottom-1 left-2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }} />
//             <div className="absolute top-3 left-1 w-0.5 h-0.5 bg-purple-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1.5s' }} />
//           </Link>

//         </div>

//         {/* Right Side Controls - Desktop */}
//         <div className="hidden md:flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-1 flex-shrink-0">

//           {/* Controls container - responsive sizing */}
//           <div className="flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-1 p-1.5 sm:p-2 md:p-3 lg:p-2 bg-gray-900 rounded-lg shadow-lg">

//             {/* Theme and Language selectors */}
//             <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
//               <div className="transform scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
//                 <ThemeSelector />
//               </div>
//               <div className="transform scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
//                 <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
//               </div>
//             </div>

//             {/* Pro Badge - responsive */}
//             {!convexUser?.isPro && (
//               <Link
//                 href="/pricing"
//                 className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0"
//               >
//                 <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 hover:text-amber-300 transition-colors flex-shrink-0" />
//                 <span className="text-[0.6rem] sm:text-xs md:text-sm font-medium text-amber-400/90 hover:text-amber-300 transition-colors whitespace-nowrap">
//                   Pro
//                 </span>
//               </Link>
//             )}

//             <SignedIn>
//               {/* <RunButton /> */}
//             </SignedIn>

//             {/* Profile Section - responsive */}
//             <div className="relative pl-1 sm:pl-2 md:pl-3 lg:pl-4 border-l border-gray-800/50 group">
//               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 bg-blue-500/20 group-hover:bg-blue-400/40 transition-all duration-500 blur-sm"></div>

//               <div className="relative pl-1 sm:pl-2 md:pl-3 lg:pl-4">
//                 <div className="absolute inset-y-0 left-0 w-0.5 overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent opacity-70 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
//                 </div>

//                 <div className="relative isolate">
//                   <div className="absolute -inset-1 rounded-lg bg-blue-500/10 blur-sm animate-[pulse_4s_ease-in-out_infinite]"></div>
//                   <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-blue-400/5 via-transparent to-purple-500/5 opacity-80"></div>

//                   <div className="relative rounded-lg bg-gray-800/70 backdrop-blur-sm border border-gray-700/70 overflow-hidden transform scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
//                     <HeaderProfileBtn />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Right Side - Profile + Menu */}
//         <div className="flex md:hidden items-center gap-2 flex-shrink-0">
//           {/* Mobile Profile */}
//           <div className="relative">
//             <div className="absolute -inset-1 rounded-lg bg-blue-500/10 blur-sm animate-[pulse_4s_ease-in-out_infinite]"></div>
//             <div className="relative rounded-lg bg-gray-800/70 backdrop-blur-sm border border-gray-700/70 overflow-hidden transform scale-75 origin-center">
//               <HeaderProfileBtn />
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <MobileDropdown
//             user={user ? {
//               id: user.id,
//               firstName: user.firstName,
//               lastName: user.lastName,
//               username: user.username,
//               emailAddresses: user.emailAddresses.map(email => ({
//                 emailAddress: email.emailAddress
//               }))
//             } : null}
//             convexUser={convexUser}
//             ThemeSelector={ThemeSelector}
//             LanguageSelector={LanguageSelector}
//             RunButton={RunButton}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;


import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import {
  Blocks,
  Code2,
  Sparkles
} from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
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
    <div className="relative z-[99990] bg-slate-400 backdrop-blur-md shadow-lg rounded-lg w-full">
      <div className="flex items-center justify-between bg-[#0a0a0f]/80 backdrop-blur-xl p-3 sm:p-4 md:p-5 lg:p-6 mb-4 rounded-lg">

        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 min-w-0 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative z-10">
            <div className="absolute -inset-1 sm:-inset-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative p-1 sm:p-1.5 md:p-2 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1e1e2e] to-[#0f0f1f] ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300 shadow-xl">
              <Blocks className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 transform group-hover:rotate-[8deg] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm md:text-base lg:text-[1.1rem] font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 text-transparent bg-clip-text transition-all duration-500 group-hover:brightness-125">
                CodeCraft
              </span>
              <span className="hidden sm:block text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] lg:text-[0.75rem] text-blue-300/70 font-medium tracking-wide group-hover:text-blue-200 transition-all duration-300">
                Interactive Code Editor
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation */}
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

        {/* Right Side Controls - Desktop */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-1 flex-shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-1 p-1.5 sm:p-2 md:p-3 lg:p-2 bg-gray-900 rounded-lg shadow-lg">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              <div className="transform scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                <ThemeSelector />
              </div>
              <div className="transform scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
              </div>
            </div>

            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 shadow-md hover:shadow-lg flex-shrink-0"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 hover:text-amber-300 transition-colors flex-shrink-0" />
                <span className="text-[0.6rem] sm:text-xs md:text-sm font-medium text-amber-400/90 hover:text-amber-300 transition-colors whitespace-nowrap">
                  Pro
                </span>
              </Link>
            )}

            <SignedIn>
              {/* <RunButton /> */}
            </SignedIn>

            <div className="relative pl-1 sm:pl-2 md:pl-3 lg:pl-4 border-l border-gray-800/50 group">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 bg-blue-500/20 group-hover:bg-blue-400/40 transition-all duration-500 blur-sm"></div>
              <div className="relative pl-1 sm:pl-2 md:pl-3 lg:pl-4">
                <div className="absolute inset-y-0 left-0 w-0.5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent opacity-70 animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                </div>
                <div className="relative isolate">
                  <div className="absolute -inset-1 rounded-lg bg-blue-500/10 blur-sm animate-[pulse_4s_ease-in-out_infinite]"></div>
                  <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-blue-400/5 via-transparent to-purple-500/5 opacity-80"></div>
                  <div className="relative rounded-lg bg-gray-800/70 backdrop-blur-sm border border-gray-700/70 overflow-hidden transform scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                    <HeaderProfileBtn />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Right Side */}
        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-blue-500/10 blur-sm animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="relative rounded-lg bg-gray-800/70 backdrop-blur-sm border border-gray-700/70 overflow-hidden transform scale-75 origin-center">
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
            RunButton={RunButton}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;



