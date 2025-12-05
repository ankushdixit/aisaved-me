"use client";

import Link from "next/link";

export interface SocialProofProps {
  variant?: "signin" | "signup";
}

// eslint-disable-next-line no-unused-vars
export function SocialProof({ variant: _variant = "signin" }: SocialProofProps) {
  return (
    <div className="relative flex h-full flex-col justify-between bg-[#1A1A1A] p-8 lg:p-12">
      {/* Logo */}
      <Link href="/" className="font-serif text-2xl font-normal tracking-wide text-[#FAF8F5]">
        AI Saved Me
      </Link>

      {/* Main content */}
      <div className="mt-12 lg:mt-0">
        {/* Tagline - minimal Japanese aesthetic */}
        <h2 className="font-serif text-4xl font-normal leading-relaxed tracking-wide text-[#FAF8F5] lg:text-5xl">
          Real People.
          <br />
          Real AI Wins.
        </h2>

        <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-[#D4D0C8]">
          Join thousands who have shared their AI success stories and inspired others to solve real
          problems.
        </p>

        {/* Stats - elegant and minimal */}
        <div className="mt-12 flex gap-12 lg:gap-16">
          <div>
            <p className="font-serif text-3xl font-normal text-[#FAF8F5] lg:text-4xl">$2.4M+</p>
            <p className="mt-1 text-sm tracking-wide text-[#6B6B6B]">Saved by our community</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-normal text-[#FAF8F5] lg:text-4xl">500+</p>
            <p className="mt-1 text-sm tracking-wide text-[#6B6B6B]">Success stories</p>
          </div>
          <div>
            <p className="font-serif text-3xl font-normal text-[#FAF8F5] lg:text-4xl">15K+</p>
            <p className="mt-1 text-sm tracking-wide text-[#6B6B6B]">Lives impacted</p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-12 border-l-2 border-[#C41E3A] pl-6 lg:mt-0">
        <p className="font-serif text-base leading-relaxed text-[#D4D0C8]">
          &quot;Claude helped me save $3,200 against Enterprise&apos;s wrongful damage claim. This
          platform helped me share my strategy so others can do the same.&quot;
        </p>
        <p className="mt-4 text-sm tracking-wide text-[#6B6B6B]">— Ankush D., Legal Win</p>
      </div>

      {/* Decorative element - hanko stamp style */}
      <div className="pointer-events-none absolute bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-sm border border-[#C41E3A] text-[#C41E3A] opacity-30">
        <span className="font-serif text-xs tracking-widest">勝</span>
      </div>
    </div>
  );
}
