import React from 'react';
import Skeleton from './Skeleton';

const VehicleCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Image skeleton */}
      <Skeleton height={192} className="w-full rounded-t-lg" />
      
      <div className="p-5">
        {/* Title skeleton */}
        <div className="mb-4">
          <Skeleton height={24} width="80%" className="mb-1" />
          <Skeleton height={16} width="60%" />
        </div>

        {/* Details skeleton */}
        <div className="space-y-2 mb-4 text-sm">
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
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Skeleton height={32} width="80px" />
              <Skeleton height={16} width="20px" className="ml-1" />
            </div>
            <Skeleton height={32} width="100px" rounded="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCardSkeleton;
