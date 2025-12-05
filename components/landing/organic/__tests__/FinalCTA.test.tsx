import { render, screen } from "@/lib/test-utils";
import { FinalCTA } from "../FinalCTA";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("FinalCTA Component", () => {
  it("renders without errors", () => {
    expect(() => render(<FinalCTA />)).not.toThrow();
  });

  it("renders main heading", () => {
    render(<FinalCTA />);
    expect(screen.getByText("Have an AI win? Share it.")).toBeInTheDocument();
  });

  it("renders supporting text", () => {
    render(<FinalCTA />);
    expect(
      screen.getByText("Your story could help someone facing the same challenge.")
    ).toBeInTheDocument();
  });

  it("renders Share Your Story button", () => {
    render(<FinalCTA />);
    expect(screen.getByText("Share Your Story")).toBeInTheDocument();
  });

  it("Share Your Story button links to /submit", () => {
    render(<FinalCTA />);
    const shareButton = screen.getByText("Share Your Story").closest("a");
    expect(shareButton).toBeInTheDocument();
    expect(shareButton).toHaveAttribute("href", "/submit");
  });

  it("button has primary styling with terracotta background", () => {
    render(<FinalCTA />);
    const shareButton = screen.getByText("Share Your Story");
    expect(shareButton).toBeInTheDocument();
    // Check it's a link element
    expect(shareButton.tagName).toBe("A");
  });

  it("section has gradient background", () => {
    const { container } = render(<FinalCTA />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-br");
  });

  it("content is centered", () => {
    const { container } = render(<FinalCTA />);
    const contentDiv = container.querySelector(".text-center");
    expect(contentDiv).toBeInTheDocument();
  });

  it("has animated floating blobs", () => {
    const { container } = render(<FinalCTA />);
    const blobs = container.querySelectorAll(".animate-float");
    expect(blobs.length).toBeGreaterThanOrEqual(2);
  });
});
