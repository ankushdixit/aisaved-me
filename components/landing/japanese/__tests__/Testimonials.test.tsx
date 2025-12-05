import { render, screen } from "@/lib/test-utils";
import { Testimonials } from "../Testimonials";

describe("Testimonials Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Testimonials />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<Testimonials />);
    expect(screen.getByText("What Our Community Says")).toBeInTheDocument();
  });

  it("renders section header divider", () => {
    const { container } = render(<Testimonials />);
    const divider = container.querySelector(".h-px.w-16.bg-dark-900");
    expect(divider).toBeInTheDocument();
  });

  it("renders all three testimonial cards", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".bg-white.border.border-light-300.p-6");
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
    const quoteMarks = container.querySelectorAll(".text-3xl.font-display.text-dark-900");
    expect(quoteMarks.length).toBe(3);
  });

  it("applies correct grid layout", () => {
    const { container } = render(<Testimonials />);
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("has hover effects on testimonial cards", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".hover\\:border-dark-900");
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it("renders avatar containers with correct styling", () => {
    const { container } = render(<Testimonials />);
    const avatars = container.querySelectorAll(".w-9.h-9.border.border-dark-900");
    expect(avatars.length).toBe(3);
  });
});
