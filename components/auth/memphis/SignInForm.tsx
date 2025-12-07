"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { GoogleButton } from "./GoogleButton";
import { FormInput, PasswordInput } from "./FormInput";

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
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold text-black">Welcome Back</h1>
        <p className="mt-2 text-gray-600">Sign in to share or read AI success stories</p>
      </div>

      {formError && (
        <div className="mb-6 border-3 border-black bg-[#FF1493] px-4 py-3 text-white shadow-memphis-sm">
          {formError}
        </div>
      )}

      <GoogleButton callbackUrl={callbackUrl} />

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">OR</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <PasswordInput
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="btn-memphis w-full px-6 py-4 bg-[#0066FF] text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-bold text-[#0066FF] hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
        <Link href="/auth/forgot-password" className="hover:text-gray-700">
          Forgot password?
        </Link>
        <span>·</span>
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
