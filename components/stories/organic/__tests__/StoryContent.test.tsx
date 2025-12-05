import { render, screen } from "@/lib/test-utils";
import { StoryContent } from "../StoryContent";
import type { StoryContent as StoryContentType } from "@/lib/types/story";

const mockContentWithQuote: StoryContentType = {
  intro: "This is the introduction paragraph that sets up the story context.",
  theProblem: "The customer faced significant challenges with manual processing.",
  theStrategy: "They implemented an AI-powered solution using Claude to automate workflows.",
  quote: {
    text: "This AI solution transformed how we work and saved us countless hours.",
    attribution: "Jane Smith, Operations Manager",
  },
  theResult:
    "The implementation resulted in 80% reduction in processing time and significant cost savings.",
  keyTakeaways: [
    "AI automation can dramatically reduce manual processing time",
    "Proper implementation planning is crucial for success",
    "Employee training ensures maximum adoption and benefits",
  ],
};

const mockContentWithoutQuote: StoryContentType = {
  intro: "Introduction text for story without a quote.",
  theProblem: "Description of the problem faced.",
  theStrategy: "Description of the AI strategy implemented.",
  theResult: "Description of the results achieved.",
  keyTakeaways: ["First key takeaway from the story", "Second key takeaway from the story"],
};

describe("StoryContent Component", () => {
  it("renders without errors", () => {
    expect(() => render(<StoryContent content={mockContentWithQuote} />)).not.toThrow();
  });

  it("displays the intro paragraph", () => {
    render(<StoryContent content={mockContentWithQuote} />);
    expect(
      screen.getByText("This is the introduction paragraph that sets up the story context.")
    ).toBeInTheDocument();
  });

  it('displays "The Problem" section heading and content', () => {
    render(<StoryContent content={mockContentWithQuote} />);
    expect(screen.getByText("The Problem")).toBeInTheDocument();
    expect(
      screen.getByText("The customer faced significant challenges with manual processing.")
    ).toBeInTheDocument();
  });

  it('displays "The AI Strategy" section heading and content', () => {
    render(<StoryContent content={mockContentWithQuote} />);
    expect(screen.getByText("The AI Strategy")).toBeInTheDocument();
    expect(
      screen.getByText(
        "They implemented an AI-powered solution using Claude to automate workflows."
      )
    ).toBeInTheDocument();
  });

  it('displays "The Result" section heading and content', () => {
    render(<StoryContent content={mockContentWithQuote} />);
    expect(screen.getByText("The Result")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The implementation resulted in 80% reduction in processing time and significant cost savings."
      )
    ).toBeInTheDocument();
  });

  it("displays quote text and attribution when quote is provided", () => {
    render(<StoryContent content={mockContentWithQuote} />);
    expect(
      screen.getByText(/This AI solution transformed how we work and saved us countless hours\./)
    ).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith, Operations Manager/)).toBeInTheDocument();
  });

  it("does not render quote block when quote is not provided", () => {
    render(<StoryContent content={mockContentWithoutQuote} />);
    // Quote text should not be in the document
    const quoteText = screen.queryByText(
      /This AI solution transformed how we work and saved us countless hours\./
    );
    expect(quoteText).not.toBeInTheDocument();
  });

  it("displays all key takeaways", () => {
    render(<StoryContent content={mockContentWithQuote} />);
    expect(
      screen.getByText("AI automation can dramatically reduce manual processing time")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Proper implementation planning is crucial for success")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Employee training ensures maximum adoption and benefits")
    ).toBeInTheDocument();
  });

  it('displays "Key Takeaways" heading', () => {
    render(<StoryContent content={mockContentWithQuote} />);
    expect(screen.getByText("Key Takeaways")).toBeInTheDocument();
  });

  it("renders correct number of key takeaways", () => {
    render(<StoryContent content={mockContentWithoutQuote} />);
    expect(screen.getByText("First key takeaway from the story")).toBeInTheDocument();
    expect(screen.getByText("Second key takeaway from the story")).toBeInTheDocument();
  });

  it("renders all sections in correct order", () => {
    const { container } = render(<StoryContent content={mockContentWithQuote} />);
    const headings = container.querySelectorAll("h2, h3");
    const headingTexts = Array.from(headings).map((h) => h.textContent);

    expect(headingTexts).toEqual(["The Problem", "The AI Strategy", "The Result", "Key Takeaways"]);
  });
});
