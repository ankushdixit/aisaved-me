import { render, screen, fireEvent } from "@/lib/test-utils";
import { FilterSidebar } from "../FilterSidebar";
import type { FilterGroup } from "@/lib/types/story";

const mockFilterGroups: FilterGroup[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { value: "legal", label: "Legal Wins", count: 142 },
      { value: "medical", label: "Medical Wins", count: 98 },
    ],
  },
  {
    id: "aiTool",
    label: "AI Tool Used",
    options: [
      { value: "claude", label: "Claude", count: 120 },
      { value: "chatgpt", label: "ChatGPT", count: 95 },
    ],
  },
];

describe("FilterSidebar Component", () => {
  const defaultProps = {
    filterGroups: mockFilterGroups,
    selectedFilters: {},
    onFilterChange: jest.fn(),
    onClearAll: jest.fn(),
    activeFilterCount: 0,
  };

  it("renders without errors", () => {
    expect(() => render(<FilterSidebar {...defaultProps} />)).not.toThrow();
  });

  it("renders Filters heading", () => {
    render(<FilterSidebar {...defaultProps} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("renders all filter categories", () => {
    render(<FilterSidebar {...defaultProps} />);
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("AI Tool Used")).toBeInTheDocument();
  });

  it("renders all filter options", () => {
    render(<FilterSidebar {...defaultProps} />);
    expect(screen.getByText("Legal Wins")).toBeInTheDocument();
    expect(screen.getByText("Medical Wins")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("ChatGPT")).toBeInTheDocument();
  });

  it("renders option counts", () => {
    render(<FilterSidebar {...defaultProps} />);
    expect(screen.getByText("(142)")).toBeInTheDocument();
    expect(screen.getByText("(98)")).toBeInTheDocument();
  });

  it("calls onFilterChange when option is clicked", () => {
    const onFilterChange = jest.fn();
    render(<FilterSidebar {...defaultProps} onFilterChange={onFilterChange} />);

    fireEvent.click(screen.getByText("Legal Wins"));
    expect(onFilterChange).toHaveBeenCalledWith("category", "legal");
  });

  it("shows Clear all button when filters are active", () => {
    render(<FilterSidebar {...defaultProps} activeFilterCount={2} />);
    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("hides Clear all button when no filters are active", () => {
    render(<FilterSidebar {...defaultProps} activeFilterCount={0} />);
    expect(screen.queryByText("Clear all")).not.toBeInTheDocument();
  });

  it("calls onClearAll when Clear all is clicked", () => {
    const onClearAll = jest.fn();
    render(<FilterSidebar {...defaultProps} activeFilterCount={2} onClearAll={onClearAll} />);

    fireEvent.click(screen.getByText("Clear all"));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("shows active filter count when filters are selected", () => {
    render(<FilterSidebar {...defaultProps} activeFilterCount={3} />);
    expect(screen.getByText("3 active filters")).toBeInTheDocument();
  });

  it("shows singular form for single active filter", () => {
    render(<FilterSidebar {...defaultProps} activeFilterCount={1} />);
    expect(screen.getByText("1 active filter")).toBeInTheDocument();
  });

  it("marks selected filters with checkbox", () => {
    render(<FilterSidebar {...defaultProps} selectedFilters={{ category: ["legal"] }} />);

    const checkboxes = screen.getAllByRole("checkbox");
    const legalCheckbox = checkboxes.find((cb) => {
      const label = cb.closest("label");
      return label?.textContent?.includes("Legal Wins");
    });
    expect(legalCheckbox).toBeChecked();
  });
});
