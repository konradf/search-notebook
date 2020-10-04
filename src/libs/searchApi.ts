import { API_URL } from '../constants';
import { SearchResult } from '../types';

const getApiUrl = ({ query, page }: { query: string; page: number }) => {
  return `${API_URL}?query=${query}&page=${page}`;
};

type MapResults = (query: string, entries: any[]) => SearchResult[];

const mapResults: MapResults = (query: string, entries: any[]) =>
  entries.map((entry) => ({
    id: entry.objectID,
    query_id: query,
    title: entry.title || entry.story_title,
    author: entry.author,
    points: entry.points,
    url: entry.url || entry.story_url,
    created_at: entry.created_at,
    tags: entry._tags,
  }));

type FetchResults = (
  query: string,
  page?: number
) => Promise<{
  results: SearchResult[];
  count: number;
}>;

const fetchResults: FetchResults = async (query, page = 1) => {
  const response = await fetch(getApiUrl({ query, page }));
  const { hits, nbHits } = await response.json();

  return { results: mapResults(query, hits), count: nbHits };
};
export { fetchResults };
