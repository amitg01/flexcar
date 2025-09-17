import React, { useEffect } from 'react';
import { Button, FilterPanelSkeleton } from '../ui';
import { useVehicle } from '../../hooks/useVehicle';

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

  // Apply filters and sorting when filters change
  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
  }, [
    state.selectedMake,
    state.selectedColor,
    state.sortBy,
    state.vehicles,
    dispatch,
  ]);

  // Show skeleton while loading
  if (state.isLoading && state.vehicles.length === 0) {
    return <FilterPanelSkeleton className={className} />;
  }

  const availableMakes = getAvailableMakes() || [];
  const availableColors = getAvailableColors() || [];
  const hasActiveFilters =
    state.selectedMake !== '' || state.selectedColor !== '';

  const makeOptions = [
    { value: '', label: 'All Makes' },
    ...availableMakes.map(make => ({ value: make, label: make })),
  ];

  const colorOptions = [
    { value: '', label: 'All Colors' },
    ...availableColors.map(color => ({ value: color, label: color })),
  ];

  const handleMakeChange = (value: string) => {
    dispatch({ type: 'SET_FILTER_MAKE', payload: value });
  };

  const handleColorChange = (value: string) => {
    dispatch({ type: 'SET_FILTER_COLOR', payload: value });
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

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 h-fit ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Make & Model
          </label>
          <select
            value={state.selectedMake}
            onChange={e => handleMakeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {makeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exterior color
          </label>
          <select
            value={state.selectedColor}
            onChange={e => handleColorChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {colorOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
