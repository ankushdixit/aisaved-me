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
              {/* Step Circle */}
              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "relative flex items-center justify-center flex-shrink-0",
                  "w-10 h-10 font-display font-bold text-sm",
                  "border-3 transition-all",
                  isComplete && "bg-mint-green border-black text-black",
                  isCurrent && "bg-electric-blue border-black text-white",
                  isPending && "bg-gray-200 border-gray-400 text-gray-500",
                  onStepClick && "cursor-pointer hover:scale-105"
                )}
                disabled={!onStepClick}
              >
                {isComplete ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
                  "ml-2 text-sm font-body font-semibold hidden sm:block",
                  isCurrent && "text-electric-blue",
                  isComplete && "text-black",
                  isPending && "text-gray-500"
                )}
              >
                {step.name}
              </span>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 lg:w-24 h-1 mx-4",
                    "border-t-3",
                    isComplete ? "border-mint-green" : "border-gray-300"
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
