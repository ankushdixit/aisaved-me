import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../Navbar";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Navbar Component", () => {
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
});
