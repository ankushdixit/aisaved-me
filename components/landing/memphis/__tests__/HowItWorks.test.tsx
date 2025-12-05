import { render, screen } from "@/lib/test-utils";
import { HowItWorks } from "../HowItWorks";

describe("HowItWorks Component (Memphis)", () => {
  it("renders without errors", () => {
    expect(() => render(<HowItWorks />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<HowItWorks />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("From your win to helping others - in four simple steps")
    ).toBeInTheDocument();
  });

  it("renders step 1", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Win with AI")).toBeInTheDocument();
    expect(
      screen.getByText("Use Claude, ChatGPT, Gemini or any AI to solve your problem.")
    ).toBeInTheDocument();
  });

  it("renders step 2", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Share Your Story")).toBeInTheDocument();
    expect(
      screen.getByText("Submit your win with a link to your AI chat session as proof.")
    ).toBeInTheDocument();
  });

  it("renders step 3", () => {
    render(<HowItWorks />);
    expect(screen.getByText("We Protect Privacy")).toBeInTheDocument();
    expect(
      screen.getByText("Our AI automatically redacts sensitive info before publishing.")
    ).toBeInTheDocument();
  });

  it("renders step 4", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Inspire Others")).toBeInTheDocument();
    expect(
      screen.getByText("Your story helps someone else facing the same challenge win too.")
    ).toBeInTheDocument();
  });

  it("renders step number badges", () => {
    render(<HowItWorks />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("applies Memphis-style borders to step cards", () => {
    const { container } = render(<HowItWorks />);
    const cards = container.querySelectorAll(".border-4.border-black");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it("applies Memphis shadow to step cards", () => {
    const { container } = render(<HowItWorks />);
    const cards = container.querySelectorAll(".shadow-memphis-lg");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it("has Memphis rotation on step cards", () => {
    const { container } = render(<HowItWorks />);
    const cards = container.querySelectorAll(".-rotate-1, .rotate-1, .-rotate-2, .rotate-2");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it("has hover effects on step cards", () => {
    const { container } = render(<HowItWorks />);
    const cards = container.querySelectorAll(".hover\\:rotate-0");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it("renders arrow icons between steps", () => {
    const { container } = render(<HowItWorks />);
    const arrows = container.querySelectorAll("svg");
    // Should have 3 arrows (between 4 steps)
    expect(arrows.length).toBeGreaterThanOrEqual(3);
  });

  it("applies Memphis shadow to section title", () => {
    const { container } = render(<HowItWorks />);
    const title = container.querySelector(".text-memphis-shadow");
    expect(title).toBeInTheDocument();
  });

  it("renders Memphis decorative shapes", () => {
    const { container } = render(<HowItWorks />);
    const decorativeShapes = container.querySelectorAll(".absolute");
    expect(decorativeShapes.length).toBeGreaterThan(0);
  });

  it("has border styling on section", () => {
    const { container } = render(<HowItWorks />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("has correct grid layout", () => {
    const { container } = render(<HowItWorks />);
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-7");
    expect(grid).toBeInTheDocument();
  });

  it("applies white background to section", () => {
    const { container } = render(<HowItWorks />);
    const section = container.querySelector("section.bg-white");
    expect(section).toBeInTheDocument();
  });

  it("renders with overflow-hidden for decorations", () => {
    const { container } = render(<HowItWorks />);
    const section = container.querySelector("section.overflow-hidden");
    expect(section).toBeInTheDocument();
  });

  it("renders step number badges with Memphis border", () => {
    const { container } = render(<HowItWorks />);
    const badges = container.querySelectorAll(".w-12.h-12.border-3.border-black");
    expect(badges.length).toBe(4);
  });

  it("positions step number badges absolutely", () => {
    const { container } = render(<HowItWorks />);
    const badges = container.querySelectorAll(".absolute.-top-5");
    expect(badges.length).toBe(4);
  });

  it("has section id for anchor linking", () => {
    const { container } = render(<HowItWorks />);
    const section = container.querySelector("#how-it-works");
    expect(section).toBeInTheDocument();
  });
});
