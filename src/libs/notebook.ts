import { SearchNotebook } from '../types';
import { getCurrentDateString } from './dateHelpers';

export interface NewNotebook {
  title: string;
}
type CreateNotebook = (notebook: NewNotebook, notebooks: SearchNotebook[]) => SearchNotebook;
type RemoveNotebook = (id: number, notebooks: SearchNotebook[]) => SearchNotebook[];

const createNotebook: CreateNotebook = ({ title }, notebooks) => {
  const lastId = notebooks[notebooks.length - 1]?.id ?? 0;

  return { id: lastId + 1, title, created_at: getCurrentDateString(), results: [] };
};

const removeNotebook: RemoveNotebook = (id, notebooks) => notebooks.filter((notebook) => notebook.id !== id);

export { createNotebook, removeNotebook };
