import { render, screen, act } from "@testing-library/react";
import { Hero, HeroCTA } from "../Hero";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Hero Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without errors", () => {
    expect(() => render(<Hero />)).not.toThrow();
  });

  it("renders the main headline", () => {
    render(<Hero />);
    expect(screen.getByText("Real people")).toBeInTheDocument();
    expect(screen.getByText("winning with AI.")).toBeInTheDocument();
  });

  it("renders the subheadline", () => {
    render(<Hero />);
    expect(screen.getByText("Watch the victories roll in.")).toBeInTheDocument();
  });

  it("renders the counter label", () => {
    render(<Hero />);
    expect(screen.getByText("Total Saved by Our Community")).toBeInTheDocument();
  });

  it("renders the LIVE indicator", () => {
    render(<Hero />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("animates the counter value", () => {
    render(<Hero />);
    // Initially shows $0
    expect(screen.getByText("$0")).toBeInTheDocument();

    // After animation completes
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Should show the final value
    expect(screen.getByText(/\$2,847,392/)).toBeInTheDocument();
  });

  it("shows 'and counting...' text", () => {
    render(<Hero />);
    expect(screen.getByText("and counting...")).toBeInTheDocument();
  });
});

describe("HeroCTA Component", () => {
  it("renders without errors", () => {
    expect(() => render(<HeroCTA />)).not.toThrow();
  });

  it("renders Browse Stories button", () => {
    render(<HeroCTA />);
    expect(screen.getByText("Browse Stories")).toBeInTheDocument();
  });

  it("renders Share a Win button", () => {
    render(<HeroCTA />);
    expect(screen.getByText("Share a Win")).toBeInTheDocument();
  });

  it("has correct link for Browse Stories", () => {
    render(<HeroCTA />);
    const link = screen.getByText("Browse Stories").closest("a");
    expect(link).toHaveAttribute("href", "/stories");
  });

  it("has correct link for Share a Win", () => {
    render(<HeroCTA />);
    const link = screen.getByText("Share a Win").closest("a");
    expect(link).toHaveAttribute("href", "/submit");
  });

  it("renders helper text", () => {
    render(<HeroCTA />);
    expect(screen.getByText("Click any card to read the full story")).toBeInTheDocument();
  });
});
