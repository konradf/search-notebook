import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Icon, InputBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useDebounce } from '../hooks/useDebounce';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: '100%',
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '180px',
      '&:focus': {
        width: '250px',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '400px',
      '&:focus': {
        width: '500px',
      },
    },
  },
}));

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({ onSearch }) => {
  const classes = useStyles();
  const history = useHistory();
  const isQueryRoute = useRouteMatch('/query');
  const redirectToQuery = () => {
    if (!isQueryRoute) {
      history.push('/query');
    }
  };

  const [search, setSearch] = React.useState('');
  const searchValue = useDebounce(search, 500);

  React.useEffect(() => {
    const trimSearchValue = searchValue.trim();
    if (trimSearchValue.length) {
      onSearch(trimSearchValue);
    }
  }, [onSearch, searchValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    redirectToQuery();
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Icon>search</Icon>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          redirectToQuery();
        }}
      >
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
          value={search}
        />
      </form>
    </div>
  );
};
