import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';

describe('FilterBar Component - Color Filter', () => {
  const mockFilters = {
    name: '',
    type: '',
    legendary: '',
    color: ''
  };

  const mockTypes = ['Electric', 'Fire', 'Flying', 'Water'];
  const mockColors = ['Blue', 'Orange', 'Yellow'];

  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render color filter label "Filter by Color:"', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByLabelText(/Filter by Color:/i)).toBeInTheDocument();
  });

  it('should render color filter select dropdown', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const colorSelect = screen.getByDisplayValue('All Colors');
    expect(colorSelect).toBeInTheDocument();
    expect(colorSelect.id).toBe('color-filter');
  });

  it('should render all provided colors as options', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    mockColors.forEach(color => {
      const option = screen.getByRole('option', { name: color });
      expect(option).toBeInTheDocument();
    });
  });

  it('should have "All Colors" as default option', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const defaultOption = screen.getByRole('option', { name: 'All Colors' });
    expect(defaultOption).toBeInTheDocument();
    expect(defaultOption.value).toBe('');
  });

  it('should call onFilterChange when color is selected', async () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const colorSelect = screen.getByDisplayValue('All Colors');
    fireEvent.change(colorSelect, { target: { value: 'Yellow' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      ...mockFilters,
      color: 'Yellow'
    });
  });

  it('should display "Clear Filters" button when color filter is active', () => {
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

  it('should not display "Clear Filters" button when no filters are active', () => {
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

  it('should handle empty colors array gracefully', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={[]}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const colorSelect = screen.getByDisplayValue('All Colors');
    expect(colorSelect).toBeInTheDocument();
  });

  it('should update color filter value when filters prop changes', () => {
    const { rerender } = render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const filtersWithColor = {
      ...mockFilters,
      color: 'Blue'
    };

    rerender(
      <FilterBar
        filters={filtersWithColor}
        types={mockTypes}
        colors={mockColors}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const colorSelect = screen.getByDisplayValue('Blue');
    expect(colorSelect.value).toBe('Blue');
  });
});
