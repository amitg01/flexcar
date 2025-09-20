import React from 'react';
import { ErrorBoundary } from './components/ui';
import HomePage from './pages/HomePage';
import { OnboardingProvider } from './contexts/OnboardingContext';

const AppContent: React.FC = () => {
  return (
    <OnboardingProvider>
      <HomePage />
    </OnboardingProvider>
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
