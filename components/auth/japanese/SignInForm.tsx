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
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-normal tracking-wide text-[#1A1A1A]">
          Welcome Back
        </h1>
        <p className="mt-3 text-[#6B6B6B]">Sign in to share or read AI success stories</p>
      </div>

      {/* Error message */}
      {formError && (
        <div className="mb-6 border-l-2 border-[#C41E3A] bg-[#FEF2F2] px-4 py-3 text-[#C41E3A]">
          {formError}
        </div>
      )}

      {/* Google Sign In */}
      <GoogleButton callbackUrl={callbackUrl} />

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#D4D0C8]" />
        <span className="text-sm text-[#6B6B6B]">OR</span>
        <div className="h-px flex-1 bg-[#D4D0C8]" />
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm tracking-wide text-[#6B6B6B]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-[#D4D0C8] bg-white px-4 py-3 font-serif text-[#1A1A1A] placeholder-[#D4D0C8] transition-colors duration-300 focus:border-[#1A1A1A] focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm tracking-wide text-[#6B6B6B]">
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
              className="w-full border border-[#D4D0C8] bg-white px-4 py-3 pr-16 font-serif text-[#1A1A1A] placeholder-[#D4D0C8] transition-colors duration-300 focus:border-[#1A1A1A] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B6B6B] transition-colors hover:text-[#1A1A1A]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1A1A1A] px-6 py-4 font-serif text-[#FAF8F5] transition-colors duration-300 hover:bg-[#2A2A2A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <p className="text-[#6B6B6B]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#1A1A1A] underline underline-offset-4 transition-colors hover:text-[#C41E3A]"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Secondary Links */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[#6B6B6B]">
        <Link href="/auth/forgot-password" className="transition-colors hover:text-[#1A1A1A]">
          Forgot password?
        </Link>
        <span>·</span>
        <Link href="/privacy" className="transition-colors hover:text-[#1A1A1A]">
          Privacy
        </Link>
        <span>·</span>
        <Link href="/terms" className="transition-colors hover:text-[#1A1A1A]">
          Terms
        </Link>
      </div>
    </div>
  );
}
