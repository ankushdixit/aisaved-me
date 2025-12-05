import { render, screen } from "@/lib/test-utils";
import { StoryContent } from "../StoryContent";
import type { StoryContent as StoryContentType } from "@/lib/types/story";

const mockContent: StoryContentType = {
  intro: "This is the introduction to the story. It sets the stage for what's to come.",
  theProblem:
    "The problem was significant. Medical bills were piling up and insurance was denying claims unfairly.",
  theStrategy:
    "I decided to use Claude AI to help me draft appeal letters and understand my policy better.",
  quote: {
    text: "AI gave me the confidence to fight back against the insurance company.",
    attribution: "Sarah Johnson, Story Author",
  },
  theResult: "After following the AI's guidance, my appeal was successful and I saved $15,000.",
  keyTakeaways: [
    "Always read your insurance policy carefully",
    "AI can help you understand complex legal documents",
    "Don't be afraid to appeal unfair decisions",
    "Document everything in your interactions",
  ],
};

const mockContentWithoutQuote: StoryContentType = {
  intro: "This is the introduction.",
  theProblem: "The problem description.",
  theStrategy: "The strategy used.",
  theResult: "The result achieved.",
  keyTakeaways: ["Takeaway 1", "Takeaway 2"],
};

describe("StoryContent Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() => render(<StoryContent content={mockContent} />)).not.toThrow();
  });

  it("displays the intro text", () => {
    render(<StoryContent content={mockContent} />);
    expect(
      screen.getByText(
        "This is the introduction to the story. It sets the stage for what's to come."
      )
    ).toBeInTheDocument();
  });

  it("displays The Problem section heading", () => {
    render(<StoryContent content={mockContent} />);
    expect(screen.getByText("The Problem")).toBeInTheDocument();
  });

  it("displays The Problem content", () => {
    render(<StoryContent content={mockContent} />);
    expect(
      screen.getByText(
        "The problem was significant. Medical bills were piling up and insurance was denying claims unfairly."
      )
    ).toBeInTheDocument();
  });

  it("displays The AI Strategy section heading", () => {
    render(<StoryContent content={mockContent} />);
    expect(screen.getByText("The AI Strategy")).toBeInTheDocument();
  });

  it("displays The Strategy content", () => {
    render(<StoryContent content={mockContent} />);
    expect(
      screen.getByText(
        "I decided to use Claude AI to help me draft appeal letters and understand my policy better."
      )
    ).toBeInTheDocument();
  });

  it("displays The Result section heading", () => {
    render(<StoryContent content={mockContent} />);
    expect(screen.getByText("The Result")).toBeInTheDocument();
  });

  it("displays The Result content", () => {
    render(<StoryContent content={mockContent} />);
    expect(
      screen.getByText(
        "After following the AI's guidance, my appeal was successful and I saved $15,000."
      )
    ).toBeInTheDocument();
  });

  it("displays Key Takeaways section heading", () => {
    render(<StoryContent content={mockContent} />);
    expect(screen.getByText("Key Takeaways")).toBeInTheDocument();
  });

  it("displays all key takeaways", () => {
    render(<StoryContent content={mockContent} />);
    expect(screen.getByText("Always read your insurance policy carefully")).toBeInTheDocument();
    expect(
      screen.getByText("AI can help you understand complex legal documents")
    ).toBeInTheDocument();
    expect(screen.getByText("Don't be afraid to appeal unfair decisions")).toBeInTheDocument();
    expect(screen.getByText("Document everything in your interactions")).toBeInTheDocument();
  });

  it("displays quote when provided", () => {
    render(<StoryContent content={mockContent} />);
    expect(
      screen.getByText(/AI gave me the confidence to fight back against the insurance company./)
    ).toBeInTheDocument();
  });

  it("displays quote attribution", () => {
    render(<StoryContent content={mockContent} />);
    expect(screen.getByText(/Sarah Johnson, Story Author/)).toBeInTheDocument();
  });

  it("does not display quote block when quote is not provided", () => {
    render(<StoryContent content={mockContentWithoutQuote} />);
    expect(screen.queryByText(/AI gave me the confidence/)).not.toBeInTheDocument();
  });

  it("applies Japanese theme styling to quote block", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const quoteBlock = container.querySelector(".bg-\\[\\#f5f2ed\\]");
    expect(quoteBlock).toBeInTheDocument();
    expect(quoteBlock).toHaveClass("border-l-2");
    expect(quoteBlock).toHaveClass("border-[#1a1a1a]");
  });

  it("applies italic styling to quote text", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const quoteText = container.querySelector(".italic");
    expect(quoteText).toBeInTheDocument();
  });

  it("applies Japanese theme styling to key takeaways box", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const takeawaysBox = container.querySelector(".bg-\\[\\#faf8f5\\]");
    expect(takeawaysBox).toBeInTheDocument();
    expect(takeawaysBox).toHaveClass("border-[#d4d0c8]");
  });

  it("renders bullet points with red accent color", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const bullets = container.querySelectorAll(".text-\\[\\#c41e3a\\]");
    expect(bullets.length).toBe(4); // One for each takeaway
  });

  it("has proper spacing between sections", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const headings = container.querySelectorAll("h2");
    headings.forEach((heading) => {
      expect(heading.className).toContain("mt-12");
    });
  });

  it("applies correct text size to intro", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const intro = container.querySelector("p");
    expect(intro?.className).toContain("text-lg");
  });

  it("applies correct text color throughout", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const paragraphs = container.querySelectorAll("p.text-\\[\\#1a1a1a\\]");
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("renders with minimal content", () => {
    const minimalContent: StoryContentType = {
      intro: "Intro",
      theProblem: "Problem",
      theStrategy: "Strategy",
      theResult: "Result",
      keyTakeaways: ["One takeaway"],
    };
    render(<StoryContent content={minimalContent} />);
    expect(screen.getByText("Intro")).toBeInTheDocument();
    expect(screen.getByText("One takeaway")).toBeInTheDocument();
  });

  it("renders quote with quotation marks", () => {
    render(<StoryContent content={mockContent} />);
    const quoteText = screen.getByText(
      /AI gave me the confidence to fight back against the insurance company./
    );
    expect(quoteText.textContent).toContain("\u201c");
    expect(quoteText.textContent).toContain("\u201d");
  });

  it("renders attribution with em dash", () => {
    render(<StoryContent content={mockContent} />);
    const attribution = screen.getByText(/Sarah Johnson, Story Author/);
    expect(attribution.textContent).toContain("\u2014");
  });

  it("applies leading-relaxed to paragraphs", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const paragraphs = container.querySelectorAll("p.leading-relaxed");
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it("renders takeaways as list items", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBe(4);
  });

  it("has proper spacing in takeaways list", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const list = container.querySelector("ul");
    expect(list?.className).toContain("space-y-3");
  });

  it("renders section headings with consistent styling", () => {
    const { container } = render(<StoryContent content={mockContent} />);
    const headings = container.querySelectorAll("h2");
    headings.forEach((heading) => {
      expect(heading.className).toContain("text-xl");
      expect(heading.className).toContain("text-[#1a1a1a]");
    });
  });

  it("renders Key Takeaways heading with consistent styling", () => {
    render(<StoryContent content={mockContent} />);
    const heading = screen.getByText("Key Takeaways");
    expect(heading.className).toContain("text-lg");
    expect(heading.className).toContain("text-[#1a1a1a]");
  });
});
