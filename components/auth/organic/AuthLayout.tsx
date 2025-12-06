"use client";

import { type ReactNode } from "react";
import { SocialProof, type SocialProofProps } from "./SocialProof";

export interface AuthLayoutProps {
  children: ReactNode;
  variant?: SocialProofProps["variant"];
}

export function AuthLayout({ children, variant = "signin" }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Social Proof */}
      <div className="hidden lg:block lg:w-1/2">
        <SocialProof variant={variant} />
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center bg-[#FFF8F0] px-6 py-12 lg:w-1/2 lg:px-12">
        {children}
      </div>
    </div>
  );
}
