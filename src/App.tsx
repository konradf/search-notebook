import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavigationBar } from './components/NavigationBar';
import { NotebookList } from './components/NotebookList';
import { hits } from './mocks/search_results.json';
import { Results } from './components/Results';
import { SearchBar } from './components/SearchBar';
import { NotebookCreate } from './components/NotebookCreate';
import { getNotebooks, saveNotebooks } from './libs/storage';
import { createNotebook, NewNotebook, removeNotebook } from './libs/notebook';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  const [notebooks, setNotebooks] = React.useState(getNotebooks());
  React.useEffect(() => {
    saveNotebooks(notebooks);
  }, [notebooks]);

  const handleCreateNotebook = (notebook: NewNotebook) => {
    setNotebooks([...notebooks, createNotebook(notebook, notebooks)]);
  };

  const handleRemoveNotebook = (id: number) => {
    setNotebooks(removeNotebook(id, notebooks));
  };

  return (
    <>
      <NavigationBar>
        <SearchBar />
      </NavigationBar>
      <Container maxWidth="md" className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={5} sm={4}>
            <NotebookList notebooks={notebooks} onRemove={handleRemoveNotebook}>
              <NotebookCreate onCreate={handleCreateNotebook} />
            </NotebookList>
          </Grid>
          <Grid item xs={7} sm={8}>
            <Results results={hits} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
