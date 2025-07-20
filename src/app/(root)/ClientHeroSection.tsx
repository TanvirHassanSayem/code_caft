"use client";

import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";

// --- Aurora Animated Background (Modern/Beast Mode) ---
const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
  if (!canvas) return; // <-- add this!
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}
  
    resize();
    window.addEventListener("resize", resize);

    let animationId: number;
    const lines = 4; // how many aurora ribbons
    const points = 28; // how smooth
    const colors = [
      ["#00eaff", "#ff5de6"], // cyan -> pink
      ["#ffaa2b", "#7f70f5"], // orange -> blue
      ["#20ffb8", "#ffa49a"], // green -> peach
      ["#f093fb", "#f5576c"]  // purple -> pink
    ];

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const t = performance.now() * 0.0003;

      for (let j = 0; j < lines; j++) {
        ctx.save();
        // Aurora position and parallax drift
        const baseY = h * (0.28 + 0.18 * j) + mouse.y * 140 * (0.6 - j * 0.11);
        ctx.globalAlpha = 0.48 - j * 0.07;
        ctx.shadowColor = colors[j][1];
        ctx.shadowBlur = 32 + 10 * j;

        // Aurora gradient
        const grad = ctx.createLinearGradient(0, baseY - 60, w, baseY + 60);
        grad.addColorStop(0, colors[j][0]);
        grad.addColorStop(1, colors[j][1]);
        ctx.strokeStyle = grad;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const x = (w / points) * i;
          // Sine + Perlin style, but all CPU, so stay smooth
          const y =
            baseY +
            Math.sin(t * 1.3 + i * 0.4 + j * 0.7) * (35 + 7 * j) +
            Math.cos(t * 1.8 + i * 0.2 + j * 2) * (19 + 10 * j) +
            Math.sin(t * 2.4 + i * 0.12 - j) * (13 + 4 * j) +
            mouse.x * 110 * (1.3 - j * 0.2);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = 8 + 3 * (lines - j);
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [mouse.x, mouse.y]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        filter: "blur(0.5px)"
      }}
      aria-hidden
    />
  );
};

// --- Your Existing Status Indicator (Unchanged) ---
interface StatusIndicatorProps {
  color?: string;
  label?: string;
}

const StatusIndicator = memo(
  ({ color = "pink", label = "Ready" }: StatusIndicatorProps) => (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <div
          className={`w-2 h-2 bg-${color}-400 rounded-full animate-ping absolute opacity-75`}
        ></div>
        <div className={`w-2 h-2 bg-${color}-400 rounded-full`}></div>
      </div>
      <span className="text-xs font-medium text-slate-300">{label}</span>
    </div>
  )
);

// --- The Main Hero Section ---
const ClientHeroSection = memo(() => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // --- Animated heading logic ---
  const words = ["Build", "Test", "Deploy"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % words.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  const handleStartBuilding = () => {
    const editorPanel = document.getElementById("editor-panel");
    if (editorPanel) {
      editorPanel.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleViewDocumentation = () => {
    window.open(
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      "_blank"
    );
  };

  const ParticleGlowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // --- Particle Data
    const count = 64;
    const particles = Array.from({ length: count }).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: 0.0015 + Math.random() * 0.0015,
      vy: 0.0015 + Math.random() * 0.0015,
      size: 1 + Math.random() * 2.8,
      phase: Math.random() * Math.PI * 2,
    }));

    let animationId: number;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const t = performance.now() * 0.00015;

      // --- Animate & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        // Move particle
        p.x += (Math.sin(t + p.phase) * p.vx + 0.0007 * mouse.x);
        p.y += (Math.cos(t + p.phase) * p.vy + 0.0007 * mouse.y);

        // Loop around edges
        if (p.x > 1) p.x -= 1;
        if (p.y > 1) p.y -= 1;
        if (p.x < 0) p.x += 1;
        if (p.y < 0) p.y += 1;

        // Particle color (cool blue/purple/cyan shift)
        const color = `hsl(${210 + 50 * Math.sin(t + p.phase)},80%,${62 + 18 * Math.cos(t + p.phase * 2)}%)`;

        // Draw Glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size * (1.4 + Math.sin(t * 2 + p.phase) * 0.2), 0, Math.PI * 2);
        ctx.shadowColor = color;
        ctx.shadowBlur = 24 + 10 * p.size;
        ctx.globalAlpha = 0.19 + 0.18 * Math.sin(t + p.phase * 3);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      }

      // --- Subtle connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.save();
            ctx.strokeStyle = "rgba(120,220,255,0.11)";
            ctx.lineWidth = 1.25 * (1 - dist / 120);
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [mouse.x, mouse.y]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        filter: "blur(0.5px)"
      }}
      aria-hidden
    />
  );
};

  return (
    <div className="relative py-8 sm:py-12 mb-8 overflow-hidden bg-black">
      {/* --- Aurora Animated Background --- */}
     <ParticleGlowBackground />
      {/* Warm Coral/Peach Glow Background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-50 via-pink-100/60 to-orange-50 pointer-events-none"></div>
      {/* Soft Coral Radial Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-pink-400/50 blur-3xl animate-pulse pointer-events-none"></div>
      {/* Gentle Peach Light Rays */}
      <div className="absolute top-8 left-8 w-96 h-96 rounded-full bg-orange-300/30 blur-xl animate-slow-spin pointer-events-none"></div>
      {/* Floating Soft Light Orbs */}
      <div className="absolute top-20 right-16 w-16 h-16 bg-pink-300/30 rounded-full blur-md animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-24 left-20 w-28 h-28 bg-orange-200/30 rounded-full blur-lg animate-pulse delay-1000 pointer-events-none"></div>

      <div className="relative px-6 text-center z-20">
        {/* Status Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-rose-100/60 backdrop-blur-md border border-rose-300/50 rounded-full shadow-lg">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-rose-900">
            Developer Platform
          </span>
        </div>

        {/* Main Heading - Animated */}
        <div className="flex flex-col items-center justify-center mb-2" style={{ minHeight: "3em" }}>
          <span
            key={words[current]}
            className="block bg-gradient-to-r from-pink-400 via-rose-300 to-orange-300 bg-clip-text text-transparent animate-pulse font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none transition-opacity duration-400"
            style={{
              minHeight: "1.0em",
              marginBottom: "0em",
              lineHeight: 1,
            }}
          >
            {words[current]}.
          </span>
          <span className="block text-rose-900 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light mt-2">
            All in One Platform
          </span>
        </div>

        <Link
          href="https://client-gules-omega-70.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group inline-flex items-center gap-1.5 md:gap-2 lg:gap-3 px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-lg md:rounded-xl lg:rounded-2xl bg-black/90 text-white border border-cyan-400/50 md:border-2 shadow-[0_0_10px_rgba(6,182,212,0.4)] md:shadow-[0_0_15px_rgba(6,182,212,0.5)] lg:shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-xl overflow-hidden transition-all duration-300 ease-out transform hover:scale-105 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.7)] md:hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] animate-pulse flex-shrink-0"
        >
          {/* Simplified effects for smaller screens */}
          <div className="absolute inset-0 opacity-10 md:opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:15px_15px] md:bg-[size:20px_20px]"></div>
          </div>

          {/* Neon borders - responsive */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse delay-1000"></div>
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse delay-500"></div>
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_5px_rgba(6,182,212,0.6)] md:shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse delay-1500"></div>

          {/* Corner brackets - responsive */}
          <div className="absolute top-1 left-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-l border-t border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse"></div>
          <div className="absolute top-1 right-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-r border-t border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse delay-200"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-l border-b border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse delay-400"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 border-r border-b border-cyan-400 shadow-[0_0_3px_rgba(6,182,212,0.6)] md:shadow-[0_0_5px_rgba(6,182,212,0.8)] animate-pulse delay-600"></div>

          {/* Cyberpunk Icon */}
          <div className="relative z-10 p-1 md:p-2 lg:p-3 rounded md:rounded-lg bg-black/80 border border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.5)] md:shadow-[0_0_12px_rgba(6,182,212,0.6)] lg:shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.7)] md:group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] lg:group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all duration-300 group-hover:scale-110 backdrop-blur-sm flex-shrink-0">
            <div className="absolute inset-0 bg-cyan-400/20 rounded md:rounded-lg animate-pulse"></div>
            <span className="text-sm md:text-lg lg:text-xl xl:text-2xl relative z-10 inline-block transform group-hover:scale-125 transition-transform duration-300 filter drop-shadow-[0_0_4px_rgba(6,182,212,0.6)] md:drop-shadow-[0_0_6px_rgba(6,182,212,0.8)] lg:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-bounce">
              🚀
            </span>
          </div>

          {/* Responsive Text */}
          <div className="relative z-10 flex flex-col items-start min-w-0">
            <span className="text-xs md:text-sm lg:text-base xl:text-lg font-black tracking-wider md:tracking-widest text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.6)] md:drop-shadow-[0_0_6px_rgba(6,182,212,0.8)] lg:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] md:group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,1)] lg:group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,1)] transition-all duration-300 group-hover:scale-105 font-mono uppercase whitespace-nowrap">
              CODE SYNC
            </span>
            <span className="hidden md:block text-[0.6rem] lg:text-xs text-cyan-300/80 font-bold tracking-[0.15em] lg:tracking-[0.2em] group-hover:text-cyan-200 transition-all duration-300 opacity-80 group-hover:opacity-100 transform translate-y-0.5 group-hover:translate-y-0 font-mono uppercase drop-shadow-[0_0_3px_rgba(6,182,212,0.5)] lg:drop-shadow-[0_0_4px_rgba(6,182,212,0.6)] whitespace-nowrap">
              &gt; Collaboration
            </span>
          </div>

          {/* Terminal Cursor */}
          <div className="absolute right-1 md:right-2 lg:right-3 xl:right-4 top-1/2 transform -translate-y-1/2 w-1 md:w-1.5 lg:w-2 h-2 md:h-3 lg:h-4 bg-cyan-400 animate-pulse opacity-80 shadow-[0_0_4px_rgba(6,182,212,0.6)] md:shadow-[0_0_6px_rgba(6,182,212,0.8)] lg:shadow-[0_0_8px_rgba(6,182,212,0.8)] flex-shrink-0"></div>
        </Link>

        <p className="text-base sm:text-lg text-rose-900 max-w-xl mx-auto mt-2 mb-8 leading-relaxed">
          Professional development tools that scale with your team and
          accelerate your workflow
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { icon: "⚡", text: "Fast Deploy" },
            { icon: "🔧", text: "Debug Tools" },
            { icon: "👥", text: "Team Ready" },
            { icon: "☁️", text: "Cloud Native" },
          ].map((feature, index) => (
            <div
              key={feature.text}
              className="px-3 py-1.5 bg-rose-100/50 backdrop-blur-sm border border-rose-300/30 rounded-full text-sm text-rose-900 hover:border-pink-400/50 hover:bg-pink-200/50 transition-all duration-300 cursor-default"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <span className="mr-1">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleStartBuilding}
            className="group px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-600 text-rose-50 font-semibold rounded-2xl hover:from-pink-500 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-pink-500/30"
          >
            <span className="flex items-center justify-center gap-2">
              Start Building
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </button>
          <button
            onClick={handleViewDocumentation}
            className="px-8 py-3 bg-rose-100/70 backdrop-blur-sm border border-rose-300/50 text-rose-900 font-semibold rounded-2xl hover:border-pink-400/50 hover:bg-pink-200/70 hover:text-pink-800 transition-all duration-300"
          >
            Documentation
          </button>
        </div>

        {/* Status Bar */}
        <div className="relative group inline-flex items-center gap-8 px-8 py-4 bg-gradient-to-r from-[#1e215d]/80 via-[#51296e]/60 to-[#0e3749]/90 border border-white/10 backdrop-blur-2xl rounded-full shadow-2xl shadow-indigo-900/30 ring-1 ring-indigo-400/20 transition-transform duration-300 hover:scale-105 hover:shadow-3xl overflow-hidden">

          {/* Animated shimmer */}
          <span className="pointer-events-none absolute inset-0 z-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:blur-lg before:opacity-60 before:animate-[shimmer_2.5s_linear_infinite]" />

          {/* Live */}
          <div className="flex items-center gap-2 z-10">
            <span className="relative flex h-3 w-3">
              {isOnline ? (
                <>
                  {/* This is the "siren" pulsing green effect */}
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                </>
              ) : (
                // This is the static gray dot for offline
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400 opacity-60"></span>
              )}
            </span>
           <button
  className="relative px-6 py-2 rounded-xl font-medium text-white bg-zinc-900 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-pink-500 before:via-yellow-400 before:to-pink-500 before:blur-md before:opacity-70 before:z-[-1] hover:scale-105 hover:before:opacity-100 transition-all duration-200"
  style={{
    boxShadow: "0 0 12px 2px rgba(255,0,128,0.4), 0 0 20px 4px rgba(255,255,0,0.3)"
  }}
>
  Live
</button>
          </div>

          {/* Divider */}
          <div className="w-px h-7 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

          {/* Uptime */}
          <div className="flex items-center gap-2 z-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300 shadow shadow-cyan-400/60"></span>
            </span>
            <span className="text-base font-semibold text-white/80 tracking-wide select-none drop-shadow">99.9% Uptime</span>
          </div>

          {/* Divider */}
          <div className="w-px h-7 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

          {/* Support */}
          <div className="flex items-center gap-2 z-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-300 shadow shadow-pink-400/60"></span>
            </span>
            <span className="text-base font-semibold text-white/80 tracking-wide select-none drop-shadow">24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Custom animation for slow spin */}
      <style jsx>{`
        @keyframes slow-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-slow-spin {
          animation: slow-spin 60s linear infinite;
        }
        @keyframes blink-ambulance {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        .blink-ambulance {
          animation: blink-ambulance 0.5s infinite;
        }
      `}</style>
    </div>
  );
});

ClientHeroSection.displayName = "ClientHeroSection";

export default ClientHeroSection;
