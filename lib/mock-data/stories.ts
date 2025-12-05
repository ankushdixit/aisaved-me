/**
 * Mock story data for the landing page and story listing
 * This will be replaced with real data from the database in Phase 1B
 */

import type { Story, StoryCategory, AiTool, OutcomeType, FilterGroup } from "@/lib/types/story";

// Re-export types for backwards compatibility
export type { StoryCategory, AiTool, OutcomeType };

// Ticker stories use a subset of categories (no "other")
export type TickerCategory = "legal" | "medical" | "financial";

export interface TickerStory {
  id: string;
  category: TickerCategory;
  title: string;
  amount?: number;
  amountLabel?: string;
  outcome?: string;
  author: string;
  timeAgo: string;
}

export interface FeaturedStory {
  id: string;
  slug: string;
  category: StoryCategory;
  categoryLabel: string;
  title: string;
  excerpt: string;
  aiQuote: string;
  author: string;
  readTime: string;
  amountSaved: number;
  imageAlt: string;
}

export interface CategoryStats {
  category: StoryCategory;
  label: string;
  description: string;
  storyCount: number;
  colorClass: string;
}

// Total saved counter (mock)
export const totalSaved = 2847392;

// Ticker stories for the live feed
export const tickerStoriesRow1: TickerStory[] = [
  {
    id: "ticker-1",
    category: "legal",
    title: "Enterprise damage claim defeated",
    amount: 3200,
    amountLabel: "saved",
    author: "Ankush D.",
    timeAgo: "2 hours ago",
  },
  {
    id: "ticker-2",
    category: "medical",
    title: "AI identified kidney stones, doctor agreed",
    outcome: "Diagnosis confirmed",
    author: "Raj P.",
    timeAgo: "5 hours ago",
  },
  {
    id: "ticker-3",
    category: "legal",
    title: "Security deposit returned in full",
    amount: 2400,
    amountLabel: "recovered",
    author: "Sarah M.",
    timeAgo: "8 hours ago",
  },
  {
    id: "ticker-4",
    category: "legal",
    title: "Insurance denial overturned",
    amount: 12000,
    amountLabel: "approved",
    author: "Lisa K.",
    timeAgo: "1 day ago",
  },
];

export const tickerStoriesRow2: TickerStory[] = [
  {
    id: "ticker-5",
    category: "legal",
    title: "Contractor paid after small claims prep",
    amount: 5500,
    amountLabel: "won",
    author: "Mike R.",
    timeAgo: "1 day ago",
  },
  {
    id: "ticker-6",
    category: "medical",
    title: "AI symptom check saved unnecessary trip",
    outcome: "ER visit avoided",
    author: "James T.",
    timeAgo: "2 days ago",
  },
  {
    id: "ticker-7",
    category: "legal",
    title: "HOA fine overturned with AI research",
    amount: 1500,
    amountLabel: "removed",
    author: "David P.",
    timeAgo: "2 days ago",
  },
  {
    id: "ticker-8",
    category: "legal",
    title: "Collection harassment stopped",
    outcome: "Debt forgiven",
    author: "Tom B.",
    timeAgo: "3 days ago",
  },
];

// Featured story for the main highlight
export const featuredStory: FeaturedStory = {
  id: "featured-1",
  slug: "how-i-beat-enterprise-damage-claim",
  category: "legal",
  categoryLabel: "Legal Win",
  title: "How I Beat Enterprise's $3,200 Damage Claim",
  excerpt:
    "Using Claude, I built a systematic legal defense that made them drop the claim entirely within one week.",
  aiQuote: "Based on your evidence, Enterprise has no legal basis for this claim...",
  author: "Ankush D.",
  readTime: "5 min read",
  amountSaved: 3200,
  imageAlt: "Car rental dispute victory",
};

// Category stats for category cards
export const categoryStats: CategoryStats[] = [
  {
    category: "legal",
    label: "Legal Wins",
    description: "Disputes, claims, contracts, tenant rights",
    storyCount: 142,
    colorClass: "legal",
  },
  {
    category: "medical",
    label: "Medical Wins",
    description: "Symptoms, diagnoses, insurance, research",
    storyCount: 98,
    colorClass: "medical",
  },
];

// Helper to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper to format large numbers with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

// Extended mock stories for the listing page
export const allStories: Story[] = [
  {
    id: "story-1",
    slug: "how-i-beat-enterprise-damage-claim",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "How I Beat Enterprise's $3,200 Damage Claim Using Claude",
    excerpt:
      "Used systematic evidence gathering and legal research to defeat a wrongful damage claim.",
    author: "Ankush D.",
    authorInitials: "AD",
    readTime: "5 min",
    amountSaved: 3200,
    outcomeMetric: "$3,200 saved",
    imageAlt: "Car rental dispute victory",
    createdAt: "2024-01-15",
  },
  {
    id: "story-2",
    slug: "tenant-rights-victory-security-deposit",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Tenant Rights Victory: Full Security Deposit Returned",
    excerpt: "Claude helped draft a demand letter that got my $2,400 deposit back.",
    author: "Sarah M.",
    authorInitials: "SM",
    readTime: "6 min",
    amountSaved: 2400,
    outcomeMetric: "$2,400 saved",
    imageAlt: "Security deposit returned",
    createdAt: "2024-01-14",
  },
  {
    id: "story-3",
    slug: "small-claims-contractor-success",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Small Claims Success: Contractor Paid Up After AI Legal Research",
    excerpt: "AI helped me understand contract law and prepare a winning case.",
    author: "Mike R.",
    authorInitials: "MR",
    readTime: "8 min",
    amountSaved: 5500,
    outcomeMetric: "$5,500 saved",
    imageAlt: "Small claims court victory",
    createdAt: "2024-01-13",
  },
  {
    id: "story-4",
    slug: "insurance-claim-denied-approved",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Insurance Claim Denied? Here's How I Got It Approved",
    excerpt: "Used AI to analyze my policy and draft an appeal that worked.",
    author: "Lisa K.",
    authorInitials: "LK",
    readTime: "7 min",
    amountSaved: 12000,
    outcomeMetric: "$12,000 saved",
    imageAlt: "Insurance claim approved",
    createdAt: "2024-01-12",
  },
  {
    id: "story-5",
    slug: "fraudulent-charge-bank-reversed",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "gemini",
    aiToolLabel: "Gemini",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Disputing a Fraudulent Charge: Bank Reversed After AI Help",
    excerpt: "Claude helped me write a compelling dispute letter with evidence.",
    author: "James T.",
    authorInitials: "JT",
    readTime: "4 min",
    amountSaved: 890,
    outcomeMetric: "$890 saved",
    imageAlt: "Bank charge reversed",
    createdAt: "2024-01-11",
  },
  {
    id: "story-6",
    slug: "hoa-fine-overturned",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "HOA Fine Overturned Using AI-Assisted Research",
    excerpt: "Found precedents in HOA bylaws that invalidated unfair fines.",
    author: "David P.",
    authorInitials: "DP",
    readTime: "5 min",
    amountSaved: 1500,
    outcomeMetric: "$1,500 saved",
    imageAlt: "HOA fine overturned",
    createdAt: "2024-01-10",
  },
  {
    id: "story-7",
    slug: "employment-dispute-unpaid-wages",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Employment Dispute: Getting Unpaid Wages with AI Help",
    excerpt: "AI helped me understand labor laws and file a successful complaint.",
    author: "Maria G.",
    authorInitials: "MG",
    readTime: "9 min",
    amountSaved: 4200,
    outcomeMetric: "$4,200 saved",
    imageAlt: "Wages recovered",
    createdAt: "2024-01-09",
  },
  {
    id: "story-8",
    slug: "debt-collection-harassment-stopped",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "problem_solved",
    outcomeLabel: "Problem Solved",
    title: "Debt Collection Harassment: Stopped with AI-Drafted Letter",
    excerpt: "Claude helped me cite FDCPA laws that made collectors back off.",
    author: "Tom B.",
    authorInitials: "TB",
    readTime: "5 min",
    outcomeMetric: "Debt forgiven",
    imageAlt: "Debt collection stopped",
    createdAt: "2024-01-08",
  },
  {
    id: "story-9",
    slug: "kidney-stones-diagnosis",
    category: "medical",
    categoryLabel: "Medical",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "problem_solved",
    outcomeLabel: "Problem Solved",
    title: "AI Identified Kidney Stones Before My Doctor Did",
    excerpt: "Described my symptoms to Claude, got the right diagnosis confirmed by my physician.",
    author: "Raj P.",
    authorInitials: "RP",
    readTime: "4 min",
    outcomeMetric: "Diagnosis confirmed",
    imageAlt: "Medical diagnosis",
    createdAt: "2024-01-07",
  },
  {
    id: "story-10",
    slug: "er-visit-avoided",
    category: "medical",
    categoryLabel: "Medical",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    outcomeType: "time_saved",
    outcomeLabel: "Time Saved",
    title: "AI Symptom Check Saved an Unnecessary ER Trip",
    excerpt:
      "Was about to rush to the ER until AI helped me understand my symptoms weren't an emergency.",
    author: "Emily S.",
    authorInitials: "ES",
    readTime: "3 min",
    outcomeMetric: "ER visit avoided",
    imageAlt: "ER visit avoided",
    createdAt: "2024-01-06",
  },
  {
    id: "story-11",
    slug: "medical-billing-error",
    category: "medical",
    categoryLabel: "Medical",
    aiTool: "gemini",
    aiToolLabel: "Gemini",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Caught a $3,000 Medical Billing Error with AI Help",
    excerpt: "AI helped me decode my hospital bill and identify duplicate charges.",
    author: "Nancy W.",
    authorInitials: "NW",
    readTime: "6 min",
    amountSaved: 3000,
    outcomeMetric: "$3,000 saved",
    imageAlt: "Medical billing error fixed",
    createdAt: "2024-01-05",
  },
  {
    id: "story-12",
    slug: "tax-audit-preparation",
    category: "financial",
    categoryLabel: "Financial",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "How AI Helped Me Prepare for a Tax Audit",
    excerpt: "Claude helped me organize documentation and understand what the IRS was looking for.",
    author: "Robert K.",
    authorInitials: "RK",
    readTime: "10 min",
    amountSaved: 8500,
    outcomeMetric: "$8,500 saved",
    imageAlt: "Tax audit preparation",
    createdAt: "2024-01-04",
  },
  {
    id: "story-13",
    slug: "credit-report-error-fixed",
    category: "financial",
    categoryLabel: "Financial",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    outcomeType: "problem_solved",
    outcomeLabel: "Problem Solved",
    title: "Fixed a Credit Report Error That Was Costing Me",
    excerpt: "AI helped me draft dispute letters that finally got the error removed.",
    author: "Jennifer L.",
    authorInitials: "JL",
    readTime: "7 min",
    outcomeMetric: "Credit score +80 pts",
    imageAlt: "Credit report fixed",
    createdAt: "2024-01-03",
  },
  {
    id: "story-14",
    slug: "warranty-claim-successful",
    category: "other",
    categoryLabel: "Other",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Manufacturer Refused Warranty, AI Changed Their Mind",
    excerpt: "Used AI to research warranty laws and draft a persuasive response.",
    author: "Chris M.",
    authorInitials: "CM",
    readTime: "5 min",
    amountSaved: 1200,
    outcomeMetric: "$1,200 saved",
    imageAlt: "Warranty claim successful",
    createdAt: "2024-01-02",
  },
  {
    id: "story-15",
    slug: "flight-compensation-received",
    category: "other",
    categoryLabel: "Other",
    aiTool: "gemini",
    aiToolLabel: "Gemini",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Got $600 Flight Compensation After Airline Denied My Claim",
    excerpt: "AI helped me understand EU passenger rights and draft an effective complaint.",
    author: "Amanda B.",
    authorInitials: "AB",
    readTime: "6 min",
    amountSaved: 600,
    outcomeMetric: "$600 received",
    imageAlt: "Flight compensation",
    createdAt: "2024-01-01",
  },
];

// Filter groups for the sidebar
export const filterGroups: FilterGroup[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { value: "legal", label: "Legal Wins", count: 142 },
      { value: "medical", label: "Medical Wins", count: 98 },
      { value: "financial", label: "Financial", count: 45 },
      { value: "other", label: "Other", count: 23 },
    ],
  },
  {
    id: "aiTool",
    label: "AI Tool Used",
    options: [
      { value: "claude", label: "Claude", count: 120 },
      { value: "chatgpt", label: "ChatGPT", count: 95 },
      { value: "gemini", label: "Gemini", count: 42 },
      { value: "other", label: "Other", count: 18 },
    ],
  },
  {
    id: "outcomeType",
    label: "Outcome Type",
    options: [
      { value: "money_saved", label: "Money Saved", count: 0 },
      { value: "time_saved", label: "Time Saved", count: 0 },
      { value: "problem_solved", label: "Problem Solved", count: 0 },
      { value: "other", label: "Other", count: 0 },
    ],
  },
];

// Sort options
export const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "popular", label: "Most Popular" },
  { value: "amount", label: "Highest Amount" },
];

// Helper to check if story matches category filter
function matchesCategory(story: Story, categories?: StoryCategory[]): boolean {
  if (!categories?.length) return true;
  return categories.includes(story.category);
}

// Helper to check if story matches AI tool filter
function matchesAiTool(story: Story, aiTools?: AiTool[]): boolean {
  if (!aiTools?.length) return true;
  return aiTools.includes(story.aiTool);
}

// Helper to check if story matches outcome type filter
function matchesOutcomeType(story: Story, outcomeTypes?: OutcomeType[]): boolean {
  if (!outcomeTypes?.length) return true;
  return outcomeTypes.includes(story.outcomeType);
}

// Helper to check if story matches search query
function matchesSearch(story: Story, searchQuery?: string): boolean {
  if (!searchQuery) return true;
  const query = searchQuery.toLowerCase();
  return (
    story.title.toLowerCase().includes(query) ||
    story.excerpt.toLowerCase().includes(query) ||
    story.author.toLowerCase().includes(query)
  );
}

// Helper to filter stories based on filters
export function filterStories(
  stories: Story[],
  filters: {
    categories?: StoryCategory[];
    aiTools?: AiTool[];
    outcomeTypes?: OutcomeType[];
    searchQuery?: string;
  }
): Story[] {
  return stories.filter((story) => {
    return (
      matchesCategory(story, filters.categories) &&
      matchesAiTool(story, filters.aiTools) &&
      matchesOutcomeType(story, filters.outcomeTypes) &&
      matchesSearch(story, filters.searchQuery)
    );
  });
}

// Helper to paginate stories
export function paginateStories(
  stories: Story[],
  page: number,
  itemsPerPage: number = 8
): { stories: Story[]; totalPages: number; startIndex: number; endIndex: number } {
  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, stories.length);

  return {
    stories: stories.slice(startIndex, endIndex),
    totalPages,
    startIndex: startIndex + 1,
    endIndex,
  };
}
