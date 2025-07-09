"use client";

import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star, Sparkles, Zap, Crown } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";
import { Suspense, useState, useEffect } from "react";

const STATS = [
  { value: "99.99%", label: "Uptime", icon: "⚡" },
  { value: "100K+", label: "Developers", icon: "🧠" },
  { value: "<50ms", label: "Response", icon: "🚀" }
] as const;

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-20 -right-20 xs:-top-32 xs:-right-32 sm:-top-40 sm:-right-40 w-40 h-40 xs:w-60 xs:h-60 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl xs:blur-2xl sm:blur-3xl animate-pulse" />
    <div className="absolute -bottom-20 -left-20 xs:-bottom-32 xs:-left-32 sm:-bottom-40 sm:-left-40 w-40 h-40 xs:w-60 xs:h-60 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl xs:blur-2xl sm:blur-3xl animate-pulse delay-1000" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 xs:w-72 xs:h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-xl xs:blur-2xl sm:blur-3xl animate-pulse delay-500" />
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:25px_25px] xs:bg-[size:35px_35px] sm:bg-[size:50px_50px]" />
);

const FloatingBadge = () => (
  <div className="absolute -top-6 xs:-top-8 left-1/2 transform -translate-x-1/2 z-10">
    <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-full border border-blue-500/20 shadow-lg">
      <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 text-blue-400 animate-pulse" />
      <span className="text-xs xs:text-sm font-medium text-blue-300">Industry Leading</span>
    </div>
  </div>
);

const StatCards = () => (
  <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 lg:gap-6 mt-6 xs:mt-8 sm:mt-12 px-2">
    {STATS.map((stat, idx) => (
      <div key={idx} className="flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <span className="text-sm xs:text-base sm:text-lg">{stat.icon}</span>
        <span className="text-xs xs:text-sm font-semibold text-white">{stat.value}</span>
        <span className="text-xs text-gray-400 hidden xs:inline">{stat.label}</span>
      </div>
    ))}
  </div>
);

const EnterpriseFeatureCard = ({ feature, idx }: { feature: typeof ENTERPRISE_FEATURES[0], idx: number }) => (
  <div
    className="group relative bg-gradient-to-b from-[#15151f]/80 to-[#0a0a0f]/80 backdrop-blur-xl rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-[1.02] sm:hover:scale-[1.025] border border-gray-800/50 hover:border-blue-500/30"
    style={{ animationDelay: `${idx * 100}ms` }}
  >
    {feature.highlight && (
      <div className="absolute -top-1.5 -right-1.5 xs:-top-2 xs:-right-2 px-1.5 xs:px-2 py-0.5 xs:py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
        {feature.badge}
      </div>
    )}
    <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl xs:rounded-2xl sm:rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative">
      <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-lg xs:rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center mb-2 xs:mb-3 sm:mb-4 ring-1 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300">
        <feature.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
      </div>
      <h3 className="text-sm xs:text-base sm:text-lg font-bold text-white mb-1.5 xs:mb-2 group-hover:text-blue-100 transition-colors duration-300 leading-tight">{feature.label}</h3>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.desc}</p>
    </div>
  </div>
);

const PricingCard = () => (
  <div className="relative max-w-sm xs:max-w-lg sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
    <div className="absolute -inset-2 xs:-inset-3 sm:-inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl xs:rounded-3xl blur-xl xs:blur-2xl opacity-20 animate-pulse" />
    <div className="absolute -inset-1 xs:-inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl xs:rounded-3xl blur opacity-30" />
    <div className="relative bg-[#12121a]/95 backdrop-blur-2xl rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-2xl ring-1 ring-blue-500/20 overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent animate-pulse" />
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/80 to-transparent animate-pulse delay-1000" />
      <div className="relative p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex p-2 xs:p-3 sm:p-4 rounded-xl xs:rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-blue-500/30 mb-3 xs:mb-4 sm:mb-6 shadow-xl">
            <Crown className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-blue-400 animate-pulse" />
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 xs:mb-3 sm:mb-4 tracking-tight px-2">
            🔥 Lifetime Pro Access
          </h2>
          <div className="flex items-baseline justify-center gap-1 sm:gap-2 mb-2 xs:mb-3 sm:mb-4">
            <span className="text-lg xs:text-xl sm:text-2xl text-gray-400">$</span>
            <span className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight">39</span>
            <span className="text-sm xs:text-base sm:text-xl text-gray-400">one-time</span>
          </div>
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-3 xs:mb-4 mx-2">
            <Zap className="w-3 h-3 xs:w-4 xs:h-4 text-green-400" />
            <span className="text-xs xs:text-sm font-medium text-green-300">⚡ No monthly fees. No limits. Just pure power.</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 md:gap-10 mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <FeatureCategory label="🧠 Development">
            {FEATURES.development.map((feature, idx) => (
              <FeatureItem key={idx}>{feature}</FeatureItem>
            ))}
          </FeatureCategory>
          <FeatureCategory label="👥 Collaboration">
            {FEATURES.collaboration.map((feature, idx) => (
              <FeatureItem key={idx}>{feature}</FeatureItem>
            ))}
          </FeatureCategory>
          <FeatureCategory label="🚀 Deployment">
            {FEATURES.deployment.map((feature, idx) => (
              <FeatureItem key={idx}>{feature}</FeatureItem>
            ))}
          </FeatureCategory>
        </div>
        <div className="text-center px-2">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-4 xs:mb-6 text-xs xs:text-sm text-blue-300">
            <Sparkles className="w-3 h-3 xs:w-4 xs:h-4" />
            <span className="hidden xs:inline">⚡ Join 100K+ developers already using Pro</span>
            <span className="xs:hidden">⚡ Join 100K+ developers</span>
          </div>
          <Suspense fallback={<div className="h-10 xs:h-12 bg-gray-800 rounded-lg animate-pulse mx-auto max-w-xs" />}>
            <SignedIn>
              <UpgradeButton />
            </SignedIn>
            <SignedOut>
              <LoginButton />
            </SignedOut>
          </Suspense>
          <p className="text-xs text-gray-500 mt-3 xs:mt-4 leading-relaxed">
            🛡️ 30-day money-back guarantee • 🚀 Instant activation • 🔒 Secure payment
          </p>
        </div>
      </div>
    </div>
  </div>
);

type PricingClientProps = {
  user: any;
  convexUser: any;
};

export default function PricingClient({ user, convexUser }: PricingClientProps) {
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

  // (Optional) Show ProPlanView on client as well, else return null
  if (convexUser?.isPro) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0e0e17] to-[#0a0a0f] text-white selection:bg-blue-500/20 selection:text-blue-200 overflow-hidden">
      <AnimatedBackground />
      <GridPattern />
      <NavigationHeader theme={theme} setTheme={setTheme} />
      <main className="relative pt-16 xs:pt-20 sm:pt-24 md:pt-32 pb-12 xs:pb-16 md:pb-24 px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 xs:mb-16 sm:mb-20 md:mb-24">
            <div className="relative inline-block group">
              <FloatingBadge />
              <div className="absolute -inset-2 xs:-inset-3 sm:-inset-4 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl xs:blur-2xl opacity-20 rounded-2xl xs:rounded-3xl group-hover:opacity-30 transition-opacity duration-700" />
              <h1 className="relative text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-blue-300 via-gray-100 to-purple-300 text-transparent bg-clip-text mb-3 xs:mb-4 sm:mb-6 leading-tight tracking-tight px-2">
                <span className="block xs:inline">Supercharge</span>{" "}
                <br className="hidden xs:block sm:hidden" />
                <span className="relative block xs:inline mt-1 xs:mt-0">
                  Your Development
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg rounded-lg -z-10" />
                </span>
              </h1>
            </div>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-400 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto font-light leading-relaxed px-2">
              🚀 All-in-one toolkit for developers, teams, and freelancers to code, collaborate, and deploy at <span className="text-blue-400 font-medium">quantum speed</span>.
            </p>
            <StatCards />
          </div>
          {/* Enterprise Features Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-12 xs:mb-16 sm:mb-20 md:mb-24">
            {ENTERPRISE_FEATURES.map((feature, idx) => (
              <EnterpriseFeatureCard key={feature.label} feature={feature} idx={idx} />
            ))}
          </div>
          {/* Pricing Card */}
          <PricingCard />
        </div>
      </main>
    </div>
  );
}
