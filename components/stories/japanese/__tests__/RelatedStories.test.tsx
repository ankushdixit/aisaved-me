import { render, screen } from "@/lib/test-utils";
import { RelatedStories } from "../RelatedStories";
import type { Story } from "@/lib/types/story";

const mockStories: Story[] = [
  {
    id: "story-1",
    slug: "story-one",
    category: "legal",
    categoryLabel: "Legal",
    aiTool: "claude",
    aiToolLabel: "Claude",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "How I Saved $15,000 on Legal Fees",
    excerpt: "A guide to using AI for legal document review.",
    author: "John Doe",
    authorInitials: "JD",
    readTime: "5 min",
    amountSaved: 15000,
    outcomeMetric: "$15,000 saved",
    imageAlt: "Legal documents",
    createdAt: "2024-01-15",
  },
  {
    id: "story-2",
    slug: "story-two",
    category: "medical",
    categoryLabel: "Medical",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    outcomeType: "money_saved",
    outcomeLabel: "Money Saved",
    title: "Disputing Medical Bills with AI",
    excerpt: "How I challenged unfair medical charges.",
    author: "Jane Smith",
    authorInitials: "JS",
    readTime: "7 min",
    amountSaved: 8000,
    outcomeMetric: "$8,000 saved",
    imageAlt: "Medical bills",
    createdAt: "2024-01-20",
  },
  {
    id: "story-3",
    slug: "story-three",
    category: "financial",
    categoryLabel: "Financial",
    aiTool: "gemini",
    aiToolLabel: "Gemini",
    outcomeType: "time_saved",
    outcomeLabel: "Time Saved",
    title: "Automating Financial Planning",
    excerpt: "Save hours on financial analysis.",
    author: "Bob Johnson",
    authorInitials: "BJ",
    readTime: "6 min",
    outcomeMetric: "10 hours saved",
    imageAlt: "Financial charts",
    createdAt: "2024-01-25",
  },
];

describe("RelatedStories Component - Japanese Theme", () => {
  it("renders without errors with stories", () => {
    expect(() => render(<RelatedStories stories={mockStories} />)).not.toThrow();
  });

  it("displays the section heading", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText("Related Stories")).toBeInTheDocument();
  });

  it("renders all provided stories", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText("How I Saved $15,000 on Legal Fees")).toBeInTheDocument();
    expect(screen.getByText("Disputing Medical Bills with AI")).toBeInTheDocument();
    expect(screen.getByText("Automating Financial Planning")).toBeInTheDocument();
  });

  it("renders null when no stories are provided", () => {
    const { container } = render(<RelatedStories stories={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("displays story titles", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText("How I Saved $15,000 on Legal Fees")).toBeInTheDocument();
  });

  it("displays outcome metrics", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText("$15,000 saved")).toBeInTheDocument();
    expect(screen.getByText("$8,000 saved")).toBeInTheDocument();
    expect(screen.getByText("10 hours saved")).toBeInTheDocument();
  });

  it("displays author names", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Bob Johnson/)).toBeInTheDocument();
  });

  it("displays category labels", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText(/John Doe · Legal/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith · Medical/)).toBeInTheDocument();
    expect(screen.getByText(/Bob Johnson · Financial/)).toBeInTheDocument();
  });

  it("displays image alt text as placeholder", () => {
    render(<RelatedStories stories={mockStories} />);
    expect(screen.getByText("Legal documents")).toBeInTheDocument();
    expect(screen.getByText("Medical bills")).toBeInTheDocument();
    expect(screen.getByText("Financial charts")).toBeInTheDocument();
  });

  it("renders links with correct href", () => {
    render(<RelatedStories stories={mockStories} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/stories/story-one");
    expect(links[1]).toHaveAttribute("href", "/stories/story-two");
    expect(links[2]).toHaveAttribute("href", "/stories/story-three");
  });

  it("applies Japanese theme background styling", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-[#f5f2ed]");
    expect(section).toHaveClass("border-t");
    expect(section).toHaveClass("border-[#d4d0c8]");
  });

  it("applies Japanese theme card styling", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const cards = container.querySelectorAll(".bg-\\[\\#faf8f5\\]");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has hover border effect on cards", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link.className).toContain("hover:border-[#1a1a1a]");
    });
  });

  it("has hover text color effect on titles", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const titles = container.querySelectorAll("h3");
    titles.forEach((title) => {
      expect(title.className).toContain("group-hover:text-[#c41e3a]");
    });
  });

  it("truncates titles with line-clamp-2", () => {
    render(<RelatedStories stories={mockStories} />);
    const title = screen.getByText("How I Saved $15,000 on Legal Fees");
    expect(title.className).toContain("line-clamp-2");
  });

  it("truncates outcome metrics with line-clamp-1", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const outcomes = container.querySelectorAll(".line-clamp-1");
    expect(outcomes.length).toBeGreaterThan(0);
  });

  it("renders in grid layout", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("sm:grid-cols-3");
  });

  it("renders with single story", () => {
    render(<RelatedStories stories={[mockStories[0]]} />);
    expect(screen.getByText("How I Saved $15,000 on Legal Fees")).toBeInTheDocument();
  });

  it("has correct image placeholder dimensions", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const imagePlaceholders = container.querySelectorAll(".w-20");
    expect(imagePlaceholders.length).toBe(3);
  });

  it("applies border between image and content", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const imagePlaceholders = container.querySelectorAll(".border-r.border-\\[\\#d4d0c8\\]");
    expect(imagePlaceholders.length).toBe(3);
  });

  it("centers content with max-width container", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const contentContainer = container.querySelector(".max-w-3xl");
    expect(contentContainer).toBeInTheDocument();
  });

  it("has proper spacing and padding", () => {
    const { container } = render(<RelatedStories stories={mockStories} />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("py-12");
  });

  it("renders stories with all metadata visible", () => {
    render(<RelatedStories stories={mockStories} />);
    // Check that all key data is visible
    expect(screen.getByText(/John Doe · Legal/)).toBeInTheDocument();
    expect(screen.getByText("$15,000 saved")).toBeInTheDocument();
  });
});
