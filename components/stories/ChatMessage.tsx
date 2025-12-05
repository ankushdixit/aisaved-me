"use client";

import { useTheme } from "@/lib/themes";
import { ChatMessage as MemphisChatMessage } from "./memphis/ChatMessage";
import { ChatMessage as JapaneseChatMessage } from "./japanese/ChatMessage";
import { ChatMessage as OrganicChatMessage } from "./organic/ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/lib/types/story";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage(props: ChatMessageProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisChatMessage {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseChatMessage {...props} />;
    case "organic":
      return <OrganicChatMessage {...props} />;
    default:
      return <MemphisChatMessage {...props} />;
  }
}
