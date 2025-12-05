import type { ChatMessage as ChatMessageType } from "@/lib/types/story";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] p-4 rounded-2xl ${
          isUser ? "bg-[#fff0dc]" : "bg-[#e8f5e9] shadow-soft"
        }`}
      >
        <p className="text-sm text-[#3d405b] whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  );
}
