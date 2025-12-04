"use client";

import Link from "next/link";
import { useState } from "react";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="md:hidden py-4 border-t border-dark-700">
      <div className="flex flex-col gap-4">
        <Link href="/stories" className="text-light-400 hover:text-white transition-colors py-2" onClick={onClose}>
          Stories
        </Link>
        <Link href="#how-it-works" className="text-light-400 hover:text-white transition-colors py-2" onClick={onClose}>
          How It Works
        </Link>
        <div className="flex flex-col gap-3 pt-4 border-t border-dark-700">
          <Link href="/auth/signin" className="px-5 py-2.5 text-sm text-center text-light-400 border border-dark-700 rounded-lg hover:border-light-400 hover:text-white transition-all" onClick={onClose}>
            Sign In
          </Link>
          <Link href="/submit" className="px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors" onClick={onClose}>
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
          <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity">
            AI Saved Me
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/stories" className="text-[15px] text-light-400 hover:text-white transition-colors">Stories</Link>
            <Link href="#how-it-works" className="text-[15px] text-light-400 hover:text-white transition-colors">How It Works</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/signin" className="px-5 py-2.5 text-sm text-light-400 border border-dark-700 rounded-lg hover:border-light-400 hover:text-white transition-all">
              Sign In
            </Link>
            <Link href="/submit" className="px-5 py-2.5 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25">
              Share a Win
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-light-400 hover:text-white"
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
