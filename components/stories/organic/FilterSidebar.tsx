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
    <aside className="bg-[#fff8f0] border border-[#81b29a]/20 rounded-2xl p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-display font-semibold text-[#3d405b]">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-[#e07a5f] hover:text-[#c66b52] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-4 px-3 py-1.5 bg-[#e07a5f]/10 rounded-full inline-block">
          <span className="text-sm text-[#e07a5f]">
            {activeFilterCount} active filter{activeFilterCount !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="border-t border-[#81b29a]/20 pt-6 space-y-8">
        {filterGroups.map((group) => (
          <div key={group.id}>
            <h3 className="text-sm font-semibold text-[#3d405b] mb-4">{group.label}</h3>
            <div className="space-y-3">
              {group.options.map((option) => {
                const isSelected = selectedFilters[group.id]?.includes(option.value) ?? false;

                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#81b29a] border-[#81b29a]"
                          : "bg-white border-[#81b29a]/30 group-hover:border-[#81b29a]"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
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
                    <span className="flex-1 text-sm text-[#3d405b]">{option.label}</span>
                    {option.count > 0 && (
                      <span className="text-sm text-[#81b29a]">({option.count})</span>
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
