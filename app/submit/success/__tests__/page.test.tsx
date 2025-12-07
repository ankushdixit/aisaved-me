import { render, screen } from "@/lib/test-utils";
import SubmitSuccessPage from "../page";

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

import { useTheme } from "@/lib/themes";

const mockUseTheme = useTheme as jest.Mock;

describe("SubmitSuccessPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Core Content", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders without errors", () => {
      expect(() => render(<SubmitSuccessPage />)).not.toThrow();
    });

    it("renders the success icon (checkmark SVG)", () => {
      render(<SubmitSuccessPage />);

      // Check for the SVG element
      const svg = document.querySelector('svg[aria-hidden="true"]');
      expect(svg).toBeInTheDocument();

      // Check for the checkmark path
      const path = svg?.querySelector('path[d="M5 13l4 4L19 7"]');
      expect(path).toBeInTheDocument();
    });

    it('shows "Story Submitted!" title', () => {
      render(<SubmitSuccessPage />);
      expect(screen.getByText("Story Submitted!")).toBeInTheDocument();
    });

    it("shows thank you message", () => {
      render(<SubmitSuccessPage />);
      expect(screen.getByText(/Thank you for sharing your AI success story/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Your submission has been received and is now pending review/i)
      ).toBeInTheDocument();
    });

    it('shows "What happens next?" section', () => {
      render(<SubmitSuccessPage />);
      expect(screen.getByText("What happens next?")).toBeInTheDocument();
    });

    it("shows all bullet points in What happens next section", () => {
      render(<SubmitSuccessPage />);

      expect(
        screen.getByText(/Our team will review your story within 2-3 business days/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We may reach out if we need additional information/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Once approved, your story will be published on the site/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/You'll receive an email notification when it's live/i)
      ).toBeInTheDocument();
    });

    it('renders "Browse Stories" link to /stories', () => {
      render(<SubmitSuccessPage />);

      const browseLink = screen.getByText("Browse Stories").closest("a");
      expect(browseLink).toBeInTheDocument();
      expect(browseLink).toHaveAttribute("href", "/stories");
    });

    it('renders "Back to Home" link to /', () => {
      render(<SubmitSuccessPage />);

      const homeLink = screen.getByText("Back to Home").closest("a");
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });

  describe("Memphis Theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("applies Memphis theme page styles", () => {
      const { container } = render(<SubmitSuccessPage />);
      const pageDiv = container.firstChild as HTMLElement;
      expect(pageDiv).toHaveClass("bg-pattern-dots");
    });

    it("applies Memphis theme to icon container", () => {
      render(<SubmitSuccessPage />);

      const iconContainer = document.querySelector('svg[aria-hidden="true"]')?.parentElement;
      expect(iconContainer).toHaveClass("bg-electric-blue");
      expect(iconContainer).toHaveClass("border-3");
      expect(iconContainer).toHaveClass("border-black");
    });

    it("applies Memphis theme to title", () => {
      render(<SubmitSuccessPage />);

      const title = screen.getByText("Story Submitted!");
      expect(title).toHaveClass("font-display");
      expect(title).toHaveClass("font-bold");
      expect(title).toHaveClass("text-black");
    });

    it("applies Memphis theme to info box", () => {
      render(<SubmitSuccessPage />);

      const infoTitle = screen.getByText("What happens next?");
      const infoBox = infoTitle.parentElement;
      expect(infoBox).toHaveClass("bg-yellow-100");
      expect(infoBox).toHaveClass("border-2");
      expect(infoBox).toHaveClass("border-black");
    });

    it("applies Memphis theme to primary button", () => {
      render(<SubmitSuccessPage />);

      const browseButton = screen.getByText("Browse Stories").closest("a") as HTMLElement;
      expect(browseButton).toHaveClass("bg-electric-blue");
      // btn-memphis class includes border and shadow styling via CSS
      expect(browseButton).toHaveClass("btn-memphis");
    });

    it("applies Memphis theme to secondary button", () => {
      render(<SubmitSuccessPage />);

      const homeButton = screen.getByText("Back to Home").closest("a") as HTMLElement;
      expect(homeButton).toHaveClass("text-black");
      // btn-memphis class includes border and shadow styling via CSS
      expect(homeButton).toHaveClass("btn-memphis");
    });
  });

  describe("Japanese Theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("applies Japanese theme page styles", () => {
      const { container } = render(<SubmitSuccessPage />);
      const pageDiv = container.firstChild as HTMLElement;
      expect(pageDiv).toHaveClass("bg-rice-paper");
    });

    it("applies Japanese theme to icon container", () => {
      render(<SubmitSuccessPage />);

      const iconContainer = document.querySelector('svg[aria-hidden="true"]')?.parentElement;
      expect(iconContainer).toHaveClass("bg-sakura");
    });

    it("applies Japanese theme to title", () => {
      render(<SubmitSuccessPage />);

      const title = screen.getByText("Story Submitted!");
      expect(title).toHaveClass("font-medium");
      expect(title).toHaveClass("text-sumi-black");
    });

    it("applies Japanese theme to info box", () => {
      render(<SubmitSuccessPage />);

      const infoTitle = screen.getByText("What happens next?");
      const infoBox = infoTitle.parentElement;
      expect(infoBox).toHaveClass("bg-light-200");
      expect(infoBox).toHaveClass("border");
      expect(infoBox).toHaveClass("border-light-300");
    });

    it("applies Japanese theme to primary button", () => {
      render(<SubmitSuccessPage />);

      const browseButton = screen.getByText("Browse Stories").closest("a") as HTMLElement;
      expect(browseButton).toHaveClass("bg-hanko-red");
    });

    it("applies Japanese theme to secondary button", () => {
      render(<SubmitSuccessPage />);

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
      const { container } = render(<SubmitSuccessPage />);
      const pageDiv = container.firstChild as HTMLElement;
      expect(pageDiv).toHaveClass("bg-cream");
    });

    it("applies Organic theme to icon container", () => {
      render(<SubmitSuccessPage />);

      const iconContainer = document.querySelector('svg[aria-hidden="true"]')?.parentElement;
      expect(iconContainer).toHaveClass("bg-sage-light");
    });

    it("applies Organic theme to title", () => {
      render(<SubmitSuccessPage />);

      const title = screen.getByText("Story Submitted!");
      expect(title).toHaveClass("font-display");
      expect(title).toHaveClass("font-semibold");
      expect(title).toHaveClass("text-clay");
    });

    it("applies Organic theme to info box", () => {
      render(<SubmitSuccessPage />);

      const infoTitle = screen.getByText("What happens next?");
      const infoBox = infoTitle.parentElement;
      expect(infoBox).toHaveClass("bg-terracotta/10");
      expect(infoBox).toHaveClass("border");
      expect(infoBox).toHaveClass("border-terracotta/20");
    });

    it("applies Organic theme to primary button", () => {
      render(<SubmitSuccessPage />);

      const browseButton = screen.getByText("Browse Stories").closest("a") as HTMLElement;
      expect(browseButton).toHaveClass("bg-terracotta");
      expect(browseButton).toHaveClass("rounded-full");
    });

    it("applies Organic theme to secondary button", () => {
      render(<SubmitSuccessPage />);

      const homeButton = screen.getByText("Back to Home").closest("a") as HTMLElement;
      expect(homeButton).toHaveClass("text-clay");
      expect(homeButton).toHaveClass("border-2");
      expect(homeButton).toHaveClass("border-sage");
      expect(homeButton).toHaveClass("rounded-full");
    });
  });
});
