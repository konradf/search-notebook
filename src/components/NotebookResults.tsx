import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { List, Paper, Typography } from '@material-ui/core';
import { findNotebookById } from '../libs/notebook';
import { Result } from './Result';
import { SearchNotebook, SearchResult } from '../types';
import { ResultRemove } from './ResultRemove';

interface NotebookResultsProps {
  notebooks: SearchNotebook[];
  onRemove: (result: SearchResult, notebookId: number) => void;
}

export const NotebookResults: React.FunctionComponent<NotebookResultsProps> = ({ notebooks, onRemove }) => {
  const { id } = useParams();
  const notebookId = Number.parseInt(id, 10);

  const notebook = findNotebookById(notebookId, notebooks);
  if (notebook === null) {
    return <Redirect to="/" />;
  }

  const createRemoveHandler = (result: SearchResult) => () => {
    onRemove(result, notebookId);
  };

  return (
    <Paper variant="outlined">
      <Typography align="center" variant="h5" component="h1">
        <strong>{notebook.title}</strong> notebook results:
      </Typography>
      <List>
        {notebook.results.map((result) => (
          <Result result={result} key={result.id}>
            <ResultRemove onRemove={createRemoveHandler(result)} title={result.title} />
          </Result>
        ))}
      </List>
    </Paper>
  );
};
