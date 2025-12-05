import { render, screen } from "@/lib/test-utils";
import { StoryHero } from "../StoryHero";
import type { StoryDetail } from "@/lib/types/story";

const mockStoryDetail: StoryDetail = {
  id: "story-1",
  slug: "test-story-slug",
  category: "legal",
  categoryLabel: "Legal",
  aiTool: "claude",
  aiToolLabel: "Claude",
  outcomeType: "money_saved",
  outcomeLabel: "Money Saved",
  title: "How I Used AI to Challenge Unfair Insurance Denial",
  subtitle: "A step-by-step guide to fighting back and winning",
  excerpt: "This is a test excerpt for the story hero component.",
  author: "Sarah Johnson",
  authorInitials: "SJ",
  readTime: "8 min",
  amountSaved: 15000,
  outcomeMetric: "$15,000 saved",
  imageAlt: "Insurance documents and AI chat interface",
  createdAt: "2024-01-15",
  publishedDate: "Jan 15, 2024",
  likes: 234,
  comments: 45,
  content: {
    intro: "Introduction to the story",
    theProblem: "The problem description",
    theStrategy: "The strategy used",
    theResult: "The result achieved",
    keyTakeaways: ["Takeaway 1", "Takeaway 2"],
  },
};

describe("StoryHero Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() => render(<StoryHero story={mockStoryDetail} />)).not.toThrow();
  });

  it("displays the story title", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(
      screen.getByText("How I Used AI to Challenge Unfair Insurance Denial")
    ).toBeInTheDocument();
  });

  it("displays the category label", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("displays author name", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
  });

  it("displays author initials", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText("SJ")).toBeInTheDocument();
  });

  it("displays published date and read time", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument();
    expect(screen.getByText(/8 min read/)).toBeInTheDocument();
  });

  it("displays outcome badge when amountSaved is provided", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText("Outcome")).toBeInTheDocument();
    expect(screen.getByText(/\$15,000 Saved/)).toBeInTheDocument();
  });

  it("displays subtitle when provided", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(
      screen.getByText("A step-by-step guide to fighting back and winning")
    ).toBeInTheDocument();
  });

  it("does not display subtitle when not provided", () => {
    const storyWithoutSubtitle: StoryDetail = {
      ...mockStoryDetail,
      subtitle: undefined,
    };
    render(<StoryHero story={storyWithoutSubtitle} />);
    expect(
      screen.queryByText("A step-by-step guide to fighting back and winning")
    ).not.toBeInTheDocument();
  });

  it("does not display outcome badge when amountSaved is not provided", () => {
    const storyWithoutAmount: StoryDetail = {
      ...mockStoryDetail,
      amountSaved: undefined,
    };
    render(<StoryHero story={storyWithoutAmount} />);
    expect(screen.queryByText("Outcome")).not.toBeInTheDocument();
  });

  it("displays breadcrumb navigation", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText(/Stories › Legal › How I Used/)).toBeInTheDocument();
  });

  it("truncates title in breadcrumb to first 3 words", () => {
    render(<StoryHero story={mockStoryDetail} />);
    const breadcrumb = screen.getByText(/Stories › Legal › How I Used.../);
    expect(breadcrumb).toBeInTheDocument();
    // Should only show first 3 words
    expect(breadcrumb.textContent).toContain("How I Used...");
  });

  it("renders hero image placeholder", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText("Story Hero Image")).toBeInTheDocument();
  });

  it("applies Japanese theme dark background to hero image", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const heroImage = container.querySelector(".bg-\\[\\#1a1a1a\\]");
    expect(heroImage).toBeInTheDocument();
  });

  it("applies Japanese theme styling to breadcrumb section", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const breadcrumbSection = container.querySelector(".bg-\\[\\#1a1a1a\\]");
    expect(breadcrumbSection).toBeInTheDocument();
  });

  it("applies uppercase tracking to category tag", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const categoryTags = container.querySelectorAll(".uppercase.tracking-wider");
    expect(categoryTags.length).toBeGreaterThan(0);
  });

  it("renders with different category", () => {
    const medicalStory: StoryDetail = {
      ...mockStoryDetail,
      category: "medical",
      categoryLabel: "Medical",
    };
    render(<StoryHero story={medicalStory} />);
    expect(screen.getByText("Medical")).toBeInTheDocument();
  });

  it("renders with different category (financial)", () => {
    const financialStory: StoryDetail = {
      ...mockStoryDetail,
      category: "financial",
      categoryLabel: "Financial",
    };
    render(<StoryHero story={financialStory} />);
    expect(screen.getByText("Financial")).toBeInTheDocument();
  });

  it("displays author initials in square box with dark background", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const initialsBox = container.querySelector(".w-12.h-12.bg-\\[\\#1a1a1a\\]");
    expect(initialsBox).toBeInTheDocument();
  });

  it("applies Japanese theme border styling to outcome badge", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const outcomeBadge = container.querySelector(".bg-\\[\\#f5f2ed\\]");
    expect(outcomeBadge).toBeInTheDocument();
  });

  it("renders zen divider at the bottom", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const divider = container.querySelector(".h-px.bg-gradient-to-r");
    expect(divider).toBeInTheDocument();
  });

  it("has responsive hero image heights", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const heroImage = container.querySelector(".h-64.sm\\:h-80.md\\:h-96");
    expect(heroImage).toBeInTheDocument();
  });

  it("centers content with max-width container", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const contentContainers = container.querySelectorAll(".max-w-3xl");
    expect(contentContainers.length).toBeGreaterThan(0);
  });

  it("has responsive layout for author and outcome section", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const flexSection = container.querySelector(".flex.flex-col.sm\\:flex-row");
    expect(flexSection).toBeInTheDocument();
  });

  it("applies correct text sizes to title", () => {
    render(<StoryHero story={mockStoryDetail} />);
    const title = screen.getByText("How I Used AI to Challenge Unfair Insurance Denial");
    expect(title.className).toContain("text-3xl");
    expect(title.className).toContain("sm:text-4xl");
  });

  it("applies correct text size to subtitle", () => {
    render(<StoryHero story={mockStoryDetail} />);
    const subtitle = screen.getByText("A step-by-step guide to fighting back and winning");
    expect(subtitle.className).toContain("text-lg");
  });

  it("renders breadcrumb with muted text color", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const breadcrumb = container.querySelector("p.text-sm.text-\\[\\#6b6b6b\\]");
    expect(breadcrumb).toBeInTheDocument();
  });

  it("displays outcome amount with proper formatting", () => {
    render(<StoryHero story={mockStoryDetail} />);
    // The formatCurrency function should format the amount
    expect(screen.getByText(/Saved/)).toBeInTheDocument();
  });

  it("renders with no subtitle gracefully", () => {
    const storyNoSubtitle: StoryDetail = {
      ...mockStoryDetail,
      subtitle: undefined,
    };
    const { container } = render(<StoryHero story={storyNoSubtitle} />);
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("renders with no outcome badge gracefully", () => {
    const storyNoOutcome: StoryDetail = {
      ...mockStoryDetail,
      amountSaved: undefined,
    };
    render(<StoryHero story={storyNoOutcome} />);
    expect(screen.queryByText("Outcome")).not.toBeInTheDocument();
  });

  it("applies leading-tight to title", () => {
    render(<StoryHero story={mockStoryDetail} />);
    const title = screen.getByText("How I Used AI to Challenge Unfair Insurance Denial");
    expect(title.className).toContain("leading-tight");
  });

  it("has proper spacing throughout the component", () => {
    const { container } = render(<StoryHero story={mockStoryDetail} />);
    const header = container.querySelector(".pt-10");
    expect(header).toBeInTheDocument();
  });
});
