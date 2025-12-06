"use client";

import { useTheme } from "@/lib/themes";
import { WizardProgress as MemphisWizardProgress } from "./memphis/WizardProgress";
import { WizardProgress as JapaneseWizardProgress } from "./japanese/WizardProgress";
import { WizardProgress as OrganicWizardProgress } from "./organic/WizardProgress";

interface WizardProgressProps {
  steps: readonly { id: number; name: string; key: string }[];
  currentStep: number;
  // eslint-disable-next-line no-unused-vars
  isStepComplete: (step: number) => boolean;
  // eslint-disable-next-line no-unused-vars
  onStepClick?: (step: number) => void;
}

export function WizardProgress(props: WizardProgressProps) {
  const { theme, mounted } = useTheme();

  // Show Memphis as default during SSR/hydration
  if (!mounted) {
    return <MemphisWizardProgress {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseWizardProgress {...props} />;
    case "organic":
      return <OrganicWizardProgress {...props} />;
    default:
      return <MemphisWizardProgress {...props} />;
  }
}
