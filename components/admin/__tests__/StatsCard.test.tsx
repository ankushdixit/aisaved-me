import { render, screen } from "@/lib/test-utils";
import { StatsCard } from "../memphis/StatsCard";
import { type AdminStat } from "@/lib/mock-data/admin-stats";

describe("StatsCard", () => {
  const mockStat: AdminStat = {
    id: "pending",
    label: "Pending Review",
    value: 12,
    change: {
      value: "3 new",
      trend: "up",
    },
    icon: "pending",
  };

  it("renders without errors", () => {
    expect(() => render(<StatsCard stat={mockStat} />)).not.toThrow();
  });

  it("displays the label correctly", () => {
    render(<StatsCard stat={mockStat} />);
    expect(screen.getByText("Pending Review")).toBeInTheDocument();
  });

  it("displays the value correctly", () => {
    render(<StatsCard stat={mockStat} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("displays the change value correctly", () => {
    render(<StatsCard stat={mockStat} />);
    expect(screen.getByText(/3 new/)).toBeInTheDocument();
  });

  it("displays up trend arrow for upward changes", () => {
    render(<StatsCard stat={mockStat} />);
    expect(screen.getByText(/↑/)).toBeInTheDocument();
  });

  it("displays different icon for each stat type", () => {
    const publishedStat: AdminStat = {
      ...mockStat,
      id: "published",
      label: "Published",
      icon: "published",
    };
    render(<StatsCard stat={publishedStat} />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("handles stats without change values", () => {
    const statWithoutChange: AdminStat = {
      id: "test",
      label: "Test Stat",
      value: 100,
      icon: "users",
    };
    render(<StatsCard stat={statWithoutChange} />);
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.queryByText("↑")).not.toBeInTheDocument();
  });

  it("displays string values correctly", () => {
    const statWithStringValue: AdminStat = {
      id: "views",
      label: "Page Views",
      value: "24.5K",
      icon: "views",
    };
    render(<StatsCard stat={statWithStringValue} />);
    expect(screen.getByText("24.5K")).toBeInTheDocument();
  });
});
