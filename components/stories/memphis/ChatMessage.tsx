import type { ChatMessage as ChatMessageType } from "@/lib/types/story";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] p-4 border-3 border-black ${
          isUser
            ? "bg-gray-100 rounded-tl-xl rounded-bl-xl rounded-br-xl"
            : "bg-[#dbeafe] rounded-tr-xl rounded-bl-xl rounded-br-xl"
        }`}
      >
        <p className="text-sm font-body text-black whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  );
}
