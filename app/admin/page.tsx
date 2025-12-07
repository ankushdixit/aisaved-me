"use client";

import { useState } from "react";
import {
  StatsCard,
  PendingStoriesTable,
  StoryPreviewModal,
  ActivityFeed,
  WeeklyStats,
} from "@/components/admin";
import { adminStats, weeklyStats } from "@/lib/mock-data/admin-stats";
import { pendingStories, recentActivity, type PendingStory } from "@/lib/mock-data/pending-stories";

export default function AdminDashboardPage() {
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="mb-8">
        <PendingStoriesTable
          stories={stories}
          onView={handleView}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed activities={recentActivity} />
        <WeeklyStats stats={weeklyStats} />
      </div>

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
