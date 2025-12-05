import { render, screen } from "@/lib/test-utils";
import { VictoryTicker } from "../VictoryTicker";

describe("VictoryTicker Component", () => {
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

  it("has fade effect containers on edges", () => {
    const { container } = render(<VictoryTicker />);
    const fadeLeft = container.querySelector(".ticker-fade-left");
    const fadeRight = container.querySelector(".ticker-fade-right");
    expect(fadeLeft).toBeInTheDocument();
    expect(fadeRight).toBeInTheDocument();
  });

  it("applies ticker animation classes", () => {
    const { container } = render(<VictoryTicker />);
    const tickerForward = container.querySelector(".animate-ticker");
    const tickerReverse = container.querySelector(".animate-ticker-reverse");
    expect(tickerForward).toBeInTheDocument();
    expect(tickerReverse).toBeInTheDocument();
  });

  it("has overflow-hidden on ticker container", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section.overflow-hidden.ticker-container");
    expect(section).toBeInTheDocument();
  });

  it("has border styling on section", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section.border-y.border-light-300");
    expect(section).toBeInTheDocument();
  });

  it("has hover effects on ticker cards", () => {
    const { container } = render(<VictoryTicker />);
    const cards = container.querySelectorAll(".hover\\:border-dark-900");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders two separate ticker rows", () => {
    const { container } = render(<VictoryTicker />);
    const rows = container.querySelectorAll(".overflow-hidden > .flex.gap-5");
    expect(rows.length).toBe(2);
  });
});
