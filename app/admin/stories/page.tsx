"use client";

import { useState } from "react";
import { PendingStoriesTable, StoryPreviewModal } from "@/components/admin";
import { pendingStories, type PendingStory } from "@/lib/mock-data/pending-stories";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState(pendingStories);
  const [selectedStory, setSelectedStory] = useState<PendingStory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (story: PendingStory) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleApprove = (story: PendingStory) => {
    setStories((prev) =>
      prev.map((s) =>
        s.id === story.id
          ? { ...s, status: s.status === "approved" ? "published" : ("approved" as const) }
          : s
      )
    );
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const handleReject = (story: PendingStory) => {
    setStories((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, status: "rejected" as const } : s))
    );
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  const pendingCount = stories.filter((s) => s.status === "pending").length;
  const approvedCount = stories.filter((s) => s.status === "approved").length;
  const publishedCount = stories.filter((s) => s.status === "published").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-black">Stories</h1>
        <p className="text-gray-500 mt-2">Manage submitted stories and their publication status.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="px-4 py-2 bg-[#FFD700] border-3 border-black shadow-memphis-sm">
          <span className="font-display font-bold text-black">{pendingCount}</span>
          <span className="text-black ml-2">Pending</span>
        </div>
        <div className="px-4 py-2 bg-[#00FF7F] border-3 border-black shadow-memphis-sm">
          <span className="font-display font-bold text-black">{approvedCount}</span>
          <span className="text-black ml-2">Approved</span>
        </div>
        <div className="px-4 py-2 bg-[#0066FF] border-3 border-black shadow-memphis-sm">
          <span className="font-display font-bold text-white">{publishedCount}</span>
          <span className="text-white ml-2">Published</span>
        </div>
      </div>

      <PendingStoriesTable
        stories={stories}
        onView={handleView}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <StoryPreviewModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
