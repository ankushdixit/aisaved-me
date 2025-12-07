"use client";

import { useTheme } from "@/lib/themes";
import { AdminSidebar as MemphisAdminSidebar } from "./memphis/AdminSidebar";
import { AdminSidebar as JapaneseAdminSidebar } from "./japanese/AdminSidebar";
import { AdminSidebar as OrganicAdminSidebar } from "./organic/AdminSidebar";

export function AdminSidebar() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisAdminSidebar />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseAdminSidebar />;
    case "organic":
      return <OrganicAdminSidebar />;
    default:
      return <MemphisAdminSidebar />;
  }
}
