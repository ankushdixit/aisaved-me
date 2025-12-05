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
    <section className="relative bg-pattern-dots pt-32 pb-12 overflow-hidden">
      {/* Memphis Decorative Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#FF1493] rounded-full border-4 border-black shadow-memphis-md" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-[#FFD700] border-4 border-black transform rotate-45 shadow-memphis-md" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#00FF7F] border-4 border-black transform rotate-12 shadow-memphis-lg" />
      <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-[#0066FF] rounded-full border-4 border-black" />

      {/* Squiggle decorations */}
      <svg className="absolute top-1/4 right-10 w-32 h-32 opacity-40" viewBox="0 0 100 100">
        <path d="M 10 50 Q 30 20 50 50 T 90 50" stroke="#000000" strokeWidth="3" fill="none" />
      </svg>
      <svg className="absolute bottom-40 left-20 w-24 h-24 opacity-40" viewBox="0 0 100 100">
        <path d="M 10 10 L 90 90 M 90 10 L 10 90" stroke="#000000" strokeWidth="3" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Main Headline - Bold Memphis Style */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-black tracking-tight leading-none text-memphis-shadow">
          Real people
          <br />
          <span className="text-memphis-gradient">winning with AI.</span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl font-body font-bold text-black">
          Watch the victories roll in.
        </p>

        {/* Victory Counter - Mega Bold */}
        <div className="mt-16 sm:mt-20">
          <p className="text-xs sm:text-sm text-black font-display tracking-[0.3em] uppercase">
            Total Saved by Our Community
          </p>
          <div className="mt-6 relative inline-block">
            <div className="absolute inset-0 bg-[#0066FF] transform translate-x-2 translate-y-2 rounded-2xl" />
            <div className="relative bg-[#FFD700] border-4 border-black rounded-2xl px-12 py-8 transform -rotate-1">
              <p className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-black tracking-tight animate-count">
                {isClient ? `$${formatNumber(displayedTotal)}` : "$0"}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm font-bold text-black uppercase tracking-wider">
            and counting...
          </p>
        </div>

        {/* Live Indicator - Memphis Style */}
        <div className="mt-10 inline-flex items-center gap-3 bg-[#FF1493] border-3 border-black px-6 py-3 rounded-full shadow-memphis-md transform rotate-1">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-black" />
          </span>
          <span className="text-base font-display font-bold text-white tracking-wide uppercase">
            Live
          </span>
        </div>
      </div>
    </section>
  );
}

export function HeroCTA() {
  return (
    <section className="bg-white py-12 border-t-4 border-b-4 border-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-base font-bold text-black mb-8 uppercase tracking-wider">
          Click any card to read the full story
        </p>

        {/* CTA Buttons - Chunky Memphis Style */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/stories"
            className="btn-memphis w-full sm:w-auto px-10 py-4 text-lg bg-[#0066FF] text-white text-center"
          >
            Browse Stories
          </Link>
          <Link
            href="/submit"
            className="btn-memphis w-full sm:w-auto px-10 py-4 text-lg bg-[#00FF7F] text-black text-center"
          >
            Share a Win
          </Link>
        </div>
      </div>
    </section>
  );
}
