"use client";

import Link from "next/link";
import { useState } from "react";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="md:hidden py-6 border-t border-sage/20 bg-white/95 backdrop-blur-md rounded-b-3xl shadow-soft mt-2">
      <div className="flex flex-col gap-4">
        <Link
          href="/stories"
          className="text-clay-light hover:text-terracotta transition-colors py-2 font-body"
          onClick={onClose}
        >
          Stories
        </Link>
        <Link
          href="#how-it-works"
          className="text-clay-light hover:text-terracotta transition-colors py-2 font-body"
          onClick={onClose}
        >
          How It Works
        </Link>
        <div className="flex flex-col gap-3 pt-4 border-t border-sage/20">
          <Link
            href="/auth/signin"
            className="px-6 py-3 text-sm text-center font-display font-semibold text-sage-dark border-2 border-sage/30 rounded-full hover:border-sage hover:bg-sage/5 transition-all"
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link
            href="/submit"
            className="px-6 py-3 text-sm font-display font-semibold text-center text-white bg-terracotta rounded-full hover:bg-terracotta-dark transition-all shadow-soft"
            onClick={onClose}
          >
            Share a Win
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-display font-bold text-clay tracking-tight hover:text-terracotta transition-colors"
          >
            AI Saved Me
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/stories"
              className="text-[15px] font-body text-clay-light hover:text-terracotta transition-colors"
            >
              Stories
            </Link>
            <Link
              href="#how-it-works"
              className="text-[15px] font-body text-clay-light hover:text-terracotta transition-colors"
            >
              How It Works
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="px-6 py-2.5 text-sm font-display font-semibold text-sage-dark border-2 border-sage/30 rounded-full hover:border-sage hover:bg-sage/5 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/submit"
              className="px-6 py-2.5 text-sm font-display font-semibold text-white bg-terracotta rounded-full hover:bg-terracotta-dark transition-all shadow-soft hover:shadow-soft-hover hover:scale-105"
            >
              Share a Win
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-clay-light hover:text-terracotta transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileMenuOpen} />
          </button>
        </div>

        {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
      </div>
    </nav>
  );
}
