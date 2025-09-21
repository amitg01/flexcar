import React, { useEffect, useRef } from 'react';
import { FilterPanelSkeleton, Select } from '@/components/ui';
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
    sortBy: 'price',
    vehiclesLength: 0,
  });

  useEffect(() => {
    const currentFilters = {
      selectedMake: state.selectedMake,
      selectedColor: state.selectedColor,
      sortBy: state.sortBy,
      vehiclesLength: state.vehicles.length,
    };

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

  if (state.isLoading && state.vehicles.length === 0) {
    return <FilterPanelSkeleton className={className} />;
  }

  const hasActiveFilters =
    state.selectedMake !== '' || state.selectedColor !== '';

  const getActiveFilterCount = () => {
    let count = 0;
    if (state.selectedMake) count++;
    if (state.selectedColor) count++;
    return count;
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleRemoveMakeFilter = () => {
    dispatch({ type: 'SET_FILTER_MAKE', payload: '' });
  };

  const handleRemoveColorFilter = () => {
    dispatch({ type: 'SET_FILTER_COLOR', payload: '' });
  };

  const availableMakes = getAvailableMakes() || [];
  const availableColors = getAvailableColors() || [];

  const makeOptions = [
    { value: '', label: 'All Makes' },
    ...availableMakes.map(make => ({ value: make, label: make })),
  ];

  const colorOptions = [
    { value: '', label: 'All Colors' },
    ...availableColors.map(color => ({ value: color, label: color })),
  ];

  if (state.isLoading) {
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
        <h2 className="text-lg font-semibold text-gray-900">
          Filters {hasActiveFilters && `(${getActiveFilterCount()})`}
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {state.selectedMake && (
              <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 text-sm">
                <span className="text-gray-700">{state.selectedMake}</span>
                <button
                  onClick={handleRemoveMakeFilter}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            )}
            {state.selectedColor && (
              <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 text-sm">
                <span className="text-gray-700">
                  {state.selectedColor} (Exterior)
                </span>
                <button
                  onClick={handleRemoveColorFilter}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Select
            label="Make"
            value={state.selectedMake}
            onChange={e =>
              dispatch({ type: 'SET_FILTER_MAKE', payload: e.target.value })
            }
            options={makeOptions}
            placeholder="Select make"
            id="make-filter"
          />
        </div>

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
    </div>
  );
};

export default FilterPanel;
