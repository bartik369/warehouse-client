import { useSearchParams } from 'react-router-dom';

type QueryParamValue = string | string[] | number[] | boolean | null;
export const useQueryParams = () => {
  const [, setSearchParams] = useSearchParams();

  const setParam = (params: URLSearchParams, key: string, value: QueryParamValue) => {
    if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
      return;
    }

    params.set(key, Array.isArray(value) ? value.join(',') : String(value));
  };

  const updateSearchParam = (key: string, value: QueryParamValue) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', '1');
      setParam(params, key, value);

      return params;
    });
  };

  const updateSearchParams = (values: Record<string, QueryParamValue>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('page', '1');

      Object.entries(values).forEach(([key, value]) => {
        setParam(params, key, value);
      });

      return params;
    });
  };

  const resetSearchParams = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      const limit = params.get('limit') ?? '20';

      return {
        page: '1',
        limit,
      };
    });
  };

  return {
    updateSearchParam,
    updateSearchParams,
    resetSearchParams,
  };
};
