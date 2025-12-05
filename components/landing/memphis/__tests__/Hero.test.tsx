import { render, screen, act } from "@/lib/test-utils";
import { Hero, HeroCTA } from "../Hero";

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

describe("Hero Component (Memphis)", () => {
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
    expect(screen.getByText(/Real people/)).toBeInTheDocument();
    expect(screen.getByText(/winning with AI./)).toBeInTheDocument();
  });

  it("renders the subheadline", () => {
    render(<Hero />);
    expect(screen.getByText("Watch the victories roll in.")).toBeInTheDocument();
  });

  it("renders the counter label", () => {
    render(<Hero />);
    expect(screen.getByText("Total Saved by Our Community")).toBeInTheDocument();
  });

  it("initially displays $0 before animation", () => {
    render(<Hero />);
    expect(screen.getByText("$0")).toBeInTheDocument();
  });

  it("animates the counter value", () => {
    render(<Hero />);

    // After animation completes (2 seconds)
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Should show the final value
    expect(screen.getByText(/\$2,847,392/)).toBeInTheDocument();
  });

  it("displays formatted number with commas", () => {
    render(<Hero />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const counterValue = screen.getByText(/\$2,847,392/);
    expect(counterValue).toBeInTheDocument();
  });

  it("renders 'and counting...' text", () => {
    render(<Hero />);
    expect(screen.getByText("and counting...")).toBeInTheDocument();
  });

  it("renders Live indicator", () => {
    render(<Hero />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("applies Memphis decorative shapes", () => {
    const { container } = render(<Hero />);
    const decorativeShapes = container.querySelectorAll(".absolute");
    expect(decorativeShapes.length).toBeGreaterThan(0);
  });

  it("renders SVG squiggle decorations", () => {
    const { container } = render(<Hero />);
    const svgElements = container.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThanOrEqual(2);
  });

  it("applies pattern-dots background", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("section.bg-pattern-dots");
    expect(section).toBeInTheDocument();
  });

  it("applies Memphis shadow to heading", () => {
    const { container } = render(<Hero />);
    const heading = container.querySelector(".text-memphis-shadow");
    expect(heading).toBeInTheDocument();
  });

  it("applies Memphis gradient to 'winning with AI' text", () => {
    const { container } = render(<Hero />);
    const gradient = container.querySelector(".text-memphis-gradient");
    expect(gradient).toBeInTheDocument();
  });

  it("renders counter with Memphis border styling", () => {
    const { container } = render(<Hero />);
    const counter = container.querySelector(".border-4.border-black.rounded-2xl");
    expect(counter).toBeInTheDocument();
  });

  it("renders counter with shadow layer", () => {
    const { container } = render(<Hero />);
    const shadowLayer = container.querySelector(".absolute.inset-0.bg-\\[\\#0066FF\\]");
    expect(shadowLayer).toBeInTheDocument();
  });

  it("applies rotation transform to counter", () => {
    const { container } = render(<Hero />);
    const counter = container.querySelector(".-rotate-1");
    expect(counter).toBeInTheDocument();
  });

  it("renders Live indicator with Memphis styling", () => {
    const { container } = render(<Hero />);
    const liveIndicator = container.querySelector(".border-3.border-black.rounded-full");
    expect(liveIndicator).toBeInTheDocument();
  });

  it("has animate-ping effect on Live indicator", () => {
    const { container } = render(<Hero />);
    const pingElement = container.querySelector(".animate-ping");
    expect(pingElement).toBeInTheDocument();
  });

  it("has animate-count class on counter", () => {
    const { container } = render(<Hero />);
    const counter = container.querySelector(".animate-count");
    expect(counter).toBeInTheDocument();
  });

  it("renders with overflow-hidden for decorations", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("section.overflow-hidden");
    expect(section).toBeInTheDocument();
  });
});

describe("HeroCTA Component (Memphis)", () => {
  it("renders without errors", () => {
    expect(() => render(<HeroCTA />)).not.toThrow();
  });

  it("renders helper text", () => {
    render(<HeroCTA />);
    expect(screen.getByText("Click any card to read the full story")).toBeInTheDocument();
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

  it("applies btn-memphis class to buttons", () => {
    const { container } = render(<HeroCTA />);
    const buttons = container.querySelectorAll(".btn-memphis");
    expect(buttons.length).toBe(2);
  });

  it("has border styling on section", () => {
    const { container } = render(<HeroCTA />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("applies white background to section", () => {
    const { container } = render(<HeroCTA />);
    const section = container.querySelector("section.bg-white");
    expect(section).toBeInTheDocument();
  });

  it("renders buttons with correct color backgrounds", () => {
    render(<HeroCTA />);
    const browseButton = screen.getByText("Browse Stories").closest("a");
    const shareButton = screen.getByText("Share a Win").closest("a");

    expect(browseButton?.className).toContain("bg-[#0066FF]");
    expect(browseButton?.className).toContain("text-white");
    expect(shareButton?.className).toContain("bg-[#00FF7F]");
    expect(shareButton?.className).toContain("text-black");
  });

  it("applies correct text styling to helper text", () => {
    render(<HeroCTA />);
    const helperText = screen.getByText("Click any card to read the full story");
    expect(helperText.className).toContain("font-bold");
    expect(helperText.className).toContain("uppercase");
    expect(helperText.className).toContain("tracking-wider");
  });
});
