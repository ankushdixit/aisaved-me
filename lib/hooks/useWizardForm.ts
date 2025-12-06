"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useForm, type UseFormReturn, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  storySubmissionSchema,
  stepBasicsSchema,
  stepStorySchema,
  stepChatLinkSchema,
  stepMediaSchema,
  stepReviewSchema,
  defaultFormValues,
  type StorySubmissionData,
} from "@/lib/schemas/story-submission";
import { useAutoSave } from "./useAutoSave";

export const WIZARD_STEPS = [
  { id: 1, name: "Basics", key: "basics" },
  { id: 2, name: "Story", key: "story" },
  { id: 3, name: "Chat Link", key: "chatLink" },
  { id: 4, name: "Media", key: "media" },
  { id: 5, name: "Review", key: "review" },
] as const;

export type WizardStep = (typeof WIZARD_STEPS)[number];

export interface UseWizardFormReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<StorySubmissionData, any, StorySubmissionData>;
  currentStep: number;
  steps: typeof WIZARD_STEPS;
  // eslint-disable-next-line no-unused-vars
  goToStep: (step: number) => Promise<boolean>;
  nextStep: () => Promise<boolean>;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  // eslint-disable-next-line no-unused-vars
  isStepComplete: (step: number) => boolean;
  validateCurrentStep: () => Promise<boolean>;
  autoSaveState: {
    lastSaved: Date | null;
    isSaving: boolean;
  };
  resetForm: () => void;
}

export function useWizardForm(): UseWizardFormReturn {
  const [currentStep, setCurrentStep] = useState(1);

  // Initialize form with react-hook-form and zod resolver
  // Using "onBlur" mode for better performance (validates on blur instead of every keystroke)
  const form = useForm<StorySubmissionData>({
    resolver: zodResolver(storySubmissionSchema) as Resolver<StorySubmissionData>,
    defaultValues: defaultFormValues,
    mode: "onBlur",
  });

  // Get form data function (called only when needed, not on every render)
  const getFormData = useCallback(() => form.getValues(), [form]);

  // Auto-save hook with callback-based API
  const { lastSaved, isSaving, loadDraft, clearDraft, triggerSave } = useAutoSave(getFormData);

  // Trigger auto-save when form values change (using subscription, not watch)
  useEffect(() => {
    const subscription = form.watch(() => {
      triggerSave();
    });
    return () => subscription.unsubscribe();
  }, [form, triggerSave]);

  // Load draft on mount (intentionally only run once)
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      form.reset(draft);
    }
  }, [loadDraft, form]);

  // Get schema for current step
  const getStepSchema = useCallback((step: number) => {
    switch (step) {
      case 1:
        return stepBasicsSchema;
      case 2:
        return stepStorySchema;
      case 3:
        return stepChatLinkSchema;
      case 4:
        return stepMediaSchema;
      case 5:
        return stepReviewSchema;
      default:
        return stepBasicsSchema;
    }
  }, []);

  // Get fields for current step
  const getStepFields = useCallback((step: number): (keyof StorySubmissionData)[] => {
    switch (step) {
      case 1:
        return ["category", "aiTool"];
      case 2:
        return [
          "title",
          "problem",
          "howAIHelped",
          "outcome",
          "moneySaved",
          "timeSaved",
          "otherMetric",
        ];
      case 3:
        return ["chatUrl", "chatExcerpt"];
      case 4:
        return ["files"];
      case 5:
        return ["termsAccepted", "privacyAccepted"];
      default:
        return [];
    }
  }, []);

  // Validate current step
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    const fields = getStepFields(currentStep);
    const schema = getStepSchema(currentStep);

    // Clear any existing errors for this step's fields first
    fields.forEach((field) => form.clearErrors(field));

    // Get current values for this step's fields
    const values: Record<string, unknown> = {};
    for (const field of fields) {
      values[field] = form.getValues(field);
    }

    const result = schema.safeParse(values);

    if (result.success) {
      return true;
    } else {
      // Set errors from the step schema validation (Zod v4 uses .issues)
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof StorySubmissionData;
        if (fieldName) {
          form.setError(fieldName, {
            type: "manual",
            message: issue.message,
          });
        }
      });
      return false;
    }
  }, [currentStep, form, getStepFields, getStepSchema]);

  // Check if a step is complete
  const isStepComplete = useCallback(
    // eslint-disable-next-line complexity
    (step: number): boolean => {
      const values = form.getValues();

      // Check if all required fields have values
      switch (step) {
        case 1:
          return !!values.category && !!values.aiTool;
        case 2: {
          // Story fields + at least one success metric
          const hasStoryFields =
            values.title?.length >= 10 &&
            values.problem?.length >= 50 &&
            values.howAIHelped?.length >= 50 &&
            values.outcome?.length >= 50;
          const hasMetric = !!values.moneySaved || !!values.timeSaved || !!values.otherMetric;
          return hasStoryFields && hasMetric;
        }
        case 3:
          return !!(values.chatUrl || values.chatExcerpt);
        case 4:
          return true; // Media is optional
        case 5:
          return values.termsAccepted === true && values.privacyAccepted === true;
        default:
          return false;
      }
    },
    [form]
  );

  // Go to a specific step
  const goToStep = useCallback(
    async (step: number): Promise<boolean> => {
      // If going forward, validate current step first
      if (step > currentStep) {
        const isValid = await validateCurrentStep();
        if (!isValid) {
          return false;
        }
      }

      if (step >= 1 && step <= WIZARD_STEPS.length) {
        setCurrentStep(step);
        return true;
      }
      return false;
    },
    [currentStep, validateCurrentStep]
  );

  // Next step
  const nextStep = useCallback(async (): Promise<boolean> => {
    return goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  // Previous step
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Reset form
  const resetForm = useCallback(() => {
    form.reset(defaultFormValues);
    clearDraft();
    setCurrentStep(1);
  }, [form, clearDraft]);

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === WIZARD_STEPS.length;

  return useMemo(
    () => ({
      form,
      currentStep,
      steps: WIZARD_STEPS,
      goToStep,
      nextStep,
      prevStep,
      isFirstStep,
      isLastStep,
      isStepComplete,
      validateCurrentStep,
      autoSaveState: {
        lastSaved,
        isSaving,
      },
      resetForm,
    }),
    [
      form,
      currentStep,
      goToStep,
      nextStep,
      prevStep,
      isFirstStep,
      isLastStep,
      isStepComplete,
      validateCurrentStep,
      lastSaved,
      isSaving,
      resetForm,
    ]
  );
}
