import { SearchNotebook, SearchResult } from '../types';
import { getCurrentDateString } from './dateHelpers';
import { saveResult, getNotebooks, getResults } from './storage';

export interface NewNotebook {
  title: string;
}
type CreateNotebook = (notebook: NewNotebook, notebooks: SearchNotebook[]) => SearchNotebook;
type RemoveNotebook = (id: number, notebooks: SearchNotebook[]) => SearchNotebook[];
type FindNotebookById = (id: number, notebooks: SearchNotebook[]) => SearchNotebook | null;
type AddResultToNotebook = (
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

const getResultsFromNotebook = (notebookId: number): SearchResult[] => {
  const results = getResults();
  const notebookResults = getNotebooks().find((notebook: SearchNotebook) => notebook.id === notebookId)?.results || [];

  return notebookResults
    .map((resultId) => results.find((result) => result.id === resultId))
    .filter((result) => result !== undefined) as SearchResult[];
};

const addResultToNotebook: AddResultToNotebook = (result, notebookId, notebooks) => {
  saveResult(result);

  const notebookResults = notebooks.find((notebook) => notebook.id === notebookId)?.results || [];
  if (notebookResults.includes(result.id)) {
    // Notebook already contains given result
    return null;
  }

  return notebooks.map((notebook) => {
    if (notebook.id === notebookId) {
      return { ...notebook, results: [...notebook.results, result.id] };
    }
    return notebook;
  });
};

export { createNotebook, removeNotebook, findNotebookById, addResultToNotebook, getResultsFromNotebook };
