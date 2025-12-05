import { render, screen } from "@/lib/test-utils";
import { EngagementBar } from "../memphis/EngagementBar";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("EngagementBar Component", () => {
  const defaultProps = {
    likes: 234,
    comments: 45,
    storySlug: "test-story-slug",
  };

  it("renders without errors", () => {
    expect(() => render(<EngagementBar {...defaultProps} />)).not.toThrow();
  });

  it("displays likes count correctly", () => {
    render(<EngagementBar {...defaultProps} />);
    expect(screen.getByText("234 likes")).toBeInTheDocument();
  });

  it("displays comments count correctly", () => {
    render(<EngagementBar {...defaultProps} />);
    expect(screen.getByText("45 comments")).toBeInTheDocument();
  });

  it("displays Bookmark button", () => {
    render(<EngagementBar {...defaultProps} />);
    expect(screen.getByText("Bookmark")).toBeInTheDocument();
  });

  it("displays Share button", () => {
    render(<EngagementBar {...defaultProps} />);
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("displays Make It Your Own CTA link", () => {
    render(<EngagementBar {...defaultProps} />);
    expect(screen.getByText(/Make It Your Own/)).toBeInTheDocument();
  });

  it("Make It Your Own link has correct href with story slug", () => {
    render(<EngagementBar {...defaultProps} />);
    const ctaLink = screen.getByRole("link");
    expect(ctaLink).toHaveAttribute("href", "/make-it-your-own?story=test-story-slug");
  });

  it("Like button has proper aria-label for accessibility", () => {
    render(<EngagementBar {...defaultProps} />);
    const likeButton = screen.getByLabelText("Like this story");
    expect(likeButton).toBeInTheDocument();
  });

  it("Comment button has proper aria-label for accessibility", () => {
    render(<EngagementBar {...defaultProps} />);
    const commentButton = screen.getByLabelText("View comments");
    expect(commentButton).toBeInTheDocument();
  });

  it("Bookmark button has proper aria-label for accessibility", () => {
    render(<EngagementBar {...defaultProps} />);
    const bookmarkButton = screen.getByLabelText("Bookmark this story");
    expect(bookmarkButton).toBeInTheDocument();
  });

  it("Share button has proper aria-label for accessibility", () => {
    render(<EngagementBar {...defaultProps} />);
    const shareButton = screen.getByLabelText("Share this story");
    expect(shareButton).toBeInTheDocument();
  });

  it("handles different like counts correctly", () => {
    render(<EngagementBar {...defaultProps} likes={1} comments={45} />);
    expect(screen.getByText("1 likes")).toBeInTheDocument();
  });

  it("handles different comment counts correctly", () => {
    render(<EngagementBar {...defaultProps} likes={234} comments={1} />);
    expect(screen.getByText("1 comments")).toBeInTheDocument();
  });

  it("generates correct URL with different story slugs", () => {
    render(<EngagementBar {...defaultProps} storySlug="another-story" />);
    const ctaLink = screen.getByRole("link");
    expect(ctaLink).toHaveAttribute("href", "/make-it-your-own?story=another-story");
  });

  it("all buttons are of type button", () => {
    render(<EngagementBar {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("type", "button");
    });
  });
});
