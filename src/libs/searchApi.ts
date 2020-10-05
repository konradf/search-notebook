import { API_URL } from '../constants';
import { SearchResult } from '../types';

const getApiUrl = ({ query, page }: { query: string; page: number }) => {
  return `${API_URL}?query=${query}&page=${page}`;
};

type MapResults = (query: string, entries: any[]) => SearchResult[];

const mapResults: MapResults = (query: string, entries: any[]) =>
  entries.map((entry) => ({
    id: entry.objectID,
    title: entry.title || entry.story_title,
    author: entry.author || '',
    points: entry.points || 0,
    url: entry.url || entry.story_url,
    created_at: entry.created_at,
    tags: entry._tags || [],
  }));

type FetchResults = (
  query: string,
  page?: number
) => Promise<{
  results: SearchResult[];
  hits: number;
  pages: number;
}>;

const fetchResults: FetchResults = async (query, page = 0) => {
  const response = await fetch(getApiUrl({ query, page }));
  const { hits, nbHits, nbPages } = await response.json();

  // TODO: Error handling...

  return { results: mapResults(query, hits), hits: nbHits, pages: nbPages };
};

export { fetchResults };
