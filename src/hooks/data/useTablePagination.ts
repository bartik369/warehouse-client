import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useTablePagination = (defaultLimit: number = 20) => {
  const [searchParams] = useSearchParams();

  const initialPage = useMemo(() => {
    const pageInUrl = searchParams.get('page');
    return pageInUrl ? Number(pageInUrl) : 1;
  }, [searchParams]);

  const initialLimit = useMemo(() => {
    const limitInUrl = searchParams.get('limit');
    return limitInUrl ? Number(limitInUrl) : defaultLimit;
  }, [searchParams, defaultLimit]);

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const resetPage = () => setPage(1);

  return {
    page,
    limit,
    setLimit,
    setPage,
    resetPage,
  };
};
