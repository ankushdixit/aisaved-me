import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { StepMedia } from "../StepMedia";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

// Mock FileDropzone component
jest.mock("@/components/ui/FileDropzone", () => ({
  FileDropzone: ({ files, maxFiles }: { files: unknown[]; maxFiles: number }) => (
    <div data-testid="file-dropzone">
      File Dropzone (max: {maxFiles}, current: {files?.length || 0})
    </div>
  ),
}));

// Test wrapper component that provides form context
function StepMediaWrapper({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
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

  return <StepMedia form={form} onNext={onNext} onBack={onBack} />;
}

describe("StepMedia", () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the step title", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Add Supporting Media")).toBeInTheDocument();
  });

  it("renders step description", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByText("Upload images or documents that support your story (optional)")
    ).toBeInTheDocument();
  });

  it("renders file dropzone component", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByTestId("file-dropzone")).toBeInTheDocument();
  });

  it("shows upload instructions", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByText(
        "Supporting media helps verify your story and makes it more compelling. You can add:"
      )
    ).toBeInTheDocument();
  });

  it("shows types of supporting media that can be uploaded", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Screenshots of results or documents")).toBeInTheDocument();
    expect(screen.getByText("Before/after comparisons")).toBeInTheDocument();
    expect(screen.getByText("Official letters or confirmations")).toBeInTheDocument();
    expect(screen.getByText("Any evidence of your success")).toBeInTheDocument();
  });

  it("shows File Guidelines section", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("File Guidelines")).toBeInTheDocument();
  });

  it("shows maximum file size guideline", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText(/Maximum file size: 10MB per file/)).toBeInTheDocument();
  });

  it("shows accepted file formats guideline", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByText("Accepted formats: Images (PNG, JPG, GIF, WebP), PDFs")
    ).toBeInTheDocument();
  });

  it("shows maximum files guideline", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Up to 5 files total")).toBeInTheDocument();
  });

  it("shows privacy reminder about redacting sensitive information", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByText("Please redact any sensitive personal information")
    ).toBeInTheDocument();
  });

  it("shows 'This step is optional' notice", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("This step is optional.")).toBeInTheDocument();
    expect(
      screen.getByText("You can skip it and submit your story without any supporting files.")
    ).toBeInTheDocument();
  });

  it("renders Back button", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("renders Continue to Review button", () => {
    render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByRole("button", { name: /continue to review/i })).toBeInTheDocument();
  });

  describe("with different themes", () => {
    it("renders correctly with memphis theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "memphis", mounted: true });

      render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Add Supporting Media")).toBeInTheDocument();
    });

    it("renders correctly with japanese theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "japanese", mounted: true });

      render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Add Supporting Media")).toBeInTheDocument();
    });

    it("renders correctly with organic theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "organic", mounted: true });

      render(<StepMediaWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Add Supporting Media")).toBeInTheDocument();
    });
  });
});
