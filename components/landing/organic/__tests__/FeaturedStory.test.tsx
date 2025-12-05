import { render, screen } from "@/lib/test-utils";
import { FeaturedStory } from "../FeaturedStory";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock the featured story data
jest.mock("@/lib/mock-data/stories", () => ({
  featuredStory: {
    id: "featured-1",
    slug: "how-i-beat-enterprise-damage-claim",
    category: "legal",
    categoryLabel: "Legal Win",
    title: "How I Beat Enterprise's $3,200 Damage Claim",
    excerpt:
      "Using Claude, I built a systematic legal defense that made them drop the claim entirely within one week.",
    aiQuote: "Based on your evidence, Enterprise has no legal basis for this claim...",
    author: "Ankush D.",
    readTime: "5 min read",
    amountSaved: 3200,
    imageAlt: "Car rental dispute victory",
  },
  formatCurrency: jest.fn((amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  ),
}));

describe("FeaturedStory Component", () => {
  it("renders without errors", () => {
    expect(() => render(<FeaturedStory />)).not.toThrow();
  });

  it("renders section header", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Featured Story")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("See exactly how AI made the difference")).toBeInTheDocument();
  });

  it("renders category label", () => {
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
      screen.getByText(/Using Claude, I built a systematic legal defense/)
    ).toBeInTheDocument();
  });

  it("renders 'From the AI chat:' label", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("From the AI chat:")).toBeInTheDocument();
  });

  it("renders AI quote", () => {
    render(<FeaturedStory />);
    expect(
      screen.getByText(/Based on your evidence, Enterprise has no legal basis/)
    ).toBeInTheDocument();
  });

  it("renders author name", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Ankush D.")).toBeInTheDocument();
  });

  it("renders read time", () => {
    render(<FeaturedStory />);
    expect(screen.getByText(/5 min read/)).toBeInTheDocument();
  });

  it("renders amount saved", () => {
    render(<FeaturedStory />);
    expect(screen.getByText(/\$3,200 saved/)).toBeInTheDocument();
  });

  it("renders author initials in avatar", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("AD")).toBeInTheDocument();
  });

  it("renders Read Story button with correct href", () => {
    render(<FeaturedStory />);
    const readButton = screen.getByText("Read Story").closest("a");
    expect(readButton).toBeInTheDocument();
    expect(readButton).toHaveAttribute("href", "/stories/how-i-beat-enterprise-damage-claim");
  });

  it("renders image placeholder with alt text", () => {
    render(<FeaturedStory />);
    expect(screen.getByText("Car rental dispute victory")).toBeInTheDocument();
  });

  it("has proper grid layout", () => {
    const { container } = render(<FeaturedStory />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain("lg:grid-cols-[380px_1fr]");
  });
});
