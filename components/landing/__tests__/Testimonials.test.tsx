import { render, screen } from "@/lib/test-utils";
import { Testimonials } from "../memphis/Testimonials";

describe("Testimonials Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Testimonials />)).not.toThrow();
  });

  it("renders section title", () => {
    render(<Testimonials />);
    expect(screen.getByText("What Our Community Says")).toBeInTheDocument();
  });

  it("renders first testimonial quote", () => {
    render(<Testimonials />);
    expect(screen.getByText(/I was about to hire a lawyer for \$2,000/)).toBeInTheDocument();
  });

  it("renders second testimonial quote", () => {
    render(<Testimonials />);
    expect(screen.getByText(/The 'Make It Your Own' feature is genius/)).toBeInTheDocument();
  });

  it("renders third testimonial quote", () => {
    render(<Testimonials />);
    expect(screen.getByText(/I was skeptical about AI for medical stuff/)).toBeInTheDocument();
  });

  it("renders author names", () => {
    render(<Testimonials />);
    expect(screen.getByText("Sarah M.")).toBeInTheDocument();
    expect(screen.getByText("Lisa K.")).toBeInTheDocument();
    expect(screen.getByText("Raj P.")).toBeInTheDocument();
  });

  it("renders outcomes", () => {
    render(<Testimonials />);
    expect(screen.getByText("Saved $2,400 on security deposit")).toBeInTheDocument();
    expect(screen.getByText("Insurance claim approved: $12,000")).toBeInTheDocument();
    expect(screen.getByText("Kidney stone diagnosis confirmed")).toBeInTheDocument();
  });

  it("renders author initials", () => {
    render(<Testimonials />);
    expect(screen.getByText("SM")).toBeInTheDocument();
    expect(screen.getByText("LK")).toBeInTheDocument();
    expect(screen.getByText("RP")).toBeInTheDocument();
  });

  it("renders three testimonial cards", () => {
    const { container } = render(<Testimonials />);
    // Look for the card wrapper divs that have border-4 and shadow-memphis-md classes
    const cards = container.querySelectorAll(".border-4.shadow-memphis-md");
    expect(cards.length).toBe(3);
  });
});
