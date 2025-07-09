import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { 
  Activity, 
  Code2, 
  Star, 
  Timer, 
  TrendingUp, 
  Trophy, 
  UserIcon, 
  Zap, 
  Calendar,
  Sparkles,
  Flame,
  Award,
  ChevronRight,
  Globe
} from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Id } from "../../../../convex/_generated/dataModel";
import { UserResource } from "@clerk/types";
import { useState, useEffect } from "react";

interface ProfileHeaderProps {
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    languages: string[];
    last24Hours: number;
    favoriteLanguage: string;
    languageStats: Record<string, number>;
    mostStarredLanguage: string;
  };
  userData: {
    _id: Id<"users">;
    _creationTime: number;
    proSince?: number | undefined;
    lemonSqueezyCustomerId?: string | undefined;
    lemonSqueezyOrderId?: string | undefined;
    name: string;
    userId: string;
    email: string;
    isPro: boolean;
  };
  user: UserResource;
}

function ProfileHeader({ userStats, userData, user }: ProfileHeaderProps) {
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Enhanced mouse tracking for interactive effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Calculate member duration
  const memberSince = new Date(userData._creationTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  const proSince = userData.proSince ? new Date(userData.proSince).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  }) : null;

  // Enhanced stats with more detailed metrics
  const STATS = [
    {
      label: "Code Executions",
      value: userStats?.totalExecutions ?? 0,
      icon: Activity,
      color: "from-blue-500 via-cyan-500 to-teal-500",
      accentColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      description: "Total code runs",
      metric: {
        label: "Last 24h",
        value: userStats?.last24Hours ?? 0,
        icon: Timer,
        trend: userStats?.last24Hours > 0 ? "up" : "neutral"
      },
      achievement: userStats?.totalExecutions > 1000 ? "Power User" : 
                   userStats?.totalExecutions > 100 ? "Active Coder" : "Getting Started"
    },
    {
      label: "Starred Snippets",
      value: starredSnippets?.length ?? 0,
      icon: Star,
      color: "from-yellow-500 via-orange-500 to-red-500",
      accentColor: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      description: "Saved for later",
      metric: {
        label: "Most starred",
        value: userStats?.mostStarredLanguage ?? "N/A",
        icon: Trophy,
        trend: "neutral"
      },
      achievement: (starredSnippets?.length ?? 0) > 50 ? "Collector" : 
                   (starredSnippets?.length ?? 0) > 10 ? "Organizer" : "Explorer"
    },
    {
      label: "Languages Used",
      value: userStats?.languagesCount ?? 0,
      icon: Code2,
      color: "from-purple-500 via-pink-500 to-rose-500",
      accentColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      description: "Different languages",
      metric: {
        label: "Most used",
        value: userStats?.favoriteLanguage ?? "N/A",
        icon: TrendingUp,
        trend: "neutral"
      },
      achievement: userStats?.languagesCount > 10 ? "Polyglot" : 
                   userStats?.languagesCount > 5 ? "Multi-skilled" : "Focused"
    },
  ];

  // Animated counter hook
  const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration]);
    
    return count;
  };

  return (
    <div
      className="relative mb-8 bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#1a1a2e] 
      rounded-3xl p-8 border border-gray-800/50 overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 20}%`,
              top: `${80 - i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
          <div className="relative group/avatar">
            {/* Avatar glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
            rounded-full blur-xl opacity-50 group-hover/avatar:opacity-100 transition-all duration-500 
            animate-pulse" />
            
            {/* Avatar ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r 
            from-blue-500 to-purple-500 opacity-50 group-hover/avatar:opacity-100 transition-opacity" />
            
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-gray-800/50 relative z-10 
              group-hover/avatar:scale-110 transition-all duration-500 shadow-2xl"
            />
            
            {/* Status indicators */}
            {userData.isPro && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-purple-600 
                p-2 rounded-full z-20 shadow-lg"
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
            )}
            
            {/* Activity indicator */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full 
            border-2 border-gray-900 z-20 animate-pulse" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 
                  to-purple-100 bg-clip-text text-transparent">
                    {userData.name}
                  </h1>
                  {userData.isPro && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r 
                      from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30"
                    >
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 font-medium text-sm">Pro Member</span>
                    </motion.div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats bar */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">
                  {userStats?.last24Hours > 0 ? `${userStats.last24Hours} runs today` : 'No runs today'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">
                  {userStats?.languagesCount} languages mastered
                </span>
              </div>
              {userData.isPro && proSince && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">Pro since {proSince}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, index) => {
            const animatedValue = useCountUp(typeof stat.value === 'number' ? stat.value : 0, 2000 + index * 200);
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                key={index}
                className="group/card relative bg-gradient-to-br from-black/60 via-black/40 to-black/20 
                rounded-2xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 
                transition-all duration-500 hover:scale-105 cursor-pointer"
                whileHover={{ y: -5 }}
              >
                {/* Dynamic glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 
                group-hover/card:opacity-20 transition-all duration-700`} />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 
                to-transparent -translate-x-full group-hover/card:translate-x-full duration-1000 
                transition-transform" />

                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {stat.description}
                        </span>
                        <div className={`px-2 py-1 ${stat.bgColor} rounded-full text-xs font-medium ${stat.accentColor}`}>
                          {stat.achievement}
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-3xl font-bold text-white tracking-tight">
                          {typeof stat.value === "number" ? animatedValue.toLocaleString() : stat.value}
                        </h3>
                        {stat.metric.trend === "up" && (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                    
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg 
                    group-hover/card:shadow-xl transition-all duration-500`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Enhanced metric section */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                    <div className="flex items-center gap-2">
                      <stat.metric.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-400">{stat.metric.label}:</span>
                      <span className="text-sm font-medium text-white">{stat.metric.value}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover/card:text-gray-400 
                    transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress indicators */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATS.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-800/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((typeof stat.value === 'number' ? stat.value : 0) / 100, 1) * 100}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                />
              </div>
              <span className="text-xs text-gray-500 min-w-[60px]">
                {typeof stat.value === 'number' ? `${Math.min(stat.value, 100)}%` : '0%'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;