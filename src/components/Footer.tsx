import { Blocks, Github, Twitter, Linkedin, Mail, ExternalLink, Heart } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(147,51,234,0.1),transparent_120deg)]" />
      </div>
      
      {/* Animated particles/dots */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/50 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Top border with enhanced gradient */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-purple-500/80 to-transparent" />
      <div className="absolute inset-x-0 -top-2 h-4 bg-gradient-to-b from-purple-500/20 to-transparent blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main content with glass morphism */}
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Top section with enhanced branding */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                  <Blocks className="size-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Built for developers
                </h3>
                <p className="text-sm text-gray-400 mt-1">by developers who care</p>
              </div>
            </div>

            {/* Social links with hover effects */}
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/TanvirHassanSayem", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:tanvirsayem431@gmail.com", label: "Contact" }
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon className="size-5 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation links with enhanced styling */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-8">
              {[
                { href: "/support", label: "Support" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/docs", label: "Documentation" },
                { href: "/api", label: "API Reference" }
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  <span className="relative z-10 flex items-center gap-1">
                    {label}
                    <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </span>
                  <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* Enhanced copyright with animation */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="size-4 text-red-500 animate-pulse" />
              <span>© 2024</span>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-900/30 via-purple-900/10 to-transparent pointer-events-none" />
    </footer>
  );
}

export default Footer;