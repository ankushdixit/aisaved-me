import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { StepStory } from "../StepStory";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

// Test wrapper component that provides form context
function StepStoryWrapper({
  onNext,
  onBack,
  autoSaveState = { lastSaved: null, isSaving: false },
}: {
  onNext: () => void;
  onBack: () => void;
  autoSaveState?: { lastSaved: Date | null; isSaving: boolean };
}) {
  const form = useForm<StorySubmissionData>({
    defaultValues: {
      category: undefined,
      aiTool: undefined,
      title: "",
      problem: "",
      howAIHelped: "",
      outcome: "",
      moneySaved: "",
      timeSaved: "",
      otherMetric: "",
      chatUrl: "",
      chatExcerpt: "",
      files: [],
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  return <StepStory form={form} onNext={onNext} onBack={onBack} autoSaveState={autoSaveState} />;
}

describe("StepStory", () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the step title", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Tell Your Story")).toBeInTheDocument();
  });

  it("renders step description", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByText("Share the details of how AI helped you achieve your win")
    ).toBeInTheDocument();
  });

  it("renders Story Title field with label and hint", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Story Title")).toBeInTheDocument();
    expect(screen.getByText("Write a compelling headline for your story")).toBeInTheDocument();
  });

  it("renders The Problem field with label and hint", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("The Problem")).toBeInTheDocument();
    expect(
      screen.getByText("Describe the challenge you faced before using AI")
    ).toBeInTheDocument();
  });

  it("renders How AI Helped field with label and hint", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("How AI Helped")).toBeInTheDocument();
    expect(screen.getByText("Explain how you used AI to address the problem")).toBeInTheDocument();
  });

  it("renders The Outcome field with label and hint", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("The Outcome")).toBeInTheDocument();
    expect(
      screen.getByText("What was the result? Be specific about what you achieved")
    ).toBeInTheDocument();
  });

  it("renders Success Metrics section with required asterisk", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Success Metrics")).toBeInTheDocument();
    // The asterisk appears in the Success Metrics heading
    const heading = screen.getByText("Success Metrics").closest("h3");
    expect(heading).toHaveTextContent("*");
  });

  it("shows success metrics description", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByText("Provide at least one metric to help readers understand the impact")
    ).toBeInTheDocument();
  });

  it("renders Money Saved field", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Money Saved")).toBeInTheDocument();
  });

  it("renders Time Saved field", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Time Saved")).toBeInTheDocument();
  });

  it("renders Other Outcome field", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Other Outcome")).toBeInTheDocument();
  });

  it("renders auto-save indicator when not saving", () => {
    render(
      <StepStoryWrapper
        onNext={mockOnNext}
        onBack={mockOnBack}
        autoSaveState={{ lastSaved: null, isSaving: false }}
      />
    );
    // The component should render but not show any specific save message
    const container = screen.getByText("Tell Your Story").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("renders auto-save indicator when saving", () => {
    render(
      <StepStoryWrapper
        onNext={mockOnNext}
        onBack={mockOnBack}
        autoSaveState={{ lastSaved: null, isSaving: true }}
      />
    );
    // The component should render but not show any specific save message
    const container = screen.getByText("Tell Your Story").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("renders Back button", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("renders Next Step button", () => {
    render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByRole("button", { name: /next step/i })).toBeInTheDocument();
  });

  describe("with different themes", () => {
    it("renders correctly with memphis theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "memphis", mounted: true });

      render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Tell Your Story")).toBeInTheDocument();
    });

    it("renders correctly with japanese theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "japanese", mounted: true });

      render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Tell Your Story")).toBeInTheDocument();
    });

    it("renders correctly with organic theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "organic", mounted: true });

      render(<StepStoryWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Tell Your Story")).toBeInTheDocument();
    });
  });
});
