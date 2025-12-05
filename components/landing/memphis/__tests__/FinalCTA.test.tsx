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

describe("FinalCTA Component (Memphis)", () => {
  it("renders without errors", () => {
    expect(() => render(<FinalCTA />)).not.toThrow();
  });

  it("renders main heading", () => {
    render(<FinalCTA />);
    expect(screen.getByText("Have an AI win? Share it.")).toBeInTheDocument();
  });

  it("renders subheading", () => {
    render(<FinalCTA />);
    expect(
      screen.getByText("Your story could help someone facing the same challenge.")
    ).toBeInTheDocument();
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

  it("applies black background to section", () => {
    const { container } = render(<FinalCTA />);
    const section = container.querySelector("section.bg-black");
    expect(section).toBeInTheDocument();
  });

  it("has border styling on section", () => {
    const { container } = render(<FinalCTA />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("applies Memphis shadow to heading", () => {
    const { container } = render(<FinalCTA />);
    const heading = container.querySelector(".text-memphis-shadow");
    expect(heading).toBeInTheDocument();
  });

  it("renders Memphis decorative shapes", () => {
    const { container } = render(<FinalCTA />);
    const decorativeShapes = container.querySelectorAll(".absolute");
    expect(decorativeShapes.length).toBeGreaterThan(0);
  });

  it("renders SVG squiggle decorations", () => {
    const { container } = render(<FinalCTA />);
    const svgElements = container.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThanOrEqual(2);
  });

  it("applies Memphis border to CTA button", () => {
    render(<FinalCTA />);
    const button = screen.getByText("Share Your Story").closest("a");
    expect(button?.className).toContain("border-4");
    expect(button?.className).toContain("border-white");
  });

  it("applies Memphis shadow to CTA button", () => {
    render(<FinalCTA />);
    const button = screen.getByText("Share Your Story").closest("a");
    expect(button?.className).toContain("shadow-memphis-lg");
  });

  it("has rotation transform on CTA button", () => {
    render(<FinalCTA />);
    const button = screen.getByText("Share Your Story").closest("a");
    expect(button?.className).toContain("-rotate-2");
  });

  it("has hover effects on CTA button", () => {
    render(<FinalCTA />);
    const button = screen.getByText("Share Your Story").closest("a");
    expect(button?.className).toContain("hover:rotate-0");
    expect(button?.className).toContain("hover:shadow-memphis-xl");
  });

  it("displays text in white color", () => {
    render(<FinalCTA />);
    const heading = screen.getByText("Have an AI win? Share it.");
    const subheading = screen.getByText("Your story could help someone facing the same challenge.");
    expect(heading.className).toContain("text-white");
    expect(subheading.className).toContain("text-white");
  });

  it("applies font-display to heading", () => {
    render(<FinalCTA />);
    const heading = screen.getByText("Have an AI win? Share it.");
    expect(heading.className).toContain("font-display");
  });

  it("applies font-body to subheading", () => {
    render(<FinalCTA />);
    const subheading = screen.getByText("Your story could help someone facing the same challenge.");
    expect(subheading.className).toContain("font-body");
  });

  it("renders with overflow-hidden for decorations", () => {
    const { container } = render(<FinalCTA />);
    const section = container.querySelector("section.overflow-hidden");
    expect(section).toBeInTheDocument();
  });
});
