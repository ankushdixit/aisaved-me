import { render, screen } from "@/lib/test-utils";
import Home from "../page";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Home Page", () => {
  it("renders without errors", () => {
    expect(() => render(<Home />)).not.toThrow();
  });

  it("renders the main heading", () => {
    render(<Home />);
    // Text is split across elements, so check for both parts
    expect(screen.getByText("Real people")).toBeInTheDocument();
    expect(screen.getByText("winning with AI.")).toBeInTheDocument();
  });

  it("displays the victory counter section", () => {
    render(<Home />);
    expect(screen.getByText(/Total Saved by Our Community/i)).toBeInTheDocument();
  });

  it("shows the LIVE indicator", () => {
    render(<Home />);
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("renders the Featured Story section", () => {
    render(<Home />);
    expect(screen.getByText("Featured Story")).toBeInTheDocument();
  });

  it("renders the Features section", () => {
    render(<Home />);
    expect(screen.getByText("What Makes Us Different")).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<Home />);
    expect(screen.getByText("Make It Your Own")).toBeInTheDocument();
    expect(screen.getByText("Verified Chat Sessions")).toBeInTheDocument();
    expect(screen.getByText("Privacy Protected")).toBeInTheDocument();
  });

  it("renders the How It Works section", () => {
    render(<Home />);
    // Multiple instances: nav link and section heading
    expect(screen.getAllByText("How It Works").length).toBeGreaterThan(0);
  });

  it("renders the Testimonials section", () => {
    render(<Home />);
    expect(screen.getByText("What Our Community Says")).toBeInTheDocument();
  });

  it("renders category cards", () => {
    render(<Home />);
    // Multiple instances exist (in CategoryCards and Footer)
    expect(screen.getAllByText("Legal Wins").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Medical Wins").length).toBeGreaterThan(0);
  });

  it("renders navigation links", () => {
    render(<Home />);
    const storyLinks = screen.getAllByText("Stories");
    expect(storyLinks.length).toBeGreaterThan(0);
  });

  it("renders footer", () => {
    render(<Home />);
    expect(screen.getByText(/AI Saved Me. All rights reserved/i)).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Home />);
    const browseButtons = screen.getAllByText("Browse Stories");
    expect(browseButtons.length).toBeGreaterThan(0);
  });
});
