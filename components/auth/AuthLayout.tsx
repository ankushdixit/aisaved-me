"use client";

import { type ReactNode } from "react";
import { useTheme } from "@/lib/themes";
import { AuthLayout as MemphisAuthLayout } from "./memphis/AuthLayout";
import { AuthLayout as JapaneseAuthLayout } from "./japanese/AuthLayout";
import { AuthLayout as OrganicAuthLayout } from "./organic/AuthLayout";

export interface AuthLayoutProps {
  children: ReactNode;
  variant?: "signin" | "signup";
}

export function AuthLayout({ children, variant = "signin" }: AuthLayoutProps) {
  const { theme, mounted } = useTheme();

  // Show Memphis as default during SSR/hydration
  if (!mounted) {
    return <MemphisAuthLayout variant={variant}>{children}</MemphisAuthLayout>;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseAuthLayout variant={variant}>{children}</JapaneseAuthLayout>;
    case "organic":
      return <OrganicAuthLayout variant={variant}>{children}</OrganicAuthLayout>;
    default:
      return <MemphisAuthLayout variant={variant}>{children}</MemphisAuthLayout>;
  }
}
