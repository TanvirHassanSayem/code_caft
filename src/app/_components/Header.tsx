import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
// import { RSC_PREFETCH_SUFFIX } from "next/dist/lib/constants";
async function Header() {
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
 const user = await currentUser();
 const convexUser = await convex.query(api.users.getUser, {
  userId: user?.id || "",
 });
return (
 <div className="relative z-10">
  <div
       className="flex items-center lg:justify-between justify-center 
        bg-[#0a0a0f]/80 backdrop-blur-xl p-6 mb-4 rounded-lg"
      >
         <div className="hidden lg:flex items-center gap-8">
         <Link href="/" className="flex items-center gap-4 group relative z-10">
  {/* Gradient glow background */}
  <div
    className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 
      opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
  />

  {/* Icon container with glass & ring */}
  <div
    className="relative p-2 rounded-2xl bg-gradient-to-br from-[#1e1e2e] to-[#0f0f1f] ring-1 
      ring-white/10 group-hover:ring-blue-500/30 transition-all duration-300 shadow-xl"
  >
    <Blocks className="size-6 text-blue-400 transform group-hover:rotate-[8deg] group-hover:scale-110 transition-transform duration-500" />
  </div>

  {/* Text block */}
  <div className="flex flex-col">
    <span className="text-[1.1rem] font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 
      text-transparent bg-clip-text transition-all duration-500 group-hover:brightness-125">
      CodeCraft
    </span>
    <span className="text-[0.75rem] text-blue-300/70 font-medium tracking-wide group-hover:text-blue-200 transition-all duration-300">
      Interactive Code Editor
    </span>
  </div>
</Link>


                   {/* Navigation */}
                   <nav className="flex items-center space-x-1">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span
                className="text-sm font-medium relative z-10 group-hover:text-white
                 transition-colors"
              >
                Snippets
              </span>
            </Link>

            <Link
  href="https://code-sync-live.vercel.app/"
  className="relative ml-6 group inline-flex items-center gap-6 px-8 py-3 rounded-2xl 
    bg-gradient-to-r from-gray-900/70 to-gray-800/70 text-white border border-transparent
    shadow-[0_0_20px_rgba(0,0,0,0.4)] backdrop-blur-md overflow-hidden
    transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
>
  {/* Animated Border Glow */}
  <span className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 
    animate-pulse opacity-20 blur-xl rounded-2xl"></span>

  {/* Neon Glow Trail */}
  <span className="absolute left-0 top-0 w-full h-full z-0 bg-gradient-to-r from-blue-500 to-purple-600 
    rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500 blur-lg"></span>

  {/* Text with neon glow */}
  <span className="text-base font-bold tracking-wide z-10 relative group-hover:text-white 
    text-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-colors duration-300">
    🚀 Code Sync
  </span>
</Link>






          </nav > 
        </div> 
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
          
        </div>
        {!convexUser?.isPro && (
            <Link
              href="/pricing"
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
              <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                Pro
              </span>
            </Link>
          )}
           <SignedIn>
            <RunButton/>
            </SignedIn>
            <div className="pl-3 border-l border-gray-800">
            <HeaderProfileBtn />
          </div>        
         </div>
        </div>

</div>
 );
}
export default Header;


