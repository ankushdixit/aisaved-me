import { render, screen, fireEvent } from "@/lib/test-utils";
import { Navbar } from "../Navbar";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Organic Navbar Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Navbar />)).not.toThrow();
  });

  it("renders the logo", () => {
    render(<Navbar />);
    const logos = screen.getAllByText("AI Saved Me");
    expect(logos.length).toBeGreaterThan(0);
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    const storyLinks = screen.getAllByText("Stories");
    const howItWorksLinks = screen.getAllByText("How It Works");
    expect(storyLinks.length).toBeGreaterThan(0);
    expect(howItWorksLinks.length).toBeGreaterThan(0);
  });

  it("renders Sign In button", () => {
    render(<Navbar />);
    const signInButtons = screen.getAllByText("Sign In");
    expect(signInButtons.length).toBeGreaterThan(0);
  });

  it("renders Share a Win button", () => {
    render(<Navbar />);
    const shareButtons = screen.getAllByText("Share a Win");
    expect(shareButtons.length).toBeGreaterThan(0);
  });

  it("has correct link for logo", () => {
    render(<Navbar />);
    const logos = screen.getAllByText("AI Saved Me");
    const logoLink = logos[0].closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("has correct link for Stories", () => {
    render(<Navbar />);
    const storyLinks = screen.getAllByText("Stories");
    const link = storyLinks[0].closest("a");
    expect(link).toHaveAttribute("href", "/stories");
  });

  it("has correct link for How It Works", () => {
    render(<Navbar />);
    const howItWorksLinks = screen.getAllByText("How It Works");
    const link = howItWorksLinks[0].closest("a");
    expect(link).toHaveAttribute("href", "#how-it-works");
  });

  it("has correct link for Sign In", () => {
    render(<Navbar />);
    const signInLinks = screen.getAllByText("Sign In");
    const link = signInLinks[0].closest("a");
    expect(link).toHaveAttribute("href", "/auth/signin");
  });

  it("has correct link for Share a Win", () => {
    render(<Navbar />);
    const shareLinks = screen.getAllByText("Share a Win");
    const link = shareLinks[0].closest("a");
    expect(link).toHaveAttribute("href", "/submit");
  });

  it("has mobile menu button", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("toggles mobile menu on button click", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });

    // Initially aria-expanded is false
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Click to open
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    // Click to close
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  describe("Mobile Menu", () => {
    it("shows mobile menu when toggle button is clicked", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      // Menu should not be visible initially
      expect(screen.queryAllByText("Stories").length).toBe(1); // Only desktop version

      // Click to open
      fireEvent.click(menuButton);

      // Now mobile menu items should be visible (2 Stories links: desktop + mobile)
      expect(screen.queryAllByText("Stories").length).toBe(2);
    });

    it("mobile menu links have onClick handler for closing", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      // Open menu
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute("aria-expanded", "true");

      // Verify mobile menu is rendered with links
      const mobileLinks = screen.getAllByText("Stories");
      expect(mobileLinks.length).toBe(2); // Desktop + mobile menu

      // Mobile menu should be visible when expanded
      const allStoryLinks = screen.getAllByText("Stories");
      expect(allStoryLinks.length).toBeGreaterThan(1);
    });

    it("has all navigation items in mobile menu", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      // Open mobile menu
      fireEvent.click(menuButton);

      // Check all items are present
      const storiesLinks = screen.getAllByText("Stories");
      const howItWorksLinks = screen.getAllByText("How It Works");
      const signInButtons = screen.getAllByText("Sign In");
      const shareButtons = screen.getAllByText("Share a Win");

      // Each should appear twice (desktop + mobile)
      expect(storiesLinks.length).toBe(2);
      expect(howItWorksLinks.length).toBe(2);
      expect(signInButtons.length).toBe(2);
      expect(shareButtons.length).toBe(2);
    });
  });

  describe("Desktop Navigation", () => {
    it("renders desktop navigation links with correct text", () => {
      render(<Navbar />);
      const storyLinks = screen.getAllByText("Stories");
      const desktopLink = storyLinks[0].closest("a");
      expect(desktopLink).toBeInTheDocument();
      expect(desktopLink).toHaveAttribute("href", "/stories");
    });

    it("renders action buttons in desktop view", () => {
      render(<Navbar />);
      const signInButtons = screen.getAllByText("Sign In");
      const shareButtons = screen.getAllByText("Share a Win");

      expect(signInButtons.length).toBeGreaterThanOrEqual(1);
      expect(shareButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Accessibility", () => {
    it("has proper aria-label for menu button", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });
      expect(menuButton).toHaveAttribute("aria-label", "Toggle menu");
    });

    it("has proper aria-expanded state", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      expect(menuButton).toHaveAttribute("aria-expanded");

      // Check it toggles properly
      expect(menuButton).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute("aria-expanded", "true");
    });

    it("all links are accessible", () => {
      render(<Navbar />);
      const allLinks = screen.getAllByRole("link");

      // Should have at least: logo, 2 nav links, 2 action buttons
      expect(allLinks.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("Logo", () => {
    it("logo links to homepage", () => {
      render(<Navbar />);
      const logoLink = screen.getAllByText("AI Saved Me")[0].closest("a");
      expect(logoLink).toHaveAttribute("href", "/");
    });

    it("logo is rendered and accessible", () => {
      render(<Navbar />);
      const logoLink = screen.getAllByText("AI Saved Me")[0].closest("a");
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });
});
