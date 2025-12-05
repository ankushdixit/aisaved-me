"use client";

import { useTheme } from "@/lib/themes";
import { CategoryCards as MemphisCategoryCards } from "./memphis/CategoryCard";
import { CategoryCards as JapaneseCategoryCards } from "./japanese/CategoryCard";
import { CategoryCards as OrganicCategoryCards } from "./organic/CategoryCard";

export function CategoryCards() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisCategoryCards />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseCategoryCards />;
    case "organic":
      return <OrganicCategoryCards />;
    default:
      return <MemphisCategoryCards />;
  }
}
