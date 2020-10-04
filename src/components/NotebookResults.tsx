import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { List, Paper, Typography } from '@material-ui/core';
import { findNotebookById, getResultsFromNotebook } from '../libs/notebook';
import { Result } from './Result';
import { SearchNotebook } from '../types';

interface NotebookResultsProps {
  notebooks: SearchNotebook[];
}

export const NotebookResults: React.FunctionComponent<NotebookResultsProps> = ({ notebooks }) => {
  const { id } = useParams();
  const idNumeric = Number.parseInt(id, 10);

  const notebook = findNotebookById(idNumeric, notebooks);
  if (notebook === null) {
    return <Redirect to="/" />;
  }
  const results = getResultsFromNotebook(idNumeric);

  return (
    <Paper variant="outlined">
      <Typography align="center" variant="h5" component="h1">
        <strong>{notebook.title}</strong> notebook results:
      </Typography>
      <List>
        {results.map((result) => (
          <Result result={result} />
        ))}
      </List>
    </Paper>
  );
};
