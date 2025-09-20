import React from 'react';
import { EmptyState } from '@/components/ui';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <EmptyState
          title="404 - Page Not Found"
          description="Sorry, the page you're looking for doesn't exist or has been moved."
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
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          action={{
            label: 'Go Home',
            onClick: () => (window.location.href = '/'),
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
