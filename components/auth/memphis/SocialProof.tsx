"use client";

import Link from "next/link";

export interface SocialProofProps {
  variant?: "signin" | "signup";
}

// eslint-disable-next-line no-unused-vars
export function SocialProof({ variant: _variant = "signin" }: SocialProofProps) {
  return (
    <div className="relative flex h-full flex-col justify-between bg-[#0066FF] p-8 lg:p-12">
      {/* Logo */}
      <Link href="/" className="text-2xl font-display font-bold text-white">
        AI Saved Me
      </Link>

      {/* Main content */}
      <div className="mt-12 lg:mt-0">
        {/* Tagline */}
        <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
          Real People.
          <br />
          Real AI Wins.
        </h2>

        <p className="mt-6 text-lg text-blue-200">
          Join thousands who have shared their AI success stories and inspired others to solve real
          problems.
        </p>

        {/* Stats */}
        <div className="mt-12 flex gap-8 lg:gap-12">
          <div>
            <p className="text-3xl lg:text-4xl font-display font-bold text-white">$2.4M+</p>
            <p className="text-sm text-blue-200">Saved by our community</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-display font-bold text-white">500+</p>
            <p className="text-sm text-blue-200">Success stories</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-display font-bold text-white">15K+</p>
            <p className="text-sm text-blue-200">Lives impacted</p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-12 lg:mt-0 rounded-xl bg-[#1e3a8a] p-6">
        <p className="text-base italic text-blue-200">
          &quot;Claude helped me save $3,200 against Enterprise&apos;s wrongful damage claim. This
          platform helped me share my strategy so others can do the same.&quot;
        </p>
        <p className="mt-4 text-sm font-medium text-white">— Ankush D., Legal Win</p>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute right-8 top-1/4 h-16 w-16 rounded-full border-4 border-[#FFD700] opacity-50" />
      <div className="pointer-events-none absolute left-12 top-1/3 h-8 w-8 rotate-45 border-4 border-[#FF1493] opacity-50" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-12 w-12 rounded-full border-4 border-[#00FF7F] opacity-50" />
    </div>
  );
}
