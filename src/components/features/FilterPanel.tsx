import React, { useEffect, useRef } from 'react';
import { Button, FilterPanelSkeleton } from '@/components/ui';
import { useVehicle } from '@/hooks/useVehicle';

interface FilterPanelProps {
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ className = '' }) => {
  const { state, dispatch, clearFilters } = useVehicle();
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

      {/* Quick Filters */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="local-cars"
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="local-cars" className="text-sm text-gray-700">
            Local cars only (199)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="recently-added"
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="recently-added" className="text-sm text-gray-700">
            Recently added (74)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="brand-new"
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="brand-new" className="text-sm text-gray-700">
            Brand new (13)
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {/* Monthly Price Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">
              Monthly price
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Body Type Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">Body type</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Make & Model Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">
              Make & Model
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Model Year Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">
              Model year
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Mileage Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">Mileage</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Fuel Type Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">Fuel type</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* MPG Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">
              Miles per gallon (MPG)
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Exterior Color Filter */}
        <div>
          <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700">
              Exterior color
            </span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
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
