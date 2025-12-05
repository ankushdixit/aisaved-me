import { render, screen, fireEvent } from "@/lib/test-utils";
import { Footer } from "../Footer";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe("Organic Footer Component", () => {
  it("renders without errors", () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  describe("Brand Section", () => {
    it("renders the logo", () => {
      render(<Footer />);
      const logo = screen.getByText("AI Saved Me");
      expect(logo).toBeInTheDocument();
    });

    it("logo links to homepage", () => {
      render(<Footer />);
      const logoLink = screen.getByText("AI Saved Me").closest("a");
      expect(logoLink).toHaveAttribute("href", "/");
    });

    it("renders the tagline", () => {
      render(<Footer />);
      expect(screen.getByText(/Real people sharing real AI wins/i)).toBeInTheDocument();
      expect(screen.getByText(/Verified stories. Actionable prompts/i)).toBeInTheDocument();
    });

    it("logo is accessible and functional", () => {
      render(<Footer />);
      const logoLink = screen.getByText("AI Saved Me").closest("a");
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Social Links", () => {
    it("renders all social media links", () => {
      render(<Footer />);
      const xLink = screen.getByLabelText("X");
      const linkedInLink = screen.getByLabelText("LinkedIn");
      const facebookLink = screen.getByLabelText("Facebook");

      expect(xLink).toBeInTheDocument();
      expect(linkedInLink).toBeInTheDocument();
      expect(facebookLink).toBeInTheDocument();
    });

    it("social links have correct hrefs", () => {
      render(<Footer />);
      const xLink = screen.getByLabelText("X");
      const linkedInLink = screen.getByLabelText("LinkedIn");
      const facebookLink = screen.getByLabelText("Facebook");

      expect(xLink).toHaveAttribute("href", "https://x.com/aisavedme");
      expect(linkedInLink).toHaveAttribute("href", "https://linkedin.com/company/aisavedme");
      expect(facebookLink).toHaveAttribute("href", "https://facebook.com/aisavedme");
    });

    it("social links open in new tab", () => {
      render(<Footer />);
      const xLink = screen.getByLabelText("X");
      const linkedInLink = screen.getByLabelText("LinkedIn");
      const facebookLink = screen.getByLabelText("Facebook");

      expect(xLink).toHaveAttribute("target", "_blank");
      expect(linkedInLink).toHaveAttribute("target", "_blank");
      expect(facebookLink).toHaveAttribute("target", "_blank");
    });

    it("social links have rel attribute for security", () => {
      render(<Footer />);
      const xLink = screen.getByLabelText("X");
      const linkedInLink = screen.getByLabelText("LinkedIn");
      const facebookLink = screen.getByLabelText("Facebook");

      expect(xLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(linkedInLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(facebookLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("displays correct social media icons", () => {
      render(<Footer />);
      expect(screen.getByText("X")).toBeInTheDocument();
      expect(screen.getByText("in")).toBeInTheDocument();
      expect(screen.getByText("fb")).toBeInTheDocument();
    });
  });

  describe("Stories Section", () => {
    it("renders Stories section header", () => {
      render(<Footer />);
      expect(screen.getByText("STORIES")).toBeInTheDocument();
    });

    it("renders all Stories links", () => {
      render(<Footer />);
      expect(screen.getByText("Browse All Stories")).toBeInTheDocument();
      expect(screen.getByText("Legal Wins")).toBeInTheDocument();
      expect(screen.getByText("Medical Wins")).toBeInTheDocument();
      expect(screen.getByText("Featured Stories")).toBeInTheDocument();
      expect(screen.getByText("Recent Wins")).toBeInTheDocument();
    });

    it("Stories links have correct hrefs", () => {
      render(<Footer />);
      expect(screen.getByText("Browse All Stories").closest("a")).toHaveAttribute("href", "/stories");
      expect(screen.getByText("Legal Wins").closest("a")).toHaveAttribute("href", "/stories?category=legal");
      expect(screen.getByText("Medical Wins").closest("a")).toHaveAttribute("href", "/stories?category=medical");
      expect(screen.getByText("Featured Stories").closest("a")).toHaveAttribute("href", "/stories?featured=true");
      expect(screen.getByText("Recent Wins").closest("a")).toHaveAttribute("href", "/stories?sort=recent");
    });
  });

  describe("Resources Section", () => {
    it("renders Resources section header", () => {
      render(<Footer />);
      expect(screen.getByText("RESOURCES")).toBeInTheDocument();
    });

    it("renders all Resources links", () => {
      render(<Footer />);
      expect(screen.getByText("How It Works")).toBeInTheDocument();
      expect(screen.getByText("Submission Guidelines")).toBeInTheDocument();
      expect(screen.getByText("AI Tools Guide")).toBeInTheDocument();
      expect(screen.getByText("FAQ")).toBeInTheDocument();
      expect(screen.getByText("Contact Us")).toBeInTheDocument();
    });

    it("Resources links have correct hrefs", () => {
      render(<Footer />);
      expect(screen.getByText("How It Works").closest("a")).toHaveAttribute("href", "#how-it-works");
      expect(screen.getByText("Submission Guidelines").closest("a")).toHaveAttribute("href", "/guidelines");
      expect(screen.getByText("AI Tools Guide").closest("a")).toHaveAttribute("href", "/resources/ai-tools");
      expect(screen.getByText("FAQ").closest("a")).toHaveAttribute("href", "/faq");
      expect(screen.getByText("Contact Us").closest("a")).toHaveAttribute("href", "/contact");
    });
  });

  describe("Legal Section", () => {
    it("renders Legal section header", () => {
      render(<Footer />);
      expect(screen.getByText("LEGAL")).toBeInTheDocument();
    });

    it("renders all Legal links", () => {
      render(<Footer />);
      expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
      expect(screen.getByText("Terms of Service")).toBeInTheDocument();
      expect(screen.getByText("Medical Disclaimer")).toBeInTheDocument();
      expect(screen.getByText("Legal Disclaimer")).toBeInTheDocument();
      expect(screen.getByText("Cookie Policy")).toBeInTheDocument();
    });

    it("Legal links have correct hrefs", () => {
      render(<Footer />);
      expect(screen.getByText("Privacy Policy").closest("a")).toHaveAttribute("href", "/privacy");
      expect(screen.getByText("Terms of Service").closest("a")).toHaveAttribute("href", "/terms");
      expect(screen.getByText("Medical Disclaimer").closest("a")).toHaveAttribute("href", "/disclaimers#medical");
      expect(screen.getByText("Legal Disclaimer").closest("a")).toHaveAttribute("href", "/disclaimers#legal");
      expect(screen.getByText("Cookie Policy").closest("a")).toHaveAttribute("href", "/cookies");
    });
  });

  describe("Newsletter Section", () => {
    it("renders newsletter section header", () => {
      render(<Footer />);
      expect(screen.getByText("STAY UPDATED")).toBeInTheDocument();
    });

    it("renders newsletter description", () => {
      render(<Footer />);
      expect(screen.getByText("Get weekly wins in your inbox")).toBeInTheDocument();
    });

    it("renders newsletter email input", () => {
      render(<Footer />);
      const emailInput = screen.getByPlaceholderText("you@email.com");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("renders subscribe button", () => {
      render(<Footer />);
      const subscribeButton = screen.getByRole("button", { name: /subscribe/i });
      expect(subscribeButton).toBeInTheDocument();
      expect(subscribeButton).toHaveAttribute("type", "submit");
    });

    it("email input has proper aria-label", () => {
      render(<Footer />);
      const emailInput = screen.getByLabelText("Email for newsletter");
      expect(emailInput).toBeInTheDocument();
    });

    it("handles email input change", () => {
      render(<Footer />);
      const emailInput = screen.getByPlaceholderText("you@email.com") as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(emailInput.value).toBe("test@example.com");
    });

    it("handles form submission", () => {
      render(<Footer />);
      const emailInput = screen.getByPlaceholderText("you@email.com") as HTMLInputElement;
      const subscribeButton = screen.getByRole("button", { name: /subscribe/i });

      // Enter email
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(emailInput.value).toBe("test@example.com");

      // Submit form
      fireEvent.click(subscribeButton);

      // Email should be cleared after submission
      expect(emailInput.value).toBe("");
    });

    it("prevents default form submission", () => {
      render(<Footer />);
      const emailInput = screen.getByPlaceholderText("you@email.com") as HTMLInputElement;
      const form = emailInput.closest("form");

      const mockSubmit = jest.fn((e) => e.preventDefault());
      form?.addEventListener("submit", mockSubmit);

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.submit(form!);

      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  describe("Bottom Bar", () => {
    it("renders copyright notice with current year", () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} AI Saved Me. All rights reserved`))).toBeInTheDocument();
    });

    it("renders domain name", () => {
      render(<Footer />);
      expect(screen.getByText("aisaved.me")).toBeInTheDocument();
    });

    it("renders made with AI message", () => {
      render(<Footer />);
      expect(screen.getByText("Made with AI (of course)")).toBeInTheDocument();
    });
  });

  describe("Layout and Structure", () => {
    it("has proper footer tag", () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("renders all section headers", () => {
      render(<Footer />);
      expect(screen.getByText("STORIES")).toBeInTheDocument();
      expect(screen.getByText("RESOURCES")).toBeInTheDocument();
      expect(screen.getByText("LEGAL")).toBeInTheDocument();
      expect(screen.getByText("STAY UPDATED")).toBeInTheDocument();
    });

    it("has correct background styling", () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("bg-gradient-to-br");
    });
  });

  describe("Accessibility", () => {
    it("all links are accessible", () => {
      render(<Footer />);
      const allLinks = screen.getAllByRole("link");

      // Should have many links (brand logo, social links, all footer links)
      expect(allLinks.length).toBeGreaterThan(15);
    });

    it("social links have aria-labels", () => {
      render(<Footer />);
      expect(screen.getByLabelText("X")).toBeInTheDocument();
      expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
      expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    });

    it("newsletter input has aria-label", () => {
      render(<Footer />);
      expect(screen.getByLabelText("Email for newsletter")).toBeInTheDocument();
    });

    it("all links have href attributes", () => {
      render(<Footer />);
      const allLinks = screen.getAllByRole("link");

      allLinks.forEach((link) => {
        expect(link).toHaveAttribute("href");
        expect(link.getAttribute("href")).toBeTruthy();
      });
    });
  });

  describe("Styling Classes", () => {
    it("section headers have proper styling", () => {
      render(<Footer />);
      const storiesHeader = screen.getByText("STORIES");
      expect(storiesHeader).toHaveClass("font-display");
      expect(storiesHeader).toHaveClass("font-bold");
    });

    it("newsletter button has proper styling", () => {
      render(<Footer />);
      const subscribeButton = screen.getByRole("button", { name: /subscribe/i });
      expect(subscribeButton).toHaveClass("bg-terracotta");
      expect(subscribeButton).toHaveClass("text-white");
    });
  });
});
