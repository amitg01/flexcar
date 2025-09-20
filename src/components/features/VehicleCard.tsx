import React from 'react';
import { type Vehicle } from '@/data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  className?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  className = '',
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number): string => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src =
      'https://via.placeholder.com/400x300/0049B7/FFFFFF?text=Vehicle+Image';
  };

  // Determine if vehicle is recently added or brand new
  const isRecentlyAdded = Math.random() > 0.7; // Random for demo
  const isBrandNew = Math.random() > 0.9; // Random for demo
  const isEV =
    vehicle.make.toLowerCase().includes('mercedes') &&
    vehicle.model.toLowerCase().includes('eqb');

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="relative">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Labels */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isEV && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              EV
            </span>
          )}
          {isRecentlyAdded && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              Recently added
            </span>
          )}
          {isBrandNew && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
              Brand new
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-600 text-sm">
            {vehicle.trim} · {formatMileage(vehicle.mileage)} miles ·{' '}
            {vehicle.color}
          </p>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-500">Get it by Sep 23</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(vehicle.price)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
