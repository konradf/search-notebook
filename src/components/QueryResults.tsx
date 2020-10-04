import React from 'react';
import { List, Paper } from '@material-ui/core';
import { ResultAdd } from './ResultAdd';
import { Result } from './Result';
import { hits } from '../mocks/search_results.json';
import { SearchNotebook, SearchResult } from '../types';

interface ResultsProps {
  notebooks: SearchNotebook[];
  onAdd: (result: SearchResult, notebookId: number) => void;
}

export const QueryResults = ({ notebooks, onAdd }: ResultsProps) => {
  // TODO: Get results from query
  const results = hits;

  // TODO: replace any with SearchResult type
  const createAddHandler = (result: any) => (notebookId: number) => {
    // TODO: Remove that override - to be handled on API library side
    // @ts-ignore
    onAdd({ ...result, id: result.objectID }, notebookId);
  };

  return (
    <Paper variant="outlined">
      <List>
        {results.map((result) => (
          <Result result={result}>
            <ResultAdd notebooks={notebooks} onAdd={createAddHandler(result)} title={result.title} />
          </Result>
        ))}
      </List>
    </Paper>
  );
};
