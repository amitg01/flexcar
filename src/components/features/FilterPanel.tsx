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
  const availableMakes = getAvailableMakes();
  const availableColors = getAvailableColors();

  // Create options for dropdowns
  const makeOptions = [
    { value: '', label: 'All Makes' },
    ...availableMakes.map(make => ({ value: make, label: make })),
  ];

  const colorOptions = [
    { value: '', label: 'All Colors' },
    ...availableColors.map(color => ({ value: color, label: color })),
  ];

  const bodyTypeOptions = [
    { value: '', label: 'All Body Types' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'convertible', label: 'Convertible' },
  ];

  const yearOptions = [
    { value: '', label: 'All Years' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
  ];

  const fuelTypeOptions = [
    { value: '', label: 'All Fuel Types' },
    { value: 'gasoline', label: 'Gasoline' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'electric', label: 'Electric' },
    { value: 'diesel', label: 'Diesel' },
  ];

  const priceRangeOptions = [
    { value: '', label: 'All Price Ranges' },
    { value: '0-200', label: 'Under $200/month' },
    { value: '200-300', label: '$200 - $300/month' },
    { value: '300-400', label: '$300 - $400/month' },
    { value: '400-500', label: '$400 - $500/month' },
    { value: '500-600', label: '$500 - $600/month' },
    { value: '600+', label: 'Over $600/month' },
  ];

  const mileageOptions = [
    { value: '', label: 'All Mileage' },
    { value: '0-10000', label: 'Under 10,000 miles' },
    { value: '10000-25000', label: '10,000 - 25,000 miles' },
    { value: '25000-50000', label: '25,000 - 50,000 miles' },
    { value: '50000-75000', label: '50,000 - 75,000 miles' },
    { value: '75000+', label: 'Over 75,000 miles' },
  ];

  const mpgOptions = [
    { value: '', label: 'All MPG Ratings' },
    { value: '15-20', label: '15 - 20 MPG' },
    { value: '20-25', label: '20 - 25 MPG' },
    { value: '25-30', label: '25 - 30 MPG' },
    { value: '30-35', label: '30 - 35 MPG' },
    { value: '35-40', label: '35 - 40 MPG' },
    { value: '40+', label: '40+ MPG' },
  ];

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
          <Select
            label="Monthly Price"
            value=""
            onChange={() => {}} // TODO: Add price range filter to context
            options={priceRangeOptions}
            placeholder="Select price range"
            id="price-range-filter"
          />
        </div>

        {/* Body Type Filter */}
        <div>
          <Select
            label="Body Type"
            value=""
            onChange={() => {}} // TODO: Add body type filter to context
            options={bodyTypeOptions}
            placeholder="Select body type"
            id="body-type-filter"
          />
        </div>

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

        {/* Model Year Filter */}
        <div>
          <Select
            label="Model Year"
            value=""
            onChange={() => {}} // TODO: Add year filter to context
            options={yearOptions}
            placeholder="Select year"
            id="year-filter"
          />
        </div>

        {/* Mileage Filter */}
        <div>
          <Select
            label="Mileage"
            value=""
            onChange={() => {}} // TODO: Add mileage filter to context
            options={mileageOptions}
            placeholder="Select mileage range"
            id="mileage-filter"
          />
        </div>

        {/* Fuel Type Filter */}
        <div>
          <Select
            label="Fuel Type"
            value=""
            onChange={() => {}} // TODO: Add fuel type filter to context
            options={fuelTypeOptions}
            placeholder="Select fuel type"
            id="fuel-type-filter"
          />
        </div>

        {/* MPG Filter */}
        <div>
          <Select
            label="Miles per gallon (MPG)"
            value=""
            onChange={() => {}} // TODO: Add MPG filter to context
            options={mpgOptions}
            placeholder="Select MPG range"
            id="mpg-filter"
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
