/**
 * Mock story data for the landing page
 * This will be replaced with real data from the database in Phase 1B
 */

export type StoryCategory = "legal" | "medical" | "financial";

export interface TickerStory {
  id: string;
  category: StoryCategory;
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
  aiQuote:
    "Based on your evidence, Enterprise has no legal basis for this claim...",
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
