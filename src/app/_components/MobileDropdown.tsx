"use client";

import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import {
  Menu,
  X,
  Code2,
  Sparkles,
  Zap,
  Settings,
  Palette,
  Globe,
  User as UserIcon,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface SerializedUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  emailAddresses: Array<{ emailAddress: string }>;
}

interface MobileDropdownProps {
  user: SerializedUser | null;
  convexUser: any;
  ThemeSelector: React.ComponentType;
  LanguageSelector: React.ComponentType<{ hasAccess: boolean }>;
  RunButton: React.ComponentType;
}

export default function MobileDropdown({
  user,
  convexUser,
  ThemeSelector,
  LanguageSelector,
  RunButton
}: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Check if click is outside both button and dropdown
      if (buttonRef.current && !buttonRef.current.contains(target)) {
        // Don't close if clicking inside the dropdown content
        const dropdownElement = document.querySelector('[data-dropdown-content]');
        if (!dropdownElement || !dropdownElement.contains(target)) {
          setIsOpen(false);
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use 'click' instead of 'mousedown' to avoid interfering with click events
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when dropdown is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => setIsOpen(false);

  // Calculate dropdown position for mobile
  const getDropdownStyle = () => {
    if (!buttonRect) return {};
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dropdownWidth = 288; // 72 * 4 (w-72 in Tailwind)
    const dropdownMaxHeight = Math.min(viewportHeight - 100, 500);
    
    // Position dropdown below button with some margin
    let top = buttonRect.bottom + 8;
    let left = buttonRect.left;
    
    // Adjust if dropdown would overflow viewport
    if (left + dropdownWidth > viewportWidth) {
      left = viewportWidth - dropdownWidth - 16; // 16px margin from edge
    }
    
    // Ensure dropdown doesn't go off-screen vertically
    if (top + dropdownMaxHeight > viewportHeight) {
      top = Math.max(16, viewportHeight - dropdownMaxHeight - 16);
    }
    
    return {
      position: 'fixed' as const,
      top: `${top}px`,
      left: `${left}px`,
      width: `${dropdownWidth}px`,
      maxHeight: `${dropdownMaxHeight}px`,
      zIndex: 99999
    };
  };

  const dropdownContent = isOpen && mounted && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99998]"
        onClick={closeDropdown}
        style={{ touchAction: 'none' }}
      />

      {/* Dropdown Menu */}
      <div
        data-dropdown-content
        className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
        style={{
          ...getDropdownStyle(),
          overflowY: 'auto',
          overscrollBehavior: 'contain'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50">
              <Menu className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Menu</h3>
              <p className="text-xs text-gray-400">Quick access & settings</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3 border-b border-gray-700/30">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Navigation</span>
          </div>
          
          <div className="space-y-1">
            {/* Snippets Link */}
            <Link
              href="/snippets"
              onClick={(e) => {
                e.preventDefault();
                closeDropdown();
                // Use setTimeout to ensure dropdown closes first
                setTimeout(() => {
                  window.location.href = '/snippets';
                }, 100);
              }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group active:bg-gray-800/70"
            >
              <div className="relative">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-all duration-300">
                  <Code2 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-80" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                  ✨ Snippets
                </div>
                <div className="text-xs text-gray-400">Browse code snippets</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
            </Link>

            {/* Code Sync Link */}
            <Link
              href="https://code-sync-live.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                closeDropdown();
                // For external links, let the default behavior handle it
              }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group active:bg-gray-800/70"
            >
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all duration-300">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                  Code Sync
                </div>
                <div className="text-xs text-gray-400">Collaborate live</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-cyan-400 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Settings Section */}
        <div className="p-3 border-b border-gray-700/30">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Settings</span>
          </div>
          
          <div className="space-y-3">
            {/* Theme Selector */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
              <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Palette className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-1">Theme</div>
                <ThemeSelector />
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
              <div className="p-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                <Globe className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white mb-1">Language</div>
                <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
              </div>
            </div>
          </div>
        </div>

        {/* Pro Section */}
        {!convexUser?.isPro && (
          <div className="p-3 border-b border-gray-700/30">
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Upgrade</span>
            </div>
            
            <Link
              href="/pricing"
              onClick={(e) => {
                e.preventDefault();
                closeDropdown();
                setTimeout(() => {
                  window.location.href = '/pricing';
                }, 100);
              }}
              className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 group active:from-amber-500/30 active:to-orange-500/30"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
                  Upgrade to Pro
                </div>
                <div className="text-xs text-amber-400/70">Unlock premium features</div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
            </Link>
          </div>
        )}

        {/* User Section */}
        {user && (
          <div className="p-3">
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Account</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <UserIcon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {user.firstName || user.username || 'User'}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {user.emailAddresses[0]?.emailAddress}
                </div>
              </div>
              {convexUser?.isPro && (
                <div className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                  PRO
                </div>
              )}
            </div>
          </div>
        )}

        {/* Run Button Section */}
        {user && (
          <div className="p-3 border-t border-gray-700/30">
            <RunButton />
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="relative z-[99999]">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="relative group p-2 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
        aria-label="Mobile menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
        {isOpen ? (
          <X className="w-5 h-5 text-gray-300 relative z-10 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <Menu className="w-5 h-5 text-gray-300 relative z-10 group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {typeof window !== "undefined" && ReactDOM.createPortal(dropdownContent, document.body)}
    </div>
  );
}