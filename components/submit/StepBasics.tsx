"use client";

import type { UseFormReturn } from "react-hook-form";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";
import { CATEGORIES, AI_TOOLS } from "@/lib/schemas/story-submission";
import { WizardStep, WizardNavigation } from "./WizardStep";
import { FormField, SelectInput } from "./FormField";

interface StepBasicsProps {
  form: UseFormReturn<StorySubmissionData>;
  onNext: () => void;
}

export function StepBasics({ form, onNext }: StepBasicsProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const category = watch("category");
  const aiTool = watch("aiTool");

  return (
    <WizardStep title="Let's Get Started" description="Tell us about your AI success story">
      <FormField
        label="Category"
        required
        hint="What area did AI help you with?"
        error={errors.category?.message}
      >
        <SelectInput
          value={category || ""}
          onChange={(value) => setValue("category", value as typeof category)}
          options={CATEGORIES}
          placeholder="Select a category..."
          error={!!errors.category}
        />
      </FormField>

      <FormField
        label="AI Tool"
        required
        hint="Which AI assistant did you use?"
        error={errors.aiTool?.message}
      >
        <SelectInput
          value={aiTool || ""}
          onChange={(value) => setValue("aiTool", value as typeof aiTool)}
          options={AI_TOOLS}
          placeholder="Select an AI tool..."
          error={!!errors.aiTool}
        />
      </FormField>

      <WizardNavigation onNext={onNext} isFirstStep={true} isLastStep={false} />
    </WizardStep>
  );
}
