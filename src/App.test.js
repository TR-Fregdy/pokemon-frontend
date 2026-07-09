import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock fetch
global.fetch = jest.fn();

describe('App Component - Color Filter Integration', () => {
  const mockPokemonData = {
    success: true,
    count: 3,
    data: [
      {
        id: 1,
        name: 'Pikachu',
        color: 'Yellow',
        type: ['Electric'],
        legendary: false,
        image: 'https://example.com/pikachu.png'
      },
      {
        id: 2,
        name: 'Charizard',
        color: 'Orange',
        type: ['Fire', 'Flying'],
        legendary: false,
        image: 'https://example.com/charizard.png'
      },
      {
        id: 3,
        name: 'Blastoise',
        color: 'Blue',
        type: ['Water'],
        legendary: false,
        image: 'https://example.com/blastoise.png'
      }
    ]
  };

  const mockTypesData = {
    success: true,
    data: ['Electric', 'Fire', 'Flying', 'Water']
  };

  const mockColorsData = {
    success: true,
    data: ['Yellow', 'Orange', 'Blue']
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      } else if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      } else if (url.includes('/api/colors')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockColorsData)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  describe('Page Title', () => {
    test('renders page title as "Pokemon Explorer"', async () => {
      render(<App />);
      await waitFor(() => {
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading.textContent).toBe('Pokemon Explorer');
      });
    });
  });

  describe('Color Filter Functionality', () => {
    test('displays all Pokemon when no color filter selected', async () => {
      render(<App />);
      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
      expect(screen.getByText(/Charizard/)).toBeInTheDocument();
      expect(screen.getByText(/Blastoise/)).toBeInTheDocument();
    });

    test('displays only yellow Pokemon when "Yellow" selected from color filter', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });

      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Charizard/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Blastoise/)).not.toBeInTheDocument();
    });

    test('displays Pikachu when yellow color is selected', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });

      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

      // Verify Pikachu is still displayed after color filter
      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
    });

    test('updates filtered results when color filter changes', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });

      // Select Yellow
      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Charizard/)).not.toBeInTheDocument();

      // Change to Orange
      fireEvent.change(colorSelect, { target: { value: 'Orange' } });

      await waitFor(() => {
        expect(screen.getByText(/Charizard/)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Pikachu/)).not.toBeInTheDocument();
    });

    test('color filter works in combination with other filters', async () => {
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });

      // Select Yellow color
      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Charizard/)).not.toBeInTheDocument();

      // Also filter by Electric type
      const typeSelect = screen.getByLabelText(/Filter by Type:/i);
      fireEvent.change(typeSelect, { target: { value: 'Electric' } });

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Charizard/)).not.toBeInTheDocument();
    });

    test('clearing filters shows all Pokemon again', async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });

      // Apply color filter
      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
      expect(screen.queryByText(/Charizard/)).not.toBeInTheDocument();

      // Clear filters
      const clearButton = screen.getByRole('button', { name: /Clear Filters/i });
      await user.click(clearButton);

      await waitFor(() => {
        expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
      });
      expect(screen.getByText(/Charizard/)).toBeInTheDocument();
      expect(screen.getByText(/Blastoise/)).toBeInTheDocument();
    });
  });
});
