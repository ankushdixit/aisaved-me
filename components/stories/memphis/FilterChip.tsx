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
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066FF] text-white border-3 border-black shadow-memphis-sm font-display font-bold text-sm uppercase transform -rotate-1 hover:rotate-0 transition-transform"
      >
        {label}
        <span className="text-white/80 hover:text-white">&times;</span>
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 border-3 border-black font-display font-bold text-sm uppercase transition-all transform ${
        isActive
          ? "bg-[#0066FF] text-white shadow-memphis-sm -rotate-1 hover:rotate-0"
          : "bg-white text-black hover:bg-[#FFD700] hover:shadow-memphis-sm hover:-rotate-1"
      }`}
    >
      {label}
    </button>
  );
}
