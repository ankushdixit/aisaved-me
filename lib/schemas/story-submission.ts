import { z } from "zod";

/**
 * Story Submission Schema
 *
 * Defines validation rules for the 5-step submission wizard.
 */

// Category options
export const CATEGORIES = ["Legal", "Medical", "Financial", "Other"] as const;
export type Category = (typeof CATEGORIES)[number];

// AI Tool options
export const AI_TOOLS = ["Claude", "ChatGPT", "Gemini", "Other"] as const;
export type AITool = (typeof AI_TOOLS)[number];

// Supported chat link domains
export const SUPPORTED_CHAT_DOMAINS = [
  "claude.ai",
  "chat.openai.com",
  "gemini.google.com",
] as const;

// Step 1: Basics
export const stepBasicsSchema = z.object({
  category: z.enum(CATEGORIES, {
    error: "Please select a category",
  }),
  aiTool: z.enum(AI_TOOLS, {
    error: "Please select an AI tool",
  }),
});

export type StepBasicsData = z.infer<typeof stepBasicsSchema>;

// Step 2: Story
export const stepStorySchema = z
  .object({
    title: z
      .string()
      .min(10, "Title must be at least 10 characters")
      .max(100, "Title must be at most 100 characters"),
    problem: z.string().min(50, "Please describe the problem in at least 50 characters"),
    howAIHelped: z.string().min(50, "Please describe how AI helped in at least 50 characters"),
    outcome: z.string().min(50, "Please describe the outcome in at least 50 characters"),
    moneySaved: z.string().optional(),
    timeSaved: z.string().optional(),
    otherMetric: z.string().optional(),
  })
  .refine(
    (data) => {
      // At least one success metric must be provided
      return (
        (data.moneySaved && data.moneySaved.length > 0) ||
        (data.timeSaved && data.timeSaved.length > 0) ||
        (data.otherMetric && data.otherMetric.length > 0)
      );
    },
    {
      message: "Please provide at least one success metric",
      path: ["moneySaved"],
    }
  );

export type StepStoryData = z.infer<typeof stepStorySchema>;

// Step 3: Chat Link
const isValidChatUrl = (url: string): boolean => {
  if (!url) return true; // Empty is valid (optional or manual entry used)
  try {
    const parsed = new URL(url);
    return SUPPORTED_CHAT_DOMAINS.some((domain) => parsed.hostname.endsWith(domain));
  } catch {
    return false;
  }
};

export const stepChatLinkSchema = z
  .object({
    chatUrl: z.string().optional(),
    chatExcerpt: z.string().optional(),
  })
  .refine(
    (data) => {
      // At least one must be provided
      return (
        (data.chatUrl && data.chatUrl.length > 0) ||
        (data.chatExcerpt && data.chatExcerpt.length > 0)
      );
    },
    {
      message: "Please provide either a chat link or paste chat excerpts",
      path: ["chatUrl"],
    }
  )
  .refine(
    (data) => {
      // If URL provided, it must be valid
      if (data.chatUrl && data.chatUrl.length > 0) {
        return isValidChatUrl(data.chatUrl);
      }
      return true;
    },
    {
      message: `URL must be from a supported domain: ${SUPPORTED_CHAT_DOMAINS.join(", ")}`,
      path: ["chatUrl"],
    }
  );

export type StepChatLinkData = z.infer<typeof stepChatLinkSchema>;

// Step 4: Media
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const stepMediaSchema = z.object({
  files: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        size: z.number().max(MAX_FILE_SIZE, "File must be under 10MB"),
        type: z.string(),
        preview: z.string().optional(),
      })
    )
    .default([]),
});

export type StepMediaData = z.infer<typeof stepMediaSchema>;

// Step 5: Review (checkboxes)
export const stepReviewSchema = z.object({
  termsAccepted: z.literal(true, {
    error: "You must accept the Terms of Service",
  }),
  privacyAccepted: z.literal(true, {
    error: "You must acknowledge the Privacy Policy",
  }),
});

export type StepReviewData = z.infer<typeof stepReviewSchema>;

// Complete form schema
export const storySubmissionSchema = z.object({
  // Step 1
  category: stepBasicsSchema.shape.category,
  aiTool: stepBasicsSchema.shape.aiTool,
  // Step 2
  title: stepStorySchema.shape.title,
  problem: stepStorySchema.shape.problem,
  howAIHelped: stepStorySchema.shape.howAIHelped,
  outcome: stepStorySchema.shape.outcome,
  moneySaved: stepStorySchema.shape.moneySaved,
  timeSaved: stepStorySchema.shape.timeSaved,
  otherMetric: stepStorySchema.shape.otherMetric,
  // Step 3
  chatUrl: z.string().optional(),
  chatExcerpt: z.string().optional(),
  // Step 4
  files: stepMediaSchema.shape.files,
  // Step 5
  termsAccepted: z.boolean().default(false),
  privacyAccepted: z.boolean().default(false),
});

export type StorySubmissionData = z.infer<typeof storySubmissionSchema>;

// Default form values
export const defaultFormValues: StorySubmissionData = {
  category: undefined as unknown as Category,
  aiTool: undefined as unknown as AITool,
  title: "",
  problem: "",
  howAIHelped: "",
  outcome: "",
  moneySaved: "",
  timeSaved: "",
  otherMetric: "",
  chatUrl: "",
  chatExcerpt: "",
  files: [],
  termsAccepted: false,
  privacyAccepted: false,
};
