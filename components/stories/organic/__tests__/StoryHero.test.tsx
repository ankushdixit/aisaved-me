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

describe("StoryHero Component", () => {
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

  it("displays outcome badge with amount saved when amountSaved is provided", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText("Outcome")).toBeInTheDocument();
    expect(screen.getByText(/\$15,000/)).toBeInTheDocument();
    expect(screen.getByText(/Saved/)).toBeInTheDocument();
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

  it("displays breadcrumb navigation with category and title preview", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText(/Stories › Legal › How I Used/)).toBeInTheDocument();
  });

  it("renders with different category (medical)", () => {
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

  it("renders hero image placeholder", () => {
    render(<StoryHero story={mockStoryDetail} />);
    expect(screen.getByText("Story Hero Image")).toBeInTheDocument();
  });

  it("renders with fallback category styling for unknown category", () => {
    const unknownCategoryStory: StoryDetail = {
      ...mockStoryDetail,
      category: "other",
      categoryLabel: "Other",
    };
    render(<StoryHero story={unknownCategoryStory} />);
    expect(screen.getByText("Other")).toBeInTheDocument();
  });
});
