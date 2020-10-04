import { SearchNotebook, SearchResult } from '../types';

const saveNotebooks = (notebooks: SearchNotebook[]) => {
  window.localStorage.setItem('notebooks', JSON.stringify(notebooks));
};

const getNotebooks = (): SearchNotebook[] => JSON.parse(window.localStorage.getItem('notebooks') ?? '[]');

const getResults = (): SearchResult[] => JSON.parse(window.localStorage.getItem('results') ?? '[]');

const hasResult = (id: string): boolean => getResults().some((result) => result.id === id);

// const getResult = (id: string): SearchResult | null => getResults().find((result) => result.id === id) || null;

// const saveResults = (results: SearchResult[]) => {
//   window.localStorage.setItem('results', JSON.stringify(results));
// };

const saveResult = (result: SearchResult) => {
  if (hasResult(result.id)) {
    // Do not duplicate the entry if it already exists
    return;
  }

  window.localStorage.setItem('results', JSON.stringify([...getResults(), result]));
};

const removeResults = (resultIds: string[]) => {
  const newResults = getResults().filter((result) => !resultIds.includes(result.id));
  window.localStorage.setItem('results', JSON.stringify(newResults));
};

export { saveNotebooks, getNotebooks, getResults, saveResult, removeResults };
