import React from 'react';
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock fetch
global.fetch = jest.fn();

describe('App Component - Color Filter', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPokemonResponse = {
    success: true,
    count: 3,
    data: [
      {
        id: 1,
        name: 'Pikachu',
        type: ['Electric'],
        legendary: false,
        color: 'Yellow',
        image: 'https://example.com/pikachu.png'
      },
      {
        id: 2,
        name: 'Charizard',
        type: ['Fire', 'Flying'],
        legendary: false,
        color: 'Orange',
        image: 'https://example.com/charizard.png'
      },
      {
        id: 3,
        name: 'Blastoise',
        type: ['Water'],
        legendary: false,
        color: 'Blue',
        image: 'https://example.com/blastoise.png'
      }
    ]
  };

  const mockTypesResponse = {
    success: true,
    data: ['Electric', 'Fire', 'Flying', 'Water']
  };

  const mockColorsResponse = {
    success: true,
    data: ['Blue', 'Orange', 'Yellow']
  };

  it('should render Pokemon Explorer header', async () => {
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse)
        });
      } else if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesResponse)
        });
      } else if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsResponse)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Pokemon Explorer/i)).toBeInTheDocument();
    });
  });

  it('should render color filter with label "Filter by Color:"', async () => {
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse)
        });
      } else if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesResponse)
        });
      } else if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsResponse)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText(/Filter by Color:/i)).toBeInTheDocument();
    });
  });

  it('should have color in filters state', async () => {
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse)
        });
      } else if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesResponse)
        });
      } else if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsResponse)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      const colorFilter = screen.getByLabelText(/Filter by Color:/i);
      expect(colorFilter).toBeInTheDocument();
    });
  });

  it('should filter Pokemon by color when color filter is set', async () => {
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse)
        });
      } else if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesResponse)
        });
      } else if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsResponse)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      expect(colorSelect).toBeInTheDocument();
    });

    // Select Yellow color
    const colorSelect = screen.getByLabelText(/Filter by Color:/i);
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.queryByText('Charizard')).not.toBeInTheDocument();
    });
  });

  it('should clear color filter when clear filters is clicked', async () => {
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse)
        });
      } else if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesResponse)
        });
      } else if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsResponse)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Pokemon Explorer/i)).toBeInTheDocument();
    });

    // Select Yellow color
    let colorSelect;
    await waitFor(() => {
      colorSelect = screen.getByLabelText(/Filter by Color:/i);
    });
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    // Click clear filters
    const clearButton = screen.getByText('Clear Filters');
    await userEvent.click(clearButton);

    await waitFor(() => {
      const resetColorSelect = screen.getByLabelText(/Filter by Color:/i);
      expect(resetColorSelect.value).toBe('');
    });
  });

  it('should display "Clear Filters" button when color filter is active', async () => {
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonResponse)
        });
      } else if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesResponse)
        });
      } else if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsResponse)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
    });

    // Select Yellow color
    let colorSelect;
    await waitFor(() => {
      colorSelect = screen.getByLabelText(/Filter by Color:/i);
    });
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    await waitFor(() => {
      expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    });
  });
});
