"use client";

import type { UseFormReturn } from "react-hook-form";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";
import { WizardStep, WizardNavigation } from "./WizardStep";
import { FormField, Checkbox } from "./FormField";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StepReviewProps {
  form: UseFormReturn<StorySubmissionData>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { theme } = useTheme();

  const headerStyles = {
    memphis: "text-sm font-display font-bold uppercase tracking-wide text-gray-500 mb-2",
    japanese: "text-sm font-medium text-warm-gray mb-2",
    organic: "text-sm font-semibold text-clay-light mb-2",
  };

  const contentStyles = {
    memphis: "p-4 bg-gray-50 border-2 border-gray-200 rounded-lg",
    japanese: "p-4 bg-light-100 border border-light-300 rounded-md",
    organic: "p-4 bg-cream-dark border border-sage-light rounded-xl",
  };

  return (
    <div>
      <h4 className={headerStyles[theme]}>{title}</h4>
      <div className={contentStyles[theme]}>{children}</div>
    </div>
  );
}

// eslint-disable-next-line complexity, max-lines-per-function
export function StepReview({ form, onBack, onSubmit, isSubmitting }: StepReviewProps) {
  const { theme } = useTheme();
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const values = watch();

  const alertStyles = {
    memphis: "p-4 bg-yellow-50 border-2 border-bright-yellow rounded-lg text-sm",
    japanese: "p-4 bg-light-100 border border-light-300 rounded-md text-sm",
    organic: "p-4 bg-coral-organic/20 border border-coral-organic rounded-xl text-sm",
  };

  return (
    <WizardStep
      title="Review Your Story"
      description="Please review all the information before submitting"
    >
      <div className="space-y-4">
        {/* Basics */}
        <div className="grid grid-cols-2 gap-4">
          <ReviewSection title="Category">
            <p className="font-medium">{values.category || "Not selected"}</p>
          </ReviewSection>
          <ReviewSection title="AI Tool">
            <p className="font-medium">{values.aiTool || "Not selected"}</p>
          </ReviewSection>
        </div>

        {/* Story */}
        <ReviewSection title="Story Title">
          <p className="font-medium">{values.title || "No title"}</p>
        </ReviewSection>

        <ReviewSection title="The Problem">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: values.problem || "<p>Not provided</p>" }}
          />
        </ReviewSection>

        <ReviewSection title="How AI Helped">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: values.howAIHelped || "<p>Not provided</p>" }}
          />
        </ReviewSection>

        <ReviewSection title="The Outcome">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: values.outcome || "<p>Not provided</p>" }}
          />
        </ReviewSection>

        {/* Success Metrics */}
        {(values.moneySaved || values.timeSaved || values.otherMetric) && (
          <ReviewSection title="Success Metrics">
            <div className="space-y-1">
              {values.moneySaved && (
                <p>
                  <span className="text-gray-600">Money Saved:</span>{" "}
                  <span className="font-medium">{values.moneySaved}</span>
                </p>
              )}
              {values.timeSaved && (
                <p>
                  <span className="text-gray-600">Time Saved:</span>{" "}
                  <span className="font-medium">{values.timeSaved}</span>
                </p>
              )}
              {values.otherMetric && (
                <p>
                  <span className="text-gray-600">Other:</span>{" "}
                  <span className="font-medium">{values.otherMetric}</span>
                </p>
              )}
            </div>
          </ReviewSection>
        )}

        {/* Chat Link */}
        <ReviewSection title="Chat Evidence">
          {values.chatUrl ? (
            <a
              href={values.chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {values.chatUrl}
            </a>
          ) : values.chatExcerpt ? (
            <p className="text-sm text-gray-600 italic">Chat excerpt provided</p>
          ) : (
            <p className="text-gray-500">No chat link provided</p>
          )}
        </ReviewSection>

        {/* Files */}
        <ReviewSection title="Supporting Files">
          {values.files && values.files.length > 0 ? (
            <ul className="space-y-1">
              {values.files.map((file) => (
                <li key={file.id} className="flex items-center gap-2">
                  <span>📎</span>
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No files uploaded</p>
          )}
        </ReviewSection>
      </div>

      {/* Important Notice */}
      <div className={cn("mt-6", alertStyles[theme])}>
        <p className="font-medium mb-2">Before you submit:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Your story will be reviewed by our team before publishing</li>
          <li>Personal information will be redacted for privacy</li>
          <li>You may be contacted for verification if needed</li>
        </ul>
      </div>

      {/* Checkboxes */}
      <div className="space-y-4 mt-6">
        <FormField label="" error={errors.termsAccepted?.message}>
          <Checkbox
            checked={values.termsAccepted}
            onChange={(checked) => setValue("termsAccepted", checked)}
            error={!!errors.termsAccepted}
            label={
              <span>
                I accept the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and confirm this story is true and accurate
              </span>
            }
          />
        </FormField>

        <FormField label="" error={errors.privacyAccepted?.message}>
          <Checkbox
            checked={values.privacyAccepted}
            onChange={(checked) => setValue("privacyAccepted", checked)}
            error={!!errors.privacyAccepted}
            label={
              <span>
                I acknowledge the{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>{" "}
                and consent to having my story published
              </span>
            }
          />
        </FormField>
      </div>

      <WizardNavigation
        onBack={onBack}
        onNext={onSubmit}
        isFirstStep={false}
        isLastStep={true}
        isSubmitting={isSubmitting}
      />
    </WizardStep>
  );
}
