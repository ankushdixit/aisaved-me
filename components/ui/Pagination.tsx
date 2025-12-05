"use client";

import { useTheme } from "@/lib/themes";
import { Pagination as MemphisPagination } from "./memphis/Pagination";
import { Pagination as JapanesePagination } from "./japanese/Pagination";
import { Pagination as OrganicPagination } from "./organic/Pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisPagination {...props} />;
  }

  switch (theme) {
    case "japanese":
      return <JapanesePagination {...props} />;
    case "organic":
      return <OrganicPagination {...props} />;
    default:
      return <MemphisPagination {...props} />;
  }
}
