import React from 'react';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  const defaultIcon = (
    <svg
      className='mx-auto h-16 w-16 text-gray-400'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1}
        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      />
    </svg>
  );

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className='text-gray-400 mb-4'>{icon || defaultIcon}</div>
      <h3 className='text-xl font-medium text-gray-900 mb-2'>{title}</h3>
      <p className='text-gray-500 mb-6'>{description}</p>
      {action && (
        <Button onClick={action.onClick} variant='primary'>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
