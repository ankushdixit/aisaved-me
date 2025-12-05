"use client";

import { useTheme } from "@/lib/themes";
import { ArtifactModal as MemphisArtifactModal } from "./memphis/ArtifactModal";
import { ArtifactModal as JapaneseArtifactModal } from "./japanese/ArtifactModal";
import { ArtifactModal as OrganicArtifactModal } from "./organic/ArtifactModal";
import type { StoryArtifact } from "@/lib/types/story";

interface ArtifactModalProps {
  artifact: StoryArtifact;
  isOpen: boolean;
  onClose: () => void;
}

export function ArtifactModal(props: ArtifactModalProps) {
  const { theme, mounted } = useTheme();

  // Don't render modal on server or before mount
  if (!mounted) {
    return null;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseArtifactModal {...props} />;
    case "organic":
      return <OrganicArtifactModal {...props} />;
    default:
      return <MemphisArtifactModal {...props} />;
  }
}
