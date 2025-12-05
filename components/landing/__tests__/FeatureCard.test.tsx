import { render, screen } from "@testing-library/react";
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
    expect(
      screen.getByText("More than just stories - tools and proof that help you win too")
    ).toBeInTheDocument();
  });

  it("renders Make It Your Own feature", () => {
    render(<Features />);
    expect(screen.getByText("Make It Your Own")).toBeInTheDocument();
    expect(screen.getByText(/Don't just read - adapt/)).toBeInTheDocument();
  });

  it("renders Verified Chat Sessions feature", () => {
    render(<Features />);
    expect(screen.getByText("Verified Chat Sessions")).toBeInTheDocument();
    expect(
      screen.getByText(/Every story includes links to actual AI conversations/)
    ).toBeInTheDocument();
  });

  it("renders Privacy Protected feature", () => {
    render(<Features />);
    expect(screen.getByText("Privacy Protected")).toBeInTheDocument();
    expect(screen.getByText(/Share your story without worry/)).toBeInTheDocument();
  });

  it("renders all three feature cards", () => {
    const { container } = render(<Features />);
    // Look for the card wrapper divs that have border-4 and shadow-memphis-lg classes
    const cards = container.querySelectorAll(".border-4.shadow-memphis-lg");
    expect(cards.length).toBe(3);
  });

  it("renders customize mockup elements", () => {
    render(<Features />);
    expect(screen.getByText("Your company:")).toBeInTheDocument();
    expect(screen.getByText("Hertz, Avis...")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("renders chat mockup elements", () => {
    render(<Features />);
    expect(screen.getByText("What are my legal options?")).toBeInTheDocument();
    expect(screen.getByText("Based on your evidence...")).toBeInTheDocument();
  });

  it("renders privacy mockup elements", () => {
    render(<Features />);
    const redactedElements = screen.getAllByText("REDACTED");
    expect(redactedElements.length).toBe(2);
  });
});
