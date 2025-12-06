import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { StepReview } from "../StepReview";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

// Test wrapper component that provides form context
function StepReviewWrapper({
  onBack,
  onSubmit,
  isSubmitting = false,
  defaultValues = {},
}: {
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<StorySubmissionData>;
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
      ...defaultValues,
    },
  });

  return <StepReview form={form} onBack={onBack} onSubmit={onSubmit} isSubmitting={isSubmitting} />;
}

describe("StepReview", () => {
  const mockOnBack = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the step title", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Review Your Story")).toBeInTheDocument();
  });

  it("renders step description", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(
      screen.getByText("Please review all the information before submitting")
    ).toBeInTheDocument();
  });

  it("renders Category review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getAllByText("Not selected").length).toBeGreaterThan(0);
  });

  it("renders AI Tool review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("AI Tool")).toBeInTheDocument();
  });

  it("renders Story Title review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Story Title")).toBeInTheDocument();
    expect(screen.getByText("No title")).toBeInTheDocument();
  });

  it("renders The Problem review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("The Problem")).toBeInTheDocument();
  });

  it("renders How AI Helped review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("How AI Helped")).toBeInTheDocument();
  });

  it("renders The Outcome review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("The Outcome")).toBeInTheDocument();
  });

  it("renders Chat Evidence review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Chat Evidence")).toBeInTheDocument();
    expect(screen.getByText("No chat link provided")).toBeInTheDocument();
  });

  it("renders Supporting Files review section", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Supporting Files")).toBeInTheDocument();
    expect(screen.getByText("No files uploaded")).toBeInTheDocument();
  });

  it("shows populated category when provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ category: "Legal" }}
      />
    );
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("shows populated AI tool when provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ aiTool: "Claude" }}
      />
    );
    expect(screen.getByText("Claude")).toBeInTheDocument();
  });

  it("shows populated title when provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ title: "My Success Story" }}
      />
    );
    expect(screen.getByText("My Success Story")).toBeInTheDocument();
  });

  it("shows Success Metrics section when metrics are provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ moneySaved: "$1000" }}
      />
    );
    expect(screen.getByText("Success Metrics")).toBeInTheDocument();
    expect(screen.getByText("Money Saved:")).toBeInTheDocument();
    expect(screen.getByText("$1000")).toBeInTheDocument();
  });

  it("shows time saved metric when provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ timeSaved: "10 hours" }}
      />
    );
    expect(screen.getByText("Time Saved:")).toBeInTheDocument();
    expect(screen.getByText("10 hours")).toBeInTheDocument();
  });

  it("shows other metric when provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ otherMetric: "Case dismissed" }}
      />
    );
    expect(screen.getByText("Other:")).toBeInTheDocument();
    expect(screen.getByText("Case dismissed")).toBeInTheDocument();
  });

  it("shows chat URL when provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ chatUrl: "https://claude.ai/chat/123" }}
      />
    );
    const link = screen.getByText("https://claude.ai/chat/123");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://claude.ai/chat/123");
  });

  it("shows chat excerpt indicator when excerpt is provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{ chatExcerpt: "Some chat content" }}
      />
    );
    expect(screen.getByText("Chat excerpt provided")).toBeInTheDocument();
  });

  it("shows files when provided", () => {
    render(
      <StepReviewWrapper
        onBack={mockOnBack}
        onSubmit={mockOnSubmit}
        defaultValues={{
          files: [
            { id: "1", name: "screenshot.png", size: 1024, type: "image/png" },
            { id: "2", name: "document.pdf", size: 2048, type: "application/pdf" },
          ],
        }}
      />
    );
    expect(screen.getByText("screenshot.png")).toBeInTheDocument();
    expect(screen.getByText("document.pdf")).toBeInTheDocument();
  });

  it("renders important notice before submission", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Before you submit:")).toBeInTheDocument();
    expect(
      screen.getByText("Your story will be reviewed by our team before publishing")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Personal information will be redacted for privacy")
    ).toBeInTheDocument();
    expect(screen.getByText("You may be contacted for verification if needed")).toBeInTheDocument();
  });

  it("renders terms checkbox with link", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText(/and confirm this story is true and accurate/i)).toBeInTheDocument();
    const link = screen.getByText("Terms of Service");
    expect(link).toHaveAttribute("href", "/terms");
  });

  it("renders privacy checkbox with link", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText(/and consent to having my story published/i)).toBeInTheDocument();
    const link = screen.getByText("Privacy Policy");
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("renders Back button", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("renders Submit button when not submitting", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} isSubmitting={false} />);
    expect(screen.getByRole("button", { name: /submit for review/i })).toBeInTheDocument();
  });

  it("shows Submitting... state when isSubmitting is true", () => {
    render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} isSubmitting={true} />);
    expect(screen.getByRole("button", { name: /submitting/i })).toBeInTheDocument();
  });

  describe("with different themes", () => {
    it("renders correctly with memphis theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "memphis", mounted: true });

      render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
      expect(screen.getByText("Review Your Story")).toBeInTheDocument();
    });

    it("renders correctly with japanese theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "japanese", mounted: true });

      render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
      expect(screen.getByText("Review Your Story")).toBeInTheDocument();
    });

    it("renders correctly with organic theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "organic", mounted: true });

      render(<StepReviewWrapper onBack={mockOnBack} onSubmit={mockOnSubmit} />);
      expect(screen.getByText("Review Your Story")).toBeInTheDocument();
    });
  });
});
