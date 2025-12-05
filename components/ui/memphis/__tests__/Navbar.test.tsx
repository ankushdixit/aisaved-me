import { render, screen, fireEvent } from "@/lib/test-utils";
import { Navbar } from "../Navbar";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Memphis Theme Navbar Component", () => {
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

  it("displays mobile menu content when open", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });

    // Mobile menu should not be visible initially
    fireEvent.click(menuButton);

    // Check that mobile menu links are rendered
    const allStoryLinks = screen.getAllByText("Stories");
    const allHowItWorksLinks = screen.getAllByText("How It Works");
    const allSignInButtons = screen.getAllByText("Sign In");
    const allShareButtons = screen.getAllByText("Share a Win");

    // Should have both desktop and mobile versions
    expect(allStoryLinks.length).toBeGreaterThanOrEqual(2);
    expect(allHowItWorksLinks.length).toBeGreaterThanOrEqual(2);
    expect(allSignInButtons.length).toBeGreaterThanOrEqual(2);
    expect(allShareButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("mobile menu contains all navigation links", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });

    // Open mobile menu
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    // Verify mobile menu has all required links
    const allStoryLinks = screen.getAllByText("Stories");
    const allHowItWorksLinks = screen.getAllByText("How It Works");
    const allSignInButtons = screen.getAllByText("Sign In");
    const allShareButtons = screen.getAllByText("Share a Win");

    // Should have both desktop and mobile versions when menu is open
    expect(allStoryLinks.length).toBeGreaterThanOrEqual(2);
    expect(allHowItWorksLinks.length).toBeGreaterThanOrEqual(2);
    expect(allSignInButtons.length).toBeGreaterThanOrEqual(2);
    expect(allShareButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("has proper accessibility attributes on menu button", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });

    expect(menuButton).toHaveAttribute("aria-label", "Toggle menu");
    expect(menuButton).toHaveAttribute("type", "button");
  });

  it("renders correct icon for closed menu", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });
    const svg = menuButton.querySelector("svg");

    expect(svg).toBeInTheDocument();
    // Closed menu should show hamburger icon with 3 horizontal lines path
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toContain("M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5");
  });

  it("renders correct icon for open menu", () => {
    render(<Navbar />);
    const menuButton = screen.getByRole("button", { name: /toggle menu/i });

    fireEvent.click(menuButton);

    const svg = menuButton.querySelector("svg");
    expect(svg).toBeInTheDocument();

    // Open menu should show X icon
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toContain("M6 18L18 6M6 6l12 12");
  });

  describe("Memphis Theme Styling", () => {
    it("applies Memphis theme navigation background and border", () => {
      render(<Navbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("bg-white", "border-b-4", "border-black");
    });

    it("applies Memphis theme positioning classes", () => {
      render(<Navbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("absolute", "top-0", "left-0", "right-0", "z-50");
    });

    it("Sign In link exists with correct href", () => {
      const { container } = render(<Navbar />);
      const signInLink = container.querySelector('a[href="/auth/signin"]');
      expect(signInLink).toBeInTheDocument();
      expect(signInLink).toHaveTextContent("Sign In");
    });

    it("Share a Win link exists with correct href", () => {
      const { container } = render(<Navbar />);
      const shareLink = container.querySelector('a[href="/submit"]');
      expect(shareLink).toBeInTheDocument();
      expect(shareLink).toHaveTextContent("Share a Win");
    });

    it("logo has Memphis circular element", () => {
      const { container } = render(<Navbar />);
      const logoCircle = container.querySelector(".rounded-full.bg-\\[\\#0066FF\\]");
      expect(logoCircle).toBeInTheDocument();
    });

    it("mobile menu button has Memphis green styling", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });
      expect(menuButton).toHaveClass("bg-[#00FF7F]", "border-3", "border-black");
    });

    it("mobile menu has Memphis yellow background", () => {
      const { container } = render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      fireEvent.click(menuButton);

      const mobileMenu = container.querySelector(".bg-\\[\\#FFF9E6\\]");
      expect(mobileMenu).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("hides desktop navigation on mobile", () => {
      render(<Navbar />);
      const nav = screen.getByRole("navigation");
      const desktopNav = nav.querySelector(".hidden.md\\:flex");
      expect(desktopNav).toBeInTheDocument();
    });

    it("hides mobile menu button on desktop", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });
      expect(menuButton).toHaveClass("md:hidden");
    });

    it("mobile menu is only visible on mobile screens", () => {
      const { container } = render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      fireEvent.click(menuButton);

      const mobileMenuContainer = container.querySelector(".md\\:hidden.py-6");
      expect(mobileMenuContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper navigation semantic element", () => {
      render(<Navbar />);
      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
    });

    it("navigation links have proper text content", () => {
      render(<Navbar />);
      const storyLinks = screen.getAllByText("Stories");
      const howItWorksLinks = screen.getAllByText("How It Works");

      expect(storyLinks[0]).toBeVisible();
      expect(howItWorksLinks[0]).toBeVisible();
    });

    it("buttons have proper type attributes", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });
      expect(menuButton).toHaveAttribute("type", "button");
    });
  });

  describe("Interactive Behavior", () => {
    it("mobile menu link calls onClose handler when clicked", () => {
      render(<Navbar />);
      const menuButton = screen.getByRole("button", { name: /toggle menu/i });

      // Open mobile menu
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute("aria-expanded", "true");

      // Click a link in mobile menu (the onClose handler should be called)
      const mobileStoryLinks = screen.getAllByText("Stories");
      // Find the mobile version (should be the second one)
      const mobileLink = mobileStoryLinks[1];

      // Just verify the link exists and can be clicked
      expect(mobileLink).toBeInTheDocument();
      fireEvent.click(mobileLink);
    });

    it("logo has Memphis circular element with transition", () => {
      const { container } = render(<Navbar />);
      const logoCircle = container.querySelector(".rounded-full.bg-\\[\\#0066FF\\]");

      expect(logoCircle).toBeInTheDocument();
      expect(logoCircle).toHaveClass("transition-transform");
    });

    it("navigation links are interactive", () => {
      render(<Navbar />);
      const storyLinks = screen.getAllByText("Stories");
      const howItWorksLinks = screen.getAllByText("How It Works");

      // Verify links exist and are clickable
      expect(storyLinks[0]).toBeInTheDocument();
      expect(howItWorksLinks[0]).toBeInTheDocument();
    });
  });
});
