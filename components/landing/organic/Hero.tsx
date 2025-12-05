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
    <section className="relative bg-gradient-to-br from-[#FFF8F0] via-[#FFF0DC] to-[#FFE8CC] pt-32 pb-12 overflow-hidden">
      {/* Floating organic blob shapes */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sage/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-coral/20 rounded-[40%_60%_70%_30%/40%_60%_30%_70%] blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/10 rounded-[70%_30%_50%_50%/30%_60%_40%_70%] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-clay tracking-tight text-balance">
          Real people winning with AI
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-clay-light font-body max-w-2xl mx-auto">
          Watch the victories roll in, one story at a time
        </p>

        {/* Victory Counter */}
        <div className="mt-16 sm:mt-20">
          <p className="text-xs sm:text-sm text-sage-dark tracking-[0.15em] uppercase font-display font-semibold">
            Total Saved by Our Community
          </p>
          <div className="mt-6 relative">
            <div className="inline-block bg-white/70 backdrop-blur-sm px-12 py-8 rounded-[32px] shadow-blob">
              <p className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-terracotta tracking-tight animate-count">
                {isClient ? `$${formatNumber(displayedTotal)}` : "$0"}
              </p>
              <p className="mt-3 text-sm text-sage-dark font-body">and counting...</p>
            </div>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sage" />
          </span>
          <span className="text-sm font-display font-semibold text-sage-dark tracking-wide">
            LIVE
          </span>
        </div>
      </div>
    </section>
  );
}

export function HeroCTA() {
  return (
    <section className="bg-gradient-to-br from-[#FFF8F0] via-[#FFF0DC] to-[#FFE8CC] pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm text-sage-dark font-body mb-8">
          Click any card to read the full story
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/stories"
            className="group w-full sm:w-auto px-10 py-4 text-base font-display font-semibold text-white bg-terracotta rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-soft hover:shadow-soft-hover hover:scale-105 text-center"
          >
            Browse Stories
          </Link>
          <Link
            href="/submit"
            className="group w-full sm:w-auto px-10 py-4 text-base font-display font-semibold text-sage-dark bg-white/80 backdrop-blur-sm border-2 border-sage/30 rounded-full hover:border-sage hover:bg-white transition-all duration-300 shadow-soft hover:shadow-soft-hover hover:scale-105 text-center"
          >
            Share a Win
          </Link>
        </div>
      </div>
    </section>
  );
}
