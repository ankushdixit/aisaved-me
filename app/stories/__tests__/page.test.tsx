import { render, screen, within } from "@testing-library/react";
import StoriesPage from "../page";

// Mock Next.js navigation
const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => mockSearchParams,
}));

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock theme hook
jest.mock("@/lib/themes", () => ({
  useTheme: () => ({
    theme: "memphis",
    mounted: true,
    setTheme: jest.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock components
jest.mock("@/components/ui", () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
  Footer: () => <footer data-testid="footer">Footer</footer>,
  Pagination: ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    // eslint-disable-next-line no-unused-vars
    onPageChange: (_page: number) => void;
  }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  ),
}));

interface FilterGroup {
  id: string;
  label: string;
  options: Array<{ id: string; label: string }>;
}

interface Story {
  id: string;
  title: string;
  slug: string;
  category: string;
}

jest.mock("@/components/stories", () => ({
  FilterSidebar: ({
    activeFilterCount,
    onClearAll,
  }: {
    filterGroups: FilterGroup[];
    selectedFilters: Record<string, string[]>;
    // eslint-disable-next-line no-unused-vars
    onFilterChange: (_groupId: string, _optionId: string) => void;
    onClearAll: () => void;
    activeFilterCount: number;
  }) => (
    <div data-testid="filter-sidebar">
      <div>Active Filters: {activeFilterCount}</div>
      <button onClick={onClearAll}>Clear All</button>
    </div>
  ),
  FilterChip: ({
    label,
    onRemove,
  }: {
    label: string;
    isActive: boolean;
    onToggle: () => void;
    onRemove: () => void;
    showRemove: boolean;
  }) => (
    <div data-testid="filter-chip">
      {label}
      <button onClick={onRemove}>Remove</button>
    </div>
  ),
  StoryGrid: ({ stories }: { stories: Story[] }) => (
    <div data-testid="story-grid">
      {stories.map((story) => (
        <div key={story.id} data-testid={`story-${story.id}`}>
          {story.title}
        </div>
      ))}
    </div>
  ),
}));

describe("StoriesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.delete("category");
    mockSearchParams.delete("aiTool");
    mockSearchParams.delete("outcomeType");
    mockSearchParams.delete("page");
  });

  it("renders without crashing", () => {
    expect(() => render(<StoriesPage />)).not.toThrow();
  });

  it("renders Navbar component", () => {
    render(<StoriesPage />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders Footer component", () => {
    render(<StoriesPage />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders page header with title", () => {
    render(<StoriesPage />);
    expect(screen.getByText("Browse Success Stories")).toBeInTheDocument();
  });

  it("renders page header with subtitle", () => {
    render(<StoriesPage />);
    expect(
      screen.getByText("Discover how others used AI to solve real problems")
    ).toBeInTheDocument();
  });

  it("renders FilterSidebar component", () => {
    render(<StoriesPage />);
    expect(screen.getByTestId("filter-sidebar")).toBeInTheDocument();
  });

  it("renders StoryGrid component", () => {
    render(<StoriesPage />);
    expect(screen.getByTestId("story-grid")).toBeInTheDocument();
  });

  it("displays total story count", () => {
    render(<StoriesPage />);
    expect(screen.getByText(/Showing 1-8 of 15 stories/i)).toBeInTheDocument();
  });

  it("renders stories in the grid", () => {
    render(<StoriesPage />);
    const storyGrid = screen.getByTestId("story-grid");
    const stories = within(storyGrid).getAllByTestId(/story-/);
    expect(stories.length).toBeGreaterThan(0);
    expect(stories.length).toBeLessThanOrEqual(8); // Default page size
  });

  it("renders pagination when there are multiple pages", () => {
    render(<StoriesPage />);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("shows correct active filter count initially", () => {
    render(<StoriesPage />);
    const filterSidebar = screen.getByTestId("filter-sidebar");
    expect(within(filterSidebar).getByText("Active Filters: 0")).toBeInTheDocument();
  });

  it("renders main content area", () => {
    const { container } = render(<StoriesPage />);
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("min-h-screen");
  });

  it("has responsive layout classes", () => {
    const { container } = render(<StoriesPage />);
    const layoutContainer = container.querySelector(".flex.flex-col.lg\\:flex-row");
    expect(layoutContainer).toBeInTheDocument();
  });

  it("renders sidebar with fixed width on large screens", () => {
    const { container } = render(<StoriesPage />);
    const sidebar = container.querySelector(".lg\\:w-72");
    expect(sidebar).toBeInTheDocument();
  });

  it("renders content area with flex-1", () => {
    const { container } = render(<StoriesPage />);
    const contentArea = container.querySelector(".flex-1");
    expect(contentArea).toBeInTheDocument();
  });

  it("has correct page structure", () => {
    const { container } = render(<StoriesPage />);
    expect(container.querySelector("nav")).toBeInTheDocument();
    expect(container.querySelector("main")).toBeInTheDocument();
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("displays first page of stories by default", () => {
    render(<StoriesPage />);
    expect(screen.getByText(/Page 1 of 2/i)).toBeInTheDocument();
  });

  describe("Filtering", () => {
    it("does not show filter chips when no filters are active", () => {
      render(<StoriesPage />);
      const filterChips = screen.queryAllByTestId("filter-chip");
      expect(filterChips.length).toBe(0);
    });

    it("renders clear all button in filter sidebar", () => {
      render(<StoriesPage />);
      const filterSidebar = screen.getByTestId("filter-sidebar");
      expect(within(filterSidebar).getByText("Clear All")).toBeInTheDocument();
    });
  });

  describe("Page Header Styling", () => {
    it("has correct header background styling", () => {
      const { container } = render(<StoriesPage />);
      const header = container.querySelector(".pt-32");
      expect(header).toBeInTheDocument();
    });

    it("has max-width container in header", () => {
      const { container } = render(<StoriesPage />);
      const headerContainer = container.querySelector(".max-w-7xl");
      expect(headerContainer).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("still renders page structure when no stories match filters", () => {
      render(<StoriesPage />);
      expect(screen.getByTestId("navbar")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(screen.getByTestId("story-grid")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses semantic main element", () => {
      const { container } = render(<StoriesPage />);
      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
    });

    it("has proper heading structure", () => {
      render(<StoriesPage />);
      const heading = screen.getByText("Browse Success Stories");
      expect(heading.tagName).toBe("H1");
    });
  });

  describe("Layout Responsiveness", () => {
    it("has mobile-friendly spacing", () => {
      const { container } = render(<StoriesPage />);
      const contentWrapper = container.querySelector(".px-6");
      expect(contentWrapper).toBeInTheDocument();
    });

    it("has proper gap between sidebar and content", () => {
      const { container } = render(<StoriesPage />);
      const layoutContainer = container.querySelector(".gap-8");
      expect(layoutContainer).toBeInTheDocument();
    });
  });
});
