import React from 'react';
import { Box, CircularProgress, List, Paper } from '@material-ui/core';
import { ResultAdd } from './ResultAdd';
import { Result } from './Result';
import { SearchNotebook, SearchResult } from '../types';
import { fetchResults } from '../libs/searchApi';

interface ResultsProps {
  query: string;
  notebooks: SearchNotebook[];
  onAdd: (result: SearchResult, notebookId: number) => void;
}

export const QueryResults = ({ query, notebooks, onAdd }: ResultsProps) => {
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetchResults(query).then(({ results }) => {
      setResults(results);
      setLoading(false);
    });
  }, [query]);

  const createAddHandler = (result: SearchResult) => (notebookId: number) => {
    onAdd(result, notebookId);
  };

  return (
    <Paper variant="outlined">
      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {results.map((result) => (
            <Result result={result}>
              <ResultAdd notebooks={notebooks} onAdd={createAddHandler(result)} title={result.title} />
            </Result>
          ))}
        </List>
      )}
    </Paper>
  );
};
