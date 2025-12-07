"use client";

import { type PendingStory } from "@/lib/mock-data/pending-stories";

interface StoryPreviewModalProps {
  story: PendingStory | null;
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onApprove: (story: PendingStory) => void;
  // eslint-disable-next-line no-unused-vars
  onReject: (story: PendingStory) => void;
}

export function StoryPreviewModal({
  story,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: StoryPreviewModalProps) {
  if (!isOpen || !story) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3d405b]/50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-soft-hover max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 bg-[#fff8f0] border-b border-[#f2cc8f]/30 flex justify-between items-center">
          <h2 className="font-semibold text-xl text-[#3d405b]">Story Preview</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#e07a5f] rounded-full flex items-center justify-center text-white hover:bg-[#c66b52] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <h3 className="font-semibold text-2xl text-[#3d405b] mb-2">{story.title}</h3>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-[#6b6b6b]">By {story.author}</span>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                story.category === "legal"
                  ? "bg-[#fff3e0] text-[#8d6e63]"
                  : story.category === "medical"
                    ? "bg-[#e8f5e9] text-[#558b2f]"
                    : "bg-[#fce4ec] text-[#c2185b]"
              }`}
            >
              {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
            </span>
            {story.verified && (
              <span className="px-3 py-1 text-xs font-medium bg-[#81b29a] text-white rounded-full">
                ✓ Verified
              </span>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-[#5a5d7a] mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {story.chatLink && (
            <div className="mt-6 p-4 bg-[#e07a5f]/10 rounded-2xl">
              <p className="text-sm font-semibold text-[#e07a5f] mb-2">Chat Link</p>
              <a
                href={story.chatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#e07a5f] hover:text-[#c66b52] break-all transition-colors"
              >
                {story.chatLink}
              </a>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[#fff8f0] border-t border-[#f2cc8f]/30 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 font-medium text-[#6b6b6b] hover:text-[#3d405b] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onReject(story)}
            className="px-6 py-2.5 font-semibold text-white bg-[#e07a5f] rounded-xl hover:bg-[#c66b52] transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(story)}
            className="px-6 py-2.5 font-semibold text-white bg-[#81b29a] rounded-xl hover:bg-[#6d9a84] transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
