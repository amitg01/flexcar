import React, { useEffect } from 'react';
import { useVehicle } from '@/hooks/useVehicle';
import type { SortOption } from '@/types/contexts/VehicleContext';

interface SortDropdownProps {
  className?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ className = '' }) => {
  const { state, dispatch } = useVehicle();

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
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
    <div className={`flex items-center gap-3 ${className}`}>
      <label htmlFor="sort-select" className="text-gray-700 font-medium">
        Sort by
      </label>
      <select
        id="sort-select"
        value={state.sortBy}
        onChange={e => handleSortChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
