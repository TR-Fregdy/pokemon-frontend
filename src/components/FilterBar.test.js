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
      legendary: '',
      color: ''
    },
    types: ['Electric', 'Fire', 'Water', 'Grass'],
    colors: ['Red', 'Yellow', 'Blue', 'Green', 'Purple'],
    onFilterChange: mockOnFilterChange,
    onClearFilters: mockOnClearFilters
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render color filter select element with label "Filter by Color:"', () => {
    render(<FilterBar {...defaultProps} />);

    const colorLabel = screen.getByText('Filter by Color:');
    expect(colorLabel).toBeInTheDocument();

    const colorSelect = screen.getByDisplayValue('');
    expect(colorSelect).toBeInTheDocument();
  });

  test('should populate color options from props', () => {
    render(<FilterBar {...defaultProps} />);

    const colorSelect = screen.getByRole('combobox', { name: /filter by color/i });
    expect(colorSelect).toBeInTheDocument();

    // Check that all color options are present
    const options = colorSelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(0);

    // Check for "All Colors" default option
    const allColorsOption = Array.from(options).find(opt => opt.textContent === 'All Colors');
    expect(allColorsOption).toBeInTheDocument();
  });

  test('should call onFilterChange with color value when color selection changes', () => {
    render(<FilterBar {...defaultProps} />);

    const colorSelect = screen.getByRole('combobox', { name: /filter by color/i });
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      name: '',
      type: '',
      legendary: '',
      color: 'Yellow'
    });
  });

  test('should include clear filters button when color filter is active', () => {
    const propsWithColorFilter = {
      ...defaultProps,
      filters: {
        name: '',
        type: '',
        legendary: '',
        color: 'Yellow'
      }
    };

    render(<FilterBar {...propsWithColorFilter} />);

    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    expect(clearButton).toBeInTheDocument();
  });

  test('should render other filter sections correctly', () => {
    render(<FilterBar {...defaultProps} />);

    // Check name filter
    expect(screen.getByText('Search by Name:')).toBeInTheDocument();

    // Check type filter
    expect(screen.getByText('Filter by Type:')).toBeInTheDocument();

    // Check legendary filter
    expect(screen.getByText('Legendary Status:')).toBeInTheDocument();

    // Check color filter
    expect(screen.getByText('Filter by Color:')).toBeInTheDocument();
  });
});
