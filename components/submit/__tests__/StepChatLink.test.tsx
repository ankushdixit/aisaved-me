import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { StepChatLink } from "../StepChatLink";
import type { StorySubmissionData } from "@/lib/schemas/story-submission";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

// Test wrapper component that provides form context
function StepChatLinkWrapper({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
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

  return <StepChatLink form={form} onNext={onNext} onBack={onBack} />;
}

describe("StepChatLink", () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the step title", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Add Your Chat")).toBeInTheDocument();
  });

  it("renders step description", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByText("Share the AI conversation that helped you succeed")
    ).toBeInTheDocument();
  });

  it("renders Chat Link field with label and hint", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Chat Link")).toBeInTheDocument();
    expect(screen.getByText("Paste a shareable link to your AI conversation")).toBeInTheDocument();
  });

  it("renders chat URL input with placeholder", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByPlaceholderText("https://claude.ai/chat/...")).toBeInTheDocument();
  });

  it("renders 'or' divider between options", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("or")).toBeInTheDocument();
  });

  it("renders Paste Chat Excerpts field with label and hint", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Paste Chat Excerpts")).toBeInTheDocument();
    expect(
      screen.getByText("Copy and paste the relevant parts of your conversation")
    ).toBeInTheDocument();
  });

  it("renders chat excerpt textarea with placeholder", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.getByPlaceholderText("Paste the key parts of your AI conversation here...")
    ).toBeInTheDocument();
  });

  it("shows 'Why share your chat?' info box", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Why share your chat?")).toBeInTheDocument();
  });

  it("shows benefits of sharing chat in info box", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Helps verify your story is authentic")).toBeInTheDocument();
    expect(screen.getByText("Shows others how to approach similar problems")).toBeInTheDocument();
    expect(screen.getByText("Demonstrates effective prompting techniques")).toBeInTheDocument();
  });

  it("renders Back button", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("renders Next Step button", () => {
    render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByRole("button", { name: /next step/i })).toBeInTheDocument();
  });

  describe("with different themes", () => {
    it("renders correctly with memphis theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "memphis", mounted: true });

      render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Add Your Chat")).toBeInTheDocument();
    });

    it("renders correctly with japanese theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "japanese", mounted: true });

      render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Add Your Chat")).toBeInTheDocument();
    });

    it("renders correctly with organic theme", () => {
      const { useTheme } = require("@/lib/themes");
      useTheme.mockReturnValue({ theme: "organic", mounted: true });

      render(<StepChatLinkWrapper onNext={mockOnNext} onBack={mockOnBack} />);
      expect(screen.getByText("Add Your Chat")).toBeInTheDocument();
    });
  });
});
