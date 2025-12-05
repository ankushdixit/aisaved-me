import Link from "next/link";
import type { ChatEmbed as ChatEmbedType } from "@/lib/types/story";
import { ChatMessage } from "../ChatMessage";

interface ChatEmbedProps {
  chatEmbed: ChatEmbedType;
  storySlug: string;
}

export function ChatEmbed({ chatEmbed, storySlug }: ChatEmbedProps) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-display font-semibold text-[#3d405b]">Actual AI Chat Session</h2>
      <p className="mt-1 text-sm text-[#5a5d7a]">
        Verified conversation with {chatEmbed.aiToolLabel}
      </p>

      <div className="mt-4 rounded-2xl shadow-soft bg-white overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#fff0dc]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#81b29a] rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">AI</span>
            </div>
            <span className="font-semibold text-[#3d405b]">{chatEmbed.aiToolLabel}</span>
          </div>
          <Link
            href={`/stories/${storySlug}/chat`}
            className="text-sm text-[#e07a5f] hover:text-[#c66b52] transition-colors"
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
