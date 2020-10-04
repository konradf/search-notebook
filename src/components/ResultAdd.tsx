import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Icon, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { SearchNotebook } from '../types';

interface ResultAddProps {
  title: string;
  notebooks: SearchNotebook[];
  onAdd: (id: number) => void;
}

export const ResultAdd: React.FunctionComponent<ResultAddProps> = ({ notebooks, title, onAdd }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createAddHandler = (id: number) => () => {
    onAdd(id);
    handleClose();
  };

  return (
    <div>
      <ListItemSecondaryAction>
        <IconButton color="default" edge="end" aria-label="save" onClick={handleOpen}>
          <Icon>bookmark</Icon>
        </IconButton>
      </ListItemSecondaryAction>
      <Dialog onClose={handleClose} aria-labelledby="save-result" open={open} fullWidth maxWidth="xs">
        <DialogTitle id="simple-dialog-title">Select Notebook to save result</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are going to save: <strong>{title}</strong>
          </DialogContentText>
          <List>
            {notebooks.map(({ id, title }) => (
              <ListItem button divider onClick={createAddHandler(id)} key={id}>
                <ListItemText primary={title} />
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
