interface FilterChipProps {
  label: string;
  isActive: boolean;
  onToggle: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

export function FilterChip({
  label,
  isActive,
  onToggle,
  onRemove,
  showRemove = false,
}: FilterChipProps) {
  if (showRemove && isActive) {
    return (
      <button
        onClick={onRemove}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-[#faf8f5] border border-[#d4d0c8] text-sm transition-colors"
      >
        {label}
        <span className="text-[#faf8f5]/60 hover:text-[#faf8f5]">&times;</span>
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 border text-sm transition-colors ${
        isActive
          ? "bg-[#1a1a1a] text-[#faf8f5] border-[#1a1a1a]"
          : "bg-[#faf8f5] text-[#1a1a1a] border-[#d4d0c8] hover:border-[#1a1a1a]"
      }`}
    >
      {label}
    </button>
  );
}
