import { useEffect, useState, useCallback } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false; // default for SSR
  });

  const handleChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    
    // Set initial state
    setMatches(mediaQuery.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Safari & older browsers fallback
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query, handleChange]);

  return matches;
}

// Enhanced version with breakpoint utilities
export function useBreakpoints() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const isXLarge = useMediaQuery("(min-width: 1536px)");
  
  // Touch device detection
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
  
  // Orientation detection
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  
  // Reduced motion preference
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  
  // Dark mode preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLarge,
    isXLarge,
    isTouchDevice,
    isPortrait,
    isLandscape,
    prefersReducedMotion,
    prefersDarkMode,
    // Utility functions
    isSmallScreen: isMobile,
    isMediumScreen: isTablet,
    isLargeScreen: isDesktop || isLarge || isXLarge,
    // Responsive grid helpers
    getGridCols: () => {
      if (isMobile) return 1;
      if (isTablet) return 2;
      if (isDesktop) return 3;
      if (isLarge) return 4;
      return 5;
    },
    // Responsive spacing helpers
    getSpacing: (mobile: number, tablet: number, desktop: number) => {
      if (isMobile) return mobile;
      if (isTablet) return tablet;
      return desktop;
    }
  };
}

// Window dimensions hook
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(() => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return { width: 0, height: 0 };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    handleResize();

    // Use passive listener for better performance
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
}

// Viewport size hook with debouncing
export function useViewportSize(debounceMs: number = 100) {
  const [size, setSize] = useState(() => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }
    return { width: 0, height: 0 };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceMs);
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceMs]);

  return size;
}

// Container query hook (for modern browsers)
export function useContainerQuery(containerRef: React.RefObject<HTMLElement>, query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    // Check if container queries are supported
    if (!window.CSS?.supports?.("container-type: inline-size")) {
      console.warn("Container queries are not supported in this browser");
      return;
    }

    const element = containerRef.current;
    const observer = new ResizeObserver(() => {
      // Custom logic for container queries
      // This is a simplified version - you might want to use a library like @container-query/core
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      
      // Parse simple width queries like "(min-width: 400px)"
      const widthMatch = query.match(/\(min-width:\s*(\d+)px\)/);
      if (widthMatch) {
        const minWidth = parseInt(widthMatch[1]);
        setMatches(width >= minWidth);
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, query]);

  return matches;
}