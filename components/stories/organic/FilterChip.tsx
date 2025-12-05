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
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#e07a5f] text-white rounded-full text-sm shadow-soft transition-all hover:shadow-soft-hover"
      >
        {label}
        <span className="text-white/70 hover:text-white">&times;</span>
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
        isActive
          ? "bg-[#e07a5f] text-white shadow-soft"
          : "bg-[#fff8f0] text-[#3d405b] border border-[#81b29a]/30 hover:border-[#81b29a] hover:shadow-soft"
      }`}
    >
      {label}
    </button>
  );
}
