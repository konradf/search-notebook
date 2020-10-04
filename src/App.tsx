import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavigationBar } from './components/NavigationBar';
import { NotebookList } from './components/NotebookList';
import { SearchBar } from './components/SearchBar';
import { NotebookCreate } from './components/NotebookCreate';
import { Notification, NotificationVariant } from './components/Notification';
import { getNotebooks, saveNotebooks } from './libs/storage';
import { addResultToNotebook, createNotebook, NewNotebook, removeNotebook } from './libs/notebook';
import { SearchNotebook, SearchResult } from './types';
import { useNotification } from './hooks/useNotification';
import { QueryResults } from './components/QueryResults';
import { NotebookResults } from './components/NotebookResults';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const { notification, showNotification, hideNotification } = useNotification();

  const [notebooks, setNotebooks] = React.useState<SearchNotebook[]>(getNotebooks());
  React.useEffect(() => {
    saveNotebooks(notebooks);
  }, [notebooks]);

  const handleCreateNotebook = (notebook: NewNotebook) => {
    setNotebooks([...notebooks, createNotebook(notebook, notebooks)]);
    showNotification({ message: 'Notebook has been created', variant: NotificationVariant.success });
  };

  const handleRemoveNotebook = (id: number) => {
    setNotebooks(removeNotebook(id, notebooks));
    showNotification({ message: 'Notebook has been removed', variant: NotificationVariant.info });
  };

  const handleAddResultToNotebook = (result: SearchResult, notebookId: number) => {
    const updatedNotebooks = addResultToNotebook(result, notebookId, notebooks);
    if (updatedNotebooks !== null) {
      setNotebooks(updatedNotebooks);
      showNotification({ message: 'Result has been saved', variant: NotificationVariant.success });
      return;
    }
    showNotification({ message: 'Result was already added to that Notebook', variant: NotificationVariant.warning });
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
            <Switch>
              <Route path="/" exact>
                <QueryResults notebooks={notebooks} onAdd={handleAddResultToNotebook} />
              </Route>
              <Route path="/notebook/:id">
                <NotebookResults notebooks={notebooks} />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
      <Notification {...notification} onClose={hideNotification} />
    </>
  );
};

export default App;
