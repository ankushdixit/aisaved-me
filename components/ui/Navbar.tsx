"use client";

import { useTheme } from "@/lib/themes";
import { Navbar as MemphisNavbar } from "./memphis/Navbar";
import { Navbar as JapaneseNavbar } from "./japanese/Navbar";
import { Navbar as OrganicNavbar } from "./organic/Navbar";

export function Navbar() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisNavbar />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseNavbar />;
    case "organic":
      return <OrganicNavbar />;
    default:
      return <MemphisNavbar />;
  }
}
