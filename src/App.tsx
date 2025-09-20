import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ui';
import HomePage from './pages/HomePage';
import VehicleListingPage from './pages/VehicleListingPage';
import NotFound from './pages/NotFound';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { VehicleProvider } from './contexts/VehicleContext';

const AppContent: React.FC = () => {
  return (
    <Router>
      <OnboardingProvider>
        <VehicleProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<VehicleListingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </VehicleProvider>
      </OnboardingProvider>
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
