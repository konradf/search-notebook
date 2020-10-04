import * as React from 'react';
import { Icon, IconButton, Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

interface NotebookRemoveProps {
  title: string;
  onRemove: () => void;
}

export const NotebookRemove: React.FunctionComponent<NotebookRemoveProps> = ({ title, onRemove }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton edge="end" aria-label="remove" onClick={handleOpen}>
        <Icon color="secondary">delete_forever</Icon>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="remove-notebook">
        <DialogTitle id="remove-notebook">
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
