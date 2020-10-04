import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Icon, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export const NavigationBar: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.grow}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Search Notebook
        </Typography>
        {children}
        <IconButton color="inherit">
          <Icon>equalizer</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
