import * as React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));
export const Homepage = () => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography variant="h5" paragraph>Welcome to HN search Notebook</Typography>
      <Typography>&bull; Start typing above to use Search</Typography>
      <Typography>&bull; Click on any Notebook to display its results</Typography>
      <Typography>&bull; Click on top right icon for Statistics</Typography>
    </Paper>
  );
};
