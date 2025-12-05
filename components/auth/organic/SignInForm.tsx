/* eslint-disable max-lines-per-function */
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { GoogleButton } from "./GoogleButton";

export interface SignInFormProps {
  callbackUrl?: string;
  error?: string | null;
}

export function SignInForm({ callbackUrl = "/", error }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(error ?? null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setFormError("Invalid email or password");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch {
      setFormError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold text-[#3D405B]"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Welcome Back
        </h1>
        <p className="mt-2 text-[#5A5D7A]">Sign in to share or read AI success stories</p>
      </div>

      {/* Error message */}
      {formError && (
        <div className="mb-6 rounded-xl bg-[#E07A5F]/10 px-4 py-3 text-[#E07A5F]">{formError}</div>
      )}

      {/* Google Sign In */}
      <GoogleButton callbackUrl={callbackUrl} />

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#81B29A]/30" />
        <span className="text-sm text-[#5A5D7A]">OR</span>
        <div className="h-px flex-1 bg-[#81B29A]/30" />
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#3D405B]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border-2 border-[#81B29A]/30 bg-white px-4 py-3 text-[#3D405B] placeholder-[#5A5D7A]/50 transition-all duration-300 focus:border-[#81B29A] focus:outline-none focus:ring-2 focus:ring-[#81B29A]/20"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#3D405B]">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border-2 border-[#81B29A]/30 bg-white px-4 py-3 pr-16 text-[#3D405B] placeholder-[#5A5D7A]/50 transition-all duration-300 focus:border-[#81B29A] focus:outline-none focus:ring-2 focus:ring-[#81B29A]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#5A5D7A] transition-colors hover:text-[#3D405B]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[#E07A5F] px-6 py-4 font-bold text-white shadow-soft transition-all duration-300 hover:bg-[#C66B52] hover:shadow-soft-hover disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-center">
        <p className="text-[#5A5D7A]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-[#E07A5F] transition-colors hover:text-[#C66B52]"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Secondary Links */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-[#5A5D7A]">
        <Link href="/auth/forgot-password" className="transition-colors hover:text-[#3D405B]">
          Forgot password?
        </Link>
        <span>·</span>
        <Link href="/privacy" className="transition-colors hover:text-[#3D405B]">
          Privacy Policy
        </Link>
        <span>·</span>
        <Link href="/terms" className="transition-colors hover:text-[#3D405B]">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
