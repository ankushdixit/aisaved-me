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

describe("FeaturedStory Component (Memphis)", () => {
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
    expect(screen.getByText("From the AI chat:")).toBeInTheDocument();
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

  it("applies Memphis-style border to featured card", () => {
    const { container } = render(<FeaturedStory />);
    const card = container.querySelector(".border-4.border-black");
    expect(card).toBeInTheDocument();
  });

  it("applies Memphis shadow to featured card", () => {
    const { container } = render(<FeaturedStory />);
    const card = container.querySelector(".shadow-memphis-xl");
    expect(card).toBeInTheDocument();
  });

  it("has Memphis rotation transform on featured card", () => {
    const { container } = render(<FeaturedStory />);
    const card = container.querySelector(".-rotate-1");
    expect(card).toBeInTheDocument();
  });

  it("has hover effect to remove rotation", () => {
    const { container } = render(<FeaturedStory />);
    const card = container.querySelector(".hover\\:rotate-0");
    expect(card).toBeInTheDocument();
  });

  it("applies Memphis border to AI quote section", () => {
    const { container } = render(<FeaturedStory />);
    const aiQuoteSection = container.querySelector(".border-4.border-black.transform.rotate-1");
    expect(aiQuoteSection).toBeInTheDocument();
  });

  it("displays correct grid layout for image and content", () => {
    const { container } = render(<FeaturedStory />);
    const grid = container.querySelector(".grid.grid-cols-1.lg\\:grid-cols-\\[380px_1fr\\]");
    expect(grid).toBeInTheDocument();
  });

  it("renders Memphis decorative shapes", () => {
    const { container } = render(<FeaturedStory />);
    const decorativeShapes = container.querySelectorAll(".absolute");
    expect(decorativeShapes.length).toBeGreaterThan(0);
  });

  it("has border styling on section", () => {
    const { container } = render(<FeaturedStory />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("applies Memphis shadow to section title", () => {
    const { container } = render(<FeaturedStory />);
    const title = container.querySelector(".text-memphis-shadow");
    expect(title).toBeInTheDocument();
  });

  it("renders category tag with Memphis styling", () => {
    const { container } = render(<FeaturedStory />);
    const categoryTag = container.querySelector(".border-3.border-black.-rotate-2");
    expect(categoryTag).toBeInTheDocument();
  });

  it("renders avatar with Memphis border", () => {
    const { container } = render(<FeaturedStory />);
    const avatar = container.querySelector(".w-12.h-12.border-3.border-black");
    expect(avatar).toBeInTheDocument();
  });

  it("applies btn-memphis class to Read Story button", () => {
    const { container } = render(<FeaturedStory />);
    const button = container.querySelector(".btn-memphis");
    expect(button).toBeInTheDocument();
  });
});
