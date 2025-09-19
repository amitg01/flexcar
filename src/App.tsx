import React from 'react';
import { ErrorBoundary } from './components/ui';
import HomePage from './pages/HomePage';

const AppContent: React.FC = () => {
  return <HomePage />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;
// Test comment
