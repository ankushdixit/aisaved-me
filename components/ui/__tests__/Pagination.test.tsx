import { render, screen, fireEvent } from "@/lib/test-utils";
import { Pagination } from "../memphis/Pagination";

describe("Pagination Component", () => {
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
});
