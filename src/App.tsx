import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Homepage,
  NavigationBar,
  NotebookCreate,
  NotebookList,
  NotebookResults,
  Notification,
  NotificationVariant,
  QueryResults,
  SearchBar,
  Statistics,
} from './components';
import { getNotebooks, saveNotebooks } from './libs/storage';
import {
  addResultToNotebook,
  createNotebook,
  NewNotebook,
  removeNotebook,
  removeResultFromNotebook,
} from './libs/notebook';
import { SearchNotebook, SearchResult } from './types';
import { useNotification } from './hooks/useNotification';
import { MESSAGE } from './libs/messages';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const { notification, showNotification, hideNotification } = useNotification();

  const [query, setQuery] = React.useState('');
  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const [notebooks, setNotebooks] = React.useState<SearchNotebook[]>(getNotebooks());
  React.useEffect(() => {
    saveNotebooks(notebooks);
  }, [notebooks]);

  const handleCreateNotebook = (notebook: NewNotebook) => {
    setNotebooks([...notebooks, createNotebook(notebook, notebooks)]);
    showNotification({ message: MESSAGE.notebookAdded, variant: NotificationVariant.success });
  };

  const handleRemoveNotebook = (id: number) => {
    setNotebooks(removeNotebook(id, notebooks));
    showNotification({ message: MESSAGE.notebookRemoved, variant: NotificationVariant.info });
  };

  const handleAddResult = (result: SearchResult, notebookId: number) => {
    const updatedNotebooks = addResultToNotebook(result, notebookId, notebooks);
    if (updatedNotebooks !== null) {
      setNotebooks(updatedNotebooks);
      showNotification({ message: MESSAGE.resultAdded, variant: NotificationVariant.success });
      return;
    }
    showNotification({ message: MESSAGE.resultAlreadyAdded, variant: NotificationVariant.warning });
  };

  const handleRemoveResult = (result: SearchResult, notebookId: number) => {
    const updatedNotebooks = removeResultFromNotebook(result, notebookId, notebooks);
    if (updatedNotebooks !== null) {
      setNotebooks(updatedNotebooks);
      showNotification({ message: MESSAGE.resultRemoved, variant: NotificationVariant.info });
    }
  };

  return (
    <>
      <NavigationBar>
        <SearchBar onSearch={handleSearch} />
      </NavigationBar>
      <Container maxWidth="md" className={classes.container}>
        <Switch>
          <Route path="/stats">
            <Statistics />
          </Route>
          <Grid container spacing={1}>
            <Grid item xs={5} sm={4}>
              <NotebookList notebooks={notebooks} onRemove={handleRemoveNotebook}>
                <NotebookCreate onCreate={handleCreateNotebook} />
              </NotebookList>
            </Grid>
            <Grid item xs={7} sm={8}>
              <Route path="/" exact>
                <Homepage />
              </Route>
              <Route path="/query">
                <QueryResults query={query} notebooks={notebooks} onAdd={handleAddResult} />
              </Route>
              <Route path="/notebook/:id">
                <NotebookResults notebooks={notebooks} onRemove={handleRemoveResult} />
              </Route>
            </Grid>
          </Grid>
        </Switch>
      </Container>
      <Notification {...notification} onClose={hideNotification} />
    </>
  );
};

export default App;
