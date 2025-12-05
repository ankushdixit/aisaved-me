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
    <aside className="bg-white border-4 border-black shadow-memphis-lg p-6 transform -rotate-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-black uppercase">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm font-display font-bold text-[#0066FF] uppercase hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="mb-4 px-3 py-2 bg-[#FFD700] border-3 border-black inline-block transform rotate-1">
          <span className="text-sm font-display font-bold text-black uppercase">
            {activeFilterCount} active filter{activeFilterCount !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="border-t-4 border-black pt-6 space-y-8">
        {filterGroups.map((group) => (
          <div key={group.id}>
            <h3 className="text-base font-display font-bold text-black uppercase mb-4">
              {group.label}
            </h3>
            <div className="space-y-3">
              {group.options.map((option) => {
                const isSelected = selectedFilters[group.id]?.includes(option.value) ?? false;

                return (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 border-3 border-black flex items-center justify-center transition-colors ${
                        isSelected ? "bg-[#0066FF]" : "bg-white group-hover:bg-[#FFD700]"
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
                            strokeWidth={4}
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
                    <span className="flex-1 text-base font-body text-black">{option.label}</span>
                    {option.count > 0 && (
                      <span className="text-sm font-body text-gray-500">({option.count})</span>
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
