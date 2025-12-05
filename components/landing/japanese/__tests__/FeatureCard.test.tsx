import { render, screen } from "@/lib/test-utils";
import { Features } from "../FeatureCard";

describe("Features Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Features />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<Features />);
    expect(screen.getByText("What Makes Us Different")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<Features />);
    expect(screen.getByText("More than stories. Tools and proof.")).toBeInTheDocument();
  });

  it("renders section header divider", () => {
    const { container } = render(<Features />);
    const divider = container.querySelector(".h-px.w-16.bg-dark-900");
    expect(divider).toBeInTheDocument();
  });

  it("renders all three feature cards", () => {
    render(<Features />);
    expect(screen.getByText("Make It Your Own")).toBeInTheDocument();
    expect(screen.getByText("Verified Chat Sessions")).toBeInTheDocument();
    expect(screen.getByText("Privacy Protected")).toBeInTheDocument();
  });

  it("renders Make It Your Own feature description", () => {
    render(<Features />);
    expect(
      screen.getByText(
        "Don't just read - adapt. Our interactive tool lets you customize any story's prompts for your specific situation."
      )
    ).toBeInTheDocument();
  });

  it("renders Verified Chat Sessions feature description", () => {
    render(<Features />);
    expect(
      screen.getByText(
        "Every story includes links to actual AI conversations. See the exact prompts and responses that led to each win."
      )
    ).toBeInTheDocument();
  });

  it("renders Privacy Protected feature description", () => {
    render(<Features />);
    expect(
      screen.getByText(
        "Share your story without worry. Our AI automatically redacts names, addresses, and sensitive information before publishing."
      )
    ).toBeInTheDocument();
  });

  it("renders customization mockup", () => {
    render(<Features />);
    expect(screen.getByText("Your company:")).toBeInTheDocument();
    expect(screen.getByText("Hertz, Avis...")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("renders chat mockup", () => {
    render(<Features />);
    expect(screen.getByText("What are my legal options?")).toBeInTheDocument();
    expect(screen.getByText("Based on your evidence...")).toBeInTheDocument();
  });

  it("renders privacy mockup with REDACTED placeholders", () => {
    render(<Features />);
    const redactedElements = screen.getAllByText("REDACTED");
    expect(redactedElements.length).toBe(2);
  });

  it("renders icon containers for each feature", () => {
    const { container } = render(<Features />);
    const iconContainers = container.querySelectorAll(".w-12.h-12.border.border-dark-900");
    expect(iconContainers.length).toBe(3);
  });

  it("applies correct grid layout for feature cards", () => {
    const { container } = render(<Features />);
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("has hover effects on feature cards", () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll(".hover\\:border-dark-900");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });
});
