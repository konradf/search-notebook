import { SearchNotebook, SearchResult } from '../types';
import { getCurrentDateString } from './dateHelpers';

export interface NewNotebook {
  title: string;
}

type CreateNotebook = (notebook: NewNotebook, notebooks: SearchNotebook[]) => SearchNotebook;
type RemoveNotebook = (id: number, notebooks: SearchNotebook[]) => SearchNotebook[];
type FindNotebookById = (id: number, notebooks: SearchNotebook[]) => SearchNotebook | null;
type UpdateNotebook = (
  result: SearchResult,
  notebookId: number,
  notebooks: SearchNotebook[]
) => SearchNotebook[] | null;

const createNotebook: CreateNotebook = ({ title }, notebooks) => {
  const lastId = notebooks[notebooks.length - 1]?.id ?? 0;

  return { id: lastId + 1, title, created_at: getCurrentDateString(), results: [] };
};

const removeNotebook: RemoveNotebook = (id, notebooks) => notebooks.filter((notebook) => notebook.id !== id);

const findNotebookById: FindNotebookById = (id, notebooks) => notebooks.find((notebook) => notebook.id === id) || null;

const addResultToNotebook: UpdateNotebook = (result, notebookId, notebooks) => {
  const results = notebooks.find(({ id }) => id === notebookId)?.results || [];
  if (results.find(({ id }) => result.id === id)) {
    // Notebook already contains given result
    return null;
  }

  return notebooks.map((notebook) => {
    if (notebook.id === notebookId) {
      return { ...notebook, results: [...notebook.results, result] };
    }
    return notebook;
  });
};

const removeResultFromNotebook: UpdateNotebook = (result, notebookId, notebooks) => {
  const results = notebooks.find(({ id }) => id === notebookId)?.results || [];
  if (!results.length) {
    return null;
  }

  const updatedResults = results.filter(({ id }) => id !== result.id);

  return notebooks.map((notebook) => {
    if (notebook.id === notebookId) {
      return { ...notebook, results: updatedResults };
    }
    return notebook;
  });
};

export { createNotebook, removeNotebook, findNotebookById, addResultToNotebook, removeResultFromNotebook };
