import { render, screen, fireEvent } from "@testing-library/react";
import { WizardProgress } from "../WizardProgress";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

const mockSteps = [
  { id: 1, name: "Basics", key: "basics" },
  { id: 2, name: "Story", key: "story" },
  { id: 3, name: "Chat Link", key: "chatLink" },
  { id: 4, name: "Media", key: "media" },
  { id: 5, name: "Review", key: "review" },
] as const;

describe("WizardProgress", () => {
  const defaultProps = {
    steps: mockSteps,
    currentStep: 2,
    isStepComplete: (step: number) => step < 2,
  };

  it("renders all 5 step indicators", () => {
    render(<WizardProgress {...defaultProps} />);

    mockSteps.forEach((step) => {
      expect(screen.getByText(step.name)).toBeInTheDocument();
    });
  });

  it("highlights the current step", () => {
    render(<WizardProgress {...defaultProps} currentStep={2} />);

    const stepButton = screen.getByRole("button", { name: /2/i });
    expect(stepButton).toHaveClass("bg-electric-blue");
  });

  it("shows checkmark for completed steps", () => {
    render(<WizardProgress {...defaultProps} currentStep={3} />);

    // Step 1 and 2 should be complete (based on isStepComplete)
    const checkmarks = document.querySelectorAll("svg");
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it("calls onStepClick when step is clicked", () => {
    const onStepClick = jest.fn();
    render(<WizardProgress {...defaultProps} onStepClick={onStepClick} />);

    const stepButton = screen.getByRole("button", { name: /3/i });
    fireEvent.click(stepButton);

    expect(onStepClick).toHaveBeenCalledWith(3);
  });

  it("renders connector lines between steps", () => {
    const { container } = render(<WizardProgress {...defaultProps} />);

    // Should have 4 connector lines for 5 steps
    const connectorLines = container.querySelectorAll(".border-t-3");
    expect(connectorLines.length).toBe(4);
  });

  it("styles completed step connectors differently", () => {
    const { container } = render(
      <WizardProgress {...defaultProps} currentStep={3} isStepComplete={() => true} />
    );

    // Steps 1 and 2 are "passed" (currentStep=3), so their connectors should be completed
    const connectorLines = container.querySelectorAll(".border-mint-green");
    expect(connectorLines.length).toBe(2); // First two connectors completed
  });

  it("does not show future steps as complete even if isStepComplete returns true", () => {
    render(
      <WizardProgress
        {...defaultProps}
        currentStep={1}
        isStepComplete={() => true} // All steps return true
      />
    );

    // Step 4 should not show checkmark because user hasn't passed it yet
    const stepButtons = screen.getAllByRole("button");
    expect(stepButtons[3].textContent).toBe("4"); // Should show number, not checkmark
  });

  it("renders pending steps with gray styling", () => {
    render(<WizardProgress {...defaultProps} currentStep={1} />);

    const stepButton = screen.getByRole("button", { name: /5/i });
    expect(stepButton).toHaveClass("bg-gray-200");
  });
});
