/**
 * Story type definitions for the story listing and detail pages
 */

export type StoryCategory = "legal" | "medical" | "financial" | "other";

export type AiTool = "claude" | "chatgpt" | "gemini" | "other";

export type OutcomeType = "money_saved" | "time_saved" | "problem_solved" | "other";

export interface Story {
  id: string;
  slug: string;
  category: StoryCategory;
  categoryLabel: string;
  aiTool: AiTool;
  aiToolLabel: string;
  outcomeType: OutcomeType;
  outcomeLabel: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  readTime: string;
  amountSaved?: number;
  outcomeMetric: string;
  imageAlt: string;
  createdAt: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface StoryFilters {
  categories: StoryCategory[];
  aiTools: AiTool[];
  outcomeTypes: OutcomeType[];
  searchQuery: string;
  sortBy: "recent" | "popular" | "amount";
  page: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

// Types for Story Detail Page

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
}

export interface ChatEmbed {
  storyId: string;
  aiTool: AiTool;
  aiToolLabel: string;
  messages: ChatMessage[];
}

export interface StoryArtifact {
  id: string;
  type: "image" | "document" | "screenshot";
  url: string;
  title: string;
  caption: string;
  alt: string;
  fileSize?: string;
  pageCount?: number;
}

export interface StoryContent {
  intro: string;
  theProblem: string;
  theStrategy: string;
  quote?: {
    text: string;
    attribution: string;
  };
  theResult: string;
  keyTakeaways: string[];
  artifacts?: StoryArtifact[];
}

export interface StoryDetail extends Story {
  subtitle?: string;
  publishedDate: string;
  content: StoryContent;
  chatEmbed?: ChatEmbed;
  likes: number;
  comments: number;
}
