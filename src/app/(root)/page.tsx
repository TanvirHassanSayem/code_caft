import { memo, Suspense, lazy } from 'react';
import ClientHeroSection from '../(root)/ClientHeroSection';
import DeviceStatusIndicator from '../(root)/DeviceStatusIndicator';

// Lazy load components for better performance
const EditorPanel = lazy(() => import("../_components/EditorPanel"));
const OutputPanel = lazy(() => import("../_components/OutputPanel"));
const Header = lazy(() => import("../_components/Header"));
const LoadingWrapper = lazy(() => import("../_components/LoadingWrapper"));

// TypeScript interfaces
interface StatusIndicatorProps {
  color?: string;
  label?: string;
}

interface KeyboardShortcutProps {
  keys: string;
  label: string;
  hoverColor?: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

interface PanelHeaderProps {
  title: string;
  icon: string;
  color: string;
  status: string;
}

// Memoized components for better performance
const AnimatedBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-3/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
    <div className="absolute bottom-1/4 left-1/2 w-36 h-36 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
  </div>
));

const StatusIndicator = memo(({ color = "emerald", label = "Ready" }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <div className="relative">
      <div className={`w-3 h-3 bg-${color}-400 rounded-full animate-ping absolute`}></div>
      <div className={`w-3 h-3 bg-${color}-400 rounded-full`}></div>
    </div>
    <span className="text-xs font-medium">{label}</span>
  </div>
));

const KeyboardShortcut = memo(({ keys, label, hoverColor = "pink" }: KeyboardShortcutProps) => (
  <div className={`flex items-center gap-2 hover:text-${hoverColor}-400 transition-colors cursor-pointer`}>
    <kbd className="px-2 py-1 bg-slate-700/50 rounded text-xs border border-slate-600/50">
      {keys}
    </kbd>
    <span className="text-sm">{label}</span>
  </div>
));

const FeatureCard = memo(({ icon, title, description, gradient }: FeatureCardProps) => (
  <div className="group hover:scale-105 transition-transform duration-300">
    <div className={`bg-gradient-to-br ${gradient} p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-opacity-20 hover:border-opacity-40 backdrop-blur-sm transition-all duration-300`}>
      <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 group-hover:animate-bounce">
        {icon}
      </div>
      <h4 className="text-base sm:text-lg font-semibold text-slate-200 mb-2">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
));

const PanelHeader = memo(({ title, icon, color, status }: PanelHeaderProps) => (
  <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-opacity-20">
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex gap-1.5 sm:gap-2">
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full shadow-lg hover:shadow-red-500/50 transition-shadow cursor-pointer"></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full shadow-lg hover:shadow-yellow-500/50 transition-shadow cursor-pointer"></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full shadow-lg hover:shadow-green-500/50 transition-shadow cursor-pointer"></div>
      </div>
      <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent group-hover:opacity-90 transition-all`}>
        {icon} {title}
      </h2>
    </div>
    <div className="text-xs text-slate-400 bg-slate-700/50 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-slate-600/50 backdrop-blur-sm">
      <StatusIndicator label={status} />
    </div>
  </div>
));

const ComponentFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <Suspense fallback={<ComponentFallback />}>
      <LoadingWrapper>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative rounded-4xl overflow-hidden">

          {/* Optimized Background */}
          <AnimatedBackground />

          {/* Device Indicator Top Right */}
          <div className="fixed top-4 right-4 z-50 bg-slate-800/90 backdrop-blur-xl rounded-xl px-4 py-3 shadow-2xl border border-slate-700/50 hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 select-none">
            <DeviceStatusIndicator />
          </div>

          {/* Simplified grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>

          <div className="relative z-10 max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">

            {/* Hero Section - Now using client component */}
            <ClientHeroSection />

            {/* Optimized Header */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 border border-white/20 hover:shadow-purple-500/20 hover:border-purple-400/30 transition-all duration-300">
              <Suspense fallback={<ComponentFallback />}>
                <Header />
              </Suspense>
            </div>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

              {/* Editor Panel */}
              <div className="group relative" id="editor-panel">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-800/90 via-purple-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-pink-400/30 hover:shadow-pink-500/25 transition-all duration-300 hover:border-pink-400/50 transform hover:scale-[1.01]">

                  <PanelHeader 
                    title="Code Editor" 
                    icon="🚀" 
                    color="from-pink-400 to-purple-400" 
                    status="Ready to code"
                  />

                  <div className="p-3 sm:p-4 lg:p-6">
                    <Suspense fallback={<ComponentFallback />}>
                      <EditorPanel />
                    </Suspense>
                  </div>

                  <div className="p-3 sm:p-4 lg:p-6 border-t border-pink-400/20 bg-gradient-to-r from-pink-500/5 to-purple-500/5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-slate-300">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
                        <KeyboardShortcut keys="⌘+S" label="Save" />
                        <KeyboardShortcut keys="⌘+Z" label="Undo" />
                        <KeyboardShortcut keys="⌘+/" label="Comment" />
                      </div>
                      <div className="flex items-center gap-2 bg-slate-700/30 px-3 py-1 rounded-full">
                        <StatusIndicator color="green" label="Editor Ready" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Output Panel */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-slate-800/90 via-emerald-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-emerald-400/30 hover:shadow-emerald-500/25 transition-all duration-300 hover:border-emerald-400/50 transform hover:scale-[1.01]">

                  <PanelHeader 
                    title="Output Terminal" 
                    icon="⚡" 
                    color="from-emerald-400 to-blue-400" 
                    status="Live output"
                  />

                  <div className="p-3 sm:p-4 lg:p-6">
                    <Suspense fallback={<ComponentFallback />}>
                      <OutputPanel />
                    </Suspense>
                  </div>

                  <div className="p-3 sm:p-4 lg:p-6 border-t border-emerald-400/20 bg-gradient-to-r from-emerald-500/5 to-blue-500/5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 text-slate-300">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
                        <KeyboardShortcut keys="⌘+R" label="Run" hoverColor="emerald" />
                        <KeyboardShortcut keys="⌘+L" label="Clear" hoverColor="emerald" />
                        <KeyboardShortcut keys="⌘+K" label="Debug" hoverColor="emerald" />
                      </div>
                      <div className="flex items-center gap-2 bg-slate-700/30 px-3 py-1 rounded-full">
                        <StatusIndicator color="blue" label="Monitoring" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Features Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-2xl sm:rounded-3xl blur-xl"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-700/50">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                    ✨ Pro Features
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base lg:text-lg">Unlock the full potential of your coding experience</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  <FeatureCard 
                    icon="🎨" 
                    title="Smart Editor" 
                    description="Advanced syntax highlighting with intelligent autocomplete"
                    gradient="from-purple-500/10 to-pink-500/10 border-purple-400/20 hover:border-purple-400/40"
                  />
                  <FeatureCard 
                    icon="⚡" 
                    title="Real-time Output" 
                    description="Instant execution with live error detection and debugging"
                    gradient="from-emerald-500/10 to-blue-500/10 border-emerald-400/20 hover:border-emerald-400/40"
                  />
                  <FeatureCard 
                    icon="🔧" 
                    title="Power Tools" 
                    description="Advanced shortcuts and productivity enhancements"
                    gradient="from-yellow-500/10 to-orange-500/10 border-yellow-400/20 hover:border-yellow-400/40"
                  />
                  <FeatureCard 
                    icon="🚀" 
                    title="Performance" 
                    description="Lightning-fast execution with optimized rendering"
                    gradient="from-pink-500/10 to-red-500/10 border-pink-400/20 hover:border-pink-400/40"
                  />
                </div>
              </div>
            </div>

            {/* Mobile-responsive Status Indicators */}
            <div className="fixed bottom-4 right-4 z-50 hidden sm:block">
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-2xl border border-slate-700/50 hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3">
                  <StatusIndicator />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-200">System Status</span>
                    <span className="text-xs text-slate-400">All services operational</span>
                    <DeviceStatusIndicator />
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-4 left-4 z-50 hidden lg:block">
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-2xl border border-slate-700/50 hover:shadow-blue-500/25 transition-all duration-300">
                <div className="flex items-center gap-2 sm:gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>CPU: 12%</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>RAM: 248MB</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>12ms</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </LoadingWrapper>
    </Suspense>
  );
}


