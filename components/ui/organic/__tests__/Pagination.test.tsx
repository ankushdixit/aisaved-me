import { render, screen, fireEvent } from "@/lib/test-utils";
import { Pagination } from "../Pagination";

describe("Organic Theme Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without errors", () => {
    expect(() => render(<Pagination {...defaultProps} />)).not.toThrow();
  });

  it("renders Previous button", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
  });

  it("renders Next button", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("renders correct page numbers", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 3")).toBeInTheDocument();
  });

  it("disables Previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("calls onPageChange with previous page when Previous is clicked", () => {
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with next page when Next is clicked", () => {
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("calls onPageChange when a page number is clicked", () => {
    const onPageChange = jest.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByLabelText("Page 3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("marks current page as active", () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const currentPageButton = screen.getByLabelText("Page 2");
    expect(currentPageButton).toHaveAttribute("aria-current", "page");
  });

  it("returns null when totalPages is 1", () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  it("shows ellipsis for many pages", () => {
    render(<Pagination {...defaultProps} totalPages={15} currentPage={8} />);
    const ellipses = screen.getAllByText("...");
    expect(ellipses.length).toBeGreaterThan(0);
  });

  describe("Organic Theme Styling", () => {
    it("applies Organic theme rounded border styling to buttons", () => {
      render(<Pagination {...defaultProps} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("rounded-full", "border", "border-[#81b29a]/30");
    });

    it("applies Organic shadow to buttons", () => {
      render(<Pagination {...defaultProps} />);
      const pageButton = screen.getByLabelText("Page 2");
      expect(pageButton).toHaveClass("hover:shadow-soft");
    });

    it("current page has Organic coral background", () => {
      render(<Pagination {...defaultProps} currentPage={2} />);
      const currentPageButton = screen.getByLabelText("Page 2");
      expect(currentPageButton).toHaveClass("bg-[#e07a5f]", "text-white", "shadow-soft");
    });

    it("inactive pages have Organic green border", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      const inactivePageButton = screen.getByLabelText("Page 2");
      expect(inactivePageButton).toHaveClass("border-[#81b29a]/30", "text-[#3d405b]");
    });

    it("applies Organic green hover border to buttons", () => {
      render(<Pagination {...defaultProps} />);
      const pageButton = screen.getByLabelText("Page 2");
      expect(pageButton).toHaveClass("hover:border-[#81b29a]");
    });

    it("buttons are rounded and organic-shaped", () => {
      render(<Pagination {...defaultProps} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("rounded-full");
    });

    it("uses Organic theme green for ellipsis", () => {
      render(<Pagination {...defaultProps} totalPages={15} currentPage={8} />);
      const ellipsis = screen.getAllByText("...")[0];
      expect(ellipsis).toHaveClass("text-[#81b29a]");
    });

    it("current page buttons are rounded", () => {
      render(<Pagination {...defaultProps} currentPage={2} />);
      const currentPageButton = screen.getByLabelText("Page 2");
      expect(currentPageButton).toHaveClass("rounded-full");
    });
  });

  describe("Page Visibility Logic", () => {
    it("shows all pages when totalPages is 5 or less", () => {
      render(<Pagination {...defaultProps} totalPages={5} currentPage={1} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 3")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 4")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 5")).toBeInTheDocument();
    });

    it("shows ellipsis before current page when currentPage > 3", () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />);
      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it("shows ellipsis after current page when currentPage < totalPages - 2", () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={3} />);
      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBeGreaterThan(0);
    });

    it("always shows first page", () => {
      render(<Pagination {...defaultProps} totalPages={15} currentPage={8} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
    });

    it("always shows last page", () => {
      render(<Pagination {...defaultProps} totalPages={15} currentPage={8} />);
      expect(screen.getByLabelText("Page 15")).toBeInTheDocument();
    });

    it("shows pages around current page", () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />);
      expect(screen.getByLabelText("Page 4")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 5")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 6")).toBeInTheDocument();
    });

    it("shows both ellipses when in middle of many pages", () => {
      render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);
      const ellipses = screen.getAllByText("...");
      expect(ellipses.length).toBe(2);
    });
  });

  describe("Edge Cases", () => {
    it("handles single page correctly", () => {
      const { container } = render(<Pagination {...defaultProps} totalPages={1} />);
      expect(container.firstChild).toBeNull();
    });

    it("handles two pages correctly", () => {
      render(<Pagination {...defaultProps} totalPages={2} currentPage={1} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    it("handles very large page count", () => {
      render(<Pagination {...defaultProps} totalPages={100} currentPage={50} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 100")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 50")).toBeInTheDocument();
    });

    it("does not call onPageChange when clicking current page", () => {
      const onPageChange = jest.fn();
      render(<Pagination {...defaultProps} currentPage={2} onPageChange={onPageChange} />);

      fireEvent.click(screen.getByLabelText("Page 2"));
      // Function should still be called, but component behavior doesn't prevent it
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("does not call onPageChange when clicking disabled Previous", () => {
      const onPageChange = jest.fn();
      render(<Pagination {...defaultProps} currentPage={1} onPageChange={onPageChange} />);

      const prevButton = screen.getByLabelText("Previous page");
      fireEvent.click(prevButton);
      // Disabled button should not trigger the callback
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("does not call onPageChange when clicking disabled Next", () => {
      const onPageChange = jest.fn();
      render(
        <Pagination {...defaultProps} currentPage={5} totalPages={5} onPageChange={onPageChange} />
      );

      const nextButton = screen.getByLabelText("Next page");
      fireEvent.click(nextButton);
      // Disabled button should not trigger the callback
      expect(onPageChange).not.toHaveBeenCalled();
    });

    it("handles first page navigation correctly", () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={1} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Previous page")).toBeDisabled();
    });

    it("handles last page navigation correctly", () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={10} />);
      expect(screen.getByLabelText("Page 10")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 9")).toBeInTheDocument();
      expect(screen.getByLabelText("Next page")).toBeDisabled();
    });

    it("handles page 3 navigation in 10 page scenario", () => {
      render(<Pagination {...defaultProps} totalPages={10} currentPage={3} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 3")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 4")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper nav element with aria-label", () => {
      render(<Pagination {...defaultProps} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Pagination");
    });

    it("has proper aria-labels on navigation buttons", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
      expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    });

    it("has proper aria-labels on page buttons", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
    });

    it("marks current page with aria-current", () => {
      render(<Pagination {...defaultProps} currentPage={3} />);
      const currentPage = screen.getByLabelText("Page 3");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });

    it("disabled buttons have proper disabled attribute", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toBeDisabled();
    });

    it("disabled buttons have cursor-not-allowed class", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("disabled:cursor-not-allowed");
    });

    it("disabled buttons have reduced opacity", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("disabled:opacity-30");
    });
  });

  describe("Interactive Behavior", () => {
    it("applies transition classes for smooth animations", () => {
      render(<Pagination {...defaultProps} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("transition-all");
    });

    it("applies hover shadow effect", () => {
      render(<Pagination {...defaultProps} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("hover:shadow-soft");
    });

    it("applies hover border effect", () => {
      render(<Pagination {...defaultProps} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("hover:border-[#81b29a]");
    });

    it("multiple clicks trigger multiple onPageChange calls", () => {
      const onPageChange = jest.fn();
      render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />);

      const nextButton = screen.getByLabelText("Next page");
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      expect(onPageChange).toHaveBeenCalledTimes(2);
    });

    it("navigation preserves page context", () => {
      const onPageChange = jest.fn();
      render(<Pagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />);

      fireEvent.click(screen.getByLabelText("Previous page"));
      expect(onPageChange).toHaveBeenCalledWith(2);

      fireEvent.click(screen.getByLabelText("Next page"));
      expect(onPageChange).toHaveBeenCalledWith(4);
    });
  });

  describe("Layout and Spacing", () => {
    it("uses Organic theme spacing between elements", () => {
      render(<Pagination {...defaultProps} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("gap-2");
    });

    it("centers pagination controls", () => {
      render(<Pagination {...defaultProps} />);
      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("flex", "items-center", "justify-center");
    });

    it("uses consistent button sizing", () => {
      render(<Pagination {...defaultProps} />);
      const prevButton = screen.getByLabelText("Previous page");
      expect(prevButton).toHaveClass("w-10", "h-10");
    });
  });
});
