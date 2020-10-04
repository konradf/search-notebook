import { SearchNotebook, SearchQuery } from '../types';

const saveNotebooks = (notebooks: SearchNotebook[]) => {
  window.localStorage.setItem('notebooks', JSON.stringify(notebooks));
};

const getNotebooks = (): SearchNotebook[] => JSON.parse(window.localStorage.getItem('notebooks') ?? '[]');

const getQueries = (): SearchQuery[] => JSON.parse(window.localStorage.getItem('queries') ?? '[]');

const saveQuery = (searchQuery: SearchQuery) => {
  window.localStorage.setItem('queries', JSON.stringify([...getQueries(), searchQuery]));
};

export { saveNotebooks, getNotebooks, getQueries, saveQuery };
