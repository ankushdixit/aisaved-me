"use client";

import { useTheme } from "@/lib/themes";
import { SignInForm as MemphisSignInForm } from "./memphis/SignInForm";
import { SignInForm as JapaneseSignInForm } from "./japanese/SignInForm";
import { SignInForm as OrganicSignInForm } from "./organic/SignInForm";

export interface SignInFormProps {
  callbackUrl?: string;
  error?: string | null;
}

export function SignInForm({ callbackUrl = "/", error }: SignInFormProps) {
  const { theme, mounted } = useTheme();

  // Show Memphis as default during SSR/hydration
  if (!mounted) {
    return <MemphisSignInForm callbackUrl={callbackUrl} error={error} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseSignInForm callbackUrl={callbackUrl} error={error} />;
    case "organic":
      return <OrganicSignInForm callbackUrl={callbackUrl} error={error} />;
    default:
      return <MemphisSignInForm callbackUrl={callbackUrl} error={error} />;
  }
}
