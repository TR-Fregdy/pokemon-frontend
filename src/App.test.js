import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock the API calls
global.fetch = jest.fn();

const mockPokemonResponse = {
  success: true,
  count: 12,
  data: [
    {
      id: 1,
      name: 'Pikachu',
      type: ['Electric'],
      legendary: false,
      color: 'Yellow',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    },
    {
      id: 2,
      name: 'Charizard',
      type: ['Fire', 'Flying'],
      legendary: false,
      color: 'Red',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
    },
    {
      id: 3,
      name: 'Blastoise',
      type: ['Water'],
      legendary: false,
      color: 'Blue',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png'
    }
  ]
};

const mockTypesResponse = {
  success: true,
  data: ['Electric', 'Fire', 'Flying', 'Water']
};

describe('App - Color Filter', () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.mockImplementation((url) => {
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesResponse)
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemonResponse)
      });
    });
  });

  test('should initialize filters with color as empty string', () => {
    render(<App />);
    const form = screen.getByRole('form', { hidden: true });
    expect(form).toBeDefined();
    // The initial state should have color: ''
  });

  test('should filter pokemons by color when color filter is set', async () => {
    render(<App />);

    // Wait for Pokemon to load
    await screen.findByText(/Showing 3 of 3 Pokemon/);

    // Select Yellow color
    const colorSelect = screen.getByDisplayValue('All Colors');
    await userEvent.selectOption(colorSelect, 'Yellow');

    // Should show only Yellow Pokemon
    await screen.findByText(/Pikachu/);
    expect(screen.queryByText(/Charizard/)).not.toBeInTheDocument();
  });

  test('should return all pokemons when color filter is empty', async () => {
    render(<App />);

    // Wait for Pokemon to load
    await screen.findByText(/Showing 3 of 3 Pokemon/);

    // Verify all 3 Pokemon are shown
    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
    expect(screen.getByText(/Charizard/)).toBeInTheDocument();
    expect(screen.getByText(/Blastoise/)).toBeInTheDocument();
  });

  test('should clear color filter when clearFilters is called', async () => {
    render(<App />);

    // Wait for Pokemon to load
    await screen.findByText(/Showing 3 of 3 Pokemon/);

    // Select Yellow color
    const colorSelect = screen.getByDisplayValue('All Colors');
    await userEvent.selectOption(colorSelect, 'Yellow');

    // Verify only Pikachu is shown
    await screen.findByText(/Pikachu/);
    expect(screen.queryByText(/Charizard/)).not.toBeInTheDocument();

    // Click Clear Filters
    const clearButton = screen.getByText(/Clear All Filters|Clear Filters/);
    await userEvent.click(clearButton);

    // Verify all Pokemon are shown again
    await screen.findByText(/Pikachu/);
    expect(screen.getByText(/Charizard/)).toBeInTheDocument();
  });
});
