import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary, LoadingSpinner } from './components/ui';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { VehicleProvider } from './contexts/VehicleContext';
import { ZipCodeModalProvider } from './contexts/ZipCodeModalContextInstance';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const VehicleListingPage = lazy(() => import('./pages/VehicleListingPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppContent: React.FC = () => {
  return (
    <Router>
      <ZipCodeModalProvider>
        <VehicleProvider>
          <OnboardingProvider>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Loading page...</p>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/inventory" element={<VehicleListingPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </OnboardingProvider>
        </VehicleProvider>
      </ZipCodeModalProvider>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;
