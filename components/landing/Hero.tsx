"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { totalSaved, formatNumber } from "@/lib/mock-data/stories";

export function Hero() {
  const [displayedTotal, setDisplayedTotal] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Animate the counter on mount
  useEffect(() => {
    setIsClient(true);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = totalSaved / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), totalSaved);
      setDisplayedTotal(current);

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-dark-900 pt-32 pb-8 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-800 opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-success-500/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-glow tracking-tight">
          Real people winning with AI.
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-light-400">
          Watch the victories roll in.
        </p>

        {/* Victory Counter */}
        <div className="mt-12 sm:mt-16">
          <p className="text-xs sm:text-sm text-light-400 tracking-[0.2em] uppercase">
            Total Saved by Our Community
          </p>
          <div className="mt-4 relative">
            <p
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-success-500 font-mono tracking-tight animate-count"
              style={{
                textShadow: "0 0 60px rgba(16, 185, 129, 0.5)",
              }}
            >
              {isClient ? `$${formatNumber(displayedTotal)}` : "$0"}
            </p>
            <p className="mt-2 text-sm text-light-400">and counting...</p>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success-500" />
          </span>
          <span className="text-sm font-semibold text-success-500 tracking-wide">
            LIVE
          </span>
        </div>
      </div>
    </section>
  );
}

export function HeroCTA() {
  return (
    <section className="bg-dark-900 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm text-light-400 mb-6">
          Click any card to read the full story
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/stories"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/30 glow-primary text-center"
          >
            Browse Stories
          </Link>
          <Link
            href="/submit"
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white border-2 border-dark-600 rounded-lg hover:border-light-400 transition-all text-center"
          >
            Share a Win
          </Link>
        </div>
      </div>
    </section>
  );
}
