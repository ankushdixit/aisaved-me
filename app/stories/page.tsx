"use client";

import { Navbar, Footer, Pagination } from "@/components/ui";
import { FilterSidebar, FilterChip, StoryGrid } from "@/components/stories";
import { filterGroups } from "@/lib/mock-data/stories";
import { useTheme } from "@/lib/themes";
import { useStoryFilters } from "./useStoryFilters";

function PageHeader() {
  const { theme, mounted } = useTheme();

  const getHeaderStyles = () => {
    if (!mounted) return "bg-gray-100";
    switch (theme) {
      case "japanese":
        return "bg-[#f5f2ed]";
      case "organic":
        return "bg-[#fff0dc]";
      default:
        return "bg-gray-100 border-b-4 border-black";
    }
  };

  const getHeaderTextStyles = () => {
    if (!mounted) return "text-black font-display font-bold text-memphis-shadow";
    switch (theme) {
      case "japanese":
        return "text-[#1a1a1a]";
      case "organic":
        return "font-display font-semibold text-[#3d405b]";
      default:
        return "text-black font-display font-bold text-memphis-shadow";
    }
  };

  const getSubtextStyles = () => {
    if (!mounted) return "text-gray-600 font-body";
    switch (theme) {
      case "japanese":
        return "text-[#6b6b6b]";
      case "organic":
        return "text-[#5a5d7a]";
      default:
        return "text-gray-600 font-body";
    }
  };

  return (
    <div className={`pt-32 pb-12 ${getHeaderStyles()}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className={`text-3xl sm:text-4xl ${getHeaderTextStyles()}`}>Browse Success Stories</h1>
        <p className={`mt-3 text-lg ${getSubtextStyles()}`}>
          Discover how others used AI to solve real problems
        </p>
      </div>
    </div>
  );
}

export default function StoriesPage() {
  const { theme, mounted } = useTheme();
  const {
    selectedFilters,
    handleFilterChange,
    handleClearAll,
    handlePageChange,
    activeFilterCount,
    activeFilterLabels,
    filteredStories,
    paginatedStories,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
  } = useStoryFilters();

  const getSubtextStyles = () => {
    if (!mounted) return "text-gray-600 font-body";
    switch (theme) {
      case "japanese":
        return "text-[#6b6b6b]";
      case "organic":
        return "text-[#5a5d7a]";
      default:
        return "text-gray-600 font-body";
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PageHeader />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-72 flex-shrink-0">
              <FilterSidebar
                filterGroups={filterGroups}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
                activeFilterCount={activeFilterCount}
              />
            </div>
            <div className="flex-1">
              <div className="mb-6">
                <p className={`text-base ${getSubtextStyles()}`}>
                  <span className="font-semibold">
                    Showing {startIndex}-{endIndex} of {filteredStories.length} stories
                  </span>
                </p>
                {activeFilterLabels.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeFilterLabels.map(({ groupId, value, label }) => (
                      <FilterChip
                        key={`${groupId}-${value}`}
                        label={label}
                        isActive={true}
                        onToggle={() => handleFilterChange(groupId, value)}
                        onRemove={() => handleFilterChange(groupId, value)}
                        showRemove={true}
                      />
                    ))}
                  </div>
                )}
              </div>
              <StoryGrid stories={paginatedStories} />
              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
