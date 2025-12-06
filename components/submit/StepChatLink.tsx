"use client";

import type { UseFormReturn } from "react-hook-form";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";
import { SUPPORTED_CHAT_DOMAINS } from "@/lib/schemas/story-submission";
import { WizardStep, WizardNavigation } from "./WizardStep";
import { FormField, TextInput, TextArea } from "./FormField";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface StepChatLinkProps {
  form: UseFormReturn<StorySubmissionData>;
  onNext: () => void;
  onBack: () => void;
}

// eslint-disable-next-line complexity
export function StepChatLink({ form, onNext, onBack }: StepChatLinkProps) {
  const { theme } = useTheme();
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const chatUrl = watch("chatUrl");
  const chatExcerpt = watch("chatExcerpt");

  const dividerStyles = {
    memphis:
      "relative py-4 text-center before:absolute before:left-0 before:top-1/2 before:w-full before:h-0.5 before:bg-gray-200",
    japanese: "relative py-4 text-center zen-divider",
    organic:
      "relative py-4 text-center before:absolute before:left-0 before:top-1/2 before:w-full before:h-0.5 before:bg-sage-light",
  };

  const orBadgeStyles = {
    memphis: "relative bg-white px-4 font-display font-bold text-gray-500 uppercase",
    japanese: "relative bg-rice-paper px-4 text-warm-gray",
    organic: "relative bg-cream px-4 font-medium text-clay-light",
  };

  // Check if there's an error on chatUrl related to domain validation
  const hasUrlError = errors.chatUrl?.message?.includes("supported domain");

  return (
    <WizardStep
      title="Add Your Chat"
      description="Share the AI conversation that helped you succeed"
    >
      <FormField
        label="Chat Link"
        hint="Paste a shareable link to your AI conversation"
        error={errors.chatUrl?.message}
      >
        <TextInput
          value={chatUrl || ""}
          onChange={(value) => setValue("chatUrl", value)}
          placeholder="https://claude.ai/chat/..."
          type="url"
          error={!!errors.chatUrl}
        />
        {hasUrlError && (
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium">Supported platforms:</p>
            <ul className="list-disc list-inside mt-1">
              {SUPPORTED_CHAT_DOMAINS.map((domain) => (
                <li key={domain}>{domain}</li>
              ))}
            </ul>
          </div>
        )}
      </FormField>

      <div className={dividerStyles[theme]}>
        <span className={orBadgeStyles[theme]}>or</span>
      </div>

      <FormField
        label="Paste Chat Excerpts"
        hint="Copy and paste the relevant parts of your conversation"
        error={
          errors.chatUrl?.message === "Please provide either a chat link or paste chat excerpts"
            ? errors.chatUrl.message
            : undefined
        }
      >
        <TextArea
          value={chatExcerpt || ""}
          onChange={(value) => setValue("chatExcerpt", value)}
          placeholder="Paste the key parts of your AI conversation here..."
          rows={6}
          error={
            !!errors.chatUrl &&
            errors.chatUrl.message === "Please provide either a chat link or paste chat excerpts"
          }
        />
      </FormField>

      <div
        className={cn(
          "p-4 rounded-lg text-sm",
          theme === "memphis" && "bg-blue-50 border-2 border-electric-blue",
          theme === "japanese" && "bg-light-100 border border-light-300",
          theme === "organic" && "bg-cream-dark border border-sage-light rounded-xl"
        )}
      >
        <p className="font-medium">Why share your chat?</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
          <li>Helps verify your story is authentic</li>
          <li>Shows others how to approach similar problems</li>
          <li>Demonstrates effective prompting techniques</li>
        </ul>
      </div>

      <WizardNavigation onBack={onBack} onNext={onNext} isFirstStep={false} isLastStep={false} />
    </WizardStep>
  );
}
