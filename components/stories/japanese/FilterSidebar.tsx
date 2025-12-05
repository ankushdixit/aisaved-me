import type { FilterGroup } from "@/lib/types/story";

interface FilterSidebarProps {
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (groupId: string, value: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

export function FilterSidebar({
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearAll,
  activeFilterCount,
}: FilterSidebarProps) {
  return (
    <aside className="bg-[#faf8f5] border border-[#d4d0c8] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-[#1a1a1a]">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-[#6b6b6b] hover:text-[#c41e3a] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-4 text-sm text-[#6b6b6b]">
          {activeFilterCount} active filter{activeFilterCount !== 1 ? "s" : ""}
        </div>
      )}

      <div className="border-t border-[#d4d0c8] pt-6 space-y-8">
        {filterGroups.map((group) => (
          <div key={group.id}>
            <h3 className="text-sm text-[#6b6b6b] uppercase tracking-wider mb-4">{group.label}</h3>
            <div className="space-y-3">
              {group.options.map((option) => {
                const isSelected = selectedFilters[group.id]?.includes(option.value) ?? false;

                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#1a1a1a] border-[#1a1a1a]"
                          : "bg-transparent border-[#d4d0c8] group-hover:border-[#1a1a1a]"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-2.5 h-2.5 text-[#faf8f5]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onFilterChange(group.id, option.value)}
                      className="sr-only"
                    />
                    <span className="flex-1 text-sm text-[#1a1a1a]">{option.label}</span>
                    {option.count > 0 && (
                      <span className="text-sm text-[#6b6b6b]">({option.count})</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
