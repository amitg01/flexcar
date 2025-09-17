import React, { useEffect } from 'react';
import { Card, Select, Button } from '../ui';
import { useVehicle } from '../../contexts/VehicleContext';

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

  const availableMakes = getAvailableMakes() || [];
  const availableColors = getAvailableColors() || [];
  const hasActiveFilters =
    state.selectedMake !== '' || state.selectedColor !== '';

  const makeOptions = [
    { value: '', label: 'All Makes' },
    ...availableMakes.map((make) => ({ value: make, label: make })),
  ];

  const colorOptions = [
    { value: '', label: 'All Colors' },
    ...availableColors.map((color) => ({ value: color, label: color })),
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

  return (
    <Card variant='elevated' padding='lg' className={`h-fit ${className}`}>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-900'>Filters</h2>
        {hasActiveFilters && (
          <Button onClick={handleClearFilters} variant='ghost' size='sm'>
            Clear All
          </Button>
        )}
      </div>

      <div className='space-y-6'>
        <Select
          label='Make'
          value={state.selectedMake}
          onChange={(e) => handleMakeChange(e.target.value)}
          options={makeOptions}
        />

        <Select
          label='Color'
          value={state.selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          options={colorOptions}
        />
      </div>

      {hasActiveFilters && (
        <div className='mt-6 pt-6 border-t border-gray-200'>
          <h3 className='text-sm font-semibold text-gray-700 mb-2'>
            Active Filters:
          </h3>
          <div className='space-y-1'>
            {state.selectedMake && (
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>
                  Make: {state.selectedMake}
                </span>
                <Button
                  onClick={handleRemoveMakeFilter}
                  variant='ghost'
                  size='sm'
                  className='text-red-500 hover:text-red-700 p-1'
                >
                  ×
                </Button>
              </div>
            )}
            {state.selectedColor && (
              <div className='flex items-center justify-between text-sm'>
                <span className='text-gray-600'>
                  Color: {state.selectedColor}
                </span>
                <Button
                  onClick={handleRemoveColorFilter}
                  variant='ghost'
                  size='sm'
                  className='text-red-500 hover:text-red-700 p-1'
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterPanel;
