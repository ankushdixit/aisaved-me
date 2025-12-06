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
        "bg-cream border-2 border-sage-light rounded-2xl p-6 sm:p-8",
        "shadow-soft",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-display font-semibold text-clay">{title}</h2>
        {description && <p className="mt-2 text-clay-light">{description}</p>}
      </div>
      <div className="space-y-5">{children}</div>
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
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-sage-light">
      {!isFirstStep ? (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "px-5 py-2.5 font-medium",
            "bg-cream border-2 border-sage-light rounded-xl text-clay",
            "hover:border-sage hover:bg-sage-light/20",
            "transition-all duration-300 shadow-soft"
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
          "px-6 py-2.5 font-semibold text-white",
          "border-2 rounded-xl",
          "transition-all duration-300 shadow-soft hover:shadow-soft-hover",
          isLastStep
            ? "bg-sage border-sage-dark hover:bg-sage-dark"
            : "bg-terracotta border-terracotta-dark hover:bg-terracotta-dark",
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
    <div className="flex items-center gap-2 text-sm text-clay-light">
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          isSaving ? "bg-coral-organic animate-pulse" : "bg-sage"
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
