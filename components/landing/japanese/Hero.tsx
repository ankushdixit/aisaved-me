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
    <section className="relative bg-light-50 pt-40 pb-20 overflow-hidden">
      {/* Asymmetric layout - content positioned off-center */}
      <div className="relative mx-auto max-w-7xl px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Main Headline - serif, elegant */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-normal text-dark-900 leading-[1.1] tracking-tight">
            Real people
            <br />
            winning with AI
          </h1>

          {/* Delicate horizontal line */}
          <div className="mt-8 h-px w-24 bg-dark-900" />

          {/* Subtle subheading */}
          <p className="mt-6 text-lg sm:text-xl text-dark-600 font-mono font-light leading-relaxed">
            Stories of victory. Quiet transformations.
          </p>

          {/* Victory Counter - minimalist */}
          <div className="mt-16">
            <p className="text-xs text-dark-600 font-mono tracking-wider uppercase mb-3">
              Total saved
            </p>
            <div className="relative">
              <p className="text-5xl sm:text-6xl lg:text-7xl font-display font-normal text-dark-900 tracking-tight animate-count">
                {isClient ? `$${formatNumber(displayedTotal)}` : "$0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroCTA() {
  return (
    <section className="bg-light-50 pt-12 pb-16">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <p className="text-sm text-dark-600 font-mono mb-8 tracking-wide">Explore the stories</p>

        {/* CTA Buttons - minimal, asymmetric */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/stories"
            className="px-8 py-3 text-sm font-mono text-light-50 bg-dark-900 border border-dark-900 hover:bg-dark-800 transition-all"
          >
            Browse Stories
          </Link>
          <Link
            href="/submit"
            className="px-8 py-3 text-sm font-mono text-dark-900 border border-dark-900 hover:bg-light-100 transition-all"
          >
            Share a Win
          </Link>
        </div>
      </div>
    </section>
  );
}
