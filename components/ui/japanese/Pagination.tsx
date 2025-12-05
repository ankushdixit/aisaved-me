interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const showEllipsisAfter = currentPage < totalPages - 2;
    const showEllipsisBefore = currentPage > 3;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (showEllipsisBefore) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (showEllipsisAfter) {
      pages.push("...");
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center border border-[#d4d0c8] text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1a1a1a] transition-colors"
        aria-label="Previous page"
      >
        &larr;
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) =>
        typeof page === "string" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-[#6b6b6b]">
            {page}
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center border text-sm transition-colors ${
              currentPage === page
                ? "bg-[#1a1a1a] text-[#faf8f5] border-[#1a1a1a]"
                : "border-[#d4d0c8] text-[#1a1a1a] hover:border-[#1a1a1a]"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center border border-[#d4d0c8] text-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1a1a1a] transition-colors"
        aria-label="Next page"
      >
        &rarr;
      </button>
    </nav>
  );
}
