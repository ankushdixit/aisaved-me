"use client";

import { useTheme } from "@/lib/themes";
import { FilterSidebar as MemphisFilterSidebar } from "./memphis/FilterSidebar";
import { FilterSidebar as JapaneseFilterSidebar } from "./japanese/FilterSidebar";
import { FilterSidebar as OrganicFilterSidebar } from "./organic/FilterSidebar";
import type { FilterGroup } from "@/lib/types/story";

interface FilterSidebarProps {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (groupId: string, value: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

export function FilterSidebar(props: FilterSidebarProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisFilterSidebar {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseFilterSidebar {...props} />;
    case "organic":
      return <OrganicFilterSidebar {...props} />;
    default:
      return <MemphisFilterSidebar {...props} />;
  }
}
