import { render, screen } from "@/lib/test-utils";
import { WeeklyStats } from "../memphis/WeeklyStats";
import { type WeeklyStats as WeeklyStatsType } from "@/lib/mock-data/admin-stats";

describe("WeeklyStats", () => {
  const mockStats: WeeklyStatsType[] = [
    { label: "New Submissions", value: 24 },
    { label: "Stories Published", value: 18 },
    { label: "New Users", value: 156 },
    { label: "Total Engagement", value: "2,847" },
    { label: "Avg. Time on Site", value: "4m 32s" },
  ];

  it("renders without errors", () => {
    expect(() => render(<WeeklyStats stats={mockStats} />)).not.toThrow();
  });

  it("renders the header", () => {
    render(<WeeklyStats stats={mockStats} />);
    expect(screen.getByText("This Week")).toBeInTheDocument();
  });

  it("renders all stat labels", () => {
    render(<WeeklyStats stats={mockStats} />);
    expect(screen.getByText("New Submissions")).toBeInTheDocument();
    expect(screen.getByText("Stories Published")).toBeInTheDocument();
    expect(screen.getByText("New Users")).toBeInTheDocument();
    expect(screen.getByText("Total Engagement")).toBeInTheDocument();
    expect(screen.getByText("Avg. Time on Site")).toBeInTheDocument();
  });

  it("renders all stat values", () => {
    render(<WeeklyStats stats={mockStats} />);
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("156")).toBeInTheDocument();
    expect(screen.getByText("2,847")).toBeInTheDocument();
    expect(screen.getByText("4m 32s")).toBeInTheDocument();
  });

  it("renders empty state gracefully", () => {
    render(<WeeklyStats stats={[]} />);
    expect(screen.getByText("This Week")).toBeInTheDocument();
  });

  it("handles numeric values correctly", () => {
    const numericStats: WeeklyStatsType[] = [{ label: "Test Metric", value: 100 }];
    render(<WeeklyStats stats={numericStats} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("handles string values correctly", () => {
    const stringStats: WeeklyStatsType[] = [{ label: "Test Metric", value: "1,000,000" }];
    render(<WeeklyStats stats={stringStats} />);
    expect(screen.getByText("1,000,000")).toBeInTheDocument();
  });
});
