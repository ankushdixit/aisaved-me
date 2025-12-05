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
