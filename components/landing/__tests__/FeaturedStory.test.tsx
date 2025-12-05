import { render, screen } from "@/lib/test-utils";
import { FeaturedStory } from "../memphis/FeaturedStory";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("FeaturedStory Component", () => {
  it("renders without errors", () => {
    expect(() => render(<FeaturedStory />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Featured Story")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("See exactly how AI made the difference")).toBeInTheDocument();
  });

  it("renders the featured story title", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("How I Beat Enterprise's $3,200 Damage Claim")).toBeInTheDocument();
  });

  it("renders the category tag", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Legal Win")).toBeInTheDocument();
  });

  it("renders the story excerpt", () => {
    render(<FeaturedStory />);
    expect(
      screen.getByText(/Using Claude, I built a systematic legal defense/)
    ).toBeInTheDocument();
  });

  it("renders the AI quote section", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("From the AI chat:")).toBeInTheDocument();
    expect(
      screen.getByText(/Based on your evidence, Enterprise has no legal basis/)
    ).toBeInTheDocument();
  });

  it("renders the author name", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Ankush D.")).toBeInTheDocument();
  });

  it("renders read time and amount saved", () => {
    render(<FeaturedStory />);
    expect(screen.getByText(/5 min read - \$3,200 saved/)).toBeInTheDocument();
  });

  it("renders Read Story button with correct link", () => {
    render(<FeaturedStory />);
    const readButton = screen.getByText("Read Story");
    expect(readButton).toBeInTheDocument();
    const link = readButton.closest("a");
    expect(link).toHaveAttribute("href", "/stories/how-i-beat-enterprise-damage-claim");
  });

  it("renders author avatar with initials", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("AD")).toBeInTheDocument();
  });
});
