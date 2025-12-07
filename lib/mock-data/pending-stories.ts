/**
 * Mock data for pending stories in admin dashboard
 */

export type StoryStatus = "pending" | "approved" | "published" | "rejected";
export type StoryCategory = "legal" | "medical" | "financial" | "career" | "personal";

export interface PendingStory {
  id: string;
  title: string;
  author: string;
  category: StoryCategory;
  status: StoryStatus;
  submittedAt: string;
  submittedRelative: string;
  content: string;
  chatLink?: string;
  verified: boolean;
}

export const pendingStories: PendingStory[] = [
  {
    id: "story-001",
    title: "Insurance Claim Denied? How I Got It Approved",
    author: "Lisa K.",
    category: "legal",
    status: "pending",
    submittedAt: "2025-12-06T10:00:00Z",
    submittedRelative: "2 hours ago",
    content: `After my insurance company denied my medical claim for the third time, I turned to Claude for help. It analyzed my policy documents and helped me draft an appeal letter that cited specific provisions they had overlooked.

Within two weeks of sending the letter, my claim was approved and I received full reimbursement. The AI helped me understand the legalese in my policy that I never would have caught on my own.`,
    chatLink: "https://claude.ai/share/example-1",
    verified: true,
  },
  {
    id: "story-002",
    title: "AI Diagnosed My Rare Condition When Doctors Couldn't",
    author: "David R.",
    category: "medical",
    status: "pending",
    submittedAt: "2025-12-06T07:00:00Z",
    submittedRelative: "5 hours ago",
    content: `I had been experiencing strange symptoms for months. Multiple doctors couldn't figure out what was wrong. I described my symptoms to Claude, and it suggested I might have a rare autoimmune condition.

I brought this information to my doctor, who ran the appropriate tests. It turned out Claude was right. Getting the correct diagnosis allowed me to start proper treatment and my quality of life has improved dramatically.`,
    chatLink: "https://claude.ai/share/example-2",
    verified: true,
  },
  {
    id: "story-003",
    title: "HOA Fine Overturned Using AI Research",
    author: "Michael P.",
    category: "legal",
    status: "pending",
    submittedAt: "2025-12-05T12:00:00Z",
    submittedRelative: "yesterday",
    content: `My HOA fined me $500 for a "violation" that I knew was unfair. Claude helped me research my state's HOA laws and my community's CC&Rs. It found several procedural violations in how the fine was issued.

I presented this information at the next board meeting, and the fine was overturned. I also helped two neighbors who had similar issues.`,
    chatLink: "https://claude.ai/share/example-3",
    verified: false,
  },
  {
    id: "story-004",
    title: "Employment Dispute: Getting Unpaid Wages",
    author: "Maria G.",
    category: "legal",
    status: "approved",
    submittedAt: "2025-12-04T08:00:00Z",
    submittedRelative: "2 days ago",
    content: `My former employer owed me three weeks of wages and refused to pay. Claude helped me understand my rights under state labor law and draft a demand letter that referenced specific statutes.

After sending the letter, I received my full payment within a week, plus interest as required by law. I didn't even need to hire a lawyer.`,
    chatLink: "https://claude.ai/share/example-4",
    verified: true,
  },
  {
    id: "story-005",
    title: "Debt Collection Harassment Stopped",
    author: "Tom B.",
    category: "legal",
    status: "published",
    submittedAt: "2025-12-03T14:00:00Z",
    submittedRelative: "3 days ago",
    content: `A debt collector was calling me multiple times a day, which I knew was illegal. Claude helped me understand the Fair Debt Collection Practices Act and draft a cease and desist letter.

The calls stopped immediately. The AI also helped me dispute the debt, and it turned out they couldn't even verify it was mine.`,
    verified: true,
  },
  {
    id: "story-006",
    title: "Saved My Small Business with Tax Strategy",
    author: "Jennifer L.",
    category: "financial",
    status: "pending",
    submittedAt: "2025-12-05T16:00:00Z",
    submittedRelative: "20 hours ago",
    content: `I was facing a huge tax bill that would have bankrupted my small bakery. Claude helped me understand legitimate deductions I had been missing for years.

After working with my accountant using the information Claude provided, I reduced my tax liability by 40% and was able to keep my business running.`,
    chatLink: "https://claude.ai/share/example-6",
    verified: true,
  },
  {
    id: "story-007",
    title: "Disability Benefits Finally Approved",
    author: "Robert J.",
    category: "medical",
    status: "pending",
    submittedAt: "2025-12-05T09:00:00Z",
    submittedRelative: "yesterday",
    content: `After two years of denied disability claims, I was ready to give up. Claude helped me understand the appeals process and what documentation I needed to provide.

It also helped me organize my medical records and write a compelling personal statement. My appeal was approved on the first try.`,
    chatLink: "https://claude.ai/share/example-7",
    verified: true,
  },
  {
    id: "story-008",
    title: "Landlord Returned My Security Deposit",
    author: "Sarah M.",
    category: "legal",
    status: "pending",
    submittedAt: "2025-12-04T18:00:00Z",
    submittedRelative: "2 days ago",
    content: `My landlord tried to keep my entire $2,500 security deposit for bogus "damages." Claude helped me understand tenant rights in my state and draft a demand letter.

I learned that landlords in my state must provide itemized deductions within 30 days, which my landlord failed to do. I got my full deposit back within a week.`,
    chatLink: "https://claude.ai/share/example-8",
    verified: false,
  },
];

export interface ActivityItem {
  id: string;
  type: "story_published" | "story_approved" | "story_rejected" | "user_registered";
  description: string;
  timestamp: string;
}

export const recentActivity: ActivityItem[] = [
  {
    id: "act-001",
    type: "story_published",
    description: 'Story published: "Tenant Rights Victory"',
    timestamp: "2 hours ago",
  },
  {
    id: "act-002",
    type: "user_registered",
    description: "New user registered: john@example.com",
    timestamp: "4 hours ago",
  },
  {
    id: "act-003",
    type: "story_approved",
    description: "New story submitted for review",
    timestamp: "5 hours ago",
  },
  {
    id: "act-004",
    type: "story_published",
    description: 'Story approved: "Insurance Claim Success"',
    timestamp: "Yesterday",
  },
];
