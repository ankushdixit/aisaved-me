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
        <div className="mb-6 rounded-lg border-3 border-black bg-[#00FF7F] px-6 py-8 shadow-memphis-md">
          <h2 className="text-2xl font-display font-bold text-black">Account Created!</h2>
          <p className="mt-2 text-gray-700">
            Check your email to verify your account, then sign in.
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="inline-block rounded-lg border-3 border-black bg-[#0066FF] px-8 py-3 font-display font-bold text-white shadow-memphis-md transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000000]"
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
        <h1 className="text-3xl font-display font-bold text-black">Create Account</h1>
        <p className="mt-2 text-gray-600">Join our community of AI success stories</p>
      </div>

      {/* Error message */}
      {formError && (
        <div className="mb-6 rounded-lg border-3 border-black bg-[#FF1493] px-4 py-3 text-white shadow-memphis-sm">
          {formError}
        </div>
      )}

      {/* Google Sign Up */}
      <GoogleButton callbackUrl={callbackUrl} />

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">OR</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-bold text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="w-full rounded-lg border-3 border-black bg-white px-4 py-3 text-black placeholder-gray-400 shadow-memphis-sm transition-shadow focus:shadow-memphis-md focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border-3 border-black bg-white px-4 py-3 text-black placeholder-gray-400 shadow-memphis-sm transition-shadow focus:shadow-memphis-md focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-bold text-gray-700">
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
              className="w-full rounded-lg border-3 border-black bg-white px-4 py-3 pr-16 text-black placeholder-gray-400 shadow-memphis-sm transition-shadow focus:shadow-memphis-md focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-lg border-3 border-black bg-white px-4 py-3 text-black placeholder-gray-400 shadow-memphis-sm transition-shadow focus:shadow-memphis-md focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg border-3 border-black bg-[#0066FF] px-6 py-4 font-display font-bold text-white shadow-memphis-md transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-bold text-[#0066FF] hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Secondary Links */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
        <Link href="/privacy" className="hover:text-gray-700">
          Privacy Policy
        </Link>
        <span>·</span>
        <Link href="/terms" className="hover:text-gray-700">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
