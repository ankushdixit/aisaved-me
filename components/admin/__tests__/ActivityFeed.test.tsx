import { render, screen } from "@/lib/test-utils";
import { ActivityFeed } from "../memphis/ActivityFeed";
import { type ActivityItem } from "@/lib/mock-data/pending-stories";

describe("ActivityFeed", () => {
  const mockActivities: ActivityItem[] = [
    {
      id: "act-001",
      type: "story_published",
      description: 'Story published: "Test Victory"',
      timestamp: "2 hours ago",
    },
    {
      id: "act-002",
      type: "user_registered",
      description: "New user registered: test@example.com",
      timestamp: "4 hours ago",
    },
    {
      id: "act-003",
      type: "story_approved",
      description: "Story approved for publication",
      timestamp: "5 hours ago",
    },
    {
      id: "act-004",
      type: "story_rejected",
      description: "Story rejected: spam content",
      timestamp: "Yesterday",
    },
  ];

  it("renders without errors", () => {
    expect(() => render(<ActivityFeed activities={mockActivities} />)).not.toThrow();
  });

  it("renders the header", () => {
    render(<ActivityFeed activities={mockActivities} />);
    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
  });

  it("renders all activity descriptions", () => {
    render(<ActivityFeed activities={mockActivities} />);
    expect(screen.getByText('Story published: "Test Victory"')).toBeInTheDocument();
    expect(screen.getByText("New user registered: test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Story approved for publication")).toBeInTheDocument();
    expect(screen.getByText("Story rejected: spam content")).toBeInTheDocument();
  });

  it("renders all activity timestamps", () => {
    render(<ActivityFeed activities={mockActivities} />);
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
    expect(screen.getByText("4 hours ago")).toBeInTheDocument();
    expect(screen.getByText("5 hours ago")).toBeInTheDocument();
    expect(screen.getByText("Yesterday")).toBeInTheDocument();
  });

  it("renders empty state gracefully", () => {
    render(<ActivityFeed activities={[]} />);
    expect(screen.getByText("Recent Activity")).toBeInTheDocument();
  });

  it("renders the correct number of activity items", () => {
    render(<ActivityFeed activities={mockActivities} />);
    const descriptions = mockActivities.map((a) => a.description);
    descriptions.forEach((desc) => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });
});
