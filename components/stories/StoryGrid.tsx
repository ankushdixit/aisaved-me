"use client";

import { StoryCardHorizontal } from "./StoryCardHorizontal";
import type { Story } from "@/lib/types/story";

interface StoryGridProps {
  stories: Story[];
}

export function StoryGrid({ stories }: StoryGridProps) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No stories found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {stories.map((story) => (
        <StoryCardHorizontal key={story.id} story={story} />
      ))}
    </div>
  );
}
