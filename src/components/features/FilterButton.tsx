import React from 'react';
import { Button } from '@/components/ui';
import { useVehicle } from '@/hooks/useVehicle';

interface FilterButtonProps {
  onClick: () => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  onClick,
  className = '',
}) => {
  const { state } = useVehicle();

  const hasActiveFilters =
    state.selectedMake !== '' || state.selectedColor !== '';

  const getActiveFilterCount = () => {
    let count = 0;
    if (state.selectedMake) count++;
    if (state.selectedColor) count++;
    return count;
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`flex items-center gap-2 ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
        />
      </svg>
      <span>Filters</span>
      {hasActiveFilters && (
        <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
          {getActiveFilterCount()}
        </span>
      )}
    </Button>
  );
};

export default FilterButton;
