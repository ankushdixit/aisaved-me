import Link from "next/link";
import type { ChatEmbed as ChatEmbedType } from "@/lib/types/story";
import { ChatMessage } from "../ChatMessage";

interface ChatEmbedProps {
  chatEmbed: ChatEmbedType;
  storySlug: string;
}

export function ChatEmbed({ chatEmbed, storySlug }: ChatEmbedProps) {
  return (
    <div className="mt-12">
      <h2 className="text-xl text-[#1a1a1a]">Actual AI Chat Session</h2>
      <p className="mt-1 text-sm text-[#6b6b6b]">
        Verified conversation with {chatEmbed.aiToolLabel}
      </p>

      <div className="mt-4 border border-[#d4d0c8] bg-[#faf8f5] overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#f5f2ed] border-b border-[#d4d0c8]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-xs text-[#faf8f5]">AI</span>
            </div>
            <span className="text-[#1a1a1a]">{chatEmbed.aiToolLabel}</span>
          </div>
          <Link
            href={`/stories/${storySlug}/chat`}
            className="text-sm text-[#1a1a1a] hover:text-[#c41e3a] transition-colors"
          >
            View Full Chat &rarr;
          </Link>
        </div>

        {/* Chat Messages */}
        <div className="p-5 space-y-4">
          {chatEmbed.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
}
