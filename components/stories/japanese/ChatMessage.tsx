import type { ChatMessage as ChatMessageType } from "@/lib/types/story";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] p-4 ${
          isUser
            ? "bg-[#f5f2ed] border border-[#d4d0c8]"
            : "bg-[#faf8f5] border-l-2 border-[#1a1a1a]"
        }`}
      >
        <p className="text-sm text-[#1a1a1a] whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  );
}
