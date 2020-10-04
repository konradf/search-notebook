import React from 'react';
import { Link, List, ListItem, ListItemText, Paper, Tooltip, Typography } from '@material-ui/core';
import { formatDistance } from '../libs/dateHelpers';
import { ResultAdd } from './ResultAdd';
import { SearchNotebook, SearchResult } from '../types';

interface ResultsProps {
  results: any[];
  notebooks: SearchNotebook[];
  onAdd: (result: SearchResult, notebookId: number) => void;
}

export const Results = ({ results, notebooks, onAdd }: ResultsProps) => {
  const createAddHandler = (result: SearchResult) => (notebookId: number) => {
    // TODO: Remove that override - to be handled on API library side
    // @ts-ignore
    onAdd({ ...result, id: result.objectID }, notebookId);
  };

  return (
    <Paper variant="outlined">
      <List>
        {results.map((result) => {
          const { title, author, url, points, created_at, _tags } = result;

          return (
            <ListItem divider>
              <ListItemText disableTypography>
                <Tooltip arrow title={`Tags: ${_tags.join(', ')}`} placement="right">
                  <Typography component="span">{title}</Typography>
                </Tooltip>
                <Typography color="textSecondary">
                  <strong>{points}</strong> points, author: {author}, {formatDistance(created_at)}
                </Typography>
                <Typography>
                  <Link target="_blank" rel="noreferrer" href={url} variant="body2">
                    {url}
                  </Link>
                </Typography>
              </ListItemText>
              <ResultAdd notebooks={notebooks} onAdd={createAddHandler(result)} title={title} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};
