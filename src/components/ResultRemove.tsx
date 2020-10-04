import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon, IconButton, ListItemSecondaryAction } from '@material-ui/core';

interface ResultRemoveProps {
  title: string;
  onRemove: () => void;
}

export const ResultRemove: React.FunctionComponent<ResultRemoveProps> = ({ title, onRemove }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="remove" onClick={handleOpen}>
          <Icon>delete_outline</Icon>
        </IconButton>
      </ListItemSecondaryAction>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to remove <strong>{title}</strong> ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onRemove} variant="contained" color="secondary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
