import * as React from 'react';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@material-ui/core';
import { formatDateString } from '../libs/dateHelpers';
import { SearchNotebook } from '../types';
import { NotebookRemove } from './NotebookRemove';

interface NotebookListProps {
  notebooks: SearchNotebook[];
  onRemove: (id: number) => void;
}

export const NotebookList: React.FunctionComponent<NotebookListProps> = ({ notebooks, onRemove, children }) => {
  const createRemoveHandler = (id: number) => () => {
    onRemove(id);
  };

  return (
    <Paper variant="outlined">
      <List>
        {notebooks.map(({ id, title, created_at }) => (
          <ListItem key={id} button component={Link} to={`/notebook/${id}`}>
            <ListItemText primary={title} secondary={formatDateString(created_at)} />
            <ListItemSecondaryAction>
              <NotebookRemove title={title} onRemove={createRemoveHandler(id)} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" />
      {children}
    </Paper>
  );
};
