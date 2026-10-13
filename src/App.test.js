import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the fetch calls
global.fetch = jest.fn();

describe('App - Page Order', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Should render heading with text "SEARCH POKEMON"', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('SEARCH POKEMON')).toBeInTheDocument();
    });
  });

  test('Should have "Filter By Type" text visible on the page', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Filter By Type')).toBeInTheDocument();
    });
  });
});
