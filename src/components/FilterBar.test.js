import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';

describe('FilterBar - Color Filter', () => {
  const mockFilters = {
    name: '',
    type: '',
    legendary: '',
    color: ''
  };

  const mockTypes = ['Electric', 'Fire', 'Water', 'Grass'];
  const mockOnFilterChange = jest.fn();
  const mockOnClearFilters = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnClearFilters.mockClear();
  });

  test('should render color filter section with label "Filter by Color:"', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    // Check for the label
    expect(screen.getByText(/Filter by Color:/)).toBeInTheDocument();
  });

  test('should include All Colors option', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    // Check for All Colors option
    const colorSelect = screen.getByDisplayValue(/All Colors/);
    expect(colorSelect).toBeInTheDocument();
  });

  test('should include Yellow, Red, Blue, Green, Purple, Brown options', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    // Get the color select element
    const colorSelects = screen.getAllByRole('combobox');
    const colorSelect = colorSelects[colorSelects.length - 1]; // Last select is color

    // Check for color options
    const options = colorSelect.querySelectorAll('option');
    const optionValues = Array.from(options).map(opt => opt.value);

    expect(optionValues).toContain('Yellow');
    expect(optionValues).toContain('Red');
    expect(optionValues).toContain('Blue');
    expect(optionValues).toContain('Green');
    expect(optionValues).toContain('Purple');
    expect(optionValues).toContain('Brown');
  });

  test('should call onFilterChange when color selection changes', async () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    // Find and click the color select
    const colorSelects = screen.getAllByRole('combobox');
    const colorSelect = colorSelects[colorSelects.length - 1]; // Last select is color

    // Select Yellow
    await userEvent.selectOption(colorSelect, 'Yellow');

    // Verify onFilterChange was called with color set to Yellow
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'Yellow'
      })
    );
  });

  test('should render color filter with id="color-filter"', () => {
    render(
      <FilterBar
        filters={mockFilters}
        types={mockTypes}
        onFilterChange={mockOnFilterChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    // Check for the color filter with specific id
    const colorFilter = screen.getByDisplayValue(/All Colors/);
    expect(colorFilter.id).toBe('color-filter');
  });
});
