"use client";

import {
  Blocks,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      update(canvas: HTMLCanvasElement) {
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(168, 85, 247, 0.6)";
        ctx.strokeStyle = "rgba(168, 85, 247, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 0.4 - 0.2;
        const speedY = Math.random() * 0.4 - 0.2;
        particles.push(new Particle(x, y, size, speedX, speedY));
      }
    };

    const connect = () => {
      if (!canvas || !ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update(canvas);
        particle.draw(ctx);
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    init();
    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative mt-auto overflow-hidden bg-slate-900">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full opacity-50" />
      <div className="pointer-events-none absolute inset-0 z-10 transition duration-300" style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 80%)`,
      }} />

      <div className="relative max-w-7xl mx-auto px-6 py-16 z-20">
        <div className="relative backdrop-blur-xl bg-white/[0.08] rounded-3xl border border-white/20 p-10 shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-500 group">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-shine-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-10 relative">
            <div className="flex items-center gap-5 group/brand">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-60 group-hover/brand:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg group-hover/brand:shadow-purple-500/50 transition-shadow duration-500">
                  <Blocks className="size-7 text-white drop-shadow-lg group-hover/brand:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Built for developers
                </h3>
                <p className="text-gray-400 mt-1 group-hover/brand:text-gray-300 transition-colors duration-300">
                  by developers who care
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/TanvirHassanSayem", label: "GitHub", color: "from-gray-600 to-gray-800" },
                { icon: Twitter, href: "#", label: "Twitter", color: "from-blue-400 to-blue-600" },
                { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-600 to-blue-800" },
                { icon: Mail, href: "mailto:tanvirsayem431@gmail.com", label: "Contact", color: "from-purple-500 to-pink-500" }
              ].map(({ icon: Icon, href, label, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="group/social relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={label}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover/social:opacity-20 transition-opacity duration-300`} />
                  <Icon className="size-5 text-gray-400 group-hover/social:text-white transition-colors duration-300 relative z-10 group-hover/social:drop-shadow-lg" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-10">
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
                  className="group/nav relative text-gray-400 hover:text-white transition-all duration-300 font-medium hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {label}
                    <ExternalLink className="size-3 opacity-0 group-hover/nav:opacity-100 transition-all duration-300 group-hover/nav:translate-x-1" />
                  </span>
                  <div className="absolute inset-x-0 -bottom-2 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 text-gray-500 group/copy">
              <span className="group-hover/copy:text-gray-400 transition-colors">Made with brilliance</span>
              <Heart className="size-4 text-red-500 animate-pulse group-hover/copy:scale-110 transition-transform duration-300" />
              <span className="group-hover/copy:text-gray-400 transition-colors">© 2025</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group/status">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-sm text-gray-400 group-hover/status:text-gray-300 transition-colors font-medium">
              All systems operational
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-purple-900/40 via-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-pink-900/20 via-pink-900/10 to-transparent pointer-events-none" />
    </footer>
  );
}

export default Footer;
