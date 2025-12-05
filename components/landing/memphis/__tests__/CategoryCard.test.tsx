import { render, screen } from "@/lib/test-utils";
import { CategoryCards } from "../CategoryCard";

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

describe("CategoryCards Component (Memphis)", () => {
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

  it("renders 'stories' label for each category", () => {
    render(<CategoryCards />);
    const storiesLabels = screen.getAllByText("stories");
    expect(storiesLabels.length).toBe(2);
  });

  it("renders Explore links", () => {
    render(<CategoryCards />);
    const exploreLinks = screen.getAllByText(/Explore/);
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

  it("applies Memphis-style borders to cards", () => {
    const { container } = render(<CategoryCards />);
    const cards = container.querySelectorAll("a.border-4.border-black");
    expect(cards.length).toBe(2);
  });

  it("applies Memphis shadow to cards", () => {
    const { container } = render(<CategoryCards />);
    const cards = container.querySelectorAll(".shadow-memphis-lg");
    expect(cards.length).toBe(2);
  });

  it("has Memphis rotation transforms on cards", () => {
    const { container } = render(<CategoryCards />);
    const cards = container.querySelectorAll("a");
    const cardsWithRotation = Array.from(cards).filter(
      (card) => card.className.includes("-rotate-1") || card.className.includes("rotate-1")
    );
    expect(cardsWithRotation.length).toBe(2);
  });

  it("has hover effects on category cards", () => {
    const { container } = render(<CategoryCards />);
    const cards = container.querySelectorAll(".hover\\:rotate-0");
    expect(cards.length).toBe(2);
  });

  it("renders category label badges with Memphis styling", () => {
    const { container } = render(<CategoryCards />);
    const badges = container.querySelectorAll(".border-3.border-black.font-display");
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it("applies pattern-dots background to section", () => {
    const { container } = render(<CategoryCards />);
    const section = container.querySelector("section.bg-pattern-dots");
    expect(section).toBeInTheDocument();
  });

  it("has border styling on section", () => {
    const { container } = render(<CategoryCards />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("applies Memphis shadow to section title", () => {
    const { container } = render(<CategoryCards />);
    const title = container.querySelector(".text-memphis-shadow");
    expect(title).toBeInTheDocument();
  });

  it("has correct grid layout", () => {
    const { container } = render(<CategoryCards />);
    const grid = container.querySelector(".grid.grid-cols-1.sm\\:grid-cols-2");
    expect(grid).toBeInTheDocument();
  });
});
