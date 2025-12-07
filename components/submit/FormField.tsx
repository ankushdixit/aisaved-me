"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/themes";
import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, required, hint, error, children, className }: FormFieldProps) {
  const { theme } = useTheme();

  const labelStyles = {
    memphis: "text-sm font-display font-bold text-black uppercase tracking-wide",
    japanese: "text-sm font-medium text-sumi-black",
    organic: "text-sm font-semibold text-clay",
  };

  const hintStyles = {
    memphis: "text-xs text-gray-600 mt-1",
    japanese: "text-xs text-warm-gray mt-1",
    organic: "text-xs text-clay-light mt-1",
  };

  const errorStyles = {
    memphis: "text-xs text-coral font-bold mt-1",
    japanese: "text-xs text-hanko-red mt-1",
    organic: "text-xs text-terracotta mt-1",
  };

  return (
    <div className={className}>
      <label className="block">
        <span className={labelStyles[theme]}>
          {label}
          {required && <span className="text-coral ml-1">*</span>}
        </span>
        {hint && <p className={hintStyles[theme]}>{hint}</p>}
      </label>
      <div className="mt-2">{children}</div>
      {error && <p className={errorStyles[theme]}>{error}</p>}
    </div>
  );
}

interface TextInputProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  type?: "text" | "number" | "url";
  className?: string;
  maxLength?: number;
  showCounter?: boolean;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  className,
  maxLength,
  showCounter,
}: TextInputProps) {
  const { theme } = useTheme();

  const inputStyles = {
    memphis: cn(
      "w-full px-4 py-3 font-body text-base",
      "border-2 bg-white",
      "focus:outline-none focus:ring-2 focus:ring-electric-blue",
      error ? "border-coral" : "border-black"
    ),
    japanese: cn(
      "w-full px-4 py-3 text-base",
      "border rounded-md bg-rice-paper",
      "focus:outline-none focus:ring-1 focus:ring-sumi-black",
      error ? "border-hanko-red" : "border-light-300"
    ),
    organic: cn(
      "w-full px-4 py-3 text-base",
      "border-2 rounded-xl bg-cream",
      "focus:outline-none focus:ring-2 focus:ring-terracotta",
      error ? "border-terracotta" : "border-sage-light"
    ),
  };

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(inputStyles[theme], className)}
      />
      {showCounter && maxLength && (
        <span
          className={cn(
            "absolute right-3 bottom-3 text-xs",
            value.length > maxLength * 0.9 ? "text-coral" : "text-gray-500"
          )}
        >
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}

interface TextAreaProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  rows?: number;
  className?: string;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
  className,
}: TextAreaProps) {
  const { theme } = useTheme();

  const textareaStyles = {
    memphis: cn(
      "w-full px-4 py-3 font-body text-base resize-none",
      "border-2 bg-white",
      "focus:outline-none focus:ring-2 focus:ring-electric-blue",
      error ? "border-coral" : "border-black"
    ),
    japanese: cn(
      "w-full px-4 py-3 text-base resize-none",
      "border rounded-md bg-rice-paper",
      "focus:outline-none focus:ring-1 focus:ring-sumi-black",
      error ? "border-hanko-red" : "border-light-300"
    ),
    organic: cn(
      "w-full px-4 py-3 text-base resize-none",
      "border-2 rounded-xl bg-cream",
      "focus:outline-none focus:ring-2 focus:ring-terracotta",
      error ? "border-terracotta" : "border-sage-light"
    ),
  };

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={cn(textareaStyles[theme], className)}
    />
  );
}

interface SelectInputProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export function SelectInput({
  value,
  onChange,
  options,
  placeholder,
  error,
  className,
}: SelectInputProps) {
  const { theme } = useTheme();

  const selectStyles = {
    memphis: cn(
      "w-full px-4 py-3 font-body text-base appearance-none cursor-pointer",
      "border-2 bg-white",
      "focus:outline-none focus:ring-2 focus:ring-electric-blue",
      error ? "border-coral" : "border-black"
    ),
    japanese: cn(
      "w-full px-4 py-3 text-base appearance-none cursor-pointer",
      "border rounded-md bg-rice-paper",
      "focus:outline-none focus:ring-1 focus:ring-sumi-black",
      error ? "border-hanko-red" : "border-light-300"
    ),
    organic: cn(
      "w-full px-4 py-3 text-base appearance-none cursor-pointer",
      "border-2 rounded-xl bg-cream",
      "focus:outline-none focus:ring-2 focus:ring-terracotta",
      error ? "border-terracotta" : "border-sage-light"
    ),
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(selectStyles[theme], className)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

interface CheckboxProps {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
  label: ReactNode;
  error?: boolean;
  className?: string;
}

export function Checkbox({ checked, onChange, label, error, className }: CheckboxProps) {
  const { theme } = useTheme();

  const containerStyles = {
    memphis: cn(
      "relative w-5 h-5 flex-shrink-0 border-2 cursor-pointer transition-colors",
      "focus-within:ring-2 focus-within:ring-electric-blue focus-within:ring-offset-1",
      checked ? "bg-electric-blue border-black" : "bg-white border-black",
      error && "border-coral"
    ),
    japanese: cn(
      "relative w-4 h-4 flex-shrink-0 rounded border cursor-pointer transition-colors",
      "focus-within:ring-1 focus-within:ring-sumi-black",
      checked ? "bg-sumi-black border-sumi-black" : "bg-rice-paper border-light-300",
      error && "border-hanko-red"
    ),
    organic: cn(
      "relative w-5 h-5 flex-shrink-0 rounded-md border-2 cursor-pointer transition-colors",
      "focus-within:ring-2 focus-within:ring-terracotta focus-within:ring-offset-1",
      checked ? "bg-sage border-sage-dark" : "bg-cream border-sage-light",
      error && "border-terracotta"
    ),
  };

  const checkmarkStyles = {
    memphis: "text-white",
    japanese: "text-rice-paper",
    organic: "text-cream",
  };

  const labelStyles = {
    memphis: "text-sm text-black",
    japanese: "text-sm text-sumi-black",
    organic: "text-sm text-clay",
  };

  return (
    <label className={cn("flex items-start gap-3 cursor-pointer", className)}>
      <span className={containerStyles[theme]}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
          role="checkbox"
          aria-checked={checked}
        />
        {checked && (
          <svg
            className={cn("absolute inset-0 w-full h-full p-0.5", checkmarkStyles[theme])}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className={labelStyles[theme]}>{label}</span>
    </label>
  );
}
