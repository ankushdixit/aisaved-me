"use client";

import { useTheme } from "@/lib/themes";
import { type PendingStory } from "@/lib/mock-data/pending-stories";
import { StoryPreviewModal as MemphisStoryPreviewModal } from "./memphis/StoryPreviewModal";
import { StoryPreviewModal as JapaneseStoryPreviewModal } from "./japanese/StoryPreviewModal";
import { StoryPreviewModal as OrganicStoryPreviewModal } from "./organic/StoryPreviewModal";

interface StoryPreviewModalProps {
  story: PendingStory | null;
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onApprove: (story: PendingStory) => void;
  // eslint-disable-next-line no-unused-vars
  onReject: (story: PendingStory) => void;
}

export function StoryPreviewModal(props: StoryPreviewModalProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisStoryPreviewModal {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseStoryPreviewModal {...props} />;
    case "organic":
      return <OrganicStoryPreviewModal {...props} />;
    default:
      return <MemphisStoryPreviewModal {...props} />;
  }
}
