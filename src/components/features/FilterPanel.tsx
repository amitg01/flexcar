import React, { useEffect, useRef } from 'react';
import { Button, FilterPanelSkeleton, Select } from '@/components/ui';
import { useVehicle } from '@/hooks/useVehicle';

interface FilterPanelProps {
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ className = '' }) => {
  const {
    state,
    dispatch,
    clearFilters,
    getAvailableMakes,
    getAvailableColors,
  } = useVehicle();
  const lastAppliedFilters = useRef({
    selectedMake: '',
    selectedColor: '',
    sortBy: 'popularity',
    vehiclesLength: 0,
  });

  // Apply filters and sorting when filters change
  useEffect(() => {
    const currentFilters = {
      selectedMake: state.selectedMake,
      selectedColor: state.selectedColor,
      sortBy: state.sortBy,
      vehiclesLength: state.vehicles.length,
    };

    // Only apply filters if something actually changed
    if (
      lastAppliedFilters.current.selectedMake !== currentFilters.selectedMake ||
      lastAppliedFilters.current.selectedColor !==
        currentFilters.selectedColor ||
      lastAppliedFilters.current.sortBy !== currentFilters.sortBy ||
      lastAppliedFilters.current.vehiclesLength !==
        currentFilters.vehiclesLength
    ) {
      dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
      lastAppliedFilters.current = currentFilters;
    }
  }, [
    state.selectedMake,
    state.selectedColor,
    state.sortBy,
    state.vehicles.length,
    dispatch,
  ]);

  // Show skeleton while loading
  if (state.isLoading && state.vehicles.length === 0) {
    return <FilterPanelSkeleton className={className} />;
  }

  const hasActiveFilters =
    state.selectedMake !== '' || state.selectedColor !== '';

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleRemoveMakeFilter = () => {
    dispatch({ type: 'SET_FILTER_MAKE', payload: '' });
  };

  const handleRemoveColorFilter = () => {
    dispatch({ type: 'SET_FILTER_COLOR', payload: '' });
  };

  // Get available options for dropdowns
  const availableMakes = getAvailableMakes() || [];
  const availableColors = getAvailableColors() || [];

  // Create options for dropdowns
  const makeOptions = [
    { value: '', label: 'All Makes' },
    ...availableMakes.map(make => ({ value: make, label: make })),
  ];

  const colorOptions = [
    { value: '', label: 'All Colors' },
    ...availableColors.map(color => ({ value: color, label: color })),
  ];

  console.log({ makeOptions, colorOptions });
  console.log({ availableMakes, availableColors });

  // Show loading state while vehicles are being loaded
  if (state.isLoading || state.vehicles.length === 0) {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 p-6 h-fit ${className}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <div className="text-center text-gray-500 py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading vehicle data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 h-fit ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Make & Model Filter */}
        <div>
          <Select
            label="Make & Model"
            value={state.selectedMake}
            onChange={e =>
              dispatch({ type: 'SET_FILTER_MAKE', payload: e.target.value })
            }
            options={makeOptions}
            placeholder="Select make"
            id="make-filter"
          />
        </div>

        {/* Exterior Color Filter */}
        <div>
          <Select
            label="Exterior Color"
            value={state.selectedColor}
            onChange={e =>
              dispatch({ type: 'SET_FILTER_COLOR', payload: e.target.value })
            }
            options={colorOptions}
            placeholder="Select color"
            id="color-filter"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Active Filters:
          </h3>
          <div className="space-y-1">
            {state.selectedMake && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Make: {state.selectedMake}
                </span>
                <Button
                  onClick={handleRemoveMakeFilter}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  ×
                </Button>
              </div>
            )}
            {state.selectedColor && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  Color: {state.selectedColor}
                </span>
                <Button
                  onClick={handleRemoveColorFilter}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
