import { useSearchParams } from 'react-router-dom';

export const useTablePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 20;

  const setPage = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };

  const setLimit = (limit: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('limit', String(limit));
      params.set('page', '1');
      return params;
    });
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
  };
};
