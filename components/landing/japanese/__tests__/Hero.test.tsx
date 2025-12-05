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
    expect(screen.getByText(/Real people/)).toBeInTheDocument();
    expect(screen.getByText(/winning with AI/)).toBeInTheDocument();
  });

  it("renders the subheadline", () => {
    render(<Hero />);
    expect(screen.getByText("Stories of victory. Quiet transformations.")).toBeInTheDocument();
  });

  it("renders the counter label", () => {
    render(<Hero />);
    expect(screen.getByText("Total saved")).toBeInTheDocument();
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

  it("has delicate horizontal line divider", () => {
    const { container } = render(<Hero />);
    const divider = container.querySelector(".h-px.w-24.bg-dark-900");
    expect(divider).toBeInTheDocument();
  });
});

describe("HeroCTA Component", () => {
  it("renders without errors", () => {
    expect(() => render(<HeroCTA />)).not.toThrow();
  });

  it("renders helper text", () => {
    render(<HeroCTA />);
    expect(screen.getByText("Explore the stories")).toBeInTheDocument();
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

  it("applies correct button styling classes", () => {
    render(<HeroCTA />);
    const browseButton = screen.getByText("Browse Stories").closest("a");
    const shareButton = screen.getByText("Share a Win").closest("a");

    expect(browseButton?.className).toContain("bg-dark-900");
    expect(browseButton?.className).toContain("text-light-50");
    expect(shareButton?.className).toContain("text-dark-900");
    expect(shareButton?.className).toContain("border-dark-900");
  });
});
