import { render, screen } from "@/lib/test-utils";
import { StoryCardHorizontal } from "../StoryCardHorizontal";
import type { Story } from "@/lib/types/story";

const mockStory: Story = {
  id: "story-1",
  slug: "test-story-slug",
  category: "legal",
  categoryLabel: "Legal",
  aiTool: "claude",
  aiToolLabel: "Claude",
  outcomeType: "money_saved",
  outcomeLabel: "Money Saved",
  title: "How I Used AI to Challenge Unfair Insurance Denial",
  excerpt: "A detailed guide on fighting back against insurance companies.",
  author: "Sarah Johnson",
  authorInitials: "SJ",
  readTime: "8 min",
  amountSaved: 15000,
  outcomeMetric: "$15,000 saved",
  imageAlt: "Insurance documents and AI chat interface",
  createdAt: "2024-01-15",
};

describe("StoryCardHorizontal Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() => render(<StoryCardHorizontal story={mockStory} />)).not.toThrow();
  });

  it("renders as a link with correct href", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/stories/test-story-slug");
  });

  it("displays story title", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(
      screen.getByText("How I Used AI to Challenge Unfair Insurance Denial")
    ).toBeInTheDocument();
  });

  it("displays category label", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("displays excerpt", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(
      screen.getByText("A detailed guide on fighting back against insurance companies.")
    ).toBeInTheDocument();
  });

  it("displays author name", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText(/Sarah Johnson/)).toBeInTheDocument();
  });

  it("displays author initials", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("SJ")).toBeInTheDocument();
  });

  it("displays read time", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText(/8 min/)).toBeInTheDocument();
  });

  it("displays outcome metric", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("$15,000 saved")).toBeInTheDocument();
  });

  it("displays image alt text as placeholder", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("Insurance documents and AI chat interface")).toBeInTheDocument();
  });

  it("applies Japanese theme styling", () => {
    const { container } = render(<StoryCardHorizontal story={mockStory} />);
    const card = container.querySelector("a");
    expect(card).toHaveClass("bg-[#faf8f5]");
    expect(card).toHaveClass("border-[#d4d0c8]");
  });

  it("has hover border styling", () => {
    const { container } = render(<StoryCardHorizontal story={mockStory} />);
    const card = container.querySelector("a");
    expect(card?.className).toContain("hover:border-[#1a1a1a]");
  });

  it("has hover text color for title", () => {
    const { container } = render(<StoryCardHorizontal story={mockStory} />);
    const title = container.querySelector("h3");
    expect(title?.className).toContain("group-hover:text-[#c41e3a]");
  });

  it("truncates title with line-clamp-2", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    const title = screen.getByText("How I Used AI to Challenge Unfair Insurance Denial");
    expect(title.className).toContain("line-clamp-2");
  });

  it("truncates excerpt with line-clamp-2", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    const excerpt = screen.getByText(
      "A detailed guide on fighting back against insurance companies."
    );
    expect(excerpt.className).toContain("line-clamp-2");
  });

  it("renders with different category", () => {
    const medicalStory: Story = {
      ...mockStory,
      category: "medical",
      categoryLabel: "Medical",
    };
    render(<StoryCardHorizontal story={medicalStory} />);
    expect(screen.getByText("Medical")).toBeInTheDocument();
  });

  it("applies uppercase tracking to category tag", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    const categoryTag = screen.getByText("Legal");
    expect(categoryTag.className).toContain("uppercase");
    expect(categoryTag.className).toContain("tracking-wider");
  });

  it("renders responsive layout classes", () => {
    const { container } = render(<StoryCardHorizontal story={mockStory} />);
    const contentWrapper = container.querySelector(".flex.flex-col.sm\\:flex-row");
    expect(contentWrapper).toBeInTheDocument();
  });

  it("renders author initials in square box", () => {
    const { container } = render(<StoryCardHorizontal story={mockStory} />);
    const initialsBox = container.querySelector(".w-7.h-7");
    expect(initialsBox).toBeInTheDocument();
    expect(initialsBox).toHaveClass("bg-[#1a1a1a]");
    expect(initialsBox).toHaveClass("text-[#faf8f5]");
  });
});
