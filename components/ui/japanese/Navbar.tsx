"use client";

import Link from "next/link";
import { useState } from "react";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
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
    <div className="md:hidden py-6 border-t border-light-300">
      <div className="flex flex-col gap-5">
        <Link
          href="/stories"
          className="text-dark-900 font-mono text-sm hover:text-dark-600 transition-colors py-2"
          onClick={onClose}
        >
          Stories
        </Link>
        <Link
          href="#how-it-works"
          className="text-dark-900 font-mono text-sm hover:text-dark-600 transition-colors py-2"
          onClick={onClose}
        >
          How It Works
        </Link>
        <div className="flex flex-col gap-3 pt-5 border-t border-light-300">
          <Link
            href="/auth/signin"
            className="px-5 py-2.5 text-xs font-mono text-center text-dark-900 border border-dark-900 hover:bg-light-100 transition-all"
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link
            href="/submit"
            className="px-5 py-2.5 text-xs font-mono text-center text-light-50 bg-dark-900 hover:bg-dark-800 transition-all"
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
    <nav className="absolute top-0 left-0 right-0 z-50 bg-light-50">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="flex h-24 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-display font-normal text-dark-900 tracking-tight hover:opacity-80 transition-opacity"
          >
            AI Saved Me
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/stories"
              className="text-sm font-mono text-dark-900 hover:text-dark-600 transition-colors"
            >
              Stories
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-mono text-dark-900 hover:text-dark-600 transition-colors"
            >
              How It Works
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="px-5 py-2.5 text-xs font-mono text-dark-900 border border-dark-900 hover:bg-light-100 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/submit"
              className="px-5 py-2.5 text-xs font-mono text-light-50 bg-dark-900 hover:bg-dark-800 transition-all"
            >
              Share a Win
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-dark-900 hover:text-dark-600"
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
