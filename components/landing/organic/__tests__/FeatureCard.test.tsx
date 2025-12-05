import { render, screen } from "@/lib/test-utils";
import { Features } from "../FeatureCard";

// Mock the features data
jest.mock("@/lib/mock-data/testimonials", () => ({
  features: [
    {
      id: "feature-1",
      icon: "sparkles",
      title: "Make It Your Own",
      description:
        "Don't just read - adapt. Our interactive tool lets you customize any story's prompts for your specific situation.",
      mockupType: "customize",
    },
    {
      id: "feature-2",
      icon: "check-verified",
      title: "Verified Chat Sessions",
      description:
        "Every story includes links to actual AI conversations. See the exact prompts and responses that led to each win.",
      mockupType: "chat",
    },
    {
      id: "feature-3",
      icon: "shield",
      title: "Privacy Protected",
      description:
        "Share your story without worry. Our AI automatically redacts names, addresses, and sensitive information before publishing.",
      mockupType: "privacy",
    },
  ],
}));

describe("Features Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Features />)).not.toThrow();
  });

  it("renders section header", () => {
    render(<Features />);
    expect(screen.getByText("What Makes Us Different")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<Features />);
    expect(
      screen.getByText("More than just stories - tools and proof that help you win too")
    ).toBeInTheDocument();
  });

  it("renders 'Make It Your Own' feature", () => {
    render(<Features />);
    expect(screen.getByText("Make It Your Own")).toBeInTheDocument();
  });

  it("renders 'Verified Chat Sessions' feature", () => {
    render(<Features />);
    expect(screen.getByText("Verified Chat Sessions")).toBeInTheDocument();
  });

  it("renders 'Privacy Protected' feature", () => {
    render(<Features />);
    expect(screen.getByText("Privacy Protected")).toBeInTheDocument();
  });

  it("renders Make It Your Own description", () => {
    render(<Features />);
    expect(
      screen.getByText(/Don't just read - adapt. Our interactive tool lets you customize/)
    ).toBeInTheDocument();
  });

  it("renders Verified Chat Sessions description", () => {
    render(<Features />);
    expect(
      screen.getByText(/Every story includes links to actual AI conversations/)
    ).toBeInTheDocument();
  });

  it("renders Privacy Protected description", () => {
    render(<Features />);
    expect(
      screen.getByText(/Share your story without worry. Our AI automatically redacts/)
    ).toBeInTheDocument();
  });

  it("renders Generate button in customize mockup", () => {
    render(<Features />);
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("renders REDACTED text in privacy mockup", () => {
    render(<Features />);
    const redactedElements = screen.getAllByText("REDACTED");
    expect(redactedElements.length).toBeGreaterThanOrEqual(2);
  });

  it("has proper grid layout for features", () => {
    const { container } = render(<Features />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("md:grid-cols-3");
  });

  it("renders all feature icons", () => {
    const { container } = render(<Features />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });

  it("feature cards have proper styling", () => {
    const { container } = render(<Features />);
    const cards = container.querySelectorAll(".bg-white.rounded-\\[32px\\]");
    expect(cards.length).toBe(3);
  });
});
