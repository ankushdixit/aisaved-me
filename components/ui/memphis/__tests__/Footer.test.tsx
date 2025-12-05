import { render, screen, fireEvent } from "@/lib/test-utils";
import { Footer } from "../Footer";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Memphis Theme Footer Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  it("renders the logo", () => {
    render(<Footer />);
    const logo = screen.getByText("AI Saved Me");
    expect(logo).toBeInTheDocument();
  });

  it("renders brand tagline", () => {
    render(<Footer />);
    expect(screen.getByText(/Real people sharing real AI wins/i)).toBeInTheDocument();
    expect(screen.getByText(/Verified stories. Actionable prompts/i)).toBeInTheDocument();
  });

  it("has correct link for logo", () => {
    render(<Footer />);
    const logo = screen.getByText("AI Saved Me");
    const logoLink = logo.closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  describe("Footer Sections", () => {
    it("renders STORIES section header", () => {
      render(<Footer />);
      expect(screen.getByText("STORIES")).toBeInTheDocument();
    });

    it("renders RESOURCES section header", () => {
      render(<Footer />);
      expect(screen.getByText("RESOURCES")).toBeInTheDocument();
    });

    it("renders LEGAL section header", () => {
      render(<Footer />);
      expect(screen.getByText("LEGAL")).toBeInTheDocument();
    });
  });

  describe("Stories Section Links", () => {
    it("renders Browse All Stories link", () => {
      render(<Footer />);
      const link = screen.getByText("Browse All Stories").closest("a");
      expect(link).toHaveAttribute("href", "/stories");
    });

    it("renders Legal Wins link", () => {
      render(<Footer />);
      const link = screen.getByText("Legal Wins").closest("a");
      expect(link).toHaveAttribute("href", "/stories?category=legal");
    });

    it("renders Medical Wins link", () => {
      render(<Footer />);
      const link = screen.getByText("Medical Wins").closest("a");
      expect(link).toHaveAttribute("href", "/stories?category=medical");
    });

    it("renders Featured Stories link", () => {
      render(<Footer />);
      const link = screen.getByText("Featured Stories").closest("a");
      expect(link).toHaveAttribute("href", "/stories?featured=true");
    });

    it("renders Recent Wins link", () => {
      render(<Footer />);
      const link = screen.getByText("Recent Wins").closest("a");
      expect(link).toHaveAttribute("href", "/stories?sort=recent");
    });
  });

  describe("Resources Section Links", () => {
    it("renders How It Works link", () => {
      render(<Footer />);
      const link = screen.getByText("How It Works").closest("a");
      expect(link).toHaveAttribute("href", "#how-it-works");
    });

    it("renders Submission Guidelines link", () => {
      render(<Footer />);
      const link = screen.getByText("Submission Guidelines").closest("a");
      expect(link).toHaveAttribute("href", "/guidelines");
    });

    it("renders AI Tools Guide link", () => {
      render(<Footer />);
      const link = screen.getByText("AI Tools Guide").closest("a");
      expect(link).toHaveAttribute("href", "/resources/ai-tools");
    });

    it("renders FAQ link", () => {
      render(<Footer />);
      const link = screen.getByText("FAQ").closest("a");
      expect(link).toHaveAttribute("href", "/faq");
    });

    it("renders Contact Us link", () => {
      render(<Footer />);
      const link = screen.getByText("Contact Us").closest("a");
      expect(link).toHaveAttribute("href", "/contact");
    });
  });

  describe("Legal Section Links", () => {
    it("renders Privacy Policy link", () => {
      render(<Footer />);
      const link = screen.getByText("Privacy Policy").closest("a");
      expect(link).toHaveAttribute("href", "/privacy");
    });

    it("renders Terms of Service link", () => {
      render(<Footer />);
      const link = screen.getByText("Terms of Service").closest("a");
      expect(link).toHaveAttribute("href", "/terms");
    });

    it("renders Medical Disclaimer link", () => {
      render(<Footer />);
      const link = screen.getByText("Medical Disclaimer").closest("a");
      expect(link).toHaveAttribute("href", "/disclaimers#medical");
    });

    it("renders Legal Disclaimer link", () => {
      render(<Footer />);
      const link = screen.getByText("Legal Disclaimer").closest("a");
      expect(link).toHaveAttribute("href", "/disclaimers#legal");
    });

    it("renders Cookie Policy link", () => {
      render(<Footer />);
      const link = screen.getByText("Cookie Policy").closest("a");
      expect(link).toHaveAttribute("href", "/cookies");
    });
  });

  describe("Social Media Links", () => {
    it("renders X (Twitter) link", () => {
      render(<Footer />);
      const link = screen.getByLabelText("X");
      expect(link).toHaveAttribute("href", "https://x.com/aisavedme");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveTextContent("X");
    });

    it("renders LinkedIn link", () => {
      render(<Footer />);
      const link = screen.getByLabelText("LinkedIn");
      expect(link).toHaveAttribute("href", "https://linkedin.com/company/aisavedme");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveTextContent("in");
    });

    it("renders Facebook link", () => {
      render(<Footer />);
      const link = screen.getByLabelText("Facebook");
      expect(link).toHaveAttribute("href", "https://facebook.com/aisavedme");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveTextContent("fb");
    });
  });

  describe("Newsletter Section", () => {
    it("renders newsletter section header", () => {
      render(<Footer />);
      expect(screen.getByText("Stay Updated")).toBeInTheDocument();
    });

    it("renders newsletter description", () => {
      render(<Footer />);
      expect(screen.getByText("Get weekly wins in your inbox")).toBeInTheDocument();
    });

    it("renders email input with proper attributes", () => {
      render(<Footer />);
      const emailInput = screen.getByLabelText("Email for newsletter");
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "you@email.com");
    });

    it("renders Subscribe button", () => {
      render(<Footer />);
      const subscribeButton = screen.getByRole("button", { name: /subscribe/i });
      expect(subscribeButton).toBeInTheDocument();
      expect(subscribeButton).toHaveAttribute("type", "submit");
    });

    it("updates email input value on change", () => {
      render(<Footer />);
      const emailInput = screen.getByLabelText("Email for newsletter") as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(emailInput.value).toBe("test@example.com");
    });

    it("clears email input on form submission", () => {
      render(<Footer />);
      const emailInput = screen.getByLabelText("Email for newsletter") as HTMLInputElement;
      const form = emailInput.closest("form");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(emailInput.value).toBe("test@example.com");

      if (form) {
        fireEvent.submit(form);
      }

      expect(emailInput.value).toBe("");
    });

    it("prevents default form submission", () => {
      render(<Footer />);
      const emailInput = screen.getByLabelText("Email for newsletter");
      const form = emailInput.closest("form");
      const mockPreventDefault = jest.fn();

      if (form) {
        const event = new Event("submit", { bubbles: true, cancelable: true });
        event.preventDefault = mockPreventDefault;
        form.dispatchEvent(event);

        expect(mockPreventDefault).toHaveBeenCalled();
      }
    });
  });

  describe("Bottom Bar", () => {
    it("renders current year in copyright", () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} AI Saved Me`))).toBeInTheDocument();
    });

    it("renders website domain", () => {
      render(<Footer />);
      expect(screen.getByText("aisaved.me")).toBeInTheDocument();
    });

    it("renders Made with AI text", () => {
      render(<Footer />);
      expect(screen.getByText("Made with AI (of course)")).toBeInTheDocument();
    });
  });

  describe("Memphis Theme Styling", () => {
    it("applies Memphis theme background color", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("bg-[#FFF9E6]");
    });

    it("applies Memphis theme border styling", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveClass("border-t-4", "border-black");
    });

    it("has Memphis decorative elements", () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector("footer");
      const decorativeElements = footer?.querySelectorAll(".absolute");
      expect(decorativeElements?.length).toBeGreaterThan(0);
    });

    it("applies font-display class to section headers", () => {
      render(<Footer />);
      const storiesHeader = screen.getByText("STORIES");
      expect(storiesHeader).toHaveClass("font-display");
    });
  });

  describe("Accessibility", () => {
    it("has proper footer semantic element", () => {
      render(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    it("has proper aria-label on email input", () => {
      render(<Footer />);
      const emailInput = screen.getByLabelText("Email for newsletter");
      expect(emailInput).toHaveAttribute("aria-label", "Email for newsletter");
    });

    it("has proper aria-labels on social links", () => {
      render(<Footer />);
      expect(screen.getByLabelText("X")).toBeInTheDocument();
      expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    });

    it("external social links open in new tab with proper rel attributes", () => {
      render(<Footer />);
      const xLink = screen.getByLabelText("X");
      const linkedInLink = screen.getByLabelText("LinkedIn");
      const facebookLink = screen.getByLabelText("Facebook");

      [xLink, linkedInLink, facebookLink].forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive grid layout classes", () => {
      const { container } = render(<Footer />);
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2", "lg:grid-cols-5");
    });

    it("applies responsive flex classes to newsletter section", () => {
      const { container } = render(<Footer />);
      const newsletterContainer = container.querySelector(".flex.flex-col.md\\:flex-row");
      expect(newsletterContainer).toBeInTheDocument();
    });
  });
});
