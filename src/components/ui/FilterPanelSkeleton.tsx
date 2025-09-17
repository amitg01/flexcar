import React from 'react';
import { Card } from './Card';
import Skeleton from './Skeleton';

const FilterPanelSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Card variant="elevated" padding="lg" className={`h-fit ${className}`}>
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton height={24} width="20%" />
        <Skeleton height={32} width="25%" rounded="md" />
      </div>

      {/* Filter options skeleton */}
      <div className="space-y-6">
        {/* Make filter skeleton */}
        <div className="space-y-2">
          <Skeleton height={16} width="15%" />
          <Skeleton height={40} width="100%" rounded="md" />
        </div>

        {/* Color filter skeleton */}
        <div className="space-y-2">
          <Skeleton height={16} width="20%" />
          <Skeleton height={40} width="100%" rounded="md" />
        </div>
      </div>

      {/* Active filters skeleton */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Skeleton height={16} width="30%" className="mb-2" />
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton height={16} width="40%" />
            <Skeleton height={16} width="8%" rounded="full" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton height={16} width="35%" />
            <Skeleton height={16} width="8%" rounded="full" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanelSkeleton;
