import { render, screen } from "@testing-library/react";
import SubmitPage from "../page";
import { useTheme } from "@/lib/themes";
import { useWizardForm } from "@/lib/hooks/useWizardForm";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

// Mock next/link
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock theme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

// Mock wizard form hook
jest.mock("@/lib/hooks/useWizardForm", () => ({
  useWizardForm: jest.fn(() => ({
    form: {
      watch: jest.fn(() => ({})),
      setValue: jest.fn(),
      formState: { errors: {} },
      getValues: jest.fn(() => ({})),
      clearErrors: jest.fn(),
      setError: jest.fn(),
      reset: jest.fn(),
    },
    currentStep: 1,
    steps: [
      { id: 1, name: "Basics", key: "basics" },
      { id: 2, name: "Story", key: "story" },
      { id: 3, name: "Chat Link", key: "chatLink" },
      { id: 4, name: "Media", key: "media" },
      { id: 5, name: "Review", key: "review" },
    ],
    nextStep: jest.fn(() => Promise.resolve(true)),
    prevStep: jest.fn(),
    goToStep: jest.fn(() => Promise.resolve(true)),
    isFirstStep: true,
    isLastStep: false,
    isStepComplete: jest.fn(() => false),
    validateCurrentStep: jest.fn(() => Promise.resolve(true)),
    autoSaveState: { lastSaved: null, isSaving: false },
    resetForm: jest.fn(),
  })),
}));

// Mock all submit components
jest.mock("@/components/ui", () => ({
  Navbar: jest.fn(() => <div data-testid="navbar">Navbar</div>),
}));

jest.mock("@/components/submit", () => ({
  WizardProgress: jest.fn(({ steps, currentStep }) => (
    <div data-testid="wizard-progress">
      WizardProgress - Step {currentStep} of {steps.length}
    </div>
  )),
  StepBasics: jest.fn(() => <div data-testid="step-basics">StepBasics</div>),
  StepStory: jest.fn(() => <div data-testid="step-story">StepStory</div>),
  StepChatLink: jest.fn(() => <div data-testid="step-chatlink">StepChatLink</div>),
  StepMedia: jest.fn(() => <div data-testid="step-media">StepMedia</div>),
  StepReview: jest.fn(() => <div data-testid="step-review">StepReview</div>),
}));

const mockUseTheme = useTheme as jest.Mock;
const mockUseWizardForm = useWizardForm as jest.Mock;

describe("SubmitPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to defaults
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    mockUseWizardForm.mockReturnValue({
      form: {
        watch: jest.fn(() => ({})),
        setValue: jest.fn(),
        formState: { errors: {} },
        getValues: jest.fn(() => ({})),
        clearErrors: jest.fn(),
        setError: jest.fn(),
        reset: jest.fn(),
      },
      currentStep: 1,
      steps: [
        { id: 1, name: "Basics", key: "basics" },
        { id: 2, name: "Story", key: "story" },
        { id: 3, name: "Chat Link", key: "chatLink" },
        { id: 4, name: "Media", key: "media" },
        { id: 5, name: "Review", key: "review" },
      ],
      nextStep: jest.fn(() => Promise.resolve(true)),
      prevStep: jest.fn(),
      goToStep: jest.fn(() => Promise.resolve(true)),
      isFirstStep: true,
      isLastStep: false,
      isStepComplete: jest.fn(() => false),
      validateCurrentStep: jest.fn(() => Promise.resolve(true)),
      autoSaveState: { lastSaved: null, isSaving: false },
      resetForm: jest.fn(),
    });
  });

  describe("Rendering tests", () => {
    it("renders navbar", () => {
      render(<SubmitPage />);
      expect(screen.getByTestId("navbar")).toBeInTheDocument();
    });

    it("renders page title 'Share Your AI Win'", () => {
      render(<SubmitPage />);
      expect(screen.getByText("Share Your AI Win")).toBeInTheDocument();
    });

    it("renders 'Save and Exit' link", () => {
      render(<SubmitPage />);
      const saveExitLink = screen.getByText("Save and Exit");
      expect(saveExitLink).toBeInTheDocument();
      expect(saveExitLink.closest("a")).toHaveAttribute("href", "/");
    });

    it("renders WizardProgress component", () => {
      render(<SubmitPage />);
      expect(screen.getByTestId("wizard-progress")).toBeInTheDocument();
    });

    it("renders WizardTips sidebar", () => {
      render(<SubmitPage />);
      // WizardTips is rendered but hidden on mobile (xl:block)
      expect(screen.getByText("Getting Started")).toBeInTheDocument();
    });

    describe("Theme variations", () => {
      it("applies Memphis theme styles", () => {
        mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
        const { container } = render(<SubmitPage />);

        // Check for Memphis-specific background pattern
        const pageContainer = container.querySelector(".bg-pattern-dots");
        expect(pageContainer).toBeInTheDocument();
      });

      it("applies Japanese theme styles", () => {
        mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
        const { container } = render(<SubmitPage />);

        // Check for Japanese-specific background
        const pageContainer = container.querySelector(".bg-rice-paper");
        expect(pageContainer).toBeInTheDocument();
      });

      it("applies Organic theme styles", () => {
        mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
        const { container } = render(<SubmitPage />);

        // Check for Organic-specific background
        const pageContainer = container.querySelector(".bg-cream");
        expect(pageContainer).toBeInTheDocument();
      });
    });
  });

  describe("Step navigation tests", () => {
    it("renders Step 1 (StepBasics) by default", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 1,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: true,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByTestId("step-basics")).toBeInTheDocument();
      expect(screen.queryByTestId("step-story")).not.toBeInTheDocument();
    });

    it("renders Step 2 (StepStory) when currentStep is 2", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 2,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByTestId("step-story")).toBeInTheDocument();
      expect(screen.queryByTestId("step-basics")).not.toBeInTheDocument();
    });

    it("renders Step 3 (StepChatLink) when currentStep is 3", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 3,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByTestId("step-chatlink")).toBeInTheDocument();
      expect(screen.queryByTestId("step-story")).not.toBeInTheDocument();
    });

    it("renders Step 4 (StepMedia) when currentStep is 4", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 4,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByTestId("step-media")).toBeInTheDocument();
      expect(screen.queryByTestId("step-chatlink")).not.toBeInTheDocument();
    });

    it("renders Step 5 (StepReview) when currentStep is 5", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 5,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: true,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByTestId("step-review")).toBeInTheDocument();
      expect(screen.queryByTestId("step-media")).not.toBeInTheDocument();
    });
  });

  describe("WizardTips tests", () => {
    it("shows correct tips for step 1 (Getting Started)", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 1,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: true,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByText("Getting Started")).toBeInTheDocument();
      expect(screen.getByText("Choose the category that best fits your story")).toBeInTheDocument();
      expect(screen.getByText("Select the AI tool you used most")).toBeInTheDocument();
      expect(screen.getByText("You can change these later if needed")).toBeInTheDocument();
    });

    it("shows correct tips for step 2 (Tips for a Great Story)", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 2,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByText("Tips for a Great Story")).toBeInTheDocument();
      expect(screen.getByText("Be specific about your problem")).toBeInTheDocument();
      expect(screen.getByText("Include numbers when possible")).toBeInTheDocument();
      expect(screen.getByText("Explain your AI prompting strategy")).toBeInTheDocument();
      expect(screen.getByText("Share actionable takeaways")).toBeInTheDocument();
    });

    it("shows correct tips for step 3 (Why Share Your Chat?)", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 3,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByText("Why Share Your Chat?")).toBeInTheDocument();
      expect(screen.getByText("Helps verify your story is authentic")).toBeInTheDocument();
      expect(screen.getByText("Shows others how to approach similar problems")).toBeInTheDocument();
      expect(screen.getByText("Demonstrates effective prompting")).toBeInTheDocument();
    });

    it("shows correct tips for step 4 (Media Tips)", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 4,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: false,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByText("Media Tips")).toBeInTheDocument();
      expect(screen.getByText("Screenshots are great evidence")).toBeInTheDocument();
      expect(screen.getByText("Redact personal information")).toBeInTheDocument();
      expect(screen.getByText("Before/after images are compelling")).toBeInTheDocument();
      expect(screen.getByText("This step is optional")).toBeInTheDocument();
    });

    it("shows correct tips for step 5 (Final Review)", () => {
      mockUseWizardForm.mockReturnValue({
        form: {
          watch: jest.fn(() => ({})),
          setValue: jest.fn(),
          formState: { errors: {} },
          getValues: jest.fn(() => ({})),
          clearErrors: jest.fn(),
          setError: jest.fn(),
          reset: jest.fn(),
        },
        currentStep: 5,
        steps: [
          { id: 1, name: "Basics", key: "basics" },
          { id: 2, name: "Story", key: "story" },
          { id: 3, name: "Chat Link", key: "chatLink" },
          { id: 4, name: "Media", key: "media" },
          { id: 5, name: "Review", key: "review" },
        ],
        nextStep: jest.fn(() => Promise.resolve(true)),
        prevStep: jest.fn(),
        goToStep: jest.fn(() => Promise.resolve(true)),
        isFirstStep: false,
        isLastStep: true,
        isStepComplete: jest.fn(() => false),
        validateCurrentStep: jest.fn(() => Promise.resolve(true)),
        autoSaveState: { lastSaved: null, isSaving: false },
        resetForm: jest.fn(),
      });

      render(<SubmitPage />);
      expect(screen.getByText("Final Review")).toBeInTheDocument();
      expect(screen.getByText("Double-check all information")).toBeInTheDocument();
      expect(screen.getByText("Our team will review before publishing")).toBeInTheDocument();
      expect(screen.getByText("You may be contacted for verification")).toBeInTheDocument();
      expect(screen.getByText("Personal info will be protected")).toBeInTheDocument();
    });

    describe("WizardTips theme variations", () => {
      it("applies Memphis theme styles to tips sidebar", () => {
        mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
        const { container } = render(<SubmitPage />);

        // Check for Memphis-specific border style in sidebar
        const sidebar = container.querySelector(".border-3");
        expect(sidebar).toBeInTheDocument();
      });

      it("applies Japanese theme styles to tips sidebar", () => {
        mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
        const { container } = render(<SubmitPage />);

        // Check for Japanese-specific border style
        const sidebar = container.querySelector(".border-light-300");
        expect(sidebar).toBeInTheDocument();
      });

      it("applies Organic theme styles to tips sidebar", () => {
        mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
        const { container } = render(<SubmitPage />);

        // Check for Organic-specific border style
        const sidebar = container.querySelector(".border-sage-light");
        expect(sidebar).toBeInTheDocument();
      });
    });
  });
});
