import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders welcome message', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = getByText(/Welcome to HN search Notebook/i);
  expect(linkElement).toBeInTheDocument();
});
