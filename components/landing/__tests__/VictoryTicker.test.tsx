import { render, screen } from "@/lib/test-utils";
import { VictoryTicker } from "../memphis/VictoryTicker";

// Mock next/link
jest.mock("next/link", () => {
  return ({
    children,
    href,
    className,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  };
});

describe("VictoryTicker Component", () => {
  it("renders without errors", () => {
    expect(() => render(<VictoryTicker />)).not.toThrow();
  });

  it("renders ticker stories from row 1", () => {
    render(<VictoryTicker />);
    // Check for first story from row 1
    expect(screen.getAllByText("Enterprise damage claim defeated").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$3,200").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ankush D. - 2 hours ago").length).toBeGreaterThan(0);
  });

  it("renders ticker stories from row 2", () => {
    render(<VictoryTicker />);
    // Check for first story from row 2
    expect(screen.getAllByText("Contractor paid after small claims prep").length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText("$5,500").length).toBeGreaterThan(0);
  });

  it("renders category tags", () => {
    render(<VictoryTicker />);
    const legalTags = screen.getAllByText("Legal");
    const medicalTags = screen.getAllByText("Medical");
    expect(legalTags.length).toBeGreaterThan(0);
    expect(medicalTags.length).toBeGreaterThan(0);
  });

  it("renders medical outcomes correctly", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Diagnosis confirmed").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ER visit avoided").length).toBeGreaterThan(0);
  });

  it("renders amount labels correctly", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("saved").length).toBeGreaterThan(0);
    expect(screen.getAllByText("recovered").length).toBeGreaterThan(0);
    expect(screen.getAllByText("won").length).toBeGreaterThan(0);
  });

  it("has ticker container class for pause on hover", () => {
    const { container } = render(<VictoryTicker />);
    expect(container.querySelector(".ticker-container")).toBeInTheDocument();
  });

  describe("Navigation functionality", () => {
    it("renders ticker cards with slugs as links", () => {
      const { container } = render(<VictoryTicker />);
      const links = container.querySelectorAll('a[href^="/stories/"]');
      expect(links.length).toBeGreaterThan(0);
    });

    it("renders links with correct href format", () => {
      const { container } = render(<VictoryTicker />);
      const expectedHref = "/stories/how-i-beat-enterprise-damage-claim";
      const link = container.querySelector(`a[href="${expectedHref}"]`);
      expect(link).toBeInTheDocument();
    });

    it("renders multiple story links with different slugs", () => {
      const { container } = render(<VictoryTicker />);

      // Check for multiple different story slugs
      const slugs = [
        "how-i-beat-enterprise-damage-claim",
        "kidney-stones-diagnosis",
        "tenant-rights-victory-security-deposit",
        "insurance-claim-denied-approved",
        "small-claims-contractor-success",
      ];

      slugs.forEach((slug) => {
        const link = container.querySelector(`a[href="/stories/${slug}"]`);
        expect(link).toBeInTheDocument();
      });
    });

    it("wraps story content in link for clickable cards", () => {
      const { container } = render(<VictoryTicker />);

      // Find a link and check it contains story content
      const link = container.querySelector('a[href="/stories/how-i-beat-enterprise-damage-claim"]');
      expect(link).toBeInTheDocument();

      // The link should contain the story title
      expect(link?.textContent).toContain("Enterprise damage claim defeated");
    });

    it("applies correct styling classes to linked cards", () => {
      const { container } = render(<VictoryTicker />);
      const link = container.querySelector('a[href="/stories/how-i-beat-enterprise-damage-claim"]');

      // Check that the link has the expected classes
      expect(link).toBeInTheDocument();
      const classNames = link?.className ?? "";
      expect(classNames).toContain("block");
      expect(classNames).toContain("flex-shrink-0");
      expect(classNames).toContain("bg-white");
      expect(classNames).toContain("border-3");
      expect(classNames).toContain("shadow-memphis-md");
    });
  });
});
