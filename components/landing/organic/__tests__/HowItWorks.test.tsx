import { render, screen } from "@/lib/test-utils";
import { HowItWorks } from "../HowItWorks";

// Mock the how it works steps data
jest.mock("@/lib/mock-data/testimonials", () => ({
  howItWorksSteps: [
    {
      id: "step-1",
      number: 1,
      title: "Win with AI",
      description: "Use Claude, ChatGPT, Gemini or any AI to solve your problem.",
    },
    {
      id: "step-2",
      number: 2,
      title: "Share Your Story",
      description: "Submit your win with a link to your AI chat session as proof.",
    },
    {
      id: "step-3",
      number: 3,
      title: "We Protect Privacy",
      description: "Our AI automatically redacts sensitive info before publishing.",
    },
    {
      id: "step-4",
      number: 4,
      title: "Inspire Others",
      description: "Your story helps someone else facing the same challenge win too.",
    },
  ],
}));

describe("HowItWorks Component", () => {
  it("renders without errors", () => {
    expect(() => render(<HowItWorks />)).not.toThrow();
  });

  it("renders section header", () => {
    render(<HowItWorks />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("renders section subtitle", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("From your win to helping others - in four simple steps")
    ).toBeInTheDocument();
  });

  it("renders step 1 title", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Win with AI")).toBeInTheDocument();
  });

  it("renders step 1 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Use Claude, ChatGPT, Gemini or any AI to solve your problem.")
    ).toBeInTheDocument();
  });

  it("renders step 2 title", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Share Your Story")).toBeInTheDocument();
  });

  it("renders step 2 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Submit your win with a link to your AI chat session as proof.")
    ).toBeInTheDocument();
  });

  it("renders step 3 title", () => {
    render(<HowItWorks />);
    expect(screen.getByText("We Protect Privacy")).toBeInTheDocument();
  });

  it("renders step 3 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Our AI automatically redacts sensitive info before publishing.")
    ).toBeInTheDocument();
  });

  it("renders step 4 title", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Inspire Others")).toBeInTheDocument();
  });

  it("renders step 4 description", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Your story helps someone else facing the same challenge win too.")
    ).toBeInTheDocument();
  });

  it("renders all step number badges", () => {
    render(<HowItWorks />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("has section id for anchor navigation", () => {
    const { container } = render(<HowItWorks />);
    const section = container.querySelector("#how-it-works");
    expect(section).toBeInTheDocument();
  });

  it("has proper grid layout", () => {
    const { container } = render(<HowItWorks />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("lg:grid-cols-7");
  });

  it("renders arrow icons between steps", () => {
    const { container } = render(<HowItWorks />);
    const arrows = container.querySelectorAll("svg");
    // Should have at least 3 arrows (between 4 steps)
    expect(arrows.length).toBeGreaterThanOrEqual(3);
  });
});
