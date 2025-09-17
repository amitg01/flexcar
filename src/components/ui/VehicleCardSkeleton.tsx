import React from 'react';
import { Card } from './Card';
import Skeleton from './Skeleton';

const VehicleCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Card variant="elevated" padding="none" className={`overflow-hidden ${className}`}>
      {/* Image skeleton */}
      <Skeleton height={192} className="w-full" />
      
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton height={24} width="80%" />
          <Skeleton height={16} width="60%" />
        </div>

        {/* Details skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton height={16} width="20%" />
            <Skeleton height={16} width="30%" />
          </div>
          <div className="flex justify-between">
            <Skeleton height={16} width="25%" />
            <Skeleton height={16} width="35%" />
          </div>
        </div>

        {/* Price and button skeleton */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <Skeleton height={32} width="40%" />
            <Skeleton height={32} width="30%" rounded="md" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCardSkeleton;
