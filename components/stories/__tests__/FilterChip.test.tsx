import { render, screen, fireEvent } from "@/lib/test-utils";
import { FilterChip } from "../memphis/FilterChip";

describe("FilterChip Component", () => {
  it("renders without errors", () => {
    expect(() =>
      render(<FilterChip label="Legal" isActive={false} onToggle={() => {}} />)
    ).not.toThrow();
  });

  it("renders the label text", () => {
    render(<FilterChip label="Legal Wins" isActive={false} onToggle={() => {}} />);
    expect(screen.getByText("Legal Wins")).toBeInTheDocument();
  });

  it("calls onToggle when clicked", () => {
    const onToggle = jest.fn();
    render(<FilterChip label="Legal" isActive={false} onToggle={onToggle} />);

    fireEvent.click(screen.getByText("Legal"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows remove button when showRemove and isActive are true", () => {
    const onRemove = jest.fn();
    render(
      <FilterChip
        label="Legal"
        isActive={true}
        onToggle={() => {}}
        onRemove={onRemove}
        showRemove={true}
      />
    );

    expect(screen.getByText("×")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = jest.fn();
    render(
      <FilterChip
        label="Legal"
        isActive={true}
        onToggle={() => {}}
        onRemove={onRemove}
        showRemove={true}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("has different styling when active vs inactive", () => {
    const { rerender } = render(<FilterChip label="Legal" isActive={false} onToggle={() => {}} />);
    const inactiveButton = screen.getByRole("button");
    expect(inactiveButton.className).toContain("bg-white");

    rerender(<FilterChip label="Legal" isActive={true} onToggle={() => {}} />);
    const activeButton = screen.getByRole("button");
    expect(activeButton.className).toContain("bg-[#0066FF]");
  });
});
