"use client";

import Link from "next/link";

export interface SocialProofProps {
  variant?: "signin" | "signup";
}

// eslint-disable-next-line no-unused-vars
export function SocialProof({ variant: _variant = "signin" }: SocialProofProps) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#3D405B] p-8 lg:p-12">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#81B29A] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#E07A5F] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-[#F2CC8F] opacity-20 blur-3xl" />

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 text-2xl font-bold tracking-wide text-[#FFF8F0]"
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        AI Saved Me
      </Link>

      {/* Main content */}
      <div className="relative z-10 mt-12 lg:mt-0">
        {/* Tagline */}
        <h2
          className="text-4xl font-bold leading-tight text-[#FFF8F0] lg:text-5xl"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Real People.
          <br />
          Real AI Wins.
        </h2>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-[#FFF0DC]">
          Join thousands who have shared their AI success stories and inspired others to solve real
          problems.
        </p>

        {/* Stats */}
        <div className="mt-12 flex gap-8 lg:gap-12">
          <div>
            <p
              className="text-3xl font-bold text-[#F2CC8F] lg:text-4xl"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              $2.4M+
            </p>
            <p className="mt-1 text-sm text-[#FFF0DC] opacity-80">Saved by our community</p>
          </div>
          <div>
            <p
              className="text-3xl font-bold text-[#81B29A] lg:text-4xl"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              500+
            </p>
            <p className="mt-1 text-sm text-[#FFF0DC] opacity-80">Success stories</p>
          </div>
          <div>
            <p
              className="text-3xl font-bold text-[#E07A5F] lg:text-4xl"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              15K+
            </p>
            <p className="mt-1 text-sm text-[#FFF0DC] opacity-80">Lives impacted</p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="relative z-10 mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm lg:mt-0">
        <p className="text-base italic leading-relaxed text-[#FFF8F0]">
          &quot;Claude helped me save $3,200 against Enterprise&apos;s wrongful damage claim. This
          platform helped me share my strategy so others can do the same.&quot;
        </p>
        <p className="mt-4 text-sm font-medium text-[#F2CC8F]">— Ankush D., Legal Win</p>
      </div>
    </div>
  );
}
