import { render, screen } from "@/lib/test-utils";
import { ChatEmbed } from "../ChatEmbed";
import type { ChatEmbed as ChatEmbedType } from "@/lib/types/story";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

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
      content: "I can help you dispute a medical bill. Here are the steps you should follow...",
    },
    {
      id: "msg-3",
      role: "user",
      content: "What documents do I need?",
    },
    {
      id: "msg-4",
      role: "ai",
      content: "You'll need the original bill, your insurance EOB, and any correspondence.",
    },
  ],
};

describe("ChatEmbed Component", () => {
  it("renders without errors", () => {
    expect(() =>
      render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />)
    ).not.toThrow();
  });

  it("displays section title 'Actual AI Chat Session'", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText("Actual AI Chat Session")).toBeInTheDocument();
  });

  it("displays the verified conversation text with AI tool label", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText(/Verified conversation with Claude/)).toBeInTheDocument();
  });

  it("renders the AI tool label in the header", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    // The AI tool label appears twice: once in header, once in description
    const aiToolLabels = screen.getAllByText("Claude");
    expect(aiToolLabels.length).toBeGreaterThanOrEqual(1);
  });

  it("renders all chat messages", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);

    expect(screen.getByText("How can I dispute a medical bill?")).toBeInTheDocument();
    expect(screen.getByText(/I can help you dispute a medical bill/)).toBeInTheDocument();
    expect(screen.getByText("What documents do I need?")).toBeInTheDocument();
    expect(screen.getByText(/You'll need the original bill/)).toBeInTheDocument();
  });

  it("shows 'View Full Chat' link with correct href", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story-slug" />);

    const link = screen.getByText(/View Full Chat/);
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/stories/test-story-slug/chat");
  });

  it("renders the AI icon in the header", () => {
    render(<ChatEmbed chatEmbed={mockChatEmbed} storySlug="test-story" />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders with different AI tool", () => {
    const chatGptEmbed: ChatEmbedType = {
      ...mockChatEmbed,
      aiTool: "chatgpt",
      aiToolLabel: "ChatGPT",
    };

    render(<ChatEmbed chatEmbed={chatGptEmbed} storySlug="test-story" />);
    expect(screen.getByText(/Verified conversation with ChatGPT/)).toBeInTheDocument();
    const chatGptLabels = screen.getAllByText("ChatGPT");
    expect(chatGptLabels.length).toBeGreaterThanOrEqual(1);
  });

  it("renders with single message", () => {
    const singleMessageEmbed: ChatEmbedType = {
      ...mockChatEmbed,
      messages: [
        {
          id: "msg-1",
          role: "user",
          content: "Hello, AI!",
        },
      ],
    };

    render(<ChatEmbed chatEmbed={singleMessageEmbed} storySlug="test-story" />);
    expect(screen.getByText("Hello, AI!")).toBeInTheDocument();
  });

  it("renders with empty messages array", () => {
    const emptyMessagesEmbed: ChatEmbedType = {
      ...mockChatEmbed,
      messages: [],
    };

    expect(() =>
      render(<ChatEmbed chatEmbed={emptyMessagesEmbed} storySlug="test-story" />)
    ).not.toThrow();
  });
});
