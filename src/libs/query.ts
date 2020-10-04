import { SearchQuery } from '../types';
import { getCurrentDateString, getTimestamp } from './dateHelpers';
import { getUnixTime } from 'date-fns';

const generateRandomString = () => Math.random().toString(36).substring(2, 15);

export const createSearchQuery = (query: string, hits: number): SearchQuery => ({
  id: generateRandomString(),
  query_string: query,
  created_at: getCurrentDateString(),
  hits,
});

export const getQueryById = (id: string, queries: SearchQuery[]): SearchQuery | null =>
  queries.find((query) => query.id === id) || null;

type PeriodSummary = { total: number; count: number };
type Summary = Record<string, { day: PeriodSummary; week: PeriodSummary }>;

export const getQueriesSummary = (queries: SearchQuery[]): Summary => {
  const currentTimestamp = getUnixTime(new Date());
  const dayAgo = currentTimestamp - 24 * 3600;
  const weekAgo = currentTimestamp - 7 * 24 * 3600;

  const inLastWeek = (dateString: string) => getTimestamp(dateString) >= weekAgo;
  const inLastDay = (dateString: string) => getTimestamp(dateString) >= dayAgo;

  return queries.reduce<Summary>((acc, query: SearchQuery) => {
    const isLastWeek = inLastWeek(query.created_at);
    const isLastDay = inLastDay(query.created_at);

    if (!acc[query.query_string]) {
      acc[query.query_string] = {
        day: isLastDay ? { total: query.hits, count: 1 } : { total: 0, count: 0 },
        week: isLastWeek ? { total: query.hits, count: 1 } : { total: 0, count: 0 },
      };
      return acc;
    }

    if (isLastDay) {
      acc[query.query_string].day.total += query.hits;
      acc[query.query_string].day.count++;
    }

    if (isLastWeek) {
      acc[query.query_string].week.total += query.hits;
      acc[query.query_string].week.count++;
    }
    return acc;
  }, {});
};
