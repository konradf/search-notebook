export interface SearchResult {
  id: string;
  query_id: string;
  author: string;
  points: number;
  url: string;
  created_at: string;
  tags: string[];
}

export interface SearchQuery {
  id: string;
  search_string: string;
  created_at: string;
  hits: number;
  results: string[];
}

export interface SearchNotebook {
  id: number;
  title: string;
  created_at: string;
  results: string[];
}
