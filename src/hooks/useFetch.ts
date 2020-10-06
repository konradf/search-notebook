import { useCallback, useEffect, useReducer } from 'react';
import { SearchResult } from '../types';
import { fetchResults } from '../libs/searchApi';
import { usePrevious } from './usePrevious';

interface UseFetchState {
  loading: boolean;
  results: SearchResult[];
  hits: number;
  pages: number;
  query: string;
  page: number;
}

const initialState: UseFetchState = {
  loading: false,
  results: [],
  hits: 0,
  pages: 0,
  query: '',
  page: 0,
};

const fetchReducer = (state: UseFetchState, [type, payload]: [string, any?]): UseFetchState => {
  switch (type) {
    case 'startFetching':
      return { ...state, loading: true, ...(payload.resetPage ? { page: 0 } : {}) };

    case 'fetched': {
      const { results, pages, hits } = payload;
      return { ...state, loading: false, results, pages, hits };
    }

    case 'setPage': {
      return { ...state, loading: true, page: payload.page };
    }
    default:
      return state;
  }
};

export const useFetch = (query: string) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const { loading, results, hits, pages, page } = state;
  const prevQuery = usePrevious(query);

  useEffect(() => {
    let cancel = false;
    const resetPage = prevQuery !== query;

    function fetchData() {
      dispatch(['startFetching', { resetPage }]);
      if (resetPage && page !== 0) return;
      fetchResults(query, page).then(({ results, hits, pages }) => {
        if (cancel) return;
        dispatch(['fetched', { results, hits, pages }]);
      });
    }
    fetchData();

    return () => {
      cancel = true;
    };
  }, [query, page]);

  const setPage = useCallback((page) => dispatch(['setPage', { page }]), []);

  return { results, loading, hits, pages, page, setPage };
};
