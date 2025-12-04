import { render, screen } from "@testing-library/react";
import { CategoryCards } from "../CategoryCard";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("CategoryCards Component", () => {
  it("renders without errors", () => {
    expect(() => render(<CategoryCards />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Jump Into a Category")).toBeInTheDocument();
  });

  it("renders Legal Wins category", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Legal Wins")).toBeInTheDocument();
    expect(screen.getByText("Disputes, claims, contracts, tenant rights")).toBeInTheDocument();
  });

  it("renders Medical Wins category", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Medical Wins")).toBeInTheDocument();
    expect(screen.getByText("Symptoms, diagnoses, insurance, research")).toBeInTheDocument();
  });

  it("renders story counts", () => {
    render(<CategoryCards />);
    expect(screen.getByText("142")).toBeInTheDocument();
    expect(screen.getByText("98")).toBeInTheDocument();
  });

  it("renders Explore links", () => {
    render(<CategoryCards />);
    const exploreLinks = screen.getAllByText("Explore");
    expect(exploreLinks.length).toBe(2);
  });

  it("has correct link for Legal category", () => {
    render(<CategoryCards />);
    const legalCard = screen.getByText("Legal Wins").closest("a");
    expect(legalCard).toHaveAttribute("href", "/stories?category=legal");
  });

  it("has correct link for Medical category", () => {
    render(<CategoryCards />);
    const medicalCard = screen.getByText("Medical Wins").closest("a");
    expect(medicalCard).toHaveAttribute("href", "/stories?category=medical");
  });
});
