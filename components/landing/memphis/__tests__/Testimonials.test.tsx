import { render, screen } from "@/lib/test-utils";
import { Testimonials } from "../Testimonials";

describe("Testimonials Component (Memphis)", () => {
  it("renders without errors", () => {
    expect(() => render(<Testimonials />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<Testimonials />);
    expect(screen.getByText("What Our Community Says")).toBeInTheDocument();
  });

  it("renders all three testimonial cards", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".bg-white.border-4.border-black");
    expect(cards.length).toBe(3);
  });

  it("renders first testimonial quote", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(
        "I was about to hire a lawyer for $2,000. Found a similar story here, used the prompts, and won my case myself."
      )
    ).toBeInTheDocument();
  });

  it("renders second testimonial quote", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(
        "The 'Make It Your Own' feature is genius. I adapted someone's insurance appeal letter for my situation and it worked."
      )
    ).toBeInTheDocument();
  });

  it("renders third testimonial quote", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(
        "I was skeptical about AI for medical stuff, but seeing real people's experiences with actual chat logs convinced me to try."
      )
    ).toBeInTheDocument();
  });

  it("renders first testimonial author", () => {
    render(<Testimonials />);
    expect(screen.getByText("Sarah M.")).toBeInTheDocument();
  });

  it("renders second testimonial author", () => {
    render(<Testimonials />);
    expect(screen.getByText("Lisa K.")).toBeInTheDocument();
  });

  it("renders third testimonial author", () => {
    render(<Testimonials />);
    expect(screen.getByText("Raj P.")).toBeInTheDocument();
  });

  it("renders first testimonial outcome", () => {
    render(<Testimonials />);
    expect(screen.getByText("Saved $2,400 on security deposit")).toBeInTheDocument();
  });

  it("renders second testimonial outcome", () => {
    render(<Testimonials />);
    expect(screen.getByText("Insurance claim approved: $12,000")).toBeInTheDocument();
  });

  it("renders third testimonial outcome", () => {
    render(<Testimonials />);
    expect(screen.getByText("Kidney stone diagnosis confirmed")).toBeInTheDocument();
  });

  it("renders author initials in avatars", () => {
    render(<Testimonials />);
    expect(screen.getByText("SM")).toBeInTheDocument();
    expect(screen.getByText("LK")).toBeInTheDocument();
    expect(screen.getByText("RP")).toBeInTheDocument();
  });

  it("renders opening quote marks for each testimonial", () => {
    const { container } = render(<Testimonials />);
    const quoteMarks = container.querySelectorAll(".text-5xl.font-display");
    expect(quoteMarks.length).toBeGreaterThanOrEqual(3);
  });

  it("applies Memphis-style borders to testimonial cards", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".border-4.border-black");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("applies Memphis shadow to testimonial cards", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".shadow-memphis-md");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("has Memphis rotation on testimonial cards", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".card-tilted-left, .card-tilted-right");
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });

  it("has hover effects on testimonial cards", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".hover\\:shadow-memphis-lg");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("has shadow-only hover effect (non-clickable cards use subtle engagement)", () => {
    const { container } = render(<Testimonials />);
    // Non-clickable cards have shadow increase only, not rotation
    const cardsWithShadowHover = container.querySelectorAll(".hover\\:shadow-memphis-lg");
    expect(cardsWithShadowHover.length).toBeGreaterThanOrEqual(3);
    // Verify rotation is NOT changed on hover (removed for consistency)
    const cardsWithRotationHover = container.querySelectorAll(".hover\\:rotate-0");
    expect(cardsWithRotationHover.length).toBe(0);
  });

  it("applies correct grid layout", () => {
    const { container } = render(<Testimonials />);
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("applies Memphis shadow to section title", () => {
    const { container } = render(<Testimonials />);
    const title = container.querySelector(".text-memphis-shadow");
    expect(title).toBeInTheDocument();
  });

  it("applies pattern-dots background to section", () => {
    const { container } = render(<Testimonials />);
    const section = container.querySelector("section.bg-pattern-dots");
    expect(section).toBeInTheDocument();
  });

  it("has border styling on section", () => {
    const { container } = render(<Testimonials />);
    const section = container.querySelector("section.border-t-4.border-b-4.border-black");
    expect(section).toBeInTheDocument();
  });

  it("renders avatars with Memphis border", () => {
    const { container } = render(<Testimonials />);
    const avatars = container.querySelectorAll(".w-12.h-12.border-3.border-black");
    expect(avatars.length).toBe(3);
  });

  it("applies font-display to quote marks", () => {
    const { container } = render(<Testimonials />);
    const quoteMarks = container.querySelectorAll(".text-5xl.font-display.font-bold");
    expect(quoteMarks.length).toBeGreaterThanOrEqual(3);
  });

  it("applies font-body to quote text", () => {
    const { container } = render(<Testimonials />);
    const quoteTexts = container.querySelectorAll(".font-body.leading-relaxed");
    expect(quoteTexts.length).toBeGreaterThanOrEqual(3);
  });
});
