"use client";

import Link from "next/link";
import { useState } from "react";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
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
    <div className="md:hidden py-6 bg-[#FFF9E6] border-t-3 border-black mt-4">
      <div className="flex flex-col gap-4">
        <Link
          href="/stories"
          className="font-body font-bold text-black hover:text-[#0066FF] transition-colors py-2 text-lg"
          onClick={onClose}
        >
          Stories
        </Link>
        <Link
          href="#how-it-works"
          className="font-body font-bold text-black hover:text-[#FF1493] transition-colors py-2 text-lg"
          onClick={onClose}
        >
          How It Works
        </Link>
        <div className="flex flex-col gap-3 pt-4 border-t-3 border-black">
          <Link
            href="/auth/signin"
            className="px-6 py-3 text-base font-display text-center text-black bg-[#FFD700] border-3 border-black shadow-memphis-sm transform -rotate-1 hover:rotate-0 transition-transform"
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link
            href="/submit"
            className="px-6 py-3 text-base font-display text-center text-white bg-[#FF1493] border-3 border-black shadow-memphis-sm transform rotate-1 hover:rotate-0 transition-transform"
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
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Logo icon - colorful circle */}
            <div className="w-10 h-10 bg-[#0066FF] border-3 border-black rounded-full transform group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-display font-bold text-black tracking-tight group-hover:text-[#FF1493] transition-colors">
              AI Saved Me
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/stories"
              className="text-base font-body font-bold text-black hover:text-[#0066FF] transition-colors uppercase tracking-wide"
            >
              Stories
            </Link>
            <Link
              href="#how-it-works"
              className="text-base font-body font-bold text-black hover:text-[#FF1493] transition-colors uppercase tracking-wide"
            >
              How It Works
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="px-6 py-2.5 text-sm font-display text-black bg-[#FFD700] border-3 border-black shadow-memphis-sm transform -rotate-1 hover:rotate-0 hover:shadow-memphis-md transition-all uppercase"
            >
              Sign In
            </Link>
            <Link
              href="/submit"
              className="px-6 py-2.5 text-sm font-display text-white bg-[#FF1493] border-3 border-black shadow-memphis-sm transform rotate-1 hover:rotate-0 hover:shadow-memphis-md transition-all uppercase"
            >
              Share a Win
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-black bg-[#00FF7F] border-3 border-black rounded-lg shadow-memphis-sm hover:shadow-memphis-md transition-all"
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
