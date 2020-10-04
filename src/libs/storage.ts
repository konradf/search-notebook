import { SearchNotebook } from '../types';

const saveNotebooks = (notebooks: SearchNotebook[]) => {
  localStorage.setItem('notebooks', JSON.stringify(notebooks));
};

const getNotebooks = (): SearchNotebook[] => JSON.parse(localStorage.getItem('notebooks') ?? '[]');

export { saveNotebooks, getNotebooks };
