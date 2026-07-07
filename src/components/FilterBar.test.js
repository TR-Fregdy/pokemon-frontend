import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';

describe('FilterBar Component', () => {
  const mockFilters = {
    name: '',
    type: '',
    color: '',
    legendary: ''
  };

  const mockTypes = ['Electric', 'Fire', 'Water'];
  const mockColors = ['Yellow', 'Red/Orange', 'Blue', 'Green', 'Purple'];
  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnClearFilters.mockClear();
  });

  test('should render color filter label "Filter by Color:"', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByLabelText('Filter by Color:')).toBeInTheDocument();
  });

  test('should render all available colors as options', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const colorSelect = screen.getByLabelText('Filter by Color:');
    expect(colorSelect).toBeInTheDocument();

    // Check that all colors are present as options
    mockColors.forEach(color => {
      expect(screen.getByText(color)).toBeInTheDocument();
    });
  });

  test('should render "All Colors" as default option', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByDisplayValue('All Colors')).toBeInTheDocument();
  });

  test('should call onFilterChange when color selected', async () => {
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const colorSelect = screen.getByLabelText('Filter by Color:');
    await user.selectOptions(colorSelect, 'Yellow');

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'Yellow'
      })
    );
  });

  test('should display color filter with current value', () => {
    const filtersWithColor = {
      ...mockFilters,
      color: 'Yellow'
    };

    render(
      <FilterBar
        filters={filtersWithColor}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const colorSelect = screen.getByLabelText('Filter by Color:');
    expect(colorSelect.value).toBe('Yellow');
  });

  test('should show Clear Filters button when color filter is active', () => {
    const filtersWithColor = {
      ...mockFilters,
      color: 'Yellow'
    };

    render(
      <FilterBar
        filters={filtersWithColor}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  test('should not show Clear Filters button when no filters are active', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
  });
});
