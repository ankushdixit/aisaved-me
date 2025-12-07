"use client";

import { useTheme } from "@/lib/themes";
import { type PendingStory } from "@/lib/mock-data/pending-stories";
import { PendingStoriesTable as MemphisPendingStoriesTable } from "./memphis/PendingStoriesTable";
import { PendingStoriesTable as JapanesePendingStoriesTable } from "./japanese/PendingStoriesTable";
import { PendingStoriesTable as OrganicPendingStoriesTable } from "./organic/PendingStoriesTable";

interface PendingStoriesTableProps {
  stories: PendingStory[];
  // eslint-disable-next-line no-unused-vars
  onView: (story: PendingStory) => void;
  // eslint-disable-next-line no-unused-vars
  onApprove: (story: PendingStory) => void;
  // eslint-disable-next-line no-unused-vars
  onReject: (story: PendingStory) => void;
}

export function PendingStoriesTable({
  stories,
  onView,
  onApprove,
  onReject,
}: PendingStoriesTableProps) {
  const { theme, mounted } = useTheme();

  const props = { stories, onView, onApprove, onReject };

  if (!mounted) {
    return <MemphisPendingStoriesTable {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapanesePendingStoriesTable {...props} />;
    case "organic":
      return <OrganicPendingStoriesTable {...props} />;
    default:
      return <MemphisPendingStoriesTable {...props} />;
  }
}
