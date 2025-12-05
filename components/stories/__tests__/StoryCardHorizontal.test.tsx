import { render, screen } from "@/lib/test-utils";
import { StoryCardHorizontal } from "../memphis/StoryCardHorizontal";
import type { Story } from "@/lib/types/story";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

const mockStory: Story = {
  id: "story-1",
  slug: "test-story-slug",
  category: "legal",
  categoryLabel: "Legal",
  aiTool: "claude",
  aiToolLabel: "Claude",
  outcomeType: "money_saved",
  outcomeLabel: "Money Saved",
  title: "Test Story Title That Might Be Long",
  excerpt: "This is a test excerpt for the story card component.",
  author: "Test Author",
  authorInitials: "TA",
  readTime: "5 min",
  amountSaved: 3200,
  outcomeMetric: "$3,200 saved",
  imageAlt: "Test image description",
  createdAt: "2024-01-15",
};

describe("StoryCardHorizontal Component", () => {
  it("renders without errors", () => {
    expect(() => render(<StoryCardHorizontal story={mockStory} />)).not.toThrow();
  });

  it("renders the story title", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("Test Story Title That Might Be Long")).toBeInTheDocument();
  });

  it("renders the story excerpt", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(
      screen.getByText("This is a test excerpt for the story card component.")
    ).toBeInTheDocument();
  });

  it("renders the category label", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders the author name", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  it("renders the author initials", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("TA")).toBeInTheDocument();
  });

  it("renders the read time", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText(/5 min/)).toBeInTheDocument();
  });

  it("renders the outcome metric", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("$3,200 saved")).toBeInTheDocument();
  });

  it("renders image alt text", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    expect(screen.getByText("Test image description")).toBeInTheDocument();
  });

  it("links to the correct story page", () => {
    render(<StoryCardHorizontal story={mockStory} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/stories/test-story-slug");
  });

  it("renders different category with correct styling", () => {
    const medicalStory: Story = {
      ...mockStory,
      category: "medical",
      categoryLabel: "Medical",
    };
    render(<StoryCardHorizontal story={medicalStory} />);
    expect(screen.getByText("Medical")).toBeInTheDocument();
  });
});
