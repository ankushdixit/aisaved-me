import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { StepBasics } from "../StepBasics";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

// Test wrapper component that provides form context
function StepBasicsWrapper({ onNext }: { onNext: () => void }) {
  const form = useForm<StorySubmissionData>({
    defaultValues: {
      category: undefined,
      aiTool: undefined,
      title: "",
      problem: "",
      howAIHelped: "",
      outcome: "",
      files: [],
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  return <StepBasics form={form} onNext={onNext} />;
}

describe("StepBasics", () => {
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the step title", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);
    expect(screen.getByText("Let's Get Started")).toBeInTheDocument();
  });

  it("renders category dropdown with label", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);
    expect(screen.getByText("Category")).toBeInTheDocument();
  });

  it("renders AI tool dropdown with label", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);
    expect(screen.getByText("AI Tool")).toBeInTheDocument();
  });

  it("renders Next Step button", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);
    expect(screen.getByRole("button", { name: /next step/i })).toBeInTheDocument();
  });

  it("shows category options in dropdown", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);

    // Check that options are available in select elements
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBe(2);

    // Category select should have the right options
    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByText("Medical")).toBeInTheDocument();
    expect(screen.getByText("Financial")).toBeInTheDocument();
  });

  it("shows AI tool options in dropdown", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);

    // Check that AI tool options are available
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
    expect(screen.getByText("Gemini")).toBeInTheDocument();
  });

  it("displays description text", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);
    expect(screen.getByText("Tell us about your AI success story")).toBeInTheDocument();
  });

  it("shows hint text for category field", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);
    expect(screen.getByText("What area did AI help you with?")).toBeInTheDocument();
  });

  it("shows hint text for AI tool field", () => {
    render(<StepBasicsWrapper onNext={mockOnNext} />);
    expect(screen.getByText("Which AI assistant did you use?")).toBeInTheDocument();
  });
});
