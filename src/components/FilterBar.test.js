import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar Component', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  const defaultProps = {
    filters: {
      name: '',
      type: '',
      color: '',
      legendary: ''
    },
    types: ['Electric', 'Fire', 'Water', 'Grass'],
    colors: ['Yellow', 'Orange', 'Blue', 'Green'],
    onFilterChange: mockOnFilterChange,
    onClearFilters: mockOnClearFilters
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Color Filter Rendering', () => {
    test('renders label "Filter by Color:" for color filter', () => {
      render(<FilterBar {...defaultProps} />);
      expect(screen.getByLabelText(/Filter by Color:/i)).toBeInTheDocument();
    });

    test('renders color filter as a select dropdown', () => {
      render(<FilterBar {...defaultProps} />);
      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      expect(colorSelect.tagName).toBe('SELECT');
    });

    test('renders all unique color options from colors prop', () => {
      const colors = ['Yellow', 'Orange', 'Red', 'Blue', 'Green'];
      render(<FilterBar {...defaultProps} colors={colors} />);

      // Check that all color options are rendered
      expect(screen.getByText('Yellow')).toBeInTheDocument();
      expect(screen.getByText('Orange')).toBeInTheDocument();
      expect(screen.getByText('Red')).toBeInTheDocument();
      expect(screen.getByText('Blue')).toBeInTheDocument();
      expect(screen.getByText('Green')).toBeInTheDocument();
      // Check that "All Colors" default option is present
      expect(screen.getByText('All Colors')).toBeInTheDocument();
    });

    test('color select includes "All Colors" option as default', () => {
      render(<FilterBar {...defaultProps} />);
      expect(screen.getByText('All Colors')).toBeInTheDocument();
    });

    test('calls onFilterChange with color field when selection changes', () => {
      render(<FilterBar {...defaultProps} />);

      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultProps.filters,
        color: 'Yellow'
      });
    });
  });

  describe('Color Filter Integration', () => {
    test('renders color filter alongside other filters', () => {
      render(<FilterBar {...defaultProps} />);
      expect(screen.getByLabelText(/Search by Name:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Filter by Type:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Filter by Color:/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Legendary Status:/i)).toBeInTheDocument();
    });

    test('maintains color filter state when updated', () => {
      const { rerender } = render(<FilterBar {...defaultProps} />);

      const colorSelect = screen.getByLabelText(/Filter by Color:/i);
      fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

      const updatedProps = {
        ...defaultProps,
        filters: {
          ...defaultProps.filters,
          color: 'Yellow'
        }
      };
      rerender(<FilterBar {...updatedProps} />);

      expect(screen.getByLabelText(/Filter by Color:/i)).toHaveValue('Yellow');
    });
  });
});
