export interface SearchResult {
  id: string;
  title: string;
  author: string;
  points: number;
  url: string;
  created_at: string;
  tags: string[];
  query_id?: string;
}

export interface SearchQuery {
  id: string;
  query_string: string;
  created_at: string;
  hits: number;
}

export interface SearchNotebook {
  id: number;
  title: string;
  created_at: string;
  results: SearchResult[];
}
