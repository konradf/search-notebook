import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Icon, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
    },
  },
}));

export const NavigationBar: React.FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.grow}>
      <Toolbar className={classes.toolbar}>
        <Typography>
          <IconButton edge="start" color="inherit" aria-label="logo" component={Link} to="/">
            <Icon>event_note</Icon>
          </IconButton>
          <Typography component="span" variant="h6" className={classes.title}>
            Search Notebook
          </Typography>
        </Typography>
        {children}
        <IconButton edge="end" color="inherit" component={Link} to="/stats">
          <Icon>equalizer</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
