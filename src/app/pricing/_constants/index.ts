import {
  Globe,
  Shield,
  Zap,
  Users,
  BarChart3,
  Code2,
  Rocket,
  Brain,
  Crown,
  Activity,
  Sparkles,
  type LucideIcon
} from "lucide-react";

// -------------------------
// Types
// -------------------------
export type FeatureKey = "development" | "collaboration" | "deployment" | "ai";

export interface FeatureItem {
  icon: LucideIcon;
  label: string;
  desc: string;
  highlight?: boolean;
  badge?: string;
}

export interface FeatureCategory {
  title: string;
  description: string;
  features: string[];
  premium?: boolean;
  icon: LucideIcon;
  gradient: string;
}

// -------------------------
// Enterprise Features
// -------------------------
export const ENTERPRISE_FEATURES: FeatureItem[] = [
  {
    icon: Globe,
    label: "Global Hypernetwork",
    desc: "⚡ Lightning-fast delivery through 300+ quantum edge nodes",
    highlight: true,
    badge: "ULTRA"
  },
  {
    icon: Shield,
    label: "Fortress Security",
    desc: "🛡️ Military-grade zero-trust architecture + SOC 2 Type II",
  },
  {
    icon: Zap,
    label: "Quantum Performance",
    desc: "🚀 Sub-50ms response times with neural caching",
    highlight: true,
    badge: "FASTEST"
  },
  {
    icon: Brain,
    label: "AI Nexus",
    desc: "🧠 GPT-4 Turbo + custom model training ecosystem",
    highlight: true,
    badge: "AI"
  }
];

// -------------------------
// Feature Definitions
// -------------------------
export const FEATURES: Record<FeatureKey, string[]> = {
  development: [
    "🧠 GPT-4 Turbo Code Synthesis",
    "🎨 Neural Theme Designer",
    "🔮 Predictive Error Detection",
    "⚡ Quantum Code Completion",
  ],
  collaboration: [
    "👥 Zero-Latency Pair Programming",
    "🏢 Enterprise Command Center",
    "🔀 Advanced Git Nexus",
    "💬 Contextual Code Intelligence"
  ],
  deployment: [
    "🚀 Zero-Config Hypercloud Deploy",
    "⚙️ Neural CI/CD Pipeline",
    "🐳 Native K8s Integration",
    "🌐 Global CDN Acceleration"
  ],
  ai: [
    "🧠 GPT-4 Turbo Integration",
    "🎨 AI Design Systems",
    "🔍 Neural Code Reviews",
    "📝 Auto Documentation AI"
  ]
};

// -------------------------
// Feature Categories
// -------------------------
export const FEATURE_CATEGORIES: Record<FeatureKey, FeatureCategory> = {
  development: {
    title: "AI-Powered Development",
    description: "🚀 Revolutionary coding with GPT-4 neural intelligence",
    features: FEATURES.development,
    premium: true,
    icon: Code2,
    gradient: "from-blue-600 via-cyan-500 to-teal-400"
  },
  collaboration: {
    title: "Quantum Collaboration",
    description: "⚡ Ultra-modern teamwork with real-time sync",
    features: FEATURES.collaboration,
    icon: Users,
    gradient: "from-green-600 via-emerald-500 to-lime-400"
  },
  deployment: {
    title: "Hypercloud Deploy",
    description: "🌐 Enterprise deployment with multi-cloud mastery",
    features: FEATURES.deployment,
    icon: Rocket,
    gradient: "from-purple-600 via-pink-500 to-rose-400"
  },
  ai: {
    title: "Neural Intelligence",
    description: "🧠 Cutting-edge AI with GPT-4 Turbo",
    features: FEATURES.ai,
    premium: true,
    icon: Brain,
    gradient: "from-violet-600 via-purple-500 to-indigo-400"
  }
};

// -------------------------
// Pricing Tiers
// -------------------------
export const PRICING_TIERS = [
  {
    name: "Pro",
    price: "$19",
    period: "per user/month",
    description: "🔥 Perfect for professional developers",
    features: [
      "∞ Unlimited projects",
      "💾 100GB neural storage",
      "🧠 Advanced AI features",
      "👥 Team collaboration"
    ],
    highlight: false,
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per user/month",
    description: "⚡ Advanced features for large organizations",
    features: [
      "🚀 Everything in Pro",
      "∞ Unlimited storage",
      "🛡️ Fortress security",
      "🎯 24/7 dedicated support"
    ],
    highlight: true,
    cta: "Contact Sales",
    badge: "🔥 MOST POPULAR"
  }
];

// -------------------------
// Stats & Testimonials
// -------------------------
export const STATS = [
  {
    value: "99.99%",
    label: "⚡ Uptime SLA",
    icon: Activity
  },
  {
    value: "100K+",
    label: "🧠 Developers",
    icon: Users
  },
  {
    value: "300+",
    label: "🌐 Edge Locations",
    icon: Globe
  },
  {
    value: "<50ms",
    label: "🚀 Response Time",
    icon: Zap
  }
];

export const TESTIMONIALS = [
  {
    quote: "🚀 This platform completely transformed our workflow. The AI assistance saves us 4+ hours daily.",
    author: "Sarah Chen",
    role: "Principal Engineer",
    company: "Stripe"
  },
  {
    quote: "⚡ The collaboration features are absolutely game-changing. Our 50+ dev team has never been more productive.",
    author: "Marcus Rodriguez",
    role: "VP of Engineering",
    company: "Shopify"
  },
  {
    quote: "🛡️ Enterprise-grade security without compromising developer experience. Absolutely revolutionary.",
    author: "Emily Johnson",
    role: "CTO",
    company: "Coinbase"
  }
];

// -------------------------
// Utility Functions
// -------------------------
export const getFeaturesByCategory = (category: string): string[] | null => {
  if (category in FEATURES) {
    return FEATURES[category as FeatureKey];
  }
  return null;
};

export const getFeatureCategoryData = (category: string): FeatureCategory | null => {
  if (category in FEATURE_CATEGORIES) {
    return FEATURE_CATEGORIES[category as FeatureKey];
  }
  return null;
};

export const getPremiumFeatures = () => {
  return Object.entries(FEATURE_CATEGORIES)
    .filter(([_, category]) => category.premium)
    .map(([key, category]) => ({ key, ...category }));
};

export const getHighlightedFeatures = () => {
  return ENTERPRISE_FEATURES.filter(feature => feature.highlight);
};
