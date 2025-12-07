"use client";

import type { UseFormReturn } from "react-hook-form";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";
import { MAX_FILE_SIZE } from "@/lib/schemas/story-submission";
import { WizardStep, WizardNavigation } from "./WizardStep";
import { FileDropzone } from "@/components/ui/FileDropzone";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface StepMediaProps {
  form: UseFormReturn<StorySubmissionData>;
  onNext: () => void;
  onBack: () => void;
}

function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(0)}MB`;
}

export function StepMedia({ form, onNext, onBack }: StepMediaProps) {
  const { theme } = useTheme();
  const { watch, setValue } = form;

  const files = watch("files") || [];

  const tipBoxStyles = {
    memphis: "p-4 bg-yellow-50 border-2 border-bright-yellow",
    japanese: "p-4 bg-light-100 border border-light-300 rounded-lg",
    organic: "p-4 bg-cream-dark border border-coral-organic rounded-xl",
  };

  return (
    <WizardStep
      title="Add Supporting Media"
      description="Upload images or documents that support your story (optional)"
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          <p>Supporting media helps verify your story and makes it more compelling. You can add:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Screenshots of results or documents</li>
            <li>Before/after comparisons</li>
            <li>Official letters or confirmations</li>
            <li>Any evidence of your success</li>
          </ul>
        </div>

        <FileDropzone
          files={files}
          onFilesChange={(newFiles) => setValue("files", newFiles)}
          maxFiles={5}
        />

        <div className={cn("text-sm", tipBoxStyles[theme])}>
          <p className="font-medium mb-2">File Guidelines</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Maximum file size: {formatFileSize(MAX_FILE_SIZE)} per file</li>
            <li>Accepted formats: Images (PNG, JPG, GIF, WebP), PDFs</li>
            <li>Up to 5 files total</li>
            <li>Please redact any sensitive personal information</li>
          </ul>
        </div>

        <div
          className={cn(
            "p-4 text-sm",
            theme === "memphis" && "bg-green-50 border-2 border-mint-green",
            theme === "japanese" && "bg-light-100 border border-light-300 rounded-lg",
            theme === "organic" && "bg-sage-light/20 border border-sage-light rounded-xl"
          )}
        >
          <p>
            <strong>This step is optional.</strong> You can skip it and submit your story without
            any supporting files.
          </p>
        </div>
      </div>

      <WizardNavigation
        onBack={onBack}
        onNext={onNext}
        isFirstStep={false}
        isLastStep={false}
        nextLabel="Continue to Review →"
      />
    </WizardStep>
  );
}
