"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWizardForm } from "@/lib/hooks/useWizardForm";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui";
import {
  WizardProgress,
  StepBasics,
  StepStory,
  StepChatLink,
  StepMedia,
  StepReview,
} from "@/components/submit";

export default function SubmitPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    form,
    currentStep,
    steps,
    nextStep,
    prevStep,
    isStepComplete,
    validateCurrentStep,
    autoSaveState,
    resetForm,
  } = useWizardForm();

  const handleSubmit = useCallback(async () => {
    // Validate final step (terms and privacy) using step schema
    const isValid = await validateCurrentStep();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: In Phase 1B, this will call the tRPC endpoint
      // For now, simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear the draft
      resetForm();

      // Redirect to success page
      router.push("/submit/success");
    } catch (error) {
      // Determine error type and redirect to error page
      let errorType = "unknown";
      let errorMessage = "";

      if (error instanceof Error) {
        if (error.message.includes("network") || error.message.includes("fetch")) {
          errorType = "network";
        } else if (error.message.includes("validation")) {
          errorType = "validation";
        } else if (error.message.includes("500") || error.message.includes("server")) {
          errorType = "server";
        }
        errorMessage = error.message;
      }

      const params = new URLSearchParams({ type: errorType });
      if (errorMessage) {
        params.set("message", errorMessage);
      }
      router.push(`/submit/error?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateCurrentStep, resetForm, router]);

  const pageStyles = {
    memphis: "min-h-screen bg-pattern-dots",
    japanese: "min-h-screen bg-rice-paper",
    organic: "min-h-screen bg-cream",
  };

  const headerStyles = {
    memphis: "text-center pt-32 pb-4",
    japanese: "text-center pt-32 pb-4",
    organic: "text-center pt-32 pb-4",
  };

  const titleStyles = {
    memphis: "text-3xl sm:text-4xl font-display font-bold text-black",
    japanese: "text-2xl sm:text-3xl font-medium text-sumi-black",
    organic: "text-2xl sm:text-3xl font-display font-semibold text-clay",
  };

  const saveExitStyles = {
    memphis: "text-sm font-display uppercase tracking-wide hover:text-electric-blue",
    japanese: "text-sm hover:text-hanko-red",
    organic: "text-sm font-medium hover:text-terracotta",
  };

  return (
    <div className={pageStyles[theme]}>
      <Navbar />

      {/* Header */}
      <div className={headerStyles[theme]}>
        <h1 className={titleStyles[theme]}>Share Your AI Win</h1>
        <div className="flex justify-center mt-2">
          <Link href="/" className={cn("transition-colors", saveExitStyles[theme])}>
            Save and Exit
          </Link>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4">
        <WizardProgress steps={steps} currentStep={currentStep} isStepComplete={isStepComplete} />
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        {currentStep === 1 && <StepBasics form={form} onNext={nextStep} />}

        {currentStep === 2 && (
          <StepStory
            form={form}
            onNext={nextStep}
            onBack={prevStep}
            autoSaveState={autoSaveState}
          />
        )}

        {currentStep === 3 && <StepChatLink form={form} onNext={nextStep} onBack={prevStep} />}

        {currentStep === 4 && <StepMedia form={form} onNext={nextStep} onBack={prevStep} />}

        {currentStep === 5 && (
          <StepReview
            form={form}
            onBack={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* Tips Sidebar - Desktop Only */}
      <WizardTips currentStep={currentStep} />
    </div>
  );
}

function WizardTips({ currentStep }: { currentStep: number }) {
  const { theme } = useTheme();

  const tips: Record<number, { title: string; items: string[] }> = {
    1: {
      title: "Getting Started",
      items: [
        "Choose the category that best fits your story",
        "Select the AI tool you used most",
        "You can change these later if needed",
      ],
    },
    2: {
      title: "Tips for a Great Story",
      items: [
        "Be specific about your problem",
        "Include numbers when possible",
        "Explain your AI prompting strategy",
        "Share actionable takeaways",
      ],
    },
    3: {
      title: "Why Share Your Chat?",
      items: [
        "Helps verify your story is authentic",
        "Shows others how to approach similar problems",
        "Demonstrates effective prompting",
      ],
    },
    4: {
      title: "Media Tips",
      items: [
        "Screenshots are great evidence",
        "Redact personal information",
        "Before/after images are compelling",
        "This step is optional",
      ],
    },
    5: {
      title: "Final Review",
      items: [
        "Double-check all information",
        "Our team will review before publishing",
        "You may be contacted for verification",
        "Personal info will be protected",
      ],
    },
  };

  const currentTips = tips[currentStep] || tips[1];

  const containerStyles = {
    memphis:
      "fixed right-8 top-1/3 w-60 bg-white border-3 border-black rounded-lg shadow-memphis-lg p-5 hidden xl:block",
    japanese:
      "fixed right-8 top-1/3 w-56 bg-rice-paper border border-light-300 rounded-lg shadow-card p-5 hidden xl:block",
    organic:
      "fixed right-8 top-1/3 w-60 bg-cream border-2 border-sage-light rounded-2xl shadow-soft p-5 hidden xl:block",
  };

  const titleStyles = {
    memphis: "font-display font-bold text-lg mb-4 text-black",
    japanese: "font-medium text-base mb-4 text-sumi-black",
    organic: "font-display font-semibold text-lg mb-4 text-clay",
  };

  const itemStyles = {
    memphis: "flex items-start gap-3 text-sm text-gray-700",
    japanese: "flex items-start gap-2 text-sm text-warm-gray",
    organic: "flex items-start gap-3 text-sm text-clay-light",
  };

  const numberStyles = {
    memphis:
      "flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-electric-blue",
    japanese:
      "flex-shrink-0 w-5 h-5 bg-light-200 rounded-full flex items-center justify-center text-xs text-sumi-black",
    organic:
      "flex-shrink-0 w-6 h-6 bg-sage-light rounded-full flex items-center justify-center text-xs font-medium text-sage-dark",
  };

  return (
    <aside className={containerStyles[theme]}>
      <h3 className={titleStyles[theme]}>{currentTips.title}</h3>
      <ul className="space-y-3">
        {currentTips.items.map((item, index) => (
          <li key={index} className={itemStyles[theme]}>
            <span className={numberStyles[theme]}>{index + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
