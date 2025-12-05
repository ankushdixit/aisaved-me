import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Footer Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  it("renders the logo", () => {
    render(<Footer />);
    const logos = screen.getAllByText("AI Saved Me");
    expect(logos.length).toBeGreaterThan(0);
  });

  it("renders the tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/Real people sharing real AI wins/)).toBeInTheDocument();
  });

  it("renders Stories section links", () => {
    render(<Footer />);
    expect(screen.getByText("STORIES")).toBeInTheDocument();
    expect(screen.getByText("Browse All Stories")).toBeInTheDocument();
    expect(screen.getByText("Featured Stories")).toBeInTheDocument();
    expect(screen.getByText("Recent Wins")).toBeInTheDocument();
  });

  it("renders Resources section links", () => {
    render(<Footer />);
    expect(screen.getByText("RESOURCES")).toBeInTheDocument();
    expect(screen.getByText("Submission Guidelines")).toBeInTheDocument();
    expect(screen.getByText("AI Tools Guide")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
  });

  it("renders Legal section links", () => {
    render(<Footer />);
    expect(screen.getByText("LEGAL")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Medical Disclaimer")).toBeInTheDocument();
    expect(screen.getByText("Legal Disclaimer")).toBeInTheDocument();
  });

  it("renders newsletter section", () => {
    render(<Footer />);
    expect(screen.getByText("Stay Updated")).toBeInTheDocument();
    expect(screen.getByText("Get weekly wins in your inbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@email.com")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("renders social icons", () => {
    render(<Footer />);
    expect(screen.getByLabelText("X")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year} AI Saved Me`))).toBeInTheDocument();
  });

  it("renders site URL", () => {
    render(<Footer />);
    expect(screen.getByText("aisaved.me")).toBeInTheDocument();
  });

  it("renders Made with AI text", () => {
    render(<Footer />);
    expect(screen.getByText("Made with AI (of course)")).toBeInTheDocument();
  });

  it("has correct link for Privacy Policy", () => {
    render(<Footer />);
    const link = screen.getByText("Privacy Policy").closest("a");
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("has correct link for Terms of Service", () => {
    render(<Footer />);
    const link = screen.getByText("Terms of Service").closest("a");
    expect(link).toHaveAttribute("href", "/terms");
  });
});
