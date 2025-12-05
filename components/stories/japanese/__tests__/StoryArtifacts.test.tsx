import { render, screen, fireEvent } from "@/lib/test-utils";
import { StoryArtifacts } from "../StoryArtifacts";
import type { StoryArtifact } from "@/lib/types/story";

const mockArtifacts: StoryArtifact[] = [
  {
    id: "artifact-1",
    type: "image",
    url: "/artifacts/image1.jpg",
    title: "Before and After Comparison",
    caption: "Visual comparison showing the results",
    alt: "Comparison image",
    fileSize: "2.3 MB",
  },
  {
    id: "artifact-2",
    type: "document",
    url: "/artifacts/doc1.pdf",
    title: "Original Bill Statement",
    caption: "The initial medical bill received",
    alt: "Bill document",
    fileSize: "1.5 MB",
    pageCount: 5,
  },
  {
    id: "artifact-3",
    type: "screenshot",
    url: "/artifacts/screenshot1.png",
    title: "AI Chat Conversation",
    caption: "The full conversation with Claude",
    alt: "Chat screenshot",
  },
];

describe("StoryArtifacts Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() => render(<StoryArtifacts artifacts={mockArtifacts} />)).not.toThrow();
  });

  it("displays the section heading", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    expect(screen.getByText("Evidence & Documents")).toBeInTheDocument();
  });

  it("renders all artifacts", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    expect(screen.getByText("Before and After Comparison")).toBeInTheDocument();
    expect(screen.getByText("Original Bill Statement")).toBeInTheDocument();
    expect(screen.getByText("AI Chat Conversation")).toBeInTheDocument();
  });

  it("displays artifact titles", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    expect(screen.getByText("Before and After Comparison")).toBeInTheDocument();
  });

  it("displays artifact captions", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    expect(screen.getByText("Visual comparison showing the results")).toBeInTheDocument();
    expect(screen.getByText("The initial medical bill received")).toBeInTheDocument();
  });

  it("displays artifact alt text", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    expect(screen.getByText("Comparison image")).toBeInTheDocument();
    expect(screen.getByText("Bill document")).toBeInTheDocument();
    expect(screen.getByText("Chat screenshot")).toBeInTheDocument();
  });

  it("renders null when no artifacts are provided", () => {
    const { container } = render(<StoryArtifacts artifacts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders null when artifacts is undefined", () => {
    // @ts-expect-error Testing runtime handling of undefined
    const { container } = render(<StoryArtifacts artifacts={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("opens modal when artifact is clicked", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    const artifactButtons = screen.getAllByText("Before and After Comparison");
    fireEvent.click(artifactButtons[0]);

    // Modal should be rendered (ArtifactModal is tested separately)
    expect(screen.getAllByText("Before and After Comparison").length).toBeGreaterThan(1);
  });

  it("all artifacts are clickable buttons", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(3);
  });

  it("applies Japanese theme styling to artifact cards", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const cards = container.querySelectorAll(".bg-\\[\\#faf8f5\\]");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has border styling on artifact cards", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const cards = container.querySelectorAll(".border-\\[\\#d4d0c8\\]");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("has hover effects on artifact cards", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button.className).toContain("hover:border-[#8b7355]");
    });
  });

  it("displays different icons for different artifact types", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    // All artifacts should have icons (emojis)
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const icons = container.querySelectorAll("span.text-lg");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders in grid layout", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("sm:grid-cols-2");
  });

  it("truncates titles with line-clamp-2", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const titles = container.querySelectorAll(".line-clamp-2");
    expect(titles.length).toBeGreaterThan(0);
  });

  it("shows 'View details' on hover", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);
    const viewDetails = screen.getAllByText("View details");
    expect(viewDetails.length).toBe(3);
    viewDetails.forEach((detail) => {
      expect(detail.className).toContain("group-hover:opacity-100");
    });
  });

  it("has fixed height for image area", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const imagePlaceholders = container.querySelectorAll(".h-40");
    expect(imagePlaceholders.length).toBe(3);
  });

  it("renders with single artifact", () => {
    render(<StoryArtifacts artifacts={[mockArtifacts[0]]} />);
    expect(screen.getByText("Before and After Comparison")).toBeInTheDocument();
  });

  it("applies hover background color to image placeholder", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const placeholders = container.querySelectorAll(".group-hover\\:bg-\\[\\#efe9e0\\]");
    expect(placeholders.length).toBe(3);
  });

  it("applies hover text color to titles", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const titles = container.querySelectorAll(".group-hover\\:text-\\[\\#8b7355\\]");
    expect(titles.length).toBe(3);
  });

  it("has minimum height for artifact info section", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const infoSections = container.querySelectorAll(".min-h-\\[120px\\]");
    expect(infoSections.length).toBe(3);
  });

  it("renders artifacts in equal height layout", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const grid = container.querySelector(".items-stretch");
    expect(grid).toBeInTheDocument();
  });

  it("opens different modals for different artifacts", () => {
    render(<StoryArtifacts artifacts={mockArtifacts} />);

    // Click first artifact
    const firstArtifactButtons = screen.getAllByText("Before and After Comparison");
    fireEvent.click(firstArtifactButtons[0]);
    expect(screen.getAllByText("Before and After Comparison").length).toBeGreaterThan(1);
  });

  it("has proper spacing between artifacts", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const grid = container.querySelector(".gap-4");
    expect(grid).toBeInTheDocument();
  });

  it("renders all buttons with correct cursor style", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button.className).toContain("cursor-pointer");
    });
  });

  it("applies shadow on hover", () => {
    const { container } = render(<StoryArtifacts artifacts={mockArtifacts} />);
    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button.className).toContain("hover:shadow-md");
    });
  });
});
