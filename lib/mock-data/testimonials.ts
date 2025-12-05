/**
 * Mock testimonial data for the landing page
 * This will be replaced with real data from the database in Phase 1B
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  outcome: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "I was about to hire a lawyer for $2,000. Found a similar story here, used the prompts, and won my case myself.",
    author: "Sarah M.",
    outcome: "Saved $2,400 on security deposit",
    initials: "SM",
  },
  {
    id: "testimonial-2",
    quote:
      "The 'Make It Your Own' feature is genius. I adapted someone's insurance appeal letter for my situation and it worked.",
    author: "Lisa K.",
    outcome: "Insurance claim approved: $12,000",
    initials: "LK",
  },
  {
    id: "testimonial-3",
    quote:
      "I was skeptical about AI for medical stuff, but seeing real people's experiences with actual chat logs convinced me to try.",
    author: "Raj P.",
    outcome: "Kidney stone diagnosis confirmed",
    initials: "RP",
  },
];

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  mockupType: "customize" | "chat" | "privacy";
}

export const features: Feature[] = [
  {
    id: "feature-1",
    icon: "sparkles",
    title: "Make It Your Own",
    description:
      "Don't just read - adapt. Our interactive tool lets you customize any story's prompts for your specific situation.",
    mockupType: "customize",
  },
  {
    id: "feature-2",
    icon: "check-verified",
    title: "Verified Chat Sessions",
    description:
      "Every story includes links to actual AI conversations. See the exact prompts and responses that led to each win.",
    mockupType: "chat",
  },
  {
    id: "feature-3",
    icon: "shield",
    title: "Privacy Protected",
    description:
      "Share your story without worry. Our AI automatically redacts names, addresses, and sensitive information before publishing.",
    mockupType: "privacy",
  },
];

export interface HowItWorksStep {
  id: string;
  number: number;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "step-1",
    number: 1,
    title: "Win with AI",
    description: "Use Claude, ChatGPT, Gemini or any AI to solve your problem.",
  },
  {
    id: "step-2",
    number: 2,
    title: "Share Your Story",
    description: "Submit your win with a link to your AI chat session as proof.",
  },
  {
    id: "step-3",
    number: 3,
    title: "We Protect Privacy",
    description: "Our AI automatically redacts sensitive info before publishing.",
  },
  {
    id: "step-4",
    number: 4,
    title: "Inspire Others",
    description: "Your story helps someone else facing the same challenge win too.",
  },
];
