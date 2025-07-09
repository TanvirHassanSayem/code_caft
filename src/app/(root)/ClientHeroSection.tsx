"use client";

import { memo } from "react";
import Link from "next/link";

interface StatusIndicatorProps {
  color?: string;
  label?: string;
}

const StatusIndicator = memo(
  ({ color = "pink", label = "Ready" }: StatusIndicatorProps) => (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <div
          className={`w-2 h-2 bg-${color}-400 rounded-full animate-ping absolute opacity-75`}
        ></div>
        <div className={`w-2 h-2 bg-${color}-400 rounded-full`}></div>
      </div>
      <span className="text-xs font-medium text-slate-300">{label}</span>
    </div>
  )
);

const ClientHeroSection = memo(() => {
  const handleStartBuilding = () => {
    const editorPanel = document.getElementById("editor-panel");
    if (editorPanel) {
      editorPanel.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleViewDocumentation = () => {
    window.open(
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      "_blank"
    );
  };

  return (
    <div className="relative py-8 sm:py-12 mb-8 overflow-hidden">
      {/* Warm Coral/Peach Glow Background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-50 via-pink-100/60 to-orange-50"></div>
      {/* Soft Coral Radial Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-pink-400/50 blur-3xl animate-pulse"></div>
      {/* Gentle Peach Light Rays */}
      <div className="absolute top-8 left-8 w-96 h-96 rounded-full bg-orange-300/30 blur-xl animate-slow-spin"></div>

      {/* Floating Soft Light Orbs */}
      <div className="absolute top-20 right-16 w-16 h-16 bg-pink-300/30 rounded-full blur-md animate-pulse"></div>
      <div className="absolute bottom-24 left-20 w-28 h-28 bg-orange-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>

      <div className="relative px-6 text-center z-20">
        {/* Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-rose-100/60 backdrop-blur-md border border-rose-300/50 rounded-full shadow-lg">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-rose-900">
            Developer Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-orange-300 bg-clip-text text-transparent animate-pulse">
            Build. Test. Deploy.
          </span>
          <br />
          <span className="text-rose-900 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light">
            All in One Platform
          </span>
        </h1>


        <Link
          href="https://code-sync-live.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center gap-1.5 md:gap-2 lg:gap-3 px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-lg md:rounded-xl lg:rounded-2xl bg-black/90 text-white border border-cyan-400/50 md:border-2 shadow-[0_0_10px_rgba(6,182,212,0.4)] md:shadow-[0_0_15px_rgba(6,182,212,0.5)] lg:shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-xl overflow-hidden transition-all duration-300 ease-out transform hover:scale-105 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.7)] md:hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] animate-pulse flex-shrink-0"
        >
          {/* Simplified effects for smaller screens */}
          <div className="absolute inset-0 opacity-10 md:opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:15px_15px] md:bg-[size:20px_20px]"></div>
          </div>

          {/* Neon borders - responsive */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse delay-1000"></div>
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse delay-500"></div>
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse delay-1500"></div>

          {/* Corner brackets - responsive */}
          <div className="absolute top-1 left-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-l border-t border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse"></div>
          <div className="absolute top-1 right-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-r border-t border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse delay-200"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-l border-b border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse delay-400"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-r border-b border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse delay-600"></div>

          {/* Cyberpunk Icon */}
          <div className="relative z-10 p-1 md:p-2 lg:p-3 rounded md:rounded-lg bg-black/80 border border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.5)] md:shadow-[0_0_12px_rgba(6,182,212,0.6)] lg:shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.7)] md:group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] lg:group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 group-hover:scale-110 backdrop-blur-sm flex-shrink-0">
            <div className="absolute inset-0 bg-cyan-400/20 rounded md:rounded-lg animate-pulse"></div>
            <span className="text-sm md:text-lg lg:text-xl xl:text-2xl relative z-10 inline-block transform group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_4px_rgba(6,182,212,0.6)] md:drop-shadow-[0_0_6px_rgba(6,182,212,0.8)] lg:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-bounce">
              🚀
            </span>
          </div>

          {/* Responsive Text */}
          <div className="relative z-10 flex flex-col items-start min-w-0">
            <span className="text-xs md:text-sm lg:text-base xl:text-lg font-black tracking-wider md:tracking-widest text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)] md:drop-shadow-[0_0_6px_rgba(6,182,212,0.8)] lg:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] md:group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,1)] lg:group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,1)] transition-all duration-300 group-hover:scale-105 font-mono uppercase whitespace-nowrap">
              CODE SYNC
            </span>
            <span className="hidden md:block text-[0.6rem] lg:text-xs text-cyan-300/80 font-bold tracking-[0.15em] lg:tracking-[0.2em] group-hover:text-cyan-200 transition-all duration-300 opacity-80 group-hover:opacity-100 transform translate-y-0.5 group-hover:translate-y-0 font-mono uppercase drop-shadow-[0_0_3px_rgba(6,182,212,0.5)] lg:drop-shadow-[0_0_4px_rgba(6,182,212,0.6)] whitespace-nowrap">
              &gt; Collaboration
            </span>
          </div>

          {/* Terminal Cursor */}
          <div className="absolute right-1 md:right-2 lg:right-3 xl:right-4 top-1/2 transform -translate-y-1/2 w-1 md:w-1.5 lg:w-2 h-2 md:h-3 lg:h-4 bg-cyan-400 animate-pulse opacity-80 shadow-[0_0_4px_rgba(6,182,212,0.6)] md:shadow-[0_0_6px_rgba(6,182,212,0.8)] lg:shadow-[0_0_8px_rgba(6,182,212,0.8)] flex-shrink-0"></div>
        </Link>


        <p className="text-base sm:text-lg text-rose-900 max-w-xl mx-auto mt-2 mb-8 leading-relaxed">
          Professional development tools that scale with your team and
          accelerate your workflow
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { icon: "⚡", text: "Fast Deploy" },
            { icon: "🔧", text: "Debug Tools" },
            { icon: "👥", text: "Team Ready" },
            { icon: "☁️", text: "Cloud Native" },
          ].map((feature, index) => (
            <div
              key={feature.text}
              className="px-3 py-1.5 bg-rose-100/50 backdrop-blur-sm border border-rose-300/30 rounded-full text-sm text-rose-900 hover:border-pink-400/50 hover:bg-pink-200/50 transition-all duration-300 cursor-default"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="mr-1">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleStartBuilding}
            className="group px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-600 text-rose-50 font-semibold rounded-2xl hover:from-pink-500 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-pink-500/30"
          >
            <span className="flex items-center justify-center gap-2">
              Start Building
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </button>
          <button
            onClick={handleViewDocumentation}
            className="px-8 py-3 bg-rose-100/70 backdrop-blur-sm border border-rose-300/50 text-rose-900 font-semibold rounded-2xl hover:border-pink-400/50 hover:bg-pink-200/70 hover:text-pink-800 transition-all duration-300"
          >
            Documentation
          </button>
        </div>

        {/* Status Bar */}
        <div className="group inline-flex items-center gap-6 px-6 py-3 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full shadow-md hover:shadow-lg hover:shadow-indigo-700/30 transition-transform duration-300 hover:scale-105">
          {/* Live Status */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300 select-none">Live</span>
            <div className="px-3 py-1 bg-emerald-600/90 border border-emerald-500 rounded-full shadow-md">
              <span className="text-xs font-semibold text-emerald-100 select-none">Active</span>
            </div>
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>

          {/* Uptime */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            <span className="text-sm font-medium text-slate-300 select-none">99.9% Uptime</span>
          </div>

          {/* Separator */}
          <div className="w-px h-5 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>

          {/* Support */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
            <span className="text-sm font-medium text-slate-300 select-none">24/7 Support</span>
          </div>
        </div>



      </div>

      {/* Custom animation for slow spin */}
      <style jsx>{`
        @keyframes slow-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 60s linear infinite;
        }
      `}</style>
    </div>
  );
});

ClientHeroSection.displayName = "ClientHeroSection";

export default ClientHeroSection;