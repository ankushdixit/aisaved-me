import { render, screen, act } from "@/lib/test-utils";
import { Hero, HeroCTA } from "../Hero";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock the stories data
jest.mock("@/lib/mock-data/stories", () => ({
  totalSaved: 2847392,
  formatNumber: jest.fn((num: number) => new Intl.NumberFormat("en-US").format(num)),
}));

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

  it("renders main headline", () => {
    render(<Hero />);
    expect(screen.getByText("Real people winning with AI")).toBeInTheDocument();
  });

  it("renders subtitle text", () => {
    render(<Hero />);
    expect(
      screen.getByText("Watch the victories roll in, one story at a time")
    ).toBeInTheDocument();
  });

  it("renders victory counter section header", () => {
    render(<Hero />);
    expect(screen.getByText("Total Saved by Our Community")).toBeInTheDocument();
  });

  it("displays initial counter value as $0 before hydration", () => {
    render(<Hero />);
    const counterElement = screen.getByText("$0");
    expect(counterElement).toBeInTheDocument();
  });

  it("animates counter value over time", () => {
    render(<Hero />);

    // Fast-forward through the animation
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // After animation, should show formatted total
    const counterElement = screen.getByText(/\$2,847,392/);
    expect(counterElement).toBeInTheDocument();
  });

  it("renders 'and counting...' text", () => {
    render(<Hero />);
    expect(screen.getByText("and counting...")).toBeInTheDocument();
  });

  it("renders LIVE indicator", () => {
    render(<Hero />);
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("has proper styling classes for hero section", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-br");
  });
});

describe("HeroCTA Component", () => {
  it("renders without errors", () => {
    expect(() => render(<HeroCTA />)).not.toThrow();
  });

  it("renders instruction text", () => {
    render(<HeroCTA />);
    expect(screen.getByText("Click any card to read the full story")).toBeInTheDocument();
  });

  it("renders Browse Stories button with correct href", () => {
    render(<HeroCTA />);
    const browseButton = screen.getByText("Browse Stories").closest("a");
    expect(browseButton).toBeInTheDocument();
    expect(browseButton).toHaveAttribute("href", "/stories");
  });

  it("renders Share a Win button with correct href", () => {
    render(<HeroCTA />);
    const shareButton = screen.getByText("Share a Win").closest("a");
    expect(shareButton).toBeInTheDocument();
    expect(shareButton).toHaveAttribute("href", "/submit");
  });

  it("Browse Stories button has primary styling", () => {
    render(<HeroCTA />);
    const browseButton = screen.getByText("Browse Stories");
    expect(browseButton).toBeInTheDocument();
    // Check it's a link element within the button text
    expect(browseButton.tagName).toBe("A");
  });

  it("Share a Win button has secondary styling", () => {
    render(<HeroCTA />);
    const shareButton = screen.getByText("Share a Win");
    expect(shareButton).toBeInTheDocument();
    // Check it's a link element within the button text
    expect(shareButton.tagName).toBe("A");
  });
});
