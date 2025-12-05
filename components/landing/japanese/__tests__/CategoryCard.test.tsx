import { render, screen } from "@/lib/test-utils";
import { CategoryCards } from "../CategoryCard";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    className,
    style,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    style?: React.CSSProperties;
  }) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
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

  it("renders section header divider", () => {
    const { container } = render(<CategoryCards />);
    const divider = container.querySelector(".h-px.w-16.bg-dark-900");
    expect(divider).toBeInTheDocument();
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

  it("applies Hanko red border accent to cards", () => {
    const { container } = render(<CategoryCards />);
    const cards = container.querySelectorAll("a");
    const cardsWithBorder = Array.from(cards).filter((card) =>
      card.className.includes("border-l-2")
    );
    expect(cardsWithBorder.length).toBe(2);
    cardsWithBorder.forEach((card) => {
      const htmlCard = card as HTMLElement;
      // Check that the inline style is set
      expect(htmlCard.style.borderLeftColor).toBe("rgb(196, 30, 58)");
    });
  });

  it("has hover effects on category cards", () => {
    render(<CategoryCards />);
    const legalCard = screen.getByText("Legal Wins").closest("a");
    expect(legalCard?.className).toContain("hover:border-dark-900");
  });
});
