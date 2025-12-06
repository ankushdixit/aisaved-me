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
        "bg-rice-paper border border-light-300 rounded-lg p-6 sm:p-8",
        "shadow-card",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-medium text-sumi-black">{title}</h2>
        {description && <p className="mt-2 text-warm-gray text-sm">{description}</p>}
        <div className="mt-4 zen-divider" />
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
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-light-300">
      {!isFirstStep ? (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            "px-5 py-2.5 font-medium text-sm",
            "bg-transparent border border-light-300 rounded-md text-sumi-black",
            "hover:border-sumi-black hover:bg-light-100",
            "transition-all duration-300"
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
          "px-6 py-2.5 font-medium text-sm text-white",
          "border rounded-md",
          "transition-all duration-300",
          isLastStep
            ? "bg-hanko-red border-red-muted hover:bg-red-muted"
            : "bg-sumi-black border-sumi-black hover:bg-dark-800",
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
    <div className="flex items-center gap-2 text-xs text-warm-gray">
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          isSaving ? "bg-warm-gray animate-pulse" : "bg-sumi-black"
        )}
      />
      <span>
        {isSaving
          ? "Saving..."
          : lastSaved
            ? `Draft saved ${getTimeAgo(lastSaved)}`
            : "Draft not saved"}
      </span>
    </div>
  );
}
