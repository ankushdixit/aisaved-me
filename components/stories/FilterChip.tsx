"use client";

import { useTheme } from "@/lib/themes";
import { FilterChip as MemphisFilterChip } from "./memphis/FilterChip";
import { FilterChip as JapaneseFilterChip } from "./japanese/FilterChip";
import { FilterChip as OrganicFilterChip } from "./organic/FilterChip";

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

export function FilterChip(props: FilterChipProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisFilterChip {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseFilterChip {...props} />;
    case "organic":
      return <OrganicFilterChip {...props} />;
    default:
      return <MemphisFilterChip {...props} />;
  }
}
