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
        <div className="mb-8 border-l-2 border-[#1A1A1A] bg-[#F5F2ED] px-6 py-8">
          <h2 className="font-serif text-2xl font-normal text-[#1A1A1A]">Account Created</h2>
          <p className="mt-3 text-[#6B6B6B]">
            Check your email to verify your account, then sign in.
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="inline-block bg-[#1A1A1A] px-8 py-3 font-serif text-[#FAF8F5] transition-colors duration-300 hover:bg-[#2A2A2A]"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-normal tracking-wide text-[#1A1A1A]">
          Create Account
        </h1>
        <p className="mt-3 text-[#6B6B6B]">Join our community of AI success stories</p>
      </div>

      {/* Error message */}
      {formError && (
        <div className="mb-6 border-l-2 border-[#C41E3A] bg-[#FEF2F2] px-4 py-3 text-[#C41E3A]">
          {formError}
        </div>
      )}

      {/* Google Sign Up */}
      <GoogleButton callbackUrl={callbackUrl} />

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#D4D0C8]" />
        <span className="text-sm text-[#6B6B6B]">OR</span>
        <div className="h-px flex-1 bg-[#D4D0C8]" />
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm tracking-wide text-[#6B6B6B]">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full border border-[#D4D0C8] bg-white px-4 py-3 font-serif text-[#1A1A1A] placeholder-[#D4D0C8] transition-colors duration-300 focus:border-[#1A1A1A] focus:outline-none"
          />
        </div>

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
              minLength={8}
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
          <p className="mt-2 text-xs text-[#6B6B6B]">Must be at least 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm tracking-wide text-[#6B6B6B]"
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
            className="w-full border border-[#D4D0C8] bg-white px-4 py-3 font-serif text-[#1A1A1A] placeholder-[#D4D0C8] transition-colors duration-300 focus:border-[#1A1A1A] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1A1A1A] px-6 py-4 font-serif text-[#FAF8F5] transition-colors duration-300 hover:bg-[#2A2A2A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <p className="text-[#6B6B6B]">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-[#1A1A1A] underline underline-offset-4 transition-colors hover:text-[#C41E3A]"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Secondary Links */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[#6B6B6B]">
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
