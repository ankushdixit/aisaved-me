"use client";

import { cn } from "@/lib/utils";

interface WizardProgressProps {
  steps: readonly { id: number; name: string; key: string }[];
  currentStep: number;
  // eslint-disable-next-line no-unused-vars
  isStepComplete: (step: number) => boolean;
  // eslint-disable-next-line no-unused-vars
  onStepClick?: (step: number) => void;
}

export function WizardProgress({
  steps,
  currentStep,
  isStepComplete,
  onStepClick,
}: WizardProgressProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line complexity */}
        {steps.map((step, index) => {
          // A step is visually complete only if user has passed it
          const hasPassedStep = step.id < currentStep;
          const isComplete = hasPassedStep && isStepComplete(step.id);
          const isCurrent = step.id === currentStep;
          const isPending = step.id > currentStep;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle - Minimal zen style */}
              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "relative flex items-center justify-center flex-shrink-0",
                  "w-8 h-8 rounded-full text-sm",
                  "border transition-all duration-300",
                  isComplete && "bg-sumi-black border-sumi-black text-white",
                  isCurrent && "bg-hanko-red border-hanko-red text-white",
                  isPending && "bg-transparent border-light-300 text-warm-gray",
                  onStepClick && "cursor-pointer hover:opacity-80"
                )}
                disabled={!onStepClick}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </button>

              {/* Step Name */}
              <span
                className={cn(
                  "ml-2 text-sm hidden sm:block transition-colors duration-300",
                  isCurrent && "text-sumi-black font-medium",
                  isComplete && "text-sumi-black",
                  isPending && "text-warm-gray"
                )}
              >
                {step.name}
              </span>

              {/* Connector Line - Subtle zen divider */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-10 lg:w-20 h-px mx-4",
                    isComplete ? "bg-sumi-black" : "bg-light-300"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
