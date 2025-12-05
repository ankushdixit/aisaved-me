"use client";

import { useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { allStories, filterGroups, filterStories, paginateStories } from "@/lib/mock-data/stories";
import type { StoryCategory, AiTool, OutcomeType } from "@/lib/types/story";

const ITEMS_PER_PAGE = 8;

export function useStoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse filters from URL
  const initialFilters = useMemo(() => {
    const categories = searchParams.get("category")?.split(",").filter(Boolean) || [];
    const aiTools = searchParams.get("aiTool")?.split(",").filter(Boolean) || [];
    const outcomeTypes = searchParams.get("outcomeType")?.split(",").filter(Boolean) || [];
    const page = parseInt(searchParams.get("page") || "1", 10);

    return { category: categories, aiTool: aiTools, outcomeType: outcomeTypes, page };
  }, [searchParams]);

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: initialFilters.category,
    aiTool: initialFilters.aiTool,
    outcomeType: initialFilters.outcomeType,
  });
  const [currentPage, setCurrentPage] = useState(initialFilters.page);

  // Update URL with filters
  const updateUrl = useCallback(
    (filters: Record<string, string[]>, page: number) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) params.set(key, values.join(","));
      });
      if (page > 1) params.set("page", page.toString());
      const queryString = params.toString();
      router.push(queryString ? `/stories?${queryString}` : "/stories", { scroll: false });
    },
    [router]
  );

  const handleFilterChange = useCallback(
    (groupId: string, value: string) => {
      setSelectedFilters((prev) => {
        const currentValues = prev[groupId] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        const newFilters = { ...prev, [groupId]: newValues };
        setCurrentPage(1);
        updateUrl(newFilters, 1);
        return newFilters;
      });
    },
    [updateUrl]
  );

  const handleClearAll = useCallback(() => {
    const emptyFilters = { category: [], aiTool: [], outcomeType: [] };
    setSelectedFilters(emptyFilters);
    setCurrentPage(1);
    updateUrl(emptyFilters, 1);
  }, [updateUrl]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      updateUrl(selectedFilters, page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [selectedFilters, updateUrl]
  );

  const activeFilterCount = useMemo(() => {
    return Object.values(selectedFilters).flat().length;
  }, [selectedFilters]);

  const activeFilterLabels = useMemo(() => {
    const labels: { groupId: string; value: string; label: string }[] = [];
    Object.entries(selectedFilters).forEach(([groupId, values]) => {
      const group = filterGroups.find((g) => g.id === groupId);
      if (group) {
        values.forEach((value) => {
          const option = group.options.find((o) => o.value === value);
          if (option) labels.push({ groupId, value, label: option.label });
        });
      }
    });
    return labels;
  }, [selectedFilters]);

  const filteredStories = useMemo(() => {
    return filterStories(allStories, {
      categories: selectedFilters.category as StoryCategory[],
      aiTools: selectedFilters.aiTool as AiTool[],
      outcomeTypes: selectedFilters.outcomeType as OutcomeType[],
    });
  }, [selectedFilters]);

  const paginationResult = useMemo(() => {
    return paginateStories(filteredStories, currentPage, ITEMS_PER_PAGE);
  }, [filteredStories, currentPage]);

  return {
    selectedFilters,
    currentPage,
    handleFilterChange,
    handleClearAll,
    handlePageChange,
    activeFilterCount,
    activeFilterLabels,
    filteredStories,
    paginatedStories: paginationResult.stories,
    totalPages: paginationResult.totalPages,
    startIndex: paginationResult.startIndex,
    endIndex: paginationResult.endIndex,
  };
}
