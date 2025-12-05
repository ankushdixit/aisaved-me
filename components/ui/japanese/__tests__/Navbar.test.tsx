import { render, screen, fireEvent } from "@/lib/test-utils";
import { Navbar } from "../Navbar";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Japanese Theme Navbar Component", () => {
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

  it("applies correct styling classes to navigation", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation");

    expect(nav).toHaveClass("absolute", "top-0", "left-0", "right-0", "z-50", "bg-light-50");
  });
});
