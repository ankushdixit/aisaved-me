import { render, screen, fireEvent } from "@testing-library/react";
import { WizardStep, WizardNavigation, AutoSaveIndicator } from "../WizardStep";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

import { useTheme } from "@/lib/themes";
const mockUseTheme = useTheme as jest.Mock;

describe("WizardStep", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
  });

  describe("Basic rendering", () => {
    it("renders children correctly", () => {
      render(
        <WizardStep title="Test Step" description="Test description">
          <div>Test content</div>
        </WizardStep>
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("renders title", () => {
      render(
        <WizardStep title="Step Title">
          <div>Content</div>
        </WizardStep>
      );

      expect(screen.getByText("Step Title")).toBeInTheDocument();
    });

    it("renders description when provided", () => {
      render(
        <WizardStep title="Step Title" description="Step description">
          <div>Content</div>
        </WizardStep>
      );

      expect(screen.getByText("Step description")).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      const { container } = render(
        <WizardStep title="Step Title">
          <div>Content</div>
        </WizardStep>
      );

      // Check that there's no description paragraph
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs.length).toBe(0);
    });

    it("applies custom className when provided", () => {
      const { container } = render(
        <WizardStep title="Test" className="custom-class">
          <div>Content</div>
        </WizardStep>
      );

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass("custom-class");
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders with Memphis styling", () => {
      render(
        <WizardStep title="Memphis Step" description="Memphis description">
          <div>Content</div>
        </WizardStep>
      );

      const title = screen.getByText("Memphis Step");
      expect(title).toHaveClass("font-display");
      expect(title).toHaveClass("font-bold");
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders with Japanese styling", () => {
      render(
        <WizardStep title="Japanese Step" description="Japanese description">
          <div>Content</div>
        </WizardStep>
      );

      const title = screen.getByText("Japanese Step");
      expect(title).toHaveClass("font-medium");
      expect(title).toHaveClass("text-sumi-black");
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders with Organic styling", () => {
      render(
        <WizardStep title="Organic Step" description="Organic description">
          <div>Content</div>
        </WizardStep>
      );

      const title = screen.getByText("Organic Step");
      expect(title).toHaveClass("font-display");
      expect(title).toHaveClass("font-semibold");
      expect(title).toHaveClass("text-clay");
    });
  });

  describe("Not mounted state", () => {
    it("renders Memphis theme when not mounted", () => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: false });

      render(
        <WizardStep title="Test Step">
          <div>Content</div>
        </WizardStep>
      );

      const title = screen.getByText("Test Step");
      // Should use Memphis styling even though theme is set to japanese
      expect(title).toHaveClass("font-display");
    });
  });
});

describe("WizardNavigation", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
  });

  describe("Back button", () => {
    it("hides back button when isFirstStep is true", () => {
      render(<WizardNavigation isFirstStep={true} isLastStep={false} onNext={jest.fn()} />);

      expect(screen.queryByText("Back")).not.toBeInTheDocument();
    });

    it("shows back button when isFirstStep is false", () => {
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onBack={jest.fn()}
          onNext={jest.fn()}
        />
      );

      expect(screen.getByText(/Back/i)).toBeInTheDocument();
    });

    it("calls onBack when back button is clicked", () => {
      const onBack = jest.fn();
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onBack={onBack}
          onNext={jest.fn()}
        />
      );

      const backButton = screen.getByText(/Back/i);
      fireEvent.click(backButton);

      expect(onBack).toHaveBeenCalledTimes(1);
    });
  });

  describe("Next/Submit button", () => {
    it("shows 'Next' button when isLastStep is false", () => {
      render(<WizardNavigation isFirstStep={false} isLastStep={false} onNext={jest.fn()} />);

      expect(screen.getByText(/Next Step/i)).toBeInTheDocument();
      expect(screen.queryByText(/Submit for Review/i)).not.toBeInTheDocument();
    });

    it("shows 'Submit' button when isLastStep is true", () => {
      render(<WizardNavigation isFirstStep={false} isLastStep={true} onNext={jest.fn()} />);

      expect(screen.getByText(/Submit for Review/i)).toBeInTheDocument();
      expect(screen.queryByText(/Next Step/i)).not.toBeInTheDocument();
    });

    it("uses custom nextLabel when provided", () => {
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onNext={jest.fn()}
          nextLabel="Continue"
        />
      );

      expect(screen.getByText("Continue")).toBeInTheDocument();
      expect(screen.queryByText("Next")).not.toBeInTheDocument();
    });

    it("calls onNext when next button is clicked", () => {
      const onNext = jest.fn();
      render(<WizardNavigation isFirstStep={false} isLastStep={false} onNext={onNext} />);

      const nextButton = screen.getByText(/Next Step/i);
      fireEvent.click(nextButton);

      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it("disables next button when isSubmitting is true", () => {
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onNext={jest.fn()}
          isSubmitting={true}
        />
      );

      const nextButton = screen.getByText(/Submitting/i);
      expect(nextButton).toBeDisabled();
    });

    it("enables next button when isSubmitting is false", () => {
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onNext={jest.fn()}
          isSubmitting={false}
        />
      );

      const nextButton = screen.getByText(/Next Step/i);
      expect(nextButton).toBeEnabled();
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders with Memphis styling", () => {
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onBack={jest.fn()}
          onNext={jest.fn()}
        />
      );

      const nextButton = screen.getByText(/Next Step/i);
      expect(nextButton).toHaveClass("bg-electric-blue");
      // btn-memphis class includes border and shadow styling via CSS
      expect(nextButton).toHaveClass("btn-memphis");
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders with Japanese styling", () => {
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onBack={jest.fn()}
          onNext={jest.fn()}
        />
      );

      const nextButton = screen.getByText(/Next Step/i);
      expect(nextButton).toHaveClass("bg-sumi-black");
      expect(nextButton).toHaveClass("text-white");
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders with Organic styling", () => {
      render(
        <WizardNavigation
          isFirstStep={false}
          isLastStep={false}
          onBack={jest.fn()}
          onNext={jest.fn()}
        />
      );

      const nextButton = screen.getByText(/Next Step/i);
      expect(nextButton).toHaveClass("bg-terracotta");
      expect(nextButton).toHaveClass("text-white");
    });
  });
});

describe("AutoSaveIndicator", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Saving state", () => {
    it("shows 'Saving...' when isSaving is true", () => {
      render(<AutoSaveIndicator lastSaved={null} isSaving={true} />);

      expect(screen.getByText("Saving...")).toBeInTheDocument();
    });

    it("does not show 'Saving...' when isSaving is false", () => {
      render(<AutoSaveIndicator lastSaved={new Date("2024-01-15T11:59:00Z")} isSaving={false} />);

      expect(screen.queryByText("Saving...")).not.toBeInTheDocument();
    });
  });

  describe("Last saved display", () => {
    it("shows 'Draft auto-saved just now' when saved less than 5 seconds ago", () => {
      const lastSaved = new Date("2024-01-15T11:59:57Z"); // 3 seconds ago
      render(<AutoSaveIndicator lastSaved={lastSaved} isSaving={false} />);

      expect(screen.getByText(/Draft auto-saved just now/i)).toBeInTheDocument();
    });

    it("shows 'Draft auto-saved 2 minutes ago' when saved 2 minutes ago", () => {
      const lastSaved = new Date("2024-01-15T11:58:00Z"); // 2 minutes ago
      render(<AutoSaveIndicator lastSaved={lastSaved} isSaving={false} />);

      expect(screen.getByText(/Draft auto-saved 2 minutes ago/i)).toBeInTheDocument();
    });

    it("shows 'Draft not saved' when lastSaved is null and not saving", () => {
      render(<AutoSaveIndicator lastSaved={null} isSaving={false} />);

      expect(screen.getByText("Draft not saved")).toBeInTheDocument();
    });

    it("prioritizes 'Saving...' over last saved time", () => {
      const lastSaved = new Date("2024-01-15T11:58:00Z");
      render(<AutoSaveIndicator lastSaved={lastSaved} isSaving={true} />);

      expect(screen.getByText("Saving...")).toBeInTheDocument();
      expect(screen.queryByText(/Saved.*ago/)).not.toBeInTheDocument();
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders with Memphis styling", () => {
      render(<AutoSaveIndicator lastSaved={new Date("2024-01-15T11:59:30Z")} isSaving={false} />);

      const indicator = screen.getByText(/Draft auto-saved 30 seconds ago/i);
      expect(indicator).toBeInTheDocument();
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders with Japanese styling", () => {
      render(<AutoSaveIndicator lastSaved={new Date("2024-01-15T11:59:30Z")} isSaving={false} />);

      const indicator = screen.getByText(/Draft saved 30 seconds ago/i);
      expect(indicator).toBeInTheDocument();
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders with Organic styling", () => {
      render(<AutoSaveIndicator lastSaved={new Date("2024-01-15T11:59:30Z")} isSaving={false} />);

      const indicator = screen.getByText(/Draft auto-saved 30 seconds ago/i);
      expect(indicator).toBeInTheDocument();
    });
  });
});
