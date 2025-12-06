"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface WizardStepProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function WizardStep({ title, description, children, className }: WizardStepProps) {
  return (
    <div
      className={cn(
        "bg-white border-3 border-black rounded-lg shadow-memphis-lg p-6 sm:p-8",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-black">{title}</h2>
        {description && <p className="mt-2 text-gray-600 font-body">{description}</p>}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

interface WizardNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
  isSubmitting?: boolean;
}

export function WizardNavigation({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
  nextLabel,
  isSubmitting,
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t-2 border-gray-200">
      {!isFirstStep ? (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "px-6 py-3 font-display font-bold uppercase tracking-wide",
            "bg-white border-3 border-black rounded-lg",
            "shadow-memphis-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1",
            "transition-all"
          )}
        >
          ← Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className={cn(
          "px-8 py-3 font-display font-bold uppercase tracking-wide text-white",
          "border-3 border-black rounded-lg",
          "shadow-memphis-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1",
          "transition-all",
          isLastStep ? "bg-mint-green text-black" : "bg-electric-blue",
          isSubmitting && "opacity-50 cursor-not-allowed"
        )}
      >
        {isSubmitting
          ? "Submitting..."
          : nextLabel || (isLastStep ? "Submit for Review" : "Next Step →")}
      </button>
    </div>
  );
}

interface AutoSaveIndicatorProps {
  lastSaved: Date | null;
  isSaving: boolean;
}

export function AutoSaveIndicator({ lastSaved, isSaving }: AutoSaveIndicatorProps) {
  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "over an hour ago";
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          isSaving ? "bg-yellow-400 animate-pulse" : "bg-mint-green"
        )}
      />
      <span>
        {isSaving
          ? "Saving..."
          : lastSaved
            ? `Draft auto-saved ${getTimeAgo(lastSaved)}`
            : "Draft not saved"}
      </span>
    </div>
  );
}
