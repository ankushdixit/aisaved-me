import { render, screen } from "@/lib/test-utils";
import { VictoryTicker } from "../VictoryTicker";

// Mock the ticker stories data
jest.mock("@/lib/mock-data/stories", () => ({
  tickerStoriesRow1: [
    {
      id: "ticker-1",
      category: "legal" as const,
      title: "Enterprise damage claim defeated",
      amount: 3200,
      amountLabel: "saved",
      author: "Ankush D.",
      timeAgo: "2 hours ago",
    },
    {
      id: "ticker-2",
      category: "medical" as const,
      title: "AI identified kidney stones, doctor agreed",
      outcome: "Diagnosis confirmed",
      author: "Raj P.",
      timeAgo: "5 hours ago",
    },
  ],
  tickerStoriesRow2: [
    {
      id: "ticker-5",
      category: "legal" as const,
      title: "Contractor paid after small claims prep",
      amount: 5500,
      amountLabel: "won",
      author: "Mike R.",
      timeAgo: "1 day ago",
    },
    {
      id: "ticker-6",
      category: "medical" as const,
      title: "AI symptom check saved unnecessary trip",
      outcome: "ER visit avoided",
      author: "James T.",
      timeAgo: "2 days ago",
    },
  ],
  formatCurrency: jest.fn((amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  ),
}));

describe("VictoryTicker Component", () => {
  it("renders without errors", () => {
    expect(() => render(<VictoryTicker />)).not.toThrow();
  });

  it("renders row 1 story title", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Enterprise damage claim defeated")[0]).toBeInTheDocument();
  });

  it("renders row 1 medical story title", () => {
    render(<VictoryTicker />);
    expect(
      screen.getAllByText("AI identified kidney stones, doctor agreed")[0]
    ).toBeInTheDocument();
  });

  it("renders row 2 story title", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Contractor paid after small claims prep")[0]).toBeInTheDocument();
  });

  it("renders row 2 medical story title", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("AI symptom check saved unnecessary trip")[0]).toBeInTheDocument();
  });

  it("renders amount for stories with amount", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("$3,200")[0]).toBeInTheDocument();
  });

  it("renders amount label for stories with amount", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("saved")[0]).toBeInTheDocument();
  });

  it("renders outcome for stories without amount", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Diagnosis confirmed")[0]).toBeInTheDocument();
  });

  it("renders author names", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText(/Ankush D./)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Raj P./)[0]).toBeInTheDocument();
  });

  it("renders time ago information", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText(/2 hours ago/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/5 hours ago/)[0]).toBeInTheDocument();
  });

  it("renders Legal category tags", () => {
    render(<VictoryTicker />);
    const legalTags = screen.getAllByText("Legal");
    expect(legalTags.length).toBeGreaterThanOrEqual(2);
  });

  it("renders Medical category tags", () => {
    render(<VictoryTicker />);
    const medicalTags = screen.getAllByText("Medical");
    expect(medicalTags.length).toBeGreaterThanOrEqual(2);
  });

  it("has proper section styling with gradient", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-br");
  });

  it("has ticker-container class", () => {
    const { container } = render(<VictoryTicker />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("ticker-container");
  });

  it("has fade edges", () => {
    const { container } = render(<VictoryTicker />);
    const fadeLeft = container.querySelector(".ticker-fade-left");
    const fadeRight = container.querySelector(".ticker-fade-right");
    expect(fadeLeft).toBeInTheDocument();
    expect(fadeRight).toBeInTheDocument();
  });

  it("has animation classes on ticker rows", () => {
    const { container } = render(<VictoryTicker />);
    const animateTicker = container.querySelector(".animate-ticker");
    const animateTickerReverse = container.querySelector(".animate-ticker-reverse");
    expect(animateTicker).toBeInTheDocument();
    expect(animateTickerReverse).toBeInTheDocument();
  });

  it("renders ticker cards with proper styling", () => {
    const { container } = render(<VictoryTicker />);
    const cards = container.querySelectorAll(".bg-white\\/90");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });
});
