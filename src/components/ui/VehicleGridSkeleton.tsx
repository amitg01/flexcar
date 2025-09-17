import React from 'react';
import VehicleCardSkeleton from './VehicleCardSkeleton';

interface VehicleGridSkeletonProps {
  count?: number;
  className?: string;
}

const VehicleGridSkeleton: React.FC<VehicleGridSkeletonProps> = ({
  count = 6,
  className = '',
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {Array.from({ length: count }, (_, index) => (
        <VehicleCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default VehicleGridSkeleton;
