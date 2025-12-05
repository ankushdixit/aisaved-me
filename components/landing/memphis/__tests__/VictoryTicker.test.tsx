import { render, screen } from "@/lib/test-utils";
import { VictoryTicker } from "../VictoryTicker";

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

describe("VictoryTicker Component (Memphis)", () => {
  it("renders without errors", () => {
    expect(() => render(<VictoryTicker />)).not.toThrow();
  });

  it("renders ticker stories from row 1", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Enterprise damage claim defeated").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("AI identified kidney stones, doctor agreed").length
    ).toBeGreaterThan(0);
  });

  it("renders ticker stories from row 2", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Contractor paid after small claims prep").length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText("HOA fine overturned with AI research").length).toBeGreaterThan(0);
  });

  it("displays monetary amounts for appropriate stories", () => {
    render(<VictoryTicker />);
    // Story with $3,200 saved appears multiple times due to duplication
    expect(screen.getAllByText("$3,200").length).toBeGreaterThan(0);
  });

  it("displays amount labels", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("saved").length).toBeGreaterThan(0);
    expect(screen.getAllByText("recovered").length).toBeGreaterThan(0);
  });

  it("displays outcomes for stories without amounts", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Diagnosis confirmed").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ER visit avoided").length).toBeGreaterThan(0);
  });

  it("displays author names", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText(/Ankush D\./).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Raj P\./).length).toBeGreaterThan(0);
  });

  it("displays time ago information", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText(/2 hours ago/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1 day ago/).length).toBeGreaterThan(0);
  });

  it("renders category tags", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Legal").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Medical").length).toBeGreaterThan(0);
  });

  it("duplicates stories for seamless scrolling", () => {
    const { container } = render(<VictoryTicker />);
    const tickerCards = container.querySelectorAll(".flex-shrink-0.w-\\[320px\\]");
    // Each row has 4 stories duplicated = 8 cards per row = 16 total
    expect(tickerCards.length).toBe(16);
  });

  it("applies ticker animation classes", () => {
    const { container } = render(<VictoryTicker />);
    const tickerForward = container.querySelector(".animate-ticker");
    const tickerReverse = container.querySelector(".animate-ticker-reverse");
    expect(tickerForward).toBeInTheDocument();
    expect(tickerReverse).toBeInTheDocument();
  });

  it("has overflow-hidden on ticker rows", () => {
    const { container } = render(<VictoryTicker />);
    const overflowContainers = container.querySelectorAll(".overflow-x-hidden");
    expect(overflowContainers.length).toBeGreaterThanOrEqual(2);
  });

  it("has border styling on section", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("applies Memphis-style borders to ticker cards", () => {
    const { container } = render(<VictoryTicker />);
    const cards = container.querySelectorAll(".border-3.border-black");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("applies Memphis shadow to ticker cards", () => {
    const { container } = render(<VictoryTicker />);
    const cards = container.querySelectorAll(".shadow-memphis-md");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has hover effects on ticker cards", () => {
    const { container } = render(<VictoryTicker />);
    const cards = container.querySelectorAll(".hover\\:shadow-memphis-lg");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has hover rotation on ticker cards", () => {
    const { container } = render(<VictoryTicker />);
    const cards = container.querySelectorAll(".hover\\:-rotate-1");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders two separate ticker rows", () => {
    const { container } = render(<VictoryTicker />);
    const rows = container.querySelectorAll(".overflow-x-hidden.overflow-y-visible");
    expect(rows.length).toBe(2);
  });

  it("applies Memphis category tag styling", () => {
    const { container } = render(<VictoryTicker />);
    const categoryTags = container.querySelectorAll(".border-2.border-black.-rotate-2");
    expect(categoryTags.length).toBeGreaterThan(0);
  });

  it("renders Memphis decorative shapes", () => {
    const { container } = render(<VictoryTicker />);
    const decorativeShapes = container.querySelectorAll(".absolute");
    expect(decorativeShapes.length).toBeGreaterThan(0);
  });

  it("renders with ticker-container class", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section.ticker-container");
    expect(section).toBeInTheDocument();
  });

  it("renders with overflow-hidden on section", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section.overflow-hidden");
    expect(section).toBeInTheDocument();
  });

  it("applies font-display to amount values", () => {
    const { container } = render(<VictoryTicker />);
    const amounts = container.querySelectorAll(".text-3xl.font-display.font-bold");
    expect(amounts.length).toBeGreaterThan(0);
  });

  it("applies font-body to story titles", () => {
    const { container } = render(<VictoryTicker />);
    const titles = container.querySelectorAll(".text-sm.font-body");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("renders cards as links when slug is present", () => {
    const { container } = render(<VictoryTicker />);
    const linkedCards = container.querySelectorAll("a.block");
    expect(linkedCards.length).toBeGreaterThan(0);
  });

  it("applies correct background color to section", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section.bg-\\[\\#FFF9E6\\]");
    expect(section).toBeInTheDocument();
  });
});
