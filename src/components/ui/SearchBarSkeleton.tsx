import React from 'react';
import Skeleton from './Skeleton';

const SearchBarSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-md mx-auto mb-8 ${className}`}>
      <div className="flex gap-2">
        <div className="flex-1">
          <Skeleton height={48} width="100%" rounded="md" />
        </div>
        <Skeleton height={48} width="100px" rounded="md" />
      </div>
    </div>
  );
};

export default SearchBarSkeleton;
