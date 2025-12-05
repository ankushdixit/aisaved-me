import { render, screen, fireEvent } from "@/lib/test-utils";
import { FilterSidebar } from "../FilterSidebar";
import type { FilterGroup } from "@/lib/types/story";

const mockFilterGroups: FilterGroup[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { value: "legal", label: "Legal", count: 10 },
      { value: "medical", label: "Medical", count: 5 },
      { value: "financial", label: "Financial", count: 8 },
    ],
  },
  {
    id: "aiTool",
    label: "AI Tool",
    options: [
      { value: "claude", label: "Claude", count: 12 },
      { value: "chatgpt", label: "ChatGPT", count: 7 },
    ],
  },
];

const mockSelectedFilters = {
  category: ["legal"],
  aiTool: [],
};

describe("FilterSidebar Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() =>
      render(
        <FilterSidebar
          filterGroups={mockFilterGroups}
          selectedFilters={{}}
          onFilterChange={() => {}}
          onClearAll={() => {}}
          activeFilterCount={0}
        />
      )
    ).not.toThrow();
  });

  it("displays the Filters header", () => {
    render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("shows Clear all button when filters are active", () => {
    render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={mockSelectedFilters}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={1}
      />
    );
    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("does not show Clear all button when no filters are active", () => {
    render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );
    expect(screen.queryByText("Clear all")).not.toBeInTheDocument();
  });

  it("displays active filter count with correct pluralization", () => {
    const { rerender } = render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={mockSelectedFilters}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={1}
      />
    );
    expect(screen.getByText("1 active filter")).toBeInTheDocument();

    rerender(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={mockSelectedFilters}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={2}
      />
    );
    expect(screen.getByText("2 active filters")).toBeInTheDocument();
  });

  it("renders all filter groups", () => {
    render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("AI Tool")).toBeInTheDocument();
  });

  it("renders all filter options with labels and counts", () => {
    render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );
    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByText("(10)")).toBeInTheDocument();
    expect(screen.getByText("Medical")).toBeInTheDocument();
    expect(screen.getByText("(5)")).toBeInTheDocument();
  });

  it("calls onClearAll when Clear all button is clicked", () => {
    const onClearAll = jest.fn();
    render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={mockSelectedFilters}
        onFilterChange={() => {}}
        onClearAll={onClearAll}
        activeFilterCount={1}
      />
    );

    fireEvent.click(screen.getByText("Clear all"));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("calls onFilterChange when an option is clicked", () => {
    const onFilterChange = jest.fn();
    render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={{}}
        onFilterChange={onFilterChange}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );

    const legalCheckbox = screen.getByLabelText(/Legal/);
    fireEvent.click(legalCheckbox);
    expect(onFilterChange).toHaveBeenCalledWith("category", "legal");
  });

  it("shows checkmark for selected filters", () => {
    const { container } = render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={mockSelectedFilters}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={1}
      />
    );

    const checkmarks = container.querySelectorAll("svg");
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it("applies Japanese theme styling", () => {
    const { container } = render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );

    const aside = container.querySelector("aside");
    expect(aside).toHaveClass("bg-[#faf8f5]");
    expect(aside).toHaveClass("border-[#d4d0c8]");
  });

  it("renders with empty filter groups", () => {
    render(
      <FilterSidebar
        filterGroups={[]}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("handles filters with zero count", () => {
    const groupsWithZero: FilterGroup[] = [
      {
        id: "category",
        label: "Category",
        options: [{ value: "legal", label: "Legal", count: 0 }],
      },
    ];

    render(
      <FilterSidebar
        filterGroups={groupsWithZero}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );
    expect(screen.queryByText("(0)")).not.toBeInTheDocument();
  });

  it("uses uppercase tracking for group labels", () => {
    const { container } = render(
      <FilterSidebar
        filterGroups={mockFilterGroups}
        selectedFilters={{}}
        onFilterChange={() => {}}
        onClearAll={() => {}}
        activeFilterCount={0}
      />
    );

    const groupHeaders = container.querySelectorAll("h3");
    groupHeaders.forEach((header) => {
      expect(header.className).toContain("uppercase");
      expect(header.className).toContain("tracking-wider");
    });
  });
});
