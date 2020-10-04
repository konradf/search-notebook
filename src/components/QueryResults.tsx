import * as React from 'react';
import { Box, CircularProgress, List, Paper, Typography } from '@material-ui/core';
import { ResultAdd } from './ResultAdd';
import { Result } from './Result';
import { fetchResults } from '../libs/searchApi';
import { createSearchQuery } from '../libs/query';
import { saveQuery } from '../libs/storage';
import { SearchNotebook, SearchQuery, SearchResult } from '../types';

interface ResultsProps {
  query: string;
  notebooks: SearchNotebook[];
  onAdd: (result: SearchResult, notebookId: number) => void;
}

export const QueryResults = ({ query, notebooks, onAdd }: ResultsProps) => {
  const [searchQuery, setSearchQuery] = React.useState<SearchQuery>();
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetchResults(query).then(({ results, hits }) => {
      setSearchQuery(createSearchQuery(query, hits));
      setResults(results);
      setLoading(false);
    });
  }, [query]);

  React.useEffect(() => {
    if (searchQuery) {
      saveQuery(searchQuery);
    }
  }, [searchQuery]);

  const createAddHandler = (result: SearchResult) => (notebookId: number) => {
    onAdd({ ...result, query_id: searchQuery!.id }, notebookId);
  };

  return (
    <Paper variant="outlined">
      <Typography align="center" variant="h5" component="h1">
        Results for: <strong>{query}</strong>
      </Typography>
      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {results.map((result) => (
            <Result result={result} key={result.id}>
              <ResultAdd notebooks={notebooks} onAdd={createAddHandler(result)} title={result.title} />
            </Result>
          ))}
        </List>
      )}
    </Paper>
  );
};
