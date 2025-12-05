"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { type ThemeId, defaultTheme, themes } from "./theme-config";

const STORAGE_KEY = "aisavedme-theme";

interface ThemeContextValue {
  theme: ThemeId;
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: ThemeId) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in themes) {
      setThemeState(stored as ThemeId);
    }
    setMounted(true);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove("theme-memphis", "theme-japanese", "theme-organic");

    // Add current theme class
    root.classList.add(`theme-${theme}`);

    // Store preference
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>{children}</ThemeContext.Provider>
  );
}
