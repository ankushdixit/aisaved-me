"use client";

import { useTheme } from "@/lib/themes";
import { ChatEmbed as MemphisChatEmbed } from "./memphis/ChatEmbed";
import { ChatEmbed as JapaneseChatEmbed } from "./japanese/ChatEmbed";
import { ChatEmbed as OrganicChatEmbed } from "./organic/ChatEmbed";
import type { ChatEmbed as ChatEmbedType } from "@/lib/types/story";

interface ChatEmbedProps {
  chatEmbed: ChatEmbedType;
  storySlug: string;
}

export function ChatEmbed(props: ChatEmbedProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisChatEmbed {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseChatEmbed {...props} />;
    case "organic":
      return <OrganicChatEmbed {...props} />;
    default:
      return <MemphisChatEmbed {...props} />;
  }
}
