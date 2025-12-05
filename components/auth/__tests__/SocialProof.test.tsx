import { render, screen } from "@testing-library/react";
import { SocialProof } from "../memphis/SocialProof";

describe("SocialProof (Memphis)", () => {
  it("renders logo link", () => {
    render(<SocialProof />);

    const logo = screen.getByRole("link", { name: "AI Saved Me" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("displays tagline", () => {
    render(<SocialProof />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /Real People.*Real AI Wins/
    );
  });

  it("displays stats section", () => {
    render(<SocialProof />);

    expect(screen.getByText("$2.4M+")).toBeInTheDocument();
    expect(screen.getByText("Saved by our community")).toBeInTheDocument();
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Success stories")).toBeInTheDocument();
    expect(screen.getByText("15K+")).toBeInTheDocument();
    expect(screen.getByText("Lives impacted")).toBeInTheDocument();
  });

  it("displays testimonial quote", () => {
    render(<SocialProof />);

    expect(screen.getByText(/Claude helped me save \$3,200/)).toBeInTheDocument();
    expect(screen.getByText("— Ankush D., Legal Win")).toBeInTheDocument();
  });

  it("renders with correct Memphis theme styles", () => {
    render(<SocialProof />);

    // Check for Memphis blue background
    const container = screen.getByRole("link", { name: "AI Saved Me" }).closest("div");
    expect(container).toHaveClass("bg-[#0066FF]");
  });
});
