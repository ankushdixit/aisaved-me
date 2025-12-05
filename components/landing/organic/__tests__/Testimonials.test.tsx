import { render, screen } from "@/lib/test-utils";
import { Testimonials } from "../Testimonials";

// Mock the testimonials data
jest.mock("@/lib/mock-data/testimonials", () => ({
  testimonials: [
    {
      id: "testimonial-1",
      quote:
        "I was about to hire a lawyer for $2,000. Found a similar story here, used the prompts, and won my case myself.",
      author: "Sarah M.",
      outcome: "Saved $2,400 on security deposit",
      initials: "SM",
    },
    {
      id: "testimonial-2",
      quote:
        "The 'Make It Your Own' feature is genius. I adapted someone's insurance appeal letter for my situation and it worked.",
      author: "Lisa K.",
      outcome: "Insurance claim approved: $12,000",
      initials: "LK",
    },
    {
      id: "testimonial-3",
      quote:
        "I was skeptical about AI for medical stuff, but seeing real people's experiences with actual chat logs convinced me to try.",
      author: "Raj P.",
      outcome: "Kidney stone diagnosis confirmed",
      initials: "RP",
    },
  ],
}));

describe("Testimonials Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Testimonials />)).not.toThrow();
  });

  it("renders section header", () => {
    render(<Testimonials />);
    expect(screen.getByText("What Our Community Says")).toBeInTheDocument();
  });

  it("renders first testimonial quote", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/I was about to hire a lawyer for \$2,000/)
    ).toBeInTheDocument();
  });

  it("renders second testimonial quote", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/The 'Make It Your Own' feature is genius/)
    ).toBeInTheDocument();
  });

  it("renders third testimonial quote", () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/I was skeptical about AI for medical stuff/)
    ).toBeInTheDocument();
  });

  it("renders first author name", () => {
    render(<Testimonials />);
    expect(screen.getByText("Sarah M.")).toBeInTheDocument();
  });

  it("renders second author name", () => {
    render(<Testimonials />);
    expect(screen.getByText("Lisa K.")).toBeInTheDocument();
  });

  it("renders third author name", () => {
    render(<Testimonials />);
    expect(screen.getByText("Raj P.")).toBeInTheDocument();
  });

  it("renders first outcome", () => {
    render(<Testimonials />);
    expect(screen.getByText("Saved $2,400 on security deposit")).toBeInTheDocument();
  });

  it("renders second outcome", () => {
    render(<Testimonials />);
    expect(screen.getByText("Insurance claim approved: $12,000")).toBeInTheDocument();
  });

  it("renders third outcome", () => {
    render(<Testimonials />);
    expect(screen.getByText("Kidney stone diagnosis confirmed")).toBeInTheDocument();
  });

  it("renders first author initials", () => {
    render(<Testimonials />);
    expect(screen.getByText("SM")).toBeInTheDocument();
  });

  it("renders second author initials", () => {
    render(<Testimonials />);
    expect(screen.getByText("LK")).toBeInTheDocument();
  });

  it("renders third author initials", () => {
    render(<Testimonials />);
    expect(screen.getByText("RP")).toBeInTheDocument();
  });

  it("has proper grid layout for testimonials", () => {
    const { container } = render(<Testimonials />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("md:grid-cols-3");
  });

  it("renders quote marks for all testimonials", () => {
    const { container } = render(<Testimonials />);
    const quoteMarks = container.querySelectorAll(".text-4xl");
    expect(quoteMarks.length).toBe(3);
  });

  it("all testimonial cards have proper styling", () => {
    const { container } = render(<Testimonials />);
    const cards = container.querySelectorAll(".bg-white.rounded-\\[28px\\]");
    expect(cards.length).toBe(3);
  });
});
