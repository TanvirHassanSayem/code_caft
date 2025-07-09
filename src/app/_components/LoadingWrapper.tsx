"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Brain,
  Rocket,
  Star,
  Eye,
  Target,
  Lightbulb,
} from "lucide-react";

interface LoadingOverlayProps {
  isLoading: boolean;
  progress?: number;
  currentStep?: number;
  scrollY: number;
}

const LoadingOverlay = ({
  isLoading,
  progress = 0,
  currentStep = 0,
  scrollY,
}: LoadingOverlayProps) => {
  if (!isLoading) return null;

  const loadingSteps = [
    {
      icon: Brain,
      message: "Analyzing your preferences...",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: Lightbulb,
      message: "Generating personalized insights...",
      color: "from-yellow-400 to-orange-400",
    },
    {
      icon: Target,
      message: "Optimizing for your goals...",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: Sparkles,
      message: "Adding magical touches...",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: Rocket,
      message: "Preparing to launch...",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Star,
      message: "Almost ready to amaze you!",
      color: "from-cyan-400 to-purple-500",
    },
  ];

  const currentStepData = loadingSteps[currentStep] || loadingSteps[0];
  const IconComponent = currentStepData.icon;

  return (
    <div
      aria-live="assertive"
      aria-busy="true"
      role="alert"
      style={{
        top: scrollY,
        position: "absolute",
        left: 0,
        right: 0,
        height: "100vh",
        zIndex: 9999,
      }}
      className="bg-gradient-to-br from-slate-900/98 via-purple-900/95 to-slate-900/98 backdrop-blur-xl border border-purple-800/30 shadow-xl"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => {
          const left = (i * 37) % 100;
          const top = (i * 73) % 100;
          const delay = (i * 0.2) % 3;
          const duration = 1.5 + ((i * 0.15) % 2);
          const size = 1 + ((i * 0.1) % 2);

          return (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                filter: "drop-shadow(0 0 3px rgba(255,255,255,0.2))",
                willChange: "transform",
              }}
            />
          );
        })}
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: `${((i * 23) % 90) + 5}%`,
              top: `${((i * 41) % 80) + 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.3}s`,
              willChange: "transform",
            }}
          >
            <div
              className="w-8 h-8 border border-cyan-400/40 rotate-45 animate-spin"
              style={{ animationDuration: "6s" }}
            ></div>
          </div>
        ))}
      </div>

      {/* Main loading content */}
      <div className="absolute top-0 left-0 right-0 pt-20 pb-8">
        <div className="max-w-lg mx-auto text-center space-y-10 px-6 select-none">
          {/* Spinner with glowing shadows */}
          <div className="relative">
            <div className="w-24 h-24 border-3 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full p-1 animate-spin shadow-[0_0_15px_rgb(140,170,255)] will-change-transform">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center relative overflow-hidden shadow-inner shadow-purple-700/70">
                <div className="relative z-10">
                  <IconComponent className="w-10 h-10 text-cyan-400 animate-pulse drop-shadow-[0_0_10px_cyan]" />
                  <div className="absolute inset-0 animate-ping">
                    <Sparkles className="w-10 h-10 text-purple-400 opacity-70 drop-shadow-[0_0_15px_purple]" />
                  </div>
                </div>

                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Orbital rings with glowing edges */}
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "4s" }}
            >
              <div className="w-28 h-28 border border-cyan-400/50 rounded-full absolute -top-2 -left-2 shadow-[0_0_8px_cyan]" />
            </div>
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "3s", animationDirection: "reverse" }}
            >
              <div className="w-32 h-32 border border-purple-400/40 rounded-full absolute -top-4 -left-4 shadow-[0_0_10px_purple]" />
            </div>
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "5s" }}
            >
              <div className="w-36 h-36 border border-pink-400/30 rounded-full absolute -top-6 -left-6 shadow-[0_0_12px_pink]" />
            </div>

            {/* Pulsing outer glow */}
            <div className="absolute inset-0 -m-8 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse" />
          </div>

          {/* Text and steps */}
          <div className="space-y-6">
            <h3
              className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient tracking-wide"
              style={{ willChange: "background-position" }}
            >
              Crafting Your Experience
            </h3>

            <div className="flex justify-center items-center space-x-3 mb-4">
              {loadingSteps.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    i <= currentStep
                      ? "bg-cyan-400 scale-125 shadow-[0_0_12px_cyan] animate-pulse"
                      : "bg-slate-600"
                  }`}
                  style={{ willChange: "transform, box-shadow" }}
                />
              ))}
            </div>

            <div className="min-h-[60px] flex items-center justify-center">
              <p
                className={`text-lg font-semibold tracking-wide bg-gradient-to-r ${
                  currentStepData.color
                } bg-clip-text text-transparent animate-fade-in transform transition-transform duration-300 ease-out`}
                style={{ willChange: "transform, opacity" }}
              >
                {currentStepData.message}
              </p>
            </div>

            {/* Curiosity hints */}
            <div className="text-slate-300 text-sm space-y-2">
              <div className="flex items-center justify-center gap-2 animate-bounce">
                <Eye className="w-5 h-5 drop-shadow-[0_0_4px_cyan]" />
                <span>Something special is coming...</span>
              </div>
              <div className="text-xs text-slate-400 animate-pulse">
                Hint: It's tailored just for you ✨
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-4">
            <div className="relative w-full h-5 bg-slate-800/70 rounded-full overflow-hidden border border-slate-700/60 backdrop-blur-sm shadow-inner shadow-cyan-700/40">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-pink-500/15 rounded-full" />

              {/* Progress fill */}
              <div
                className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgb(205,92,255)]"
                style={{ width: `${progress}%`, willChange: "width" }}
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />

                {/* Wave */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/60 to-purple-400/60 animate-wave" />
              </div>

              {/* Progress glow */}
              <div
                className="absolute top-0 h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-md opacity-60 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-semibold animate-pulse">
                {Math.round(progress)}% Complete
              </span>
              <span className="text-slate-300 font-semibold flex items-center gap-2">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
                Processing...
              </span>
            </div>
          </div>

          {/* Teaser */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full backdrop-blur-sm shadow-md">
              <Zap className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_cyan]" />
              <span className="text-sm text-slate-200 font-semibold">
                Premium features loading...
              </span>
            </div>

            {progress > 70 && (
              <div className="animate-slide-up">
                <div className="text-xs text-slate-400 animate-pulse">
                  🚀 Get ready for something incredible!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ambient bottom effects */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-500/40 via-cyan-500/25 to-transparent blur-3xl" />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-96 h-20 bg-gradient-to-r from-cyan-500/25 to-purple-500/25 rounded-full blur-3xl animate-pulse" />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(45deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes wave {
          0% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(1.05);
          }
          100% {
            transform: scaleX(1);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-wave {
          animation: wave 1.5s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default function LoadingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.scrollY || 0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        let increment;
        if (prev < 30) {
          increment = Math.random() * 8 + 5;
        } else if (prev < 80) {
          increment = Math.random() * 15 + 8;
        } else {
          increment = Math.random() * 6 + 2;
        }
        return Math.min(prev + increment, 100);
      });
    }, 80);

    const stepInterval = setInterval(() => {
      setCurrentStep(() => {
        const newStep = Math.floor((progress / 100) * 6);
        return Math.min(newStep, 5);
      });
    }, 120);

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(loadingTimeout);
    };
  }, [progress]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, scrollY);
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading, scrollY]);

  return (
    <>
      <LoadingOverlay
        isLoading={isLoading}
        progress={progress}
        currentStep={currentStep}
        scrollY={scrollY}
      />
      <div
        className={`transition-all duration-1000 ${
          isLoading ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
