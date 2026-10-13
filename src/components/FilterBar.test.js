import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const defaultProps = {
    filters: {
      name: '',
      type: '',
      legendary: ''
    },
    types: ['Fire', 'Water', 'Grass', 'Electric'],
    onFilterChange: jest.fn(),
    onClearFilters: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render 'SEARCH POKEMON' section header in the search section", () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('SEARCH POKEMON')).toBeInTheDocument();
  });

  it("should render 'Filter By Type' label in the filters section", () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('Filter By Type')).toBeInTheDocument();
  });

  it("should render filters section after search section (vertical ordering for positioning requirement)", () => {
    const { container } = render(<FilterBar {...defaultProps} />);

    // Get the search and filters sections
    const searchSection = container.querySelector('.filter-search-section');
    const filtersSection = container.querySelector('.filter-filters-section');

    expect(searchSection).toBeInTheDocument();
    expect(filtersSection).toBeInTheDocument();

    // Check that search section appears before filters section in DOM order
    const sections = container.querySelectorAll('.filter-search-section, .filter-filters-section');
    expect(sections[0]).toHaveClass('filter-search-section');
    expect(sections[1]).toHaveClass('filter-filters-section');
  });

  it('should maintain filter functionality when restructured', () => {
    const onFilterChange = jest.fn();
    render(
      <FilterBar
        {...defaultProps}
        onFilterChange={onFilterChange}
      />
    );

    const nameInput = screen.getByPlaceholderText('Enter Pokemon name...');
    fireEvent.change(nameInput, { target: { value: 'pikachu' } });

    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'pikachu'
      })
    );
  });

  it('should call onFilterChange when type dropdown changes', () => {
    const onFilterChange = jest.fn();
    render(
      <FilterBar
        {...defaultProps}
        onFilterChange={onFilterChange}
      />
    );

    const typeSelect = screen.getByDisplayValue('All Types');
    fireEvent.change(typeSelect, { target: { value: 'Fire' } });

    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Fire'
      })
    );
  });

  it('should call onFilterChange when legendary dropdown changes', () => {
    const onFilterChange = jest.fn();
    render(
      <FilterBar
        {...defaultProps}
        onFilterChange={onFilterChange}
      />
    );

    const legendarySelect = screen.getByDisplayValue('All Pokemon');
    fireEvent.change(legendarySelect, { target: { value: 'true' } });

    expect(onFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        legendary: 'true'
      })
    );
  });

  it('should render search input with correct placeholder text', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter Pokemon name...')).toBeInTheDocument();
  });

  it('should render label for name input for accessibility', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByLabelText('Search Pokemon')).toBeInTheDocument();
  });

  it('should render all type options from types prop', () => {
    render(<FilterBar {...defaultProps} />);
    const typeSelect = screen.getByDisplayValue('All Types');

    const options = typeSelect.querySelectorAll('option');
    expect(options).toHaveLength(5); // "All Types" + 4 types

    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
  });

  it('should render Clear Filters button when filters are active', () => {
    const { rerender } = render(
      <FilterBar
        {...defaultProps}
        filters={{
          name: 'pikachu',
          type: '',
          legendary: ''
        }}
      />
    );

    expect(screen.getByText('Clear Filters')).toBeInTheDocument();

    // Verify it's not shown when no filters are active
    rerender(
      <FilterBar
        {...defaultProps}
        filters={{
          name: '',
          type: '',
          legendary: ''
        }}
      />
    );

    expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
  });

  it('should call onClearFilters when Clear Filters button is clicked', () => {
    const onClearFilters = jest.fn();
    render(
      <FilterBar
        {...defaultProps}
        filters={{
          name: 'pikachu',
          type: '',
          legendary: ''
        }}
        onClearFilters={onClearFilters}
      />
    );

    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);

    expect(onClearFilters).toHaveBeenCalled();
  });
});
