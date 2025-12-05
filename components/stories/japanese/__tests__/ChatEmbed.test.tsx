import { render, screen } from "@/lib/test-utils";
import { ChatEmbed } from "../ChatEmbed";
import type { ChatEmbed as ChatEmbedType } from "@/lib/types/story";

const mockChatEmbed: ChatEmbedType = {
  storyId: "story-1",
  aiTool: "claude",
  aiToolLabel: "Claude",
  messages: [
    {
      id: "msg-1",
      role: "user",
      content: "How can I dispute a medical bill?",
    },
    {
      id: "msg-2",
      role: "ai",
      content:
        "Here are the steps to dispute a medical bill effectively:\n1. Review the bill carefully\n2. Contact the provider",
    },
    {
      id: "msg-3",
      role: "user",
      content: "What if they refuse?",
    },
  ],
};

describe("ChatEmbed Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() =>
      render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />)
    ).not.toThrow();
  });

  it("displays the chat section heading", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText("Actual AI Chat Session")).toBeInTheDocument();
  });

  it("displays verified conversation text with AI tool", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText(/Verified conversation with Claude/)).toBeInTheDocument();
  });

  it("displays AI tool label in header", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    const headers = screen.getAllByText("Claude");
    expect(headers.length).toBeGreaterThan(0);
  });

  it("displays AI badge in chat header", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders View Full Chat link with correct href", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    const link = screen.getByText(/View Full Chat/);
    expect(link).toHaveAttribute("href", "/stories/test-story/chat");
  });

  it("renders all chat messages", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText("How can I dispute a medical bill?")).toBeInTheDocument();
    expect(
      screen.getByText(/Here are the steps to dispute a medical bill effectively/)
    ).toBeInTheDocument();
    expect(screen.getByText("What if they refuse?")).toBeInTheDocument();
  });

  it("applies Japanese theme styling to container", () => {
    const { container } = render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    const chatContainer = container.querySelector(".border-\\[\\#d4d0c8\\]");
    expect(chatContainer).toBeInTheDocument();
    expect(chatContainer).toHaveClass("bg-[#faf8f5]");
  });

  it("applies Japanese theme styling to header", () => {
    const { container } = render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    const header = container.querySelector(".bg-\\[\\#f5f2ed\\]");
    expect(header).toBeInTheDocument();
  });

  it("renders with different AI tool", () => {
    const chatGPTEmbed: ChatEmbedType = {
      ...mockChatEmbed,
      aiTool: "chatgpt",
      aiToolLabel: "ChatGPT",
    };
    render(<ChatEmbed chatEmbed={chatGPTEmbed} storySlug="test-story" />);
    expect(screen.getByText(/Verified conversation with ChatGPT/)).toBeInTheDocument();
  });

  it("renders with single message", () => {
    const singleMessageEmbed: ChatEmbedType = {
      ...mockChatEmbed,
      messages: [
        {
          id: "msg-1",
          role: "user",
          content: "Single message",
        },
      ],
    };
    render(<ChatEmbed chatEmbed={singleMessageEmbed} storySlug="test-story" />);
    expect(screen.getByText("Single message")).toBeInTheDocument();
  });

  it("has correct spacing between messages", () => {
    const { container } = render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    const messagesContainer = container.querySelector(".space-y-4");
    expect(messagesContainer).toBeInTheDocument();
  });

  it("renders AI badge with correct styling", () => {
    const { container } = render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    const aiBadge = container.querySelector(".w-6.h-6.bg-\\[\\#1a1a1a\\]");
    expect(aiBadge).toBeInTheDocument();
  });

  it("has hover effect on View Full Chat link", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    const link = screen.getByText(/View Full Chat/);
    expect(link.className).toContain("hover:text-[#c41e3a]");
  });

  it("displays arrow in View Full Chat link", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText(/View Full Chat →/)).toBeInTheDocument();
  });

  it("renders with long message content", () => {
    const longMessageEmbed: ChatEmbedType = {
      ...mockChatEmbed,
      messages: [
        {
          id: "msg-1",
          role: "ai",
          content: "A".repeat(500),
        },
      ],
    };
    render(<ChatEmbed chatEmbed={longMessageEmbed} storySlug="test-story" />);
    expect(screen.getByText("A".repeat(500))).toBeInTheDocument();
  });
});
