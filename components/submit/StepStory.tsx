"use client";

import type { UseFormReturn } from "react-hook-form";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";
import { WizardStep, WizardNavigation, AutoSaveIndicator } from "./WizardStep";
import { FormField, TextInput } from "./FormField";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

interface StepStoryProps {
  form: UseFormReturn<StorySubmissionData>;
  onNext: () => void;
  onBack: () => void;
  autoSaveState: {
    lastSaved: Date | null;
    isSaving: boolean;
  };
}

export function StepStory({ form, onNext, onBack, autoSaveState }: StepStoryProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const title = watch("title");
  const problem = watch("problem");
  const howAIHelped = watch("howAIHelped");
  const outcome = watch("outcome");
  const moneySaved = watch("moneySaved");
  const timeSaved = watch("timeSaved");
  const otherMetric = watch("otherMetric");

  return (
    <WizardStep
      title="Tell Your Story"
      description="Share the details of how AI helped you achieve your win"
    >
      <FormField
        label="Story Title"
        required
        hint="Write a compelling headline for your story"
        error={errors.title?.message}
      >
        <TextInput
          value={title}
          onChange={(value) => setValue("title", value)}
          placeholder="How I Beat Enterprise's $3,200 Damage Claim Using Claude"
          maxLength={100}
          showCounter
          error={!!errors.title}
        />
      </FormField>

      <FormField
        label="The Problem"
        required
        hint="Describe the challenge you faced before using AI"
        error={errors.problem?.message}
      >
        <RichTextEditor
          value={problem}
          onChange={(value) => setValue("problem", value)}
          placeholder="What problem were you trying to solve? What was at stake?"
          error={!!errors.problem}
        />
      </FormField>

      <FormField
        label="How AI Helped"
        required
        hint="Explain how you used AI to address the problem"
        error={errors.howAIHelped?.message}
      >
        <RichTextEditor
          value={howAIHelped}
          onChange={(value) => setValue("howAIHelped", value)}
          placeholder="What prompts did you use? How did AI guide your approach?"
          error={!!errors.howAIHelped}
        />
      </FormField>

      <FormField
        label="The Outcome"
        required
        hint="What was the result? Be specific about what you achieved"
        error={errors.outcome?.message}
      >
        <RichTextEditor
          value={outcome}
          onChange={(value) => setValue("outcome", value)}
          placeholder="Describe your success. Include numbers if possible (money saved, time saved, etc.)"
          error={!!errors.outcome}
        />
      </FormField>

      <div className="space-y-4 pt-4">
        <h3 className="font-display font-bold text-lg">
          Success Metrics <span className="text-coral">*</span>
        </h3>
        <p className="text-sm text-gray-600">
          Provide at least one metric to help readers understand the impact
        </p>
        {errors.moneySaved?.message && (
          <p className="text-xs text-coral font-bold">{errors.moneySaved.message}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Money Saved">
            <TextInput
              value={moneySaved || ""}
              onChange={(value) => setValue("moneySaved", value)}
              placeholder="$ Amount"
              type="text"
            />
          </FormField>

          <FormField label="Time Saved">
            <TextInput
              value={timeSaved || ""}
              onChange={(value) => setValue("timeSaved", value)}
              placeholder="Hours/Days"
            />
          </FormField>
        </div>

        <FormField label="Other Outcome">
          <TextInput
            value={otherMetric || ""}
            onChange={(value) => setValue("otherMetric", value)}
            placeholder='e.g., "Claim dismissed", "Diagnosis confirmed"'
          />
        </FormField>
      </div>

      <div className="pt-4">
        <AutoSaveIndicator lastSaved={autoSaveState.lastSaved} isSaving={autoSaveState.isSaving} />
      </div>

      <WizardNavigation onBack={onBack} onNext={onNext} isFirstStep={false} isLastStep={false} />
    </WizardStep>
  );
}
