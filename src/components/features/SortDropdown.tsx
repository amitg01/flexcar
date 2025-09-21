import React, { useEffect } from 'react';
import { useVehicle } from '@/hooks/useVehicle';
import { Select } from '@/components/ui';
import type { SortOption } from '@/types/contexts/VehicleContext';

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
    <div className={`flex items-center gap-3 ${className}`}>
      <Select
        label="Sort by"
        value={state.sortBy}
        onChange={e => handleSortChange(e.target.value)}
        options={sortOptions}
        className="min-w-[200px]"
      />
    </div>
  );
};

export default SortDropdown;
