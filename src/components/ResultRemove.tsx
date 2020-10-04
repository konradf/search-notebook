import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Icon,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core';

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
      <Dialog open={open} onClose={handleClose} aria-labelledby="remove-result">
        <DialogTitle id="remove-result">
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
