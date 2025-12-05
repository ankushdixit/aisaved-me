import { render, screen, fireEvent } from "@/lib/test-utils";
import { EngagementBar } from "../EngagementBar";

describe("EngagementBar Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() =>
      render(<EngagementBar likes={100} comments={25} storySlug="test-story" />)
    ).not.toThrow();
  });

  it("displays like count", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    expect(screen.getByText("100 likes")).toBeInTheDocument();
  });

  it("displays comment count", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    expect(screen.getByText("25 comments")).toBeInTheDocument();
  });

  it("displays like button with heart icon", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const likeButton = screen.getByLabelText("Like this story");
    expect(likeButton).toBeInTheDocument();
  });

  it("displays comment button with icon", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const commentButton = screen.getByLabelText("View comments");
    expect(commentButton).toBeInTheDocument();
  });

  it("displays bookmark button", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const bookmarkButton = screen.getByLabelText("Bookmark this story");
    expect(bookmarkButton).toBeInTheDocument();
    expect(screen.getByText("Bookmark")).toBeInTheDocument();
  });

  it("displays share button", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const shareButton = screen.getByLabelText("Share this story");
    expect(shareButton).toBeInTheDocument();
    expect(screen.getByText("Share")).toBeInTheDocument();
  });

  it("displays Make It Your Own CTA link", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const ctaLink = screen.getByText(/Make It Your Own/);
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute("href", "/make-it-your-own?story=test-story");
  });

  it("renders all interactive buttons", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(4); // like, comment, bookmark, share
  });

  it("like button is clickable", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const likeButton = screen.getByLabelText("Like this story");
    fireEvent.click(likeButton);
    // Should not crash on click
    expect(likeButton).toBeInTheDocument();
  });

  it("comment button is clickable", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const commentButton = screen.getByLabelText("View comments");
    fireEvent.click(commentButton);
    expect(commentButton).toBeInTheDocument();
  });

  it("bookmark button is clickable", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const bookmarkButton = screen.getByLabelText("Bookmark this story");
    fireEvent.click(bookmarkButton);
    expect(bookmarkButton).toBeInTheDocument();
  });

  it("share button is clickable", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const shareButton = screen.getByLabelText("Share this story");
    fireEvent.click(shareButton);
    expect(shareButton).toBeInTheDocument();
  });

  it("applies Japanese theme background styling", () => {
    const { container } = render(
      <EngagementBar likes={100} comments={25} storySlug="test-story" />
    );
    const bar = container.querySelector(".bg-\\[\\#f5f2ed\\]");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveClass("border-[#d4d0c8]");
  });

  it("has hover effects on action buttons", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const likeButton = screen.getByLabelText("Like this story");
    expect(likeButton.className).toContain("hover:text-[#1a1a1a]");
  });

  it("displays CTA with hover effect", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const ctaLink = screen.getByText(/Make It Your Own/);
    expect(ctaLink.className).toContain("hover:bg-[#c41e3a]");
  });

  it("displays CTA with Japanese theme styling", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const ctaLink = screen.getByText(/Make It Your Own/);
    expect(ctaLink.className).toContain("bg-[#1a1a1a]");
    expect(ctaLink.className).toContain("text-[#faf8f5]");
  });

  it("renders with zero likes", () => {
    render(<EngagementBar likes={0} comments={25} storySlug="test-story" />);
    expect(screen.getByText("0 likes")).toBeInTheDocument();
  });

  it("renders with zero comments", () => {
    render(<EngagementBar likes={100} comments={0} storySlug="test-story" />);
    expect(screen.getByText("0 comments")).toBeInTheDocument();
  });

  it("renders with large numbers", () => {
    render(<EngagementBar likes={9999} comments={1234} storySlug="test-story" />);
    expect(screen.getByText("9999 likes")).toBeInTheDocument();
    expect(screen.getByText("1234 comments")).toBeInTheDocument();
  });

  it("has responsive layout classes", () => {
    const { container } = render(
      <EngagementBar likes={100} comments={25} storySlug="test-story" />
    );
    const bar = container.querySelector(".flex.flex-wrap");
    expect(bar).toBeInTheDocument();
  });

  it("CTA is positioned at the end with ml-auto", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    const ctaLink = screen.getByText(/Make It Your Own/);
    expect(ctaLink.className).toContain("ml-auto");
  });

  it("includes arrow in CTA text", () => {
    render(<EngagementBar likes={100} comments={25} storySlug="test-story" />);
    expect(screen.getByText(/Make It Your Own →/)).toBeInTheDocument();
  });

  it("all buttons have proper button type", () => {
    const { container } = render(
      <EngagementBar likes={100} comments={25} storySlug="test-story" />
    );
    const buttons = container.querySelectorAll('button[type="button"]');
    expect(buttons.length).toBe(4);
  });

  it("has appropriate spacing between elements", () => {
    const { container } = render(
      <EngagementBar likes={100} comments={25} storySlug="test-story" />
    );
    const bar = container.querySelector(".gap-4");
    expect(bar).toBeInTheDocument();
  });
});
