"use client";

import { useTheme } from "@/lib/themes";
import { SignUpForm as MemphisSignUpForm } from "./memphis/SignUpForm";
import { SignUpForm as JapaneseSignUpForm } from "./japanese/SignUpForm";
import { SignUpForm as OrganicSignUpForm } from "./organic/SignUpForm";

export interface SignUpFormProps {
  callbackUrl?: string;
}

export function SignUpForm({ callbackUrl = "/" }: SignUpFormProps) {
  const { theme, mounted } = useTheme();

  // Show Memphis as default during SSR/hydration
  if (!mounted) {
    return <MemphisSignUpForm callbackUrl={callbackUrl} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseSignUpForm callbackUrl={callbackUrl} />;
    case "organic":
      return <OrganicSignUpForm callbackUrl={callbackUrl} />;
    default:
      return <MemphisSignUpForm callbackUrl={callbackUrl} />;
  }
}
