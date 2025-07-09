"use client";

import { Zap, Crown, ArrowRight, Sparkles, Star } from "lucide-react";
import { useState, useEffect } from "react";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
};

export default function UpgradeButton() {
  const CHECKOUT_URL =
    "https://saascodeeditoronlinebysayem.lemonsqueezy.com/buy/a2ce1727-11a0-45ac-b7c8-a789abec0da7";

  const [isHovered, setIsHovered] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0.5);
  const [sparklePositions, setSparklePositions] = useState<Sparkle[]>([]);

  // Pulsing glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(0.3 + Math.sin(Date.now() * 0.003) * 0.4);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate sparkle positions
  useEffect(() => {
    const positions: Sparkle[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2,
      duration: 2 + Math.random() * 2,
    }));
    setSparklePositions(positions);
  }, []);

  return (
    <div className="relative group">
      {/* Outer Glow Effect */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500"
        style={{ opacity: pulseIntensity }}
      />

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-pink-500/60 p-[2px] group-hover:animate-spin-slow">
        <div className="w-full h-full bg-transparent rounded-2xl" />
      </div>

      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-2xl group/button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Button Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />

        {/* Animated shimmer effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-1000 ease-out" />

        {/* Floating Sparkles */}
        {sparklePositions.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animation: `sparkle ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-white/70" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative flex items-center justify-center gap-3 px-8 py-4 text-white font-semibold text-lg">
          {/* Crown Icon */}
          <div className="relative">
            <Crown className="w-5 h-5 text-yellow-300 group-hover/button:text-yellow-200 group-hover/button:scale-110 transition-all duration-300 drop-shadow-lg" />
            <div className="absolute inset-0 bg-yellow-300/20 rounded-full blur-sm group-hover/button:bg-yellow-200/30 transition-colors" />
          </div>

          {/* Text with gradient */}
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent group-hover/button:from-yellow-200 group-hover/button:via-white group-hover/button:to-blue-100 transition-all duration-300">
            Upgrade to Pro
          </span>

          {/* Zap Icon */}
          <Zap className="w-5 h-5 text-blue-200 group-hover/button:text-white group-hover/button:scale-110 transition-all duration-300 drop-shadow-lg" />

          {/* Arrow with motion */}
          <ArrowRight className="w-5 h-5 text-purple-200 group-hover/button:text-white group-hover/button:translate-x-1 group-hover/button:scale-110 transition-all duration-300 drop-shadow-lg" />
        </div>

        {/* Premium Badge */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg group-hover/button:scale-110 transition-transform duration-300">
          <Star className="w-3 h-3 inline mr-1" />
          PRO
        </div>
      </a>

      {/* Ripple Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

      {/* Animations */}
      <style jsx>{`
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: translateY(0px) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
