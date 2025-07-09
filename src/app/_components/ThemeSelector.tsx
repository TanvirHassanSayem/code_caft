"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleOff,
  Cloud,
  Github,
  Laptop,
  Moon,
  Palette,
  Snowflake,
  Sun,
} from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
  dracula: <Moon className="size-4" />,
  "one-dark": <Laptop className="size-4" />,
  "night-owl": <Cloud className="size-4" />,
  nord: <Snowflake className="size-4" />,
  "ayu-dark": <Palette className="size-4" />,
  "gruvbox-dark": <Laptop className="size-4" />,
  cobalt: <Cloud className="size-4" />,
  "material-darker": <Palette className="size-4" />,
  "tomorrow-night": <Sun className="size-4" />,
  "oceanic-next": <Cloud className="size-4" />,
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  // Update button position when dropdown opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);
    }
  }, [isOpen]);

  // Handle click outside and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && buttonRect && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-[99999]"
          style={{
            top: buttonRect.bottom + 8,
            left: buttonRect.left,
            width: Math.max(buttonRect.width, 240),
            maxHeight: '400px',
            overflowY: 'auto'
          }}
        >
          <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
            <p className="text-xs font-medium text-gray-400 px-2">Select Theme</p>
          </div>

          {THEMES.map((t, index) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className={`relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#262637] transition-all duration-200
                ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}`}
              onClick={() => handleThemeSelect(t.id)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 
                  group-hover:opacity-100 transition-opacity" />

              <div
                className={`flex items-center justify-center size-8 rounded-lg
                  ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "bg-gray-800/50 text-gray-400"}
                  group-hover:scale-110 transition-all duration-200`}
              >
                {THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
              </div>

              <span className="flex-1 text-left group-hover:text-white transition-colors">
                {t.label}
              </span>

              <div
                className="relative size-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
                style={{ background: t.color }}
              />

              {theme === t.id && (
                <motion.div
                  className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 group relative flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e]/80 hover:bg-[#262637] 
         rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <Palette className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
        <span className="text-gray-300 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentTheme?.label}
        </span>
        <div
          className="relative w-4 h-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
          style={{ background: currentTheme?.color }}
        />
      </motion.button>

      {typeof window !== 'undefined' && createPortal(dropdownContent, document.body)}
    </>
  );
}

export default ThemeSelector;
