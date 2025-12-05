import { render, screen } from "@testing-library/react";
import { AuthLayout } from "../memphis/AuthLayout";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: () => ({ theme: "memphis", mounted: true, setTheme: jest.fn() }),
}));

describe("AuthLayout (Memphis)", () => {
  it("renders children correctly", () => {
    render(
      <AuthLayout>
        <div data-testid="child">Test Child</div>
      </AuthLayout>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders split-screen layout", () => {
    const { container } = render(
      <AuthLayout>
        <div>Content</div>
      </AuthLayout>
    );

    // Check for main container with flex layout
    const mainContainer = container.querySelector("div.flex.min-h-screen");
    expect(mainContainer).toBeInTheDocument();
  });

  it("renders with signin variant by default", () => {
    render(
      <AuthLayout>
        <div>Content</div>
      </AuthLayout>
    );

    // SocialProof should be rendered (hidden on mobile, visible on lg)
    expect(screen.getByText("AI Saved Me")).toBeInTheDocument();
  });

  it("renders with signup variant when specified", () => {
    render(
      <AuthLayout variant="signup">
        <div>Content</div>
      </AuthLayout>
    );

    // SocialProof should still be rendered
    expect(screen.getByText("AI Saved Me")).toBeInTheDocument();
  });
});
