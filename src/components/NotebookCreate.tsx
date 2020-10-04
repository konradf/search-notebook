import * as React from 'react';
import {
  Box,
  Icon,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { NewNotebook } from '../libs/notebook';
import { makeStyles } from '@material-ui/core/styles';

interface NotebookCreateProps {
  onCreate: (notebook: NewNotebook) => void;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const NotebookCreate: React.FunctionComponent<NotebookCreateProps> = ({ onCreate }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    setTitle('');
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    onCreate({ title });
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Box textAlign="center" className={classes.wrapper}>
      <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<Icon>add_circle</Icon>}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="create-notebook">
        <DialogTitle id="create-notebook">Create new Notebook</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide a title for new Notebook</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            required
            value={title}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
