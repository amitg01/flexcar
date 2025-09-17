import React, { useEffect } from 'react';
import { Select } from '../ui';
import { useVehicle } from '../../contexts/VehicleContext';
import type { SortOption } from '../../contexts/VehicleContext';

interface SortDropdownProps {
  className?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ className = '' }) => {
  const { state, dispatch } = useVehicle();

  const sortOptions = [
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'make-alphabetical', label: 'Make: A to Z' },
  ];

  const handleSortChange = (value: string) => {
    dispatch({ type: 'SET_SORT_BY', payload: value as SortOption });
  };

  // Apply sorting when sort option changes
  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
  }, [state.sortBy, dispatch]);

  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className='flex items-center gap-4'>
        <span className='text-gray-700 font-medium'>
          {state.filteredVehicles.length}{' '}
          {state.filteredVehicles.length === 1 ? 'vehicle' : 'vehicles'} found
        </span>
      </div>

      <div className='flex items-center gap-2'>
        <label htmlFor='sort-select' className='text-gray-700 font-medium'>
          Sort by:
        </label>
        <Select
          id='sort-select'
          value={state.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          options={sortOptions}
          className='min-w-[200px]'
        />
      </div>
    </div>
  );
};

export default SortDropdown;
