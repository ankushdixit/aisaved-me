import {
  stepBasicsSchema,
  stepStorySchema,
  stepChatLinkSchema,
  stepMediaSchema,
  stepReviewSchema,
  storySubmissionSchema,
  CATEGORIES,
  AI_TOOLS,
  SUPPORTED_CHAT_DOMAINS,
  MAX_FILE_SIZE,
} from "../story-submission";

describe("Story Submission Schemas", () => {
  describe("stepBasicsSchema", () => {
    it("validates valid category and aiTool", () => {
      const result = stepBasicsSchema.safeParse({
        category: "Legal",
        aiTool: "Claude",
      });
      expect(result.success).toBe(true);
    });

    it("accepts all valid categories", () => {
      CATEGORIES.forEach((category) => {
        const result = stepBasicsSchema.safeParse({
          category,
          aiTool: "Claude",
        });
        expect(result.success).toBe(true);
      });
    });

    it("accepts all valid AI tools", () => {
      AI_TOOLS.forEach((aiTool) => {
        const result = stepBasicsSchema.safeParse({
          category: "Legal",
          aiTool,
        });
        expect(result.success).toBe(true);
      });
    });

    it("rejects invalid category", () => {
      const result = stepBasicsSchema.safeParse({
        category: "InvalidCategory",
        aiTool: "Claude",
      });
      expect(result.success).toBe(false);
    });

    it("rejects missing category", () => {
      const result = stepBasicsSchema.safeParse({
        aiTool: "Claude",
      });
      expect(result.success).toBe(false);
    });

    it("rejects missing aiTool", () => {
      const result = stepBasicsSchema.safeParse({
        category: "Legal",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("stepStorySchema", () => {
    const validStory = {
      title: "A Valid Title That Is Long Enough",
      problem:
        "This is a problem description that needs to be at least 50 characters long to pass validation",
      howAIHelped:
        "AI helped me by doing something amazing that needs at least 50 characters to explain",
      outcome:
        "The outcome was fantastic and this description also needs to be at least 50 characters",
    };

    const validStoryWithMetric = {
      ...validStory,
      moneySaved: "$500",
    };

    it("validates valid story data with metric", () => {
      const result = stepStorySchema.safeParse(validStoryWithMetric);
      expect(result.success).toBe(true);
    });

    it("rejects title shorter than 10 characters", () => {
      const result = stepStorySchema.safeParse({
        ...validStoryWithMetric,
        title: "Short",
      });
      expect(result.success).toBe(false);
    });

    it("rejects title longer than 100 characters", () => {
      const result = stepStorySchema.safeParse({
        ...validStoryWithMetric,
        title: "A".repeat(101),
      });
      expect(result.success).toBe(false);
    });

    it("rejects problem shorter than 50 characters", () => {
      const result = stepStorySchema.safeParse({
        ...validStoryWithMetric,
        problem: "Too short",
      });
      expect(result.success).toBe(false);
    });

    it("requires at least one success metric", () => {
      const result = stepStorySchema.safeParse(validStory);
      expect(result.success).toBe(false);
    });

    it("validates with moneySaved metric", () => {
      const result = stepStorySchema.safeParse({
        ...validStory,
        moneySaved: "$500",
      });
      expect(result.success).toBe(true);
    });

    it("validates with timeSaved metric", () => {
      const result = stepStorySchema.safeParse({
        ...validStory,
        timeSaved: "10 hours",
      });
      expect(result.success).toBe(true);
    });

    it("validates with otherMetric", () => {
      const result = stepStorySchema.safeParse({
        ...validStory,
        otherMetric: "Peace of mind",
      });
      expect(result.success).toBe(true);
    });

    it("validates with all metrics", () => {
      const result = stepStorySchema.safeParse({
        ...validStory,
        moneySaved: "$500",
        timeSaved: "10 hours",
        otherMetric: "Peace of mind",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("stepChatLinkSchema", () => {
    it("validates valid chat URL", () => {
      const result = stepChatLinkSchema.safeParse({
        chatUrl: "https://claude.ai/chat/123456",
      });
      expect(result.success).toBe(true);
    });

    it("accepts all supported domains", () => {
      SUPPORTED_CHAT_DOMAINS.forEach((domain) => {
        const result = stepChatLinkSchema.safeParse({
          chatUrl: `https://${domain}/chat/123`,
        });
        expect(result.success).toBe(true);
      });
    });

    it("rejects unsupported domains", () => {
      const result = stepChatLinkSchema.safeParse({
        chatUrl: "https://example.com/chat/123",
      });
      expect(result.success).toBe(false);
    });

    it("accepts chat excerpt as alternative", () => {
      const result = stepChatLinkSchema.safeParse({
        chatExcerpt: "User: How can I fight this claim?\nAI: Here's how...",
      });
      expect(result.success).toBe(true);
    });

    it("rejects when neither URL nor excerpt provided", () => {
      const result = stepChatLinkSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it("accepts both URL and excerpt", () => {
      const result = stepChatLinkSchema.safeParse({
        chatUrl: "https://claude.ai/chat/123",
        chatExcerpt: "Some excerpt",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("stepMediaSchema", () => {
    it("validates empty files array", () => {
      const result = stepMediaSchema.safeParse({ files: [] });
      expect(result.success).toBe(true);
    });

    it("validates valid file objects", () => {
      const result = stepMediaSchema.safeParse({
        files: [
          {
            id: "abc123",
            name: "document.pdf",
            size: 1024,
            type: "application/pdf",
          },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("validates files with preview", () => {
      const result = stepMediaSchema.safeParse({
        files: [
          {
            id: "abc123",
            name: "image.jpg",
            size: 1024,
            type: "image/jpeg",
            preview: "blob:http://localhost:3000/abc",
          },
        ],
      });
      expect(result.success).toBe(true);
    });

    it("rejects files exceeding max size", () => {
      const result = stepMediaSchema.safeParse({
        files: [
          {
            id: "abc123",
            name: "large-file.pdf",
            size: MAX_FILE_SIZE + 1,
            type: "application/pdf",
          },
        ],
      });
      expect(result.success).toBe(false);
    });

    it("defaults to empty array when files not provided", () => {
      const result = stepMediaSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.files).toEqual([]);
      }
    });
  });

  describe("stepReviewSchema", () => {
    it("validates when both checkboxes are true", () => {
      const result = stepReviewSchema.safeParse({
        termsAccepted: true,
        privacyAccepted: true,
      });
      expect(result.success).toBe(true);
    });

    it("rejects when termsAccepted is false", () => {
      const result = stepReviewSchema.safeParse({
        termsAccepted: false,
        privacyAccepted: true,
      });
      expect(result.success).toBe(false);
    });

    it("rejects when privacyAccepted is false", () => {
      const result = stepReviewSchema.safeParse({
        termsAccepted: true,
        privacyAccepted: false,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("storySubmissionSchema", () => {
    const validSubmission = {
      category: "Legal" as const,
      aiTool: "Claude" as const,
      title: "A Valid Title That Is Long Enough",
      problem:
        "This is a problem description that needs to be at least 50 characters long to pass validation",
      howAIHelped:
        "AI helped me by doing something amazing that needs at least 50 characters to explain",
      outcome:
        "The outcome was fantastic and this description also needs to be at least 50 characters",
      moneySaved: "$1000", // At least one metric required
      files: [],
      termsAccepted: true,
      privacyAccepted: true,
    };

    it("validates complete valid submission", () => {
      const result = storySubmissionSchema.safeParse(validSubmission);
      expect(result.success).toBe(true);
    });

    it("includes optional fields", () => {
      const result = storySubmissionSchema.safeParse({
        ...validSubmission,
        moneySaved: "$1000",
        timeSaved: "5 hours",
        otherMetric: "Won case",
        chatUrl: "https://claude.ai/chat/123",
        chatExcerpt: "Excerpt here",
      });
      expect(result.success).toBe(true);
    });
  });
});
