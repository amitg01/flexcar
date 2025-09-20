import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { VehicleGrid, FilterPanel, SortDropdown } from '@/components/features';
import { useVehicle } from '@/hooks/useVehicle';
import type { SortOption } from '@/types/contexts/VehicleContext';

const VehicleListingPage: React.FC = () => {
  const { state, dispatch, searchVehicles } = useVehicle();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const userData = localStorage.getItem('flexcar-user-data');
    if (userData) {
      try {
        const { zipCode } = JSON.parse(userData);
        if (zipCode) {
          searchVehicles(zipCode);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        searchVehicles('10001');
      }
    } else {
      searchVehicles('10001');
    }
  }, [searchVehicles]);

  // Load URL parameters on mount and when URL changes
  useEffect(() => {
    const make = searchParams.get('make') || '';
    const color = searchParams.get('color') || '';
    const sort = searchParams.get('sort') || 'popularity';

    // Update state from URL parameters
    if (make !== state.selectedMake) {
      dispatch({ type: 'SET_FILTER_MAKE', payload: make });
    }
    if (color !== state.selectedColor) {
      dispatch({ type: 'SET_FILTER_COLOR', payload: color });
    }
    if (sort !== state.sortBy) {
      dispatch({ type: 'SET_SORT_BY', payload: sort as SortOption });
    }

    // Apply filters and sort after updating state
    if (state.vehicles.length > 0) {
      dispatch({ type: 'APPLY_FILTERS_AND_SORT' });
    }
  }, [
    searchParams,
    dispatch,
    state.selectedMake,
    state.selectedColor,
    state.sortBy,
    state.vehicles.length,
  ]);

  // Update URL when filters or sort change
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    let hasChanges = false;

    // Update make parameter
    if (state.selectedMake !== (currentParams.get('make') || '')) {
      if (state.selectedMake) {
        currentParams.set('make', state.selectedMake);
      } else {
        currentParams.delete('make');
      }
      hasChanges = true;
    }

    // Update color parameter
    if (state.selectedColor !== (currentParams.get('color') || '')) {
      if (state.selectedColor) {
        currentParams.set('color', state.selectedColor);
      } else {
        currentParams.delete('color');
      }
      hasChanges = true;
    }

    // Update sort parameter
    if (state.sortBy !== (currentParams.get('sort') || 'popularity')) {
      if (state.sortBy !== 'popularity') {
        currentParams.set('sort', state.sortBy);
      } else {
        currentParams.delete('sort');
      }
      hasChanges = true;
    }

    // Only update URL if there are changes
    if (hasChanges) {
      setSearchParams(currentParams, { replace: true });
    }
  }, [
    state.selectedMake,
    state.selectedColor,
    state.sortBy,
    searchParams,
    setSearchParams,
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="w-full overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 min-w-0 bg-white">
              <div className="p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {state.filteredVehicles.length} results
                    </h2>
                    {state.isLoading && (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    )}
                  </div>
                  <div className="w-full sm:w-auto">
                    <SortDropdown />
                  </div>
                </div>

                {state.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{state.error}</p>
                  </div>
                )}

                <div className="overflow-hidden">
                  <VehicleGrid />
                </div>
              </div>
            </div>

            {/* Filters Sidebar - Right Side */}
            <div className="w-full lg:w-80 lg:border-l border-gray-200 lg:min-h-screen">
              <div className="p-4 lg:p-6">
                <FilterPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VehicleListingPage;
