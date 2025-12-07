import { render, screen, fireEvent } from "@/lib/test-utils";
import { PendingStoriesTable } from "../memphis/PendingStoriesTable";
import { type PendingStory } from "@/lib/mock-data/pending-stories";

describe("PendingStoriesTable", () => {
  const mockStories: PendingStory[] = [
    {
      id: "story-001",
      title: "Test Story One",
      author: "Author A",
      category: "legal",
      status: "pending",
      submittedAt: "2025-12-06T10:00:00Z",
      submittedRelative: "2 hours ago",
      content: "Test content",
      verified: true,
    },
    {
      id: "story-002",
      title: "Test Story Two",
      author: "Author B",
      category: "medical",
      status: "approved",
      submittedAt: "2025-12-05T10:00:00Z",
      submittedRelative: "yesterday",
      content: "Test content 2",
      verified: false,
    },
    {
      id: "story-003",
      title: "Test Story Three",
      author: "Author C",
      category: "financial",
      status: "published",
      submittedAt: "2025-12-04T10:00:00Z",
      submittedRelative: "2 days ago",
      content: "Test content 3",
      verified: true,
    },
  ];

  const mockOnView = jest.fn();
  const mockOnApprove = jest.fn();
  const mockOnReject = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without errors", () => {
    expect(() =>
      render(
        <PendingStoriesTable
          stories={mockStories}
          onView={mockOnView}
          onApprove={mockOnApprove}
          onReject={mockOnReject}
        />
      )
    ).not.toThrow();
  });

  it("renders the table header", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Stories Pending Review")).toBeInTheDocument();
  });

  it("renders all story titles", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Test Story One")).toBeInTheDocument();
    expect(screen.getByText("Test Story Two")).toBeInTheDocument();
    expect(screen.getByText("Test Story Three")).toBeInTheDocument();
  });

  it("renders author names", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Author A")).toBeInTheDocument();
    expect(screen.getByText("Author B")).toBeInTheDocument();
    expect(screen.getByText("Author C")).toBeInTheDocument();
  });

  it("renders category badges", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByText("Medical")).toBeInTheDocument();
    expect(screen.getByText("Financial")).toBeInTheDocument();
  });

  it("renders status badges", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Published")).toBeInTheDocument();
  });

  it("calls onView when View button is clicked", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const viewButton = screen.getByText("View");
    fireEvent.click(viewButton);
    expect(mockOnView).toHaveBeenCalledWith(mockStories[0]);
  });

  it("calls onApprove when approve button is clicked", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const approveButtons = screen.getAllByText("✓");
    fireEvent.click(approveButtons[0]);
    expect(mockOnApprove).toHaveBeenCalledWith(mockStories[0]);
  });

  it("calls onReject when reject button is clicked", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const rejectButton = screen.getByText("✕");
    fireEvent.click(rejectButton);
    expect(mockOnReject).toHaveBeenCalledWith(mockStories[0]);
  });

  it("shows Publish button for approved stories", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Publish")).toBeInTheDocument();
  });

  it("calls onApprove when Publish button is clicked", () => {
    render(
      <PendingStoriesTable
        stories={mockStories}
        onView={mockOnView}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const publishButton = screen.getByText("Publish");
    fireEvent.click(publishButton);
    expect(mockOnApprove).toHaveBeenCalledWith(mockStories[1]);
  });
});
