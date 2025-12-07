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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/60"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#faf8f5] border border-[#d4d0c8] max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#d4d0c8] flex justify-between items-center">
          <h2 className="font-medium text-xl text-[#1a1a1a]">Story Preview</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <h3 className="font-medium text-2xl text-[#1a1a1a] mb-2">{story.title}</h3>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-[#6b6b6b]">By {story.author}</span>
            <span className="px-3 py-1 text-xs text-[#6b6b6b] border border-[#d4d0c8]">
              {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
            </span>
            {story.verified && (
              <span className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#faf8f5]">Verified</span>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-[#1a1a1a] mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {story.chatLink && (
            <div className="mt-6 p-4 bg-[#f5f2ed] border border-[#d4d0c8]">
              <p className="text-sm font-medium text-[#6b6b6b] mb-2">Chat Link</p>
              <a
                href={story.chatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#1a1a1a] hover:text-[#c41e3a] break-all transition-colors"
              >
                {story.chatLink}
              </a>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[#f5f2ed] border-t border-[#d4d0c8] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onReject(story)}
            className="px-6 py-2.5 font-medium text-white bg-[#c41e3a] hover:bg-[#9b1628] transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(story)}
            className="px-6 py-2.5 font-medium text-[#faf8f5] bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
