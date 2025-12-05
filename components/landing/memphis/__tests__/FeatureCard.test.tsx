import { render, screen } from "@/lib/test-utils";
import { Features } from "../FeatureCard";

describe("Features Component (Memphis)", () => {
  it("renders without errors", () => {
    expect(() => render(<Features />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<Features />);
    expect(screen.getByText("What Makes Us Different")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<Features />);
    expect(
      screen.getByText("More than just stories - tools and proof that help you win too")
    ).toBeInTheDocument();
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

  it("renders feature icons", () => {
    const { container } = render(<Features />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });

  it("applies Memphis-style borders to feature cards", () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll(".border-4.border-black");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("applies Memphis shadow to feature cards", () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll(".shadow-memphis-lg");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("has Memphis rotation on feature cards", () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll(".card-tilted-left, .card-tilted-right");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("has hover effects on feature cards", () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll(".hover\\:shadow-memphis-xl");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("applies correct grid layout for feature cards", () => {
    const { container } = render(<Features />);
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("renders Memphis decorative shapes", () => {
    const { container } = render(<Features />);
    const decorativeShapes = container.querySelectorAll(".absolute");
    expect(decorativeShapes.length).toBeGreaterThan(0);
  });

  it("has border styling on section", () => {
    const { container } = render(<Features />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("applies Memphis shadow to section title", () => {
    const { container } = render(<Features />);
    const title = container.querySelector(".text-memphis-shadow");
    expect(title).toBeInTheDocument();
  });

  it("renders icon containers with Memphis styling", () => {
    const { container } = render(<Features />);
    const iconContainers = container.querySelectorAll(".w-16.h-16.border-3.border-black");
    expect(iconContainers.length).toBe(3);
  });
});
