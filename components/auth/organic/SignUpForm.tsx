/* eslint-disable max-lines-per-function */
"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleButton } from "./GoogleButton";

export interface SignUpFormProps {
  callbackUrl?: string;
}

export function SignUpForm({ callbackUrl = "/" }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create account");
      }

      setSuccess(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mb-6 rounded-2xl bg-[#81B29A]/20 px-6 py-8">
          <h2
            className="text-2xl font-bold text-[#3D405B]"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Account Created!
          </h2>
          <p className="mt-2 text-[#5A5D7A]">
            Check your email to verify your account, then sign in.
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="inline-block rounded-xl bg-[#E07A5F] px-8 py-3 font-bold text-white shadow-soft transition-all duration-300 hover:bg-[#C66B52] hover:shadow-soft-hover"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl font-bold text-[#3D405B]"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Create Account
        </h1>
        <p className="mt-2 text-[#5A5D7A]">Join our community of AI success stories</p>
      </div>

      {/* Error message */}
      {formError && (
        <div className="mb-6 rounded-xl bg-[#E07A5F]/10 px-4 py-3 text-[#E07A5F]">{formError}</div>
      )}

      {/* Google Sign Up */}
      <GoogleButton callbackUrl={callbackUrl} />

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#81B29A]/30" />
        <span className="text-sm text-[#5A5D7A]">OR</span>
        <div className="h-px flex-1 bg-[#81B29A]/30" />
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#3D405B]">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-xl border-2 border-[#81B29A]/30 bg-white px-4 py-3 text-[#3D405B] placeholder-[#5A5D7A]/50 transition-all duration-300 focus:border-[#81B29A] focus:outline-none focus:ring-2 focus:ring-[#81B29A]/20"
          />
        </div>

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
              minLength={8}
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
          <p className="mt-1 text-xs text-[#5A5D7A]">Must be at least 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-[#3D405B]"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-xl border-2 border-[#81B29A]/30 bg-white px-4 py-3 text-[#3D405B] placeholder-[#5A5D7A]/50 transition-all duration-300 focus:border-[#81B29A] focus:outline-none focus:ring-2 focus:ring-[#81B29A]/20"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[#E07A5F] px-6 py-4 font-bold text-white shadow-soft transition-all duration-300 hover:bg-[#C66B52] hover:shadow-soft-hover disabled:cursor-not-allowed disabled:opacity-50"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-center">
        <p className="text-[#5A5D7A]">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-[#E07A5F] transition-colors hover:text-[#C66B52]"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Secondary Links */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-[#5A5D7A]">
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
