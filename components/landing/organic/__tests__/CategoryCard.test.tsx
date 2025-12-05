import { render, screen } from "@/lib/test-utils";
import { CategoryCards } from "../CategoryCard";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock the category stats
jest.mock("@/lib/mock-data/stories", () => ({
  categoryStats: [
    {
      category: "legal",
      label: "Legal Wins",
      description: "Disputes, claims, contracts, tenant rights",
      storyCount: 142,
      colorClass: "legal",
    },
    {
      category: "medical",
      label: "Medical Wins",
      description: "Symptoms, diagnoses, insurance, research",
      storyCount: 98,
      colorClass: "medical",
    },
  ],
}));

describe("CategoryCards Component", () => {
  it("renders without errors", () => {
    expect(() => render(<CategoryCards />)).not.toThrow();
  });

  it("renders section header", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Jump Into a Category")).toBeInTheDocument();
  });

  it("renders Legal Wins category", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Legal Wins")).toBeInTheDocument();
  });

  it("renders Medical Wins category", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Medical Wins")).toBeInTheDocument();
  });

  it("renders legal category description", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Disputes, claims, contracts, tenant rights")).toBeInTheDocument();
  });

  it("renders medical category description", () => {
    render(<CategoryCards />);
    expect(screen.getByText("Symptoms, diagnoses, insurance, research")).toBeInTheDocument();
  });

  it("renders legal category story count", () => {
    render(<CategoryCards />);
    expect(screen.getByText("142")).toBeInTheDocument();
  });

  it("renders medical category story count", () => {
    render(<CategoryCards />);
    expect(screen.getByText("98")).toBeInTheDocument();
  });

  it("renders 'stories' label for both categories", () => {
    render(<CategoryCards />);
    const storiesLabels = screen.getAllByText("stories");
    expect(storiesLabels).toHaveLength(2);
  });

  it("renders 'Explore' links for both categories", () => {
    render(<CategoryCards />);
    const exploreLinks = screen.getAllByText("Explore");
    expect(exploreLinks).toHaveLength(2);
  });

  it("legal category links to correct URL", () => {
    render(<CategoryCards />);
    const legalCard = screen.getByText("Legal Wins").closest("a");
    expect(legalCard).toHaveAttribute("href", "/stories?category=legal");
  });

  it("medical category links to correct URL", () => {
    render(<CategoryCards />);
    const medicalCard = screen.getByText("Medical Wins").closest("a");
    expect(medicalCard).toHaveAttribute("href", "/stories?category=medical");
  });

  it("has proper grid layout", () => {
    const { container } = render(<CategoryCards />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("sm:grid-cols-2");
  });
});
