import { useMemo } from 'react';

interface UsePagination {
  currentPage: number;
  siblingCount?: number;
  pageLimit?: number;
  dataLength: number;
}

export const usePagination = ({
  currentPage,
  siblingCount = 1,
  pageLimit = 1,
  dataLength,
}: UsePagination) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(dataLength / pageLimit);
    const totalPagePills = 5 + siblingCount;
    const DOTS = '...';

    function range(start: number, end: number) {
      const length = end - start + 1;
      return Array.from({ length }, (_, index) => index + start);
    }

    if (totalPagePills >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftMostSiblingIndex = Math.max(1, currentPage - siblingCount);
    const rightMostSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const showLeftDots = leftMostSiblingIndex > 2;
    const showRightDots = rightMostSiblingIndex < totalPageCount - 2;
    const edgeItemCount = 3 + 2 * siblingCount;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, edgeItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(
        totalPageCount - edgeItemCount + 1,
        totalPageCount
      );
      return [1, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftMostSiblingIndex, rightMostSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPageCount];
    }
  }, [currentPage, pageLimit, siblingCount, dataLength]);
  return paginationRange;
};
