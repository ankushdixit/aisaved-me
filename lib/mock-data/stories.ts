/**
 * Mock story data for the landing page and story listing
 * This will be replaced with real data from the database in Phase 1B
 */

import type {
  Story,
  StoryCategory,
  AiTool,
  OutcomeType,
  FilterGroup,
  StoryDetail,
} from "@/lib/types/story";
import { getChatEmbed } from "./chat-embeds";

// Re-export types for backwards compatibility
export type { StoryCategory, AiTool, OutcomeType };

// Ticker stories use a subset of categories (no "other")
export type TickerCategory = "legal" | "medical" | "financial";

export interface TickerStory {
  id: string;
  slug?: string;
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
    slug: "how-i-beat-enterprise-damage-claim",
    category: "legal",
    title: "Enterprise damage claim defeated",
    amount: 3200,
    amountLabel: "saved",
    author: "Ankush D.",
    timeAgo: "2 hours ago",
  },
  {
    id: "ticker-2",
    slug: "kidney-stones-diagnosis",
    category: "medical",
    title: "AI identified kidney stones, doctor agreed",
    outcome: "Diagnosis confirmed",
    author: "Raj P.",
    timeAgo: "5 hours ago",
  },
  {
    id: "ticker-3",
    slug: "tenant-rights-victory-security-deposit",
    category: "legal",
    title: "Security deposit returned in full",
    amount: 2400,
    amountLabel: "recovered",
    author: "Sarah M.",
    timeAgo: "8 hours ago",
  },
  {
    id: "ticker-4",
    slug: "insurance-claim-denied-approved",
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
    slug: "small-claims-contractor-success",
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

// Extended story details with full content for story detail pages
const storyDetails: Record<string, StoryDetail> = {
  "how-i-beat-enterprise-damage-claim": {
    id: "story-1",
    slug: "how-i-beat-enterprise-damage-claim",
    category: "legal",
    categoryLabel: "Legal Win",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "How I Beat Enterprise's $3,200 Damage Claim Using Claude",
    subtitle: "A systematic approach to fighting wrongful charges with AI-assisted legal research",
    excerpt:
      "Used systematic evidence gathering and legal research to defeat a wrongful damage claim.",
    author: "Ankush D.",
    authorInitials: "AD",
    readTime: "5 min",
    amountSaved: 3200,
    outcomeMetric: "$3,200 saved",
    imageAlt: "Car rental dispute victory",
    createdAt: "2024-01-15",
    publishedDate: "December 2024",
    likes: 234,
    comments: 45,
    content: {
      intro:
        'It started with a $3,200 bill from Enterprise for "damage" to a rental van that I knew I hadn\'t caused. After the initial shock, I decided to fight back—but not with expensive lawyers. Instead, I turned to Claude for help.',
      theProblem:
        "Three weeks after returning a rental van, I received a damage claim letter from Enterprise. They claimed I had caused roof damage worth $3,200. The problem? I had done a walk-around inspection at return, and no damage was noted.",
      theStrategy:
        "I started by uploading all my documentation to Claude: the rental agreement, the damage claim letter, photos I had taken, and the return receipt.",
      quote: {
        text: "I asked Claude to analyze my evidence and identify any legal weaknesses in Enterprise's claim. The response was eye-opening.",
        attribution: "The moment I realized AI could help",
      },
      theResult:
        "After sending my Claude-assisted response letter citing the specific legal points and attaching my evidence, Enterprise dropped the claim entirely within one week.",
      keyTakeaways: [
        "Always document your rental returns with photos",
        "AI can help identify legal weaknesses in corporate claims",
        "A well-structured response can save thousands",
        "You don't need a lawyer for every dispute",
      ],
      artifacts: [
        {
          id: "artifact-1-1",
          type: "image",
          title: "Evidence Photo: Rental Agreement Showing Clean Return",
          caption: "The return inspection form with no damage noted - my key evidence",
          alt: "Rental car return inspection document",
        },
        {
          id: "artifact-1-2",
          type: "document",
          title: "AI-Generated Response Letter",
          caption: "The formal response letter Claude helped me draft citing legal precedents",
          alt: "Legal response letter document",
        },
      ],
    },
    chatEmbed: getChatEmbed("story-1"),
  },
  "tenant-rights-victory-security-deposit": {
    id: "story-2",
    slug: "tenant-rights-victory-security-deposit",
    category: "legal",
    categoryLabel: "Legal Win",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Tenant Rights Victory: Full Security Deposit Returned",
    subtitle: "How AI helped me understand tenant law and craft a winning demand letter",
    excerpt: "Claude helped draft a demand letter that got my $2,400 deposit back.",
    author: "Sarah M.",
    authorInitials: "SM",
    readTime: "6 min",
    amountSaved: 2400,
    outcomeMetric: "$2,400 saved",
    imageAlt: "Security deposit returned",
    createdAt: "2024-01-14",
    publishedDate: "December 2024",
    likes: 189,
    comments: 32,
    content: {
      intro:
        'When my landlord tried to keep my entire $2,400 security deposit for "damages" that existed when I moved in, I knew I had to fight back. But hiring a lawyer would cost almost as much as the deposit itself.',
      theProblem:
        "My landlord sent a letter claiming carpet stains, wall marks, and appliance damage—all things I had photographed on move-in day. They refused to return any portion of my deposit.",
      theStrategy:
        "I used Claude to research tenant rights in my state and discovered landlords have strict requirements for withholding deposits. Claude helped me draft a formal demand letter citing specific statutes.",
      quote: {
        text: "Claude explained that my landlord was required to provide itemized receipts and that pre-existing damage documentation was my strongest defense.",
        attribution: "Understanding my legal rights",
      },
      theResult:
        "Within 10 days of sending my AI-assisted demand letter, my landlord returned the full $2,400 rather than face a small claims court case they would likely lose.",
      keyTakeaways: [
        "Always photograph everything on move-in day",
        "Know your state's tenant protection laws",
        "A well-cited demand letter can be very effective",
        "Landlords often back down when they see you know the law",
      ],
      artifacts: [
        {
          id: "artifact-2-1",
          type: "image",
          title: "Move-In Photos: Pre-Existing Damage Documentation",
          caption: "Photos taken on move-in day showing carpet stains and wall marks",
          alt: "Move-in apartment condition photos",
        },
        {
          id: "artifact-2-2",
          type: "document",
          title: "Demand Letter with Statute Citations",
          caption: "The formal demand letter citing state tenant protection laws",
          alt: "Legal demand letter document",
        },
        {
          id: "artifact-2-3",
          type: "screenshot",
          title: "Landlord's Response Email",
          caption: "Email from landlord agreeing to return the full deposit",
          alt: "Screenshot of landlord email response",
        },
      ],
    },
    chatEmbed: getChatEmbed("story-2"),
  },
  "small-claims-contractor-success": {
    id: "story-3",
    slug: "small-claims-contractor-success",
    category: "legal",
    categoryLabel: "Legal Win",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Small Claims Success: Contractor Paid Up After AI Legal Research",
    subtitle: "Using AI to prepare a winning small claims case against a dishonest contractor",
    excerpt: "AI helped me understand contract law and prepare a winning case.",
    author: "Mike R.",
    authorInitials: "MR",
    readTime: "8 min",
    amountSaved: 5500,
    outcomeMetric: "$5,500 saved",
    imageAlt: "Small claims court victory",
    createdAt: "2024-01-13",
    publishedDate: "December 2024",
    likes: 156,
    comments: 28,
    content: {
      intro:
        "I paid a contractor $5,500 to remodel my bathroom. After demolishing everything, he disappeared. With AI's help, I took him to small claims court and won every penny back.",
      theProblem:
        "The contractor cashed my check, did the demolition, then stopped returning calls. I was left with a gutted bathroom and no way to shower. Hiring a lawyer would cost more than the claim.",
      theStrategy:
        "ChatGPT helped me understand breach of contract, prepare my evidence, and even practice my courtroom presentation. I learned exactly what the judge would want to see.",
      quote: {
        text: "The AI walked me through every step—from sending the required demand letter to organizing my evidence binder for court.",
        attribution: "Court preparation",
      },
      theResult:
        "The judge ruled in my favor in less than 30 minutes. The contractor was ordered to pay $5,500 plus my filing fees. He paid within 30 days to avoid wage garnishment.",
      keyTakeaways: [
        "Document everything with a contractor—payments, communications, timelines",
        "Small claims court is designed for regular people to use",
        "AI can help you prepare as thoroughly as a lawyer would",
        "Judges appreciate organized, well-presented cases",
      ],
    },
    chatEmbed: getChatEmbed("story-3"),
  },
  "insurance-claim-denied-approved": {
    id: "story-4",
    slug: "insurance-claim-denied-approved",
    category: "legal",
    categoryLabel: "Legal Win",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Insurance Claim Denied? Here's How I Got It Approved",
    subtitle: "Overturning a $12,000 medical insurance denial with AI-powered research",
    excerpt: "Used AI to analyze my policy and draft an appeal that worked.",
    author: "Lisa K.",
    authorInitials: "LK",
    readTime: "7 min",
    amountSaved: 12000,
    outcomeMetric: "$12,000 saved",
    imageAlt: "Insurance claim approved",
    createdAt: "2024-01-12",
    publishedDate: "December 2024",
    likes: 312,
    comments: 67,
    content: {
      intro:
        'When my insurance company denied a $12,000 surgery claim calling it "not medically necessary," I refused to give up. With Claude\'s help analyzing my policy, I won on appeal.',
      theProblem:
        'My doctor recommended a procedure, I got pre-authorization, but post-surgery the insurance company denied the claim. Their reason was vague—just "medical necessity not established."',
      theStrategy:
        "Claude helped me request the complete denial reasoning, analyze my policy language, and find clinical guidelines that supported my procedure. We built a comprehensive appeal.",
      quote: {
        text: "Claude found that my policy's definition of medical necessity actually supported my claim. The denial was based on outdated criteria.",
        attribution: "The turning point",
      },
      theResult:
        "My appeal was approved within 45 days. The insurance company paid the full $12,000 and even sent a letter acknowledging their initial review was incorrect.",
      keyTakeaways: [
        "Always request the specific reason for denial in writing",
        "Insurance policies have specific definitions you can use",
        "Clinical guidelines from medical associations are powerful evidence",
        "Most people who appeal insurance denials don't—so appeals often succeed",
      ],
    },
    chatEmbed: getChatEmbed("story-4"),
  },
  "kidney-stones-diagnosis": {
    id: "story-9",
    slug: "kidney-stones-diagnosis",
    category: "medical",
    categoryLabel: "Medical Win",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "problem_solved",
    outcomeLabel: "Problem Solved",
    title: "AI Identified Kidney Stones Before My Doctor Did",
    subtitle: "How describing symptoms to AI led to faster diagnosis and treatment",
    excerpt: "Described my symptoms to Claude, got the right diagnosis confirmed by my physician.",
    author: "Raj P.",
    authorInitials: "RP",
    readTime: "4 min",
    outcomeMetric: "Diagnosis confirmed",
    imageAlt: "Medical diagnosis",
    createdAt: "2024-01-07",
    publishedDate: "December 2024",
    likes: 178,
    comments: 41,
    content: {
      intro:
        "I was in agony for three days before describing my symptoms to Claude. It immediately suggested kidney stones—a diagnosis my doctor confirmed with a CT scan the next day.",
      theProblem:
        "I had severe lower back pain radiating to my side, rated 8/10. I noticed blood in my urine. I thought it might be a muscle strain and was taking ibuprofen, but nothing helped.",
      theStrategy:
        "On a whim, I described all my symptoms to Claude. It immediately flagged the combination of flank pain, hematuria, and severity as classic kidney stone symptoms and urged me to see a doctor.",
      quote: {
        text: "Claude told me this wasn't something to wait out and that I should request a CT scan specifically. That changed how I approached my doctor visit.",
        attribution: "Being an informed patient",
      },
      theResult:
        "I went to urgent care the next morning and specifically requested imaging. The CT showed a 5mm kidney stone. Treatment started immediately, and I passed it within a week with medication.",
      keyTakeaways: [
        "AI can help you understand symptoms and ask better questions",
        "Being informed helps you advocate for yourself with doctors",
        "Don't ignore combinations of symptoms that seem related",
        "AI isn't a replacement for doctors but can guide you to seek care",
      ],
    },
    chatEmbed: getChatEmbed("story-9"),
  },
};

/**
 * Get full story details by slug
 */
export function getStoryBySlug(slug: string): StoryDetail | undefined {
  return storyDetails[slug];
}

/**
 * Get related stories (same category, excluding current story)
 */
export function getRelatedStories(currentSlug: string, limit: number = 3): Story[] {
  const currentStory = storyDetails[currentSlug];
  if (!currentStory) return allStories.slice(0, limit);

  return allStories
    .filter((story) => story.slug !== currentSlug && story.category === currentStory.category)
    .slice(0, limit);
}
