import { render, screen } from "@/lib/test-utils";
import { HowItWorks } from "../HowItWorks";

describe("HowItWorks Component", () => {
  it("renders without errors", () => {
    expect(() => render(<HowItWorks />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<HowItWorks />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Four steps. Simple process.")).toBeInTheDocument();
  });

  it("renders section header divider", () => {
    const { container } = render(<HowItWorks />);
    const divider = container.querySelector(".h-px.w-16.bg-dark-900");
    expect(divider).toBeInTheDocument();
  });

  it("has correct id for anchor linking", () => {
    const { container } = render(<HowItWorks />);
    const section = container.querySelector("#how-it-works");
    expect(section).toBeInTheDocument();
  });

  it("renders all four step cards", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Win with AI")).toBeInTheDocument();
    expect(screen.getByText("Share Your Story")).toBeInTheDocument();
    expect(screen.getByText("We Protect Privacy")).toBeInTheDocument();
    expect(screen.getByText("Inspire Others")).toBeInTheDocument();
  });

  it("renders step numbers", () => {
    render(<HowItWorks />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders step 1 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Use Claude, ChatGPT, Gemini or any AI to solve your problem.")
    ).toBeInTheDocument();
  });

  it("renders step 2 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Submit your win with a link to your AI chat session as proof.")
    ).toBeInTheDocument();
  });

  it("renders step 3 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Our AI automatically redacts sensitive info before publishing.")
    ).toBeInTheDocument();
  });

  it("renders step 4 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Your story helps someone else facing the same challenge win too.")
    ).toBeInTheDocument();
  });

  it("renders step number badges with correct styling", () => {
    const { container } = render(<HowItWorks />);
    const badges = container.querySelectorAll(".w-10.h-10.bg-dark-900.border.border-dark-900");
    expect(badges.length).toBe(4);
  });

  it("has hover effects on step cards", () => {
    const { container } = render(<HowItWorks />);
    const cards = container.querySelectorAll(".hover\\:border-dark-900");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it("applies correct grid layout", () => {
    const { container } = render(<HowItWorks />);
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-7");
    expect(grid).toBeInTheDocument();
  });

  it("renders arrow icons between steps on large screens", () => {
    const { container } = render(<HowItWorks />);
    const arrows = container.querySelectorAll("svg.hidden.lg\\:block");
    // Should be 3 arrows (between 4 steps)
    expect(arrows.length).toBe(3);
  });
});
