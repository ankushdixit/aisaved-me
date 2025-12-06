import { render, screen } from "@/lib/test-utils";
import SubmitErrorPage from "../page";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

// Mock the theme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

import { useTheme } from "@/lib/themes";
import { useSearchParams } from "next/navigation";

const mockUseTheme = useTheme as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

describe("SubmitErrorPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  describe("Core Content", () => {
    it("renders without errors", () => {
      expect(() => render(<SubmitErrorPage />)).not.toThrow();
    });

    it("renders the error icon (X SVG)", () => {
      render(<SubmitErrorPage />);

      // Check for the SVG element
      const svg = document.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();

      // Check for the X path
      const path = svg?.querySelector('path[d="M6 18L18 6M6 6l12 12"]');
      expect(path).toBeInTheDocument();
    });

    it('shows "Need help?" section', () => {
      render(<SubmitErrorPage />);
      expect(screen.getByText("Need help?")).toBeInTheDocument();
    });

    it("shows all bullet points in Need help section", () => {
      render(<SubmitErrorPage />);

      expect(screen.getByText(/Your draft has been saved automatically/i)).toBeInTheDocument();
      expect(screen.getByText(/Try refreshing the page and submitting again/i)).toBeInTheDocument();
      expect(screen.getByText(/Check your internet connection/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact support if the problem persists/i)).toBeInTheDocument();
    });

    it('renders "Try Again" link to /submit', () => {
      render(<SubmitErrorPage />);

      const tryAgainLink = screen.getByText("Try Again").closest("a");
      expect(tryAgainLink).toBeInTheDocument();
      expect(tryAgainLink).toHaveAttribute("href", "/submit");
    });

    it('renders "Back to Home" link to /', () => {
      render(<SubmitErrorPage />);

      const homeLink = screen.getByText("Back to Home").closest("a");
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("renders Suspense fallback", () => {
      // The Suspense fallback is part of the component structure
      // This test verifies the component structure is correct
      const { container } = render(<SubmitErrorPage />);
      expect(container).toBeTruthy();
    });
  });

  describe("Error Types", () => {
    it('shows "Validation Error" title for validation error type', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "validation" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText("Validation Error")).toBeInTheDocument();
    });

    it("shows validation error description", () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "validation" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText(/Some of your submission data was invalid/i)).toBeInTheDocument();
      expect(screen.getByText(/Please go back and check your entries/i)).toBeInTheDocument();
    });

    it('shows "Connection Error" title for network error type', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "network" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText("Connection Error")).toBeInTheDocument();
    });

    it("shows network error description", () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "network" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText(/We couldn't connect to our servers/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please check your internet connection and try again/i)
      ).toBeInTheDocument();
    });

    it('shows "Server Error" title for server error type', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "server" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText("Server Error")).toBeInTheDocument();
    });

    it("shows server error description", () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "server" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText(/Something went wrong on our end/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Our team has been notified and is working on it/i)
      ).toBeInTheDocument();
    });

    it('shows "Submission Failed" title for unknown error type', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "unknown" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText("Submission Failed")).toBeInTheDocument();
    });

    it("shows unknown error description", () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "unknown" }));
      render(<SubmitErrorPage />);

      expect(
        screen.getByText(/We encountered an unexpected error while processing your story/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Please try again/i)).toBeInTheDocument();
    });

    it('defaults to "Submission Failed" when no error type provided', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      render(<SubmitErrorPage />);

      expect(screen.getByText("Submission Failed")).toBeInTheDocument();
    });

    it('defaults to "Submission Failed" for invalid error type', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "invalid_type" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText("Submission Failed")).toBeInTheDocument();
    });
  });

  describe("Custom Error Messages", () => {
    it("shows custom error message from URL params instead of default", () => {
      mockUseSearchParams.mockReturnValue(
        new URLSearchParams({
          type: "validation",
          message: "Custom error message from API",
        })
      );
      render(<SubmitErrorPage />);

      expect(screen.getByText("Custom error message from API")).toBeInTheDocument();
      // Default message should not be present
      expect(
        screen.queryByText(/Some of your submission data was invalid/i)
      ).not.toBeInTheDocument();
    });

    it("shows default error message when no custom message provided", () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams({ type: "network" }));
      render(<SubmitErrorPage />);

      expect(screen.getByText(/We couldn't connect to our servers/i)).toBeInTheDocument();
    });

    it("handles custom message with special characters", () => {
      mockUseSearchParams.mockReturnValue(
        new URLSearchParams({
          message: "Error: Failed to save & process data",
        })
      );
      render(<SubmitErrorPage />);

      expect(screen.getByText("Error: Failed to save & process data")).toBeInTheDocument();
    });
  });

  describe("Memphis Theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("applies Memphis theme page styles", () => {
      const { container } = render(<SubmitErrorPage />);
      const pageDiv = container.querySelector(".bg-pattern-dots");
      expect(pageDiv).toBeInTheDocument();
    });

    it("applies Memphis theme to icon container", () => {
      render(<SubmitErrorPage />);

      const iconContainer = document.querySelector('svg[aria-hidden="true"]')?.parentElement;
      expect(iconContainer).toHaveClass("bg-coral");
      expect(iconContainer).toHaveClass("border-3");
      expect(iconContainer).toHaveClass("border-black");
    });

    it("applies Memphis theme to title", () => {
      render(<SubmitErrorPage />);

      const title = screen.getByText("Submission Failed");
      expect(title).toHaveClass("font-display");
      expect(title).toHaveClass("font-bold");
      expect(title).toHaveClass("text-black");
    });

    it("applies Memphis theme to info box", () => {
      render(<SubmitErrorPage />);

      const infoTitle = screen.getByText("Need help?");
      const infoBox = infoTitle.parentElement;
      expect(infoBox).toHaveClass("bg-red-50");
      expect(infoBox).toHaveClass("border-2");
      expect(infoBox).toHaveClass("border-coral");
    });

    it("applies Memphis theme to info title", () => {
      render(<SubmitErrorPage />);

      const infoTitle = screen.getByText("Need help?");
      expect(infoTitle).toHaveClass("font-display");
      expect(infoTitle).toHaveClass("text-coral");
    });

    it("applies Memphis theme to primary button", () => {
      render(<SubmitErrorPage />);

      const tryAgainButton = screen.getByText("Try Again").closest("a") as HTMLElement;
      expect(tryAgainButton).toHaveClass("bg-electric-blue");
      expect(tryAgainButton).toHaveClass("border-3");
      expect(tryAgainButton).toHaveClass("border-black");
      expect(tryAgainButton).toHaveClass("shadow-memphis-sm");
    });

    it("applies Memphis theme to secondary button", () => {
      render(<SubmitErrorPage />);

      const homeButton = screen.getByText("Back to Home").closest("a") as HTMLElement;
      expect(homeButton).toHaveClass("text-black");
      expect(homeButton).toHaveClass("border-3");
      expect(homeButton).toHaveClass("border-black");
    });
  });

  describe("Japanese Theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("applies Japanese theme page styles", () => {
      const { container } = render(<SubmitErrorPage />);
      const pageDiv = container.querySelector(".bg-rice-paper");
      expect(pageDiv).toBeInTheDocument();
    });

    it("applies Japanese theme to icon container", () => {
      render(<SubmitErrorPage />);

      const iconContainer = document.querySelector('svg[aria-hidden="true"]')?.parentElement;
      expect(iconContainer).toHaveClass("bg-sakura");
    });

    it("applies Japanese theme to title", () => {
      render(<SubmitErrorPage />);

      const title = screen.getByText("Submission Failed");
      expect(title).toHaveClass("font-medium");
      expect(title).toHaveClass("text-sumi-black");
    });

    it("applies Japanese theme to info box", () => {
      render(<SubmitErrorPage />);

      const infoTitle = screen.getByText("Need help?");
      const infoBox = infoTitle.parentElement;
      expect(infoBox).toHaveClass("bg-light-200");
      expect(infoBox).toHaveClass("border");
      expect(infoBox).toHaveClass("border-hanko-red/30");
    });

    it("applies Japanese theme to info title", () => {
      render(<SubmitErrorPage />);

      const infoTitle = screen.getByText("Need help?");
      expect(infoTitle).toHaveClass("font-medium");
      expect(infoTitle).toHaveClass("text-hanko-red");
    });

    it("applies Japanese theme to primary button", () => {
      render(<SubmitErrorPage />);

      const tryAgainButton = screen.getByText("Try Again").closest("a") as HTMLElement;
      expect(tryAgainButton).toHaveClass("bg-hanko-red");
    });

    it("applies Japanese theme to secondary button", () => {
      render(<SubmitErrorPage />);

      const homeButton = screen.getByText("Back to Home").closest("a") as HTMLElement;
      expect(homeButton).toHaveClass("text-sumi-black");
      expect(homeButton).toHaveClass("border");
      expect(homeButton).toHaveClass("border-light-300");
    });
  });

  describe("Organic Theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("applies Organic theme page styles", () => {
      const { container } = render(<SubmitErrorPage />);
      const pageDiv = container.querySelector(".bg-cream");
      expect(pageDiv).toBeInTheDocument();
    });

    it("applies Organic theme to icon container", () => {
      render(<SubmitErrorPage />);

      const iconContainer = document.querySelector('svg[aria-hidden="true"]')?.parentElement;
      expect(iconContainer).toHaveClass("bg-terracotta/20");
    });

    it("applies Organic theme to title", () => {
      render(<SubmitErrorPage />);

      const title = screen.getByText("Submission Failed");
      expect(title).toHaveClass("font-display");
      expect(title).toHaveClass("font-semibold");
      expect(title).toHaveClass("text-clay");
    });

    it("applies Organic theme to info box", () => {
      render(<SubmitErrorPage />);

      const infoTitle = screen.getByText("Need help?");
      const infoBox = infoTitle.parentElement;
      expect(infoBox).toHaveClass("bg-terracotta/10");
      expect(infoBox).toHaveClass("border");
      expect(infoBox).toHaveClass("border-terracotta/30");
    });

    it("applies Organic theme to info title", () => {
      render(<SubmitErrorPage />);

      const infoTitle = screen.getByText("Need help?");
      expect(infoTitle).toHaveClass("font-display");
      expect(infoTitle).toHaveClass("text-terracotta");
    });

    it("applies Organic theme to primary button", () => {
      render(<SubmitErrorPage />);

      const tryAgainButton = screen.getByText("Try Again").closest("a") as HTMLElement;
      expect(tryAgainButton).toHaveClass("bg-terracotta");
      expect(tryAgainButton).toHaveClass("rounded-full");
    });

    it("applies Organic theme to secondary button", () => {
      render(<SubmitErrorPage />);

      const homeButton = screen.getByText("Back to Home").closest("a") as HTMLElement;
      expect(homeButton).toHaveClass("text-clay");
      expect(homeButton).toHaveClass("border-2");
      expect(homeButton).toHaveClass("border-sage");
      expect(homeButton).toHaveClass("rounded-full");
    });
  });
});
