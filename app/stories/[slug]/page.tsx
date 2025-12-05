"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { Navbar, Footer } from "@/components/ui";
import {
  StoryHero,
  StoryContent,
  StoryArtifacts,
  ChatEmbed,
  EngagementBar,
  RelatedStories,
} from "@/components/stories";
import { getStoryBySlug, getRelatedStories } from "@/lib/mock-data/stories";

interface StoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = use(params);
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(slug, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <StoryHero story={story} />

        {/* Main Content */}
        <article className="mx-auto max-w-3xl px-6 lg:px-8 py-10">
          <EngagementBar likes={story.likes} comments={story.comments} storySlug={story.slug} />

          <div className="mt-10">
            <StoryContent content={story.content} />
          </div>

          {story.content.artifacts && story.content.artifacts.length > 0 && (
            <StoryArtifacts artifacts={story.content.artifacts} />
          )}

          {story.chatEmbed && <ChatEmbed chatEmbed={story.chatEmbed} storySlug={story.slug} />}
        </article>

        <RelatedStories stories={relatedStories} />
      </main>
      <Footer />
    </>
  );
}
