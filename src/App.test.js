import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Pokemon Explorer App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  const mockPokemonData = {
    success: true,
    count: 12,
    data: [
      {
        id: 1,
        name: 'Pikachu',
        type: ['Electric'],
        color: 'Yellow',
        legendary: false,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
      },
      {
        id: 2,
        name: 'Charizard',
        type: ['Fire', 'Flying'],
        color: 'Red/Orange',
        legendary: false,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
      },
      {
        id: 8,
        name: 'Zapdos',
        type: ['Electric', 'Flying'],
        color: 'Yellow',
        legendary: true,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png'
      }
    ]
  };

  const mockTypesData = {
    success: true,
    data: ['Electric', 'Fire', 'Flying']
  };

  const mockColorsData = {
    success: true,
    data: ['Red/Orange', 'Yellow', 'Blue', 'Green', 'Purple', 'Pink', 'Light Blue', 'Blue/Purple']
  };

  test('should render "Pokemon Explorer" title when app loads', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Pokemon Explorer')).toBeInTheDocument();
    });
  });

  test('should render color filter dropdown with available colors', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText('Filter by Color:')).toBeInTheDocument();
    });

    const colorSelect = screen.getByLabelText('Filter by Color:');
    expect(colorSelect).toBeInTheDocument();
  });

  test('should filter Pokemon by Yellow color to show Pikachu', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
    });

    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText('Filter by Color:')).toBeInTheDocument();
    });

    const colorSelect = screen.getByLabelText('Filter by Color:');
    await user.selectOptions(colorSelect, 'Yellow');

    // After filtering by Yellow, should show Pikachu and Zapdos
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });

  test('should show all Pokemon when color filter cleared', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
    });

    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText('Filter by Color:')).toBeInTheDocument();
    });

    const colorSelect = screen.getByLabelText('Filter by Color:');
    await user.selectOptions(colorSelect, 'Yellow');

    // Select "All Colors" to clear filter
    await user.selectOptions(colorSelect, '');

    // All Pokemon should be visible
    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Charizard')).toBeInTheDocument();
    });
  });
});
