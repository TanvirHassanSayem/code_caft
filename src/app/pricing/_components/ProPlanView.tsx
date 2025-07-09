"use client";

import { ArrowRight, Command, Star, Sparkles, Zap, Crown, Code, Palette, Settings, Rocket } from "lucide-react";
import { useState, useEffect } from "react";

// Define the Particle interface
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

function ProPlanView() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glowIntensity, setGlowIntensity] = useState(0.3);

  // Mouse tracking for interactive effects
  useEffect(() => {
   const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.5 ? 'bg-blue-400' : 'bg-purple-400'
    }));
    setParticles(newParticles);
  }, []);

  // Pulsing glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        const newIntensity = 0.3 + Math.sin(Date.now() * 0.002) * 0.2;
        return newIntensity;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Code, label: "Advanced Editor", color: "text-blue-400" },
    { icon: Palette, label: "Custom Themes", color: "text-purple-400" },
    { icon: Settings, label: "Pro Settings", color: "text-cyan-400" },
    { icon: Rocket, label: "AI Boost", color: "text-pink-400" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-purple-950/20" />
      
      {/* Dynamic Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-1 h-1 ${particle.color} rounded-full animate-pulse`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.1}s`,
            transform: `translate(${Math.sin(Date.now() * 0.001 + particle.id) * 20}px, ${Math.cos(Date.now() * 0.001 + particle.id) * 20}px)`
          }}
        />
      ))}

      {/* Cursor Following Glow */}
      <div
        className="fixed pointer-events-none z-10 w-96 h-96 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          opacity: glowIntensity
        }}
      />

      <div className="relative z-20 px-4 min-h-screen flex items-center justify-center">
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Outer Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700" />
            
            {/* Border Animation */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 p-[2px] group-hover:animate-spin-slow">
              <div className="w-full h-full bg-black/90 rounded-3xl" />
            </div>

            {/* Main Content */}
            <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-slate-700/50 backdrop-blur-2xl rounded-3xl p-12 group-hover:scale-[1.02] transition-all duration-500">
              
              {/* Header Section */}
              <div className="text-center mb-12">
                {/* Crown Icon with Animation */}
                <div className="relative inline-flex p-6 rounded-3xl bg-gradient-to-br from-yellow-500/20 via-purple-500/20 to-blue-500/20 mb-8 ring-2 ring-yellow-500/30 group-hover:ring-yellow-400/50 transition-all duration-300">
                  <Crown className="w-12 h-12 text-yellow-400 group-hover:text-yellow-300 transition-colors animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-500/10 rounded-3xl animate-pulse" />
                  
                  {/* Sparkles around crown */}
                  {[...Array(6)].map((_, i) => (
                    <Sparkles 
                      key={i}
                      className="absolute w-4 h-4 text-yellow-400 animate-ping" 
                      style={{
                        top: `${Math.sin(i * Math.PI / 3) * 40 + 50}%`,
                        left: `${Math.cos(i * Math.PI / 3) * 40 + 50}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>

                <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 tracking-tight">
                  Pro Plan Active
                </h1>
                
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Unlock the full potential of professional development with premium features, 
                  advanced AI assistance, and unlimited creative possibilities.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group/feature"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <feature.icon className={`w-4 h-4 ${feature.color} group-hover/feature:scale-110 transition-transform`} />
                      <span className="text-slate-300 text-sm font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative">
                <button className="relative w-full group/button overflow-hidden">
                  {/* Button Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                  
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/button:animate-shimmer" />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-3 px-8 py-6 text-white font-semibold text-lg">
                    <Command className="w-6 h-6 text-blue-200 group-hover/button:text-white group-hover/button:scale-110 transition-all duration-300" />
                    <span className="group-hover/button:text-white transition-colors">Open Pro Editor</span>
                    <ArrowRight className="w-6 h-6 text-purple-200 group-hover/button:text-white group-hover/button:translate-x-1 group-hover/button:scale-110 transition-all duration-300" />
                  </div>
                </button>

                {/* Button Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-2xl blur-xl opacity-0 group-hover/button:opacity-60 transition-opacity duration-300 -z-10" />
              </div>

              {/* Stats Section */}
              <div className="mt-12 pt-12 border-t border-slate-700/50">
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { value: "∞", label: "AI Generations", icon: Zap },
                    { value: "24/7", label: "Priority Support", icon: Star },
                    { value: "100+", label: "Premium Features", icon: Sparkles }
                  ].map((stat, index) => (
                    <div key={index} className="text-center group/stat">
                      <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover/stat:scale-110 transition-transform" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-float-delayed" />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse" />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ProPlanView;