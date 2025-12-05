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
      <h2 className="text-2xl font-display font-bold text-black">Actual AI Chat Session</h2>
      <p className="mt-1 text-sm font-body text-gray-600">
        Verified conversation with {chatEmbed.aiToolLabel}
      </p>

      <div className="mt-4 border-4 border-black shadow-memphis-lg bg-white overflow-hidden">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-100 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#0066FF] border-2 border-black flex items-center justify-center">
              <span className="text-xs font-bold text-white">AI</span>
            </div>
            <span className="font-display font-bold text-black">{chatEmbed.aiToolLabel}</span>
          </div>
          <Link
            href={`/stories/${storySlug}/chat`}
            className="text-sm font-body text-[#0066FF] hover:underline"
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
