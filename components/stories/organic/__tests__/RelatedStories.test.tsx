import { render, screen } from "@/lib/test-utils";
import { RelatedStories } from "../RelatedStories";
import type { Story } from "@/lib/types/story";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

const mockStories: Story[] = [
  {
    id: "story-1",
    slug: "first-story-slug",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "How Claude Helped Me Win a Legal Battle",
    excerpt: "A story about using AI to save money on legal fees.",
    author: "John Doe",
    authorInitials: "JD",
    readTime: "5 min",
    amountSaved: 3200,
    outcomeMetric: "$3,200 saved",
    imageAlt: "Legal documents with AI assistance",
    createdAt: "2024-01-15",
  },
  {
    id: "story-2",
    slug: "second-story-slug",
    category: "medical",
    categoryLabel: "Medical",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    outcomeType: "time_saved",
    outcomeLabel: "Time Saved",
    title: "ChatGPT Helped Me Navigate Health Insurance",
    excerpt: "How AI saved me hours of phone calls.",
    author: "Jane Smith",
    authorInitials: "JS",
    readTime: "7 min",
    outcomeMetric: "12 hours saved",
    imageAlt: "Medical insurance forms",
    createdAt: "2024-01-20",
  },
  {
    id: "story-3",
    slug: "third-story-slug",
    category: "financial",
    categoryLabel: "Financial",
    aiTool: "gemini",
    aiToolLabel: "Gemini",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Gemini Helped Me Negotiate a Better Rate",
    excerpt: "AI-assisted financial planning success story.",
    author: "Bob Johnson",
    authorInitials: "BJ",
    readTime: "6 min",
    amountSaved: 5000,
    outcomeMetric: "$5,000 saved",
    imageAlt: "Financial charts and graphs",
    createdAt: "2024-01-25",
  },
];

describe("RelatedStories Component", () => {
  it("renders without errors when stories array is provided", () => {
    expect(() => render(<RelatedStories stories={mockStories} />)).not.toThrow();
  });

  it("returns null when stories array is empty", () => {
    const { container } = render(<RelatedStories stories={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("displays 'Related Stories' section heading", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText("Related Stories")).toBeInTheDocument();
  });

  it("renders 3 story cards when 3 stories are provided", () => {
    render(<RelatedStories stories={mockStories} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("each story card links to the correct story page", () => {
    render(<RelatedStories stories={mockStories} />);
    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/stories/first-story-slug");
    expect(links[1]).toHaveAttribute("href", "/stories/second-story-slug");
    expect(links[2]).toHaveAttribute("href", "/stories/third-story-slug");
  });

  it("displays story titles", () => {
    render(<RelatedStories stories={mockStories} />);

    expect(screen.getByText("How Claude Helped Me Win a Legal Battle")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT Helped Me Navigate Health Insurance")).toBeInTheDocument();
    expect(screen.getByText("Gemini Helped Me Negotiate a Better Rate")).toBeInTheDocument();
  });

  it("displays outcome metrics", () => {
    render(<RelatedStories stories={mockStories} />);

    expect(screen.getByText("$3,200 saved")).toBeInTheDocument();
    expect(screen.getByText("12 hours saved")).toBeInTheDocument();
    expect(screen.getByText("$5,000 saved")).toBeInTheDocument();
  });

  it("displays author names", () => {
    render(<RelatedStories stories={mockStories} />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Bob Johnson/)).toBeInTheDocument();
  });

  it("displays category labels for each story", () => {
    render(<RelatedStories stories={mockStories} />);

    // Use more specific selectors to avoid ambiguity
    expect(
      screen.getByText((_content, element) => {
        return element?.textContent === "John Doe · Legal";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_content, element) => {
        return element?.textContent === "Jane Smith · Medical";
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText((_content, element) => {
        return element?.textContent === "Bob Johnson · Financial";
      })
    ).toBeInTheDocument();
  });

  it("displays image alt text for each story", () => {
    render(<RelatedStories stories={mockStories} />);

    expect(screen.getByText("Legal documents with AI assistance")).toBeInTheDocument();
    expect(screen.getByText("Medical insurance forms")).toBeInTheDocument();
    expect(screen.getByText("Financial charts and graphs")).toBeInTheDocument();
  });

  it("renders correctly with a single story", () => {
    const singleStory = [mockStories[0]];
    render(<RelatedStories stories={singleStory} />);

    expect(screen.getByText("Related Stories")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("How Claude Helped Me Win a Legal Battle")).toBeInTheDocument();
  });

  it("renders correctly with two stories", () => {
    const twoStories = [mockStories[0], mockStories[1]];
    render(<RelatedStories stories={twoStories} />);

    expect(screen.getByText("Related Stories")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("applies correct styling classes", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const section = container.querySelector("section");

    expect(section).toHaveClass("mt-16", "py-12", "bg-[#fff0dc]");
  });
});
