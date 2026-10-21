import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the fetch API
global.fetch = jest.fn();

// Mock loading spinner
jest.mock('./components/LoadingSpinner', () => {
  return function MockLoadingSpinner() {
    return <div data-testid="loading-spinner">Loading...</div>;
  };
});

describe('App Component with Color Filter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  const mockPokemonData = {
    success: true,
    count: 4,
    data: [
      {
        id: 1,
        name: 'Pikachu',
        type: ['Electric'],
        legendary: false,
        image: 'https://example.com/pikachu.png',
        color: 'Yellow'
      },
      {
        id: 2,
        name: 'Charizard',
        type: ['Fire', 'Flying'],
        legendary: false,
        image: 'https://example.com/charizard.png',
        color: 'Red'
      },
      {
        id: 8,
        name: 'Zapdos',
        type: ['Electric', 'Flying'],
        legendary: true,
        image: 'https://example.com/zapdos.png',
        color: 'Yellow'
      },
      {
        id: 9,
        name: 'Moltres',
        type: ['Fire', 'Flying'],
        legendary: true,
        image: 'https://example.com/moltres.png',
        color: 'Red'
      }
    ]
  };

  const mockTypesData = {
    success: true,
    data: ['Electric', 'Fire', 'Flying']
  };

  const mockColorsData = {
    success: true,
    data: ['Red', 'Yellow', 'Blue', 'Green', 'Purple']
  };

  test('should render Pokemon Explorer heading', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Pokemon Explorer/i)).toBeInTheDocument();
    });
  });

  test('should filter Pokemon by color when color filter changes', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
    });

    render(<App />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    // Find and select the color filter
    const colorSelect = screen.getByRole('combobox', { name: /filter by color/i });
    expect(colorSelect).toBeInTheDocument();

    // Change color filter to Red
    fireEvent.change(colorSelect, { target: { value: 'Red' } });

    // Wait for filtered results - should show only Red Pokemon
    await waitFor(() => {
      expect(screen.getByText('Charizard')).toBeInTheDocument();
      expect(screen.getByText('Moltres')).toBeInTheDocument();
      expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
      expect(screen.queryByText('Zapdos')).not.toBeInTheDocument();
    });
  });

  test('should show Pikachu when filtering by Yellow color', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
    });

    render(<App />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    // Find and select the color filter
    const colorSelect = screen.getByRole('combobox', { name: /filter by color/i });

    // Change color filter to Yellow
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    // Wait for filtered results - Pikachu should be visible
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Zapdos')).toBeInTheDocument();
    });
  });

  test('should hide non-yellow Pokemon when filtering by Yellow', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
    });

    render(<App />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Charizard')).toBeInTheDocument();
    });

    // Find and select the color filter
    const colorSelect = screen.getByRole('combobox', { name: /filter by color/i });

    // Change color filter to Yellow
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    // Wait and verify non-yellow Pokemon are hidden
    await waitFor(() => {
      expect(screen.queryByText('Charizard')).not.toBeInTheDocument();
      expect(screen.queryByText('Moltres')).not.toBeInTheDocument();
    });
  });

  test('clearing filters resets color filter to empty', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
    });

    render(<App />);

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    // Set a color filter
    const colorSelect = screen.getByRole('combobox', { name: /filter by color/i });
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    // Clear filters button should appear
    await waitFor(() => {
      const clearButton = screen.getByRole('button', { name: /clear filters/i });
      expect(clearButton).toBeInTheDocument();
    });

    // Click clear filters
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);

    // Color filter should be reset to empty
    await waitFor(() => {
      const colorSelectAfter = screen.getByRole('combobox', { name: /filter by color/i });
      expect(colorSelectAfter.value).toBe('');
    });
  });
});
