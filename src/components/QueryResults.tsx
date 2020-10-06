import * as React from 'react';
import { Box, CircularProgress, Grid, List, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { ResultAdd } from './ResultAdd';
import { Result } from './Result';
import { createSearchQuery } from '../libs/query';
import { saveQuery } from '../libs/storage';
import { SearchNotebook, SearchQuery, SearchResult } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import { useFetch } from '../hooks/useFetch';
import { usePrevious } from '../hooks/usePrevious';

interface ResultsProps {
  query: string;
  notebooks: SearchNotebook[];
  onAdd: (result: SearchResult, notebookId: number) => void;
}

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const QueryResults = ({ query, notebooks, onAdd }: ResultsProps) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = React.useState<SearchQuery>();
  const { results, page, pages, hits, loading, setPage } = useFetch(query);
  const prevLoading = usePrevious(loading);

  React.useEffect(() => {
    // Create query only when loading is finished and we are on first page
    if (!loading && prevLoading && page === 0) {
      setSearchQuery(createSearchQuery(query, hits));
    }
  }, [prevLoading, loading, query, hits, page]);

  React.useEffect(() => {
    if (searchQuery) {
      saveQuery(searchQuery);
    }
  }, [searchQuery]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

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
        <>
          <List>
            {results.map((result) => (
              <Result result={result} key={result.id}>
                <ResultAdd notebooks={notebooks} onAdd={createAddHandler(result)} title={result.title} />
              </Result>
            ))}
          </List>
          <Grid container justify="center" className={classes.pagination}>
            <Pagination color="primary" count={pages} page={page + 1} onChange={handlePageChange} />
          </Grid>
        </>
      )}
    </Paper>
  );
};
