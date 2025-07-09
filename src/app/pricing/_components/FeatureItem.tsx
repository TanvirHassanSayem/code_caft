"use client";

import { useState, useEffect } from "react";
import { Check, Sparkles, Zap, Crown, Star } from "lucide-react";

const FeatureItem = ({ 
  children, 
  isPremium = false,
  isNew = false,
  isPopular = false 
}: { 
  children: React.ReactNode;
  isPremium?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0.3);
  const [checkAnimated, setCheckAnimated] = useState(false);

  // Simple visibility on mount
  useEffect(() => {
    setIsVisible(true);
    // Delayed check animation
    setTimeout(() => setCheckAnimated(true), 300);
  }, []);

  // Pulsing effect for premium features
  useEffect(() => {
    if (isPremium) {
      const interval = setInterval(() => {
        setPulseIntensity(prev => 0.3 + Math.sin(Date.now() * 0.003) * 0.2);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPremium]);

  // Get icon and colors based on feature type
  const getFeatureStyles = () => {
    if (isPremium) {
      return {
        icon: Crown,
        iconColor: "text-yellow-400",
        bgGradient: "from-yellow-500/20 via-orange-500/20 to-red-500/20",
        borderGradient: "from-yellow-500/40 via-orange-500/40 to-red-500/40",
        hoverBorderGradient: "from-yellow-400/60 via-orange-400/60 to-red-400/60",
        textGradient: "from-yellow-400 via-orange-400 to-red-400",
        glowColor: "shadow-yellow-500/20"
      };
    } else if (isNew) {
      return {
        icon: Sparkles,
        iconColor: "text-green-400",
        bgGradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
        borderGradient: "from-green-500/40 via-emerald-500/40 to-teal-500/40",
        hoverBorderGradient: "from-green-400/60 via-emerald-400/60 to-teal-400/60",
        textGradient: "from-green-400 via-emerald-400 to-teal-400",
        glowColor: "shadow-green-500/20"
      };
    } else if (isPopular) {
      return {
        icon: Star,
        iconColor: "text-purple-400",
        bgGradient: "from-purple-500/20 via-pink-500/20 to-blue-500/20",
        borderGradient: "from-purple-500/40 via-pink-500/40 to-blue-500/40",
        hoverBorderGradient: "from-purple-400/60 via-pink-400/60 to-blue-400/60",
        textGradient: "from-purple-400 via-pink-400 to-blue-400",
        glowColor: "shadow-purple-500/20"
      };
    } else {
      return {
        icon: Check,
        iconColor: "text-blue-400",
        bgGradient: "from-blue-500/20 via-cyan-500/20 to-indigo-500/20",
        borderGradient: "from-blue-500/40 via-cyan-500/40 to-indigo-500/40",
        hoverBorderGradient: "from-blue-400/60 via-cyan-400/60 to-indigo-400/60",
        textGradient: "from-blue-400 via-cyan-400 to-indigo-400",
        glowColor: "shadow-blue-500/20"
      };
    }
  };

  const styles = getFeatureStyles();
  const IconComponent = styles.icon;

  return (
    <div 
      className={`relative group transition-all duration-700 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div 
        className={`absolute -inset-2 bg-gradient-to-r ${styles.bgGradient} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ${styles.glowColor}`}
        style={{ opacity: isPremium ? pulseIntensity * 0.5 : undefined }}
      />
      
      {/* Main Container */}
      <div className="relative flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-slate-900/20 via-slate-800/10 to-slate-900/20 backdrop-blur-sm border border-slate-700/20 group-hover:border-slate-600/40 group-hover:from-slate-800/30 group-hover:via-slate-700/20 group-hover:to-slate-800/30 transition-all duration-500">
        
        {/* Enhanced Icon Container */}
        <div className="relative flex-shrink-0 mt-1">
          {/* Outer Ring */}
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${styles.bgGradient} p-[2px] ${styles.glowColor} group-hover:shadow-lg transition-all duration-300`}>
            <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
              {/* Icon */}
              <IconComponent 
                className={`w-4 h-4 ${styles.iconColor} transition-all duration-300 ${
                  checkAnimated ? 'scale-100' : 'scale-0'
                } group-hover:scale-110`}
              />
            </div>
          </div>
          
          {/* Animated Check Ripple */}
          {checkAnimated && (
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${styles.borderGradient} animate-ping opacity-30`} />
          )}
          
          {/* Premium Pulse Effect */}
          {isPremium && (
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-400/30 animate-pulse"
              style={{ opacity: pulseIntensity }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            {/* Text Content */}
            <span className={`text-slate-300 group-hover:text-white transition-all duration-300 ${
              isPremium || isNew || isPopular ? `bg-gradient-to-r ${styles.textGradient} bg-clip-text group-hover:text-transparent` : ''
            }`}>
              {children}
            </span>
            
            {/* Feature Badges */}
            <div className="flex gap-1">
              {isPremium && (
                <div className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  PRO
                </div>
              )}
              {isNew && (
                <div className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  NEW
                </div>
              )}
              {isPopular && (
                <div className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                  ★
                </div>
              )}
            </div>
          </div>
          
          {/* Animated Underline */}
          <div className={`h-0.5 w-0 bg-gradient-to-r ${styles.borderGradient} group-hover:w-full transition-all duration-500 rounded-full mt-2`} />
        </div>
      </div>

      {/* Hover Shimmer Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 pointer-events-none" />
      
      {/* Floating Particles for Premium */}
      {isPremium && (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-pulse pointer-events-none"
              style={{
                left: `${10 + i * 20}%`,
                top: `${5 + i * 10}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${1.5 + i * 0.5}s`
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FeatureItem;