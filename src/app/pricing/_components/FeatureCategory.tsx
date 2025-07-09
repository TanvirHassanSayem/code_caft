"use client";

import { useState, useEffect } from "react";
import { Sparkles, ChevronRight } from "lucide-react";

const FeatureCategory = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(0.3);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`category-${label.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [label]);

  // Pulsing glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => 0.2 + Math.sin(Date.now() * 0.002) * 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id={`category-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className={`relative group transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Background Glow */}
      <div 
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl transition-all duration-500 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20"
        style={{ opacity: glowIntensity }}
      />
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 sm:p-8 group-hover:border-slate-600/50 transition-all duration-500">
        
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Header */}
        <div 
          className="relative flex items-center justify-between mb-6 sm:mb-8 cursor-pointer group/header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Label with Enhanced Effects */}
          <div className="flex items-center gap-3">
            {/* Decorative Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-slate-600/30 group-hover/header:border-slate-500/50 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-purple-400 group-hover/header:text-purple-300 group-hover/header:scale-110 transition-all duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-hover/header:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Enhanced Label */}
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm group-hover/header:from-blue-300 group-hover/header:via-purple-300 group-hover/header:to-pink-300 transition-all duration-300">
                {label}
              </h3>
              <div className="h-0.5 w-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover/header:w-full transition-all duration-500 rounded-full" />
            </div>
          </div>
          
          {/* Expand/Collapse Button */}
          <button className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group/btn">
            <ChevronRight 
              className={`w-5 h-5 text-slate-400 group-hover/btn:text-slate-300 transition-all duration-300 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
        </div>

        {/* Feature Items Container */}
        <div className={`relative transition-all duration-500 overflow-hidden ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {/* Decorative Elements */}
          <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-full" />
          <div className="absolute left-0 top-0 w-0.5 h-0 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full group-hover:h-full transition-all duration-1000 delay-200" />
          
          {/* Content */}
          <div className="pl-6 space-y-3 sm:space-y-4">
            {children}
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hover Ripple Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FeatureCategory;