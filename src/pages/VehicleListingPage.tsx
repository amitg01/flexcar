import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { VehicleGrid, FilterPanel, SortDropdown } from '@/components/features';
import { useVehicle } from '@/hooks/useVehicle';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useZipCodeModal } from '@/contexts/ZipCodeModalContextInstance';
import OnboardingModal from '@/pages/HomePage/OnboardingModal';
import { LoadingSpinner, EmptyState } from '@/components/ui';
import type { SortOption } from '@/types/contexts/VehicleContext';

const VehicleListingPage: React.FC = () => {
  const { state, dispatch, searchVehicles } = useVehicle();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showModal } = useOnboarding();
  const { openZipCodeModal } = useZipCodeModal();
  const isUpdatingFromURL = useRef(false);
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

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

  // Set initial load to false once vehicles are loaded or there's an error
  useEffect(() => {
    if (state.vehicles.length > 0 || state.error) {
      setIsInitialLoad(false);
    }
  }, [state.vehicles.length, state.error]);

  // Load URL parameters on mount and when URL changes
  useEffect(() => {
    const make = searchParams.get('make') || '';
    const color = searchParams.get('color') || '';
    const sort = searchParams.get('sort') || 'price-high-low';

    // Only update if values are different and we're not already updating from URL
    if (!isUpdatingFromURL.current) {
      isUpdatingFromURL.current = true;

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

      // Reset the flag after a short delay
      setTimeout(() => {
        isUpdatingFromURL.current = false;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, dispatch, state.vehicles.length]);

  // Update URL when filters or sort change (but not when updating from URL)
  useEffect(() => {
    if (isUpdatingFromURL.current) return;

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
    if (state.sortBy !== (currentParams.get('sort') || 'price-high-low')) {
      if (state.sortBy !== 'price-high-low') {
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
      {showModal && <OnboardingModal />}
      <Header />

      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-start">
            <div className="flex-1 min-w-0 bg-white">
              <div className="py-4 lg:py-6 pr-4 lg:pr-6">
                {isInitialLoad ? (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <LoadingSpinner size="lg" />
                      <p className="mt-4 text-gray-600">Loading vehicles...</p>
                    </div>
                  </div>
                ) : (
                  <>
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

                    {state.vehicles.length === 0 && !state.isLoading ? (
                      <EmptyState
                        icon={
                          <svg
                            className="mx-auto h-16 w-16 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        }
                        title="No vehicles available"
                        description="We couldn't find any vehicles for this location. Try one of the suggested ZIP codes to see available vehicles."
                        action={{
                          label: 'Try Different ZIP Code',
                          onClick: openZipCodeModal,
                        }}
                      />
                    ) : (
                      <div className="overflow-hidden">
                        <VehicleGrid />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="w-full lg:w-80 lg:border rounded-lg border-gray-200">
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
