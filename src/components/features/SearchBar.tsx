import React, { useState, useEffect } from 'react';
import { Input, Button } from '@/components/ui';
import { useDebounce } from '@/hooks';
import { useVehicle } from '@/hooks/useVehicle';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const [zipCode, setZipCode] = useState('');
  const { state, searchVehicles } = useVehicle();
  const debouncedZipCode = useDebounce(zipCode, 300);

  const isValidZipCode = (zip: string): boolean => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim() && isValidZipCode(zipCode.trim())) {
      searchVehicles(zipCode.trim());
    }
  };

  // Auto-search when debounced value changes and is valid
  useEffect(() => {
    if (
      debouncedZipCode &&
      isValidZipCode(debouncedZipCode) &&
      debouncedZipCode !== state.zipCode
    ) {
      searchVehicles(debouncedZipCode);
    }
  }, [debouncedZipCode, state.zipCode, searchVehicles]);

  const hasError = zipCode && !isValidZipCode(zipCode);
  const isDisabled = !zipCode.trim() || hasError || state.isLoading;

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1">
          <Input
            type="text"
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            placeholder="Enter ZIP code (e.g., 10001)"
            error={
              hasError ? 'Please enter a valid ZIP code (5 digits)' : undefined
            }
            disabled={state.isLoading}
            className="text-lg h-14 border-2 border-gray-300 focus:border-blue-500 rounded-lg"
          />
        </div>
        <Button
          type="submit"
          disabled={isDisabled}
          isLoading={state.isLoading}
          size="lg"
          className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          {state.isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
