"use client";

import { type InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, id, error, ...props }: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full rounded-lg border-3 border-black bg-white px-4 py-3 text-black placeholder-gray-400 shadow-memphis-sm transition-shadow focus:shadow-memphis-md focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  hint?: string;
}

export function PasswordInput({
  label,
  id,
  showPassword,
  onTogglePassword,
  hint,
  ...props
}: PasswordInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          {...props}
          className="w-full rounded-lg border-3 border-black bg-white px-4 py-3 pr-16 text-black placeholder-gray-400 shadow-memphis-sm transition-shadow focus:shadow-memphis-md focus:outline-none"
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
