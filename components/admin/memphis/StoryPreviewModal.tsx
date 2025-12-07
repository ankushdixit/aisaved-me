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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white border-4 border-black shadow-memphis-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 bg-[#FFF9E6] border-b-4 border-black flex justify-between items-center">
          <h2 className="font-display font-bold text-xl text-black">Story Preview</h2>
          <button
            onClick={onClose}
            className="btn-memphis-sm w-10 h-10 bg-[#FF1493] flex items-center justify-center text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <h3 className="font-display font-bold text-2xl text-black mb-2">{story.title}</h3>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-gray-500 font-body">By {story.author}</span>
            <span
              className={`px-3 py-1 text-xs font-display font-bold border-2 border-black rounded-full transform -rotate-1 ${
                story.category === "legal"
                  ? "bg-[#FFD700] text-black"
                  : story.category === "medical"
                    ? "bg-[#00FF7F] text-black"
                    : "bg-[#FF1493] text-white"
              }`}
            >
              {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
            </span>
            {story.verified && (
              <span className="px-3 py-1 text-xs font-display font-bold bg-[#00FF7F] text-black border-2 border-black rounded-full">
                ✓ Verified
              </span>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="font-body text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {story.chatLink && (
            <div className="mt-6 p-4 bg-[#0066FF]/10 border-3 border-[#0066FF]">
              <p className="text-sm font-body font-bold text-[#0066FF] mb-2">Chat Link</p>
              <a
                href={story.chatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-body text-[#0066FF] hover:underline break-all"
              >
                {story.chatLink}
              </a>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t-4 border-black flex justify-end gap-3">
          <button onClick={onClose} className="btn-memphis px-6 py-2.5 bg-white text-black">
            Cancel
          </button>
          <button
            onClick={() => onReject(story)}
            className="btn-memphis px-6 py-2.5 bg-[#FF6B6B] text-white"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(story)}
            className="btn-memphis px-6 py-2.5 bg-[#00FF7F] text-black"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
