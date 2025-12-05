import { render, screen, fireEvent } from "@/lib/test-utils";
import { FilterChip } from "../FilterChip";

describe("FilterChip Component - Japanese Theme", () => {
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
    expect(inactiveButton.className).toContain("bg-[#faf8f5]");
    expect(inactiveButton.className).toContain("text-[#1a1a1a]");

    rerender(<FilterChip label="Legal" isActive={true} onToggle={() => {}} />);
    const activeButton = screen.getByRole("button");
    expect(activeButton.className).toContain("bg-[#1a1a1a]");
    expect(activeButton.className).toContain("text-[#faf8f5]");
  });

  it("applies Japanese theme border styling", () => {
    render(<FilterChip label="Legal" isActive={false} onToggle={() => {}} />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border-[#d4d0c8]");
  });

  it("has hover state for inactive chips", () => {
    render(<FilterChip label="Legal" isActive={false} onToggle={() => {}} />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("hover:border-[#1a1a1a]");
  });

  it("shows different styling for remove button variant", () => {
    render(
      <FilterChip
        label="Legal"
        isActive={true}
        onToggle={() => {}}
        onRemove={() => {}}
        showRemove={true}
      />
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-[#1a1a1a]");
    expect(screen.getByText("×")).toBeInTheDocument();
  });

  it("renders without remove button when showRemove is false", () => {
    render(
      <FilterChip
        label="Legal"
        isActive={true}
        onToggle={() => {}}
        onRemove={() => {}}
        showRemove={false}
      />
    );
    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });

  it("renders without remove button when not active", () => {
    render(
      <FilterChip
        label="Legal"
        isActive={false}
        onToggle={() => {}}
        onRemove={() => {}}
        showRemove={true}
      />
    );
    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });
});
