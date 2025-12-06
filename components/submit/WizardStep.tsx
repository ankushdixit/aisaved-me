"use client";

import { useTheme } from "@/lib/themes";
import {
  WizardStep as MemphisWizardStep,
  WizardNavigation as MemphisWizardNavigation,
  AutoSaveIndicator as MemphisAutoSaveIndicator,
} from "./memphis/WizardStep";
import {
  WizardStep as JapaneseWizardStep,
  WizardNavigation as JapaneseWizardNavigation,
  AutoSaveIndicator as JapaneseAutoSaveIndicator,
} from "./japanese/WizardStep";
import {
  WizardStep as OrganicWizardStep,
  WizardNavigation as OrganicWizardNavigation,
  AutoSaveIndicator as OrganicAutoSaveIndicator,
} from "./organic/WizardStep";
import type { ReactNode } from "react";

interface WizardStepProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function WizardStep(props: WizardStepProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisWizardStep {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseWizardStep {...props} />;
    case "organic":
      return <OrganicWizardStep {...props} />;
    default:
      return <MemphisWizardStep {...props} />;
  }
}

interface WizardNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextLabel?: string;
  isSubmitting?: boolean;
}

export function WizardNavigation(props: WizardNavigationProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisWizardNavigation {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseWizardNavigation {...props} />;
    case "organic":
      return <OrganicWizardNavigation {...props} />;
    default:
      return <MemphisWizardNavigation {...props} />;
  }
}

interface AutoSaveIndicatorProps {
  lastSaved: Date | null;
  isSaving: boolean;
}

export function AutoSaveIndicator(props: AutoSaveIndicatorProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisAutoSaveIndicator {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseAutoSaveIndicator {...props} />;
    case "organic":
      return <OrganicAutoSaveIndicator {...props} />;
    default:
      return <MemphisAutoSaveIndicator {...props} />;
  }
}
