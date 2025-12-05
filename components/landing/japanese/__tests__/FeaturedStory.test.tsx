import { render, screen } from "@/lib/test-utils";
import { FeaturedStory } from "../FeaturedStory";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
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
    expect(screen.getByText("How AI made the difference")).toBeInTheDocument();
  });

  it("renders section header divider", () => {
    const { container } = render(<FeaturedStory />);
    const divider = container.querySelector(".h-px.w-16.bg-dark-900");
    expect(divider).toBeInTheDocument();
  });

  it("renders category tag", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Legal Win")).toBeInTheDocument();
  });

  it("renders story title", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("How I Beat Enterprise's $3,200 Damage Claim")).toBeInTheDocument();
  });

  it("renders story excerpt", () => {
    render(<FeaturedStory />);
    expect(
      screen.getByText(
        "Using Claude, I built a systematic legal defense that made them drop the claim entirely within one week."
      )
    ).toBeInTheDocument();
  });

  it("renders AI quote section", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("From the AI:")).toBeInTheDocument();
    expect(
      screen.getByText('"Based on your evidence, Enterprise has no legal basis for this claim..."')
    ).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Ankush D.")).toBeInTheDocument();
  });

  it("renders author initials in avatar", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("AD")).toBeInTheDocument();
  });

  it("renders read time and amount saved", () => {
    render(<FeaturedStory />);
    expect(screen.getByText(/5 min read - \$3,200 saved/)).toBeInTheDocument();
  });

  it("renders image placeholder with alt text", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Car rental dispute victory")).toBeInTheDocument();
  });

  it("renders Read Story button", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Read Story")).toBeInTheDocument();
  });

  it("has correct link for Read Story button", () => {
    render(<FeaturedStory />);
    const link = screen.getByText("Read Story").closest("a");
    expect(link).toHaveAttribute("href", "/stories/how-i-beat-enterprise-damage-claim");
  });

  it("applies Hanko red border to AI quote section", () => {
    const { container } = render(<FeaturedStory />);
    const aiQuoteSection = container.querySelector(".border-l-2.border-hanko-red");
    expect(aiQuoteSection).toBeInTheDocument();
  });

  it("has hover effect on featured card", () => {
    const { container } = render(<FeaturedStory />);
    const card = container.querySelector(".hover\\:border-dark-900");
    expect(card).toBeInTheDocument();
  });

  it("displays correct grid layout for image and content", () => {
    const { container } = render(<FeaturedStory />);
    const grid = container.querySelector(".grid.grid-cols-1.lg\\:grid-cols-\\[1fr_2fr\\]");
    expect(grid).toBeInTheDocument();
  });
});
