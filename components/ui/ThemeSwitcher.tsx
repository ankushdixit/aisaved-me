"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, themeList, type ThemeId } from "@/lib/themes";

// Theme-specific styles
const themeStyles = {
  memphis: {
    panel: "border-3 border-black bg-white shadow-memphis-lg rounded-lg",
    title: "font-display text-lg font-bold text-black",
    button:
      "btn-memphis flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd700] text-2xl hover:bg-[#ffed4a] border-3 border-black",
    optionSelected: "border-black bg-[#fff9e6]",
    optionHover: "border-transparent hover:border-gray-300 hover:bg-gray-50",
    colorPreviewBorder: "border-2 border-black",
    checkmark: "✓",
  },
  japanese: {
    panel: "border border-light-300 bg-light-50 shadow-sm rounded-sm",
    title: "font-display text-lg font-normal text-dark-900 tracking-wide",
    button:
      "flex h-12 w-12 items-center justify-center rounded-sm bg-light-100 text-xl hover:bg-light-200 border border-light-300 transition-colors duration-300",
    optionSelected: "border-dark-900 bg-light-100",
    optionHover: "border-transparent hover:border-light-300 hover:bg-light-100",
    colorPreviewBorder: "border border-light-300",
    checkmark: "●",
  },
  organic: {
    panel: "border border-sage/30 bg-cream shadow-soft rounded-2xl",
    title: "font-display text-lg font-semibold text-clay",
    button:
      "flex h-14 w-14 items-center justify-center rounded-full bg-sage text-2xl hover:bg-sage-dark text-white shadow-soft transition-all duration-300",
    optionSelected: "border-sage bg-cream-dark",
    optionHover: "border-transparent hover:border-sage/30 hover:bg-cream-dark/50",
    colorPreviewBorder: "border-2 border-cream-dark",
    checkmark: "✓",
  },
};

export function ThemeSwitcher() {
  const { theme, setTheme, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styles = themeStyles[theme] || themeStyles.memphis;

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        buttonRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleThemeSelect = (themeId: ThemeId) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className={`absolute bottom-16 right-0 w-72 p-4 ${styles.panel}`}
          role="dialog"
          aria-label="Theme selector"
        >
          <h3 className={`mb-3 ${styles.title}`}>Choose Theme</h3>
          <div className="space-y-2">
            {themeList.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeSelect(t.id)}
                className={`flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-all ${
                  theme === t.id ? styles.optionSelected : styles.optionHover
                }`}
                aria-pressed={theme === t.id}
              >
                {/* Color preview */}
                <div className="flex -space-x-1">
                  <div
                    className={`h-6 w-6 rounded-full ${styles.colorPreviewBorder}`}
                    style={{ backgroundColor: t.preview.primary }}
                  />
                  <div
                    className={`h-6 w-6 rounded-full ${styles.colorPreviewBorder}`}
                    style={{ backgroundColor: t.preview.secondary }}
                  />
                  <div
                    className={`h-6 w-6 rounded-full ${styles.colorPreviewBorder}`}
                    style={{ backgroundColor: t.preview.accent }}
                  />
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-600">{t.description}</div>
                </div>
                {theme === t.id && (
                  <span className="ml-auto text-lg" aria-hidden="true">
                    {styles.checkmark}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
        aria-label={isOpen ? "Close theme selector" : "Open theme selector"}
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">🎨</span>
      </button>
    </div>
  );
}
