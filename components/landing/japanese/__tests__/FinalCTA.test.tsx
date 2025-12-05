import { render, screen } from "@/lib/test-utils";
import { FinalCTA } from "../FinalCTA";

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

describe("FinalCTA Component", () => {
  it("renders without errors", () => {
    expect(() => render(<FinalCTA />)).not.toThrow();
  });

  it("renders the main heading", () => {
    render(<FinalCTA />);
    expect(screen.getByText(/Have an AI win\?/)).toBeInTheDocument();
    expect(screen.getByText(/Share it\./)).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<FinalCTA />);
    expect(
      screen.getByText("Your story could help someone facing the same challenge.")
    ).toBeInTheDocument();
  });

  it("renders the decorative divider", () => {
    const { container } = render(<FinalCTA />);
    const divider = container.querySelector(".h-px.w-24.bg-dark-900");
    expect(divider).toBeInTheDocument();
  });

  it("renders Share Your Story button", () => {
    render(<FinalCTA />);
    expect(screen.getByText("Share Your Story")).toBeInTheDocument();
  });

  it("has correct link for Share Your Story button", () => {
    render(<FinalCTA />);
    const link = screen.getByText("Share Your Story").closest("a");
    expect(link).toHaveAttribute("href", "/submit");
  });

  it("applies correct button styling", () => {
    render(<FinalCTA />);
    const button = screen.getByText("Share Your Story").closest("a");
    expect(button?.className).toContain("bg-dark-900");
    expect(button?.className).toContain("text-light-50");
  });

  it("has hover effect on button", () => {
    render(<FinalCTA />);
    const button = screen.getByText("Share Your Story").closest("a");
    expect(button?.className).toContain("hover:bg-dark-800");
  });

  it("uses asymmetric layout with max-width constraint", () => {
    const { container } = render(<FinalCTA />);
    const contentContainer = container.querySelector(".max-w-2xl");
    expect(contentContainer).toBeInTheDocument();
  });

  it("has border-top styling on section", () => {
    const { container } = render(<FinalCTA />);
    const section = container.querySelector("section.border-t.border-light-300");
    expect(section).toBeInTheDocument();
  });
});
