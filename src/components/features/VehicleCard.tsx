import React from 'react';
import { Card, Badge, Button } from '../ui';
import { type Vehicle } from '../../data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails?: (vehicle: Vehicle) => void;
  className?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onViewDetails,
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

  const handleViewDetails = () => {
    onViewDetails?.(vehicle);
  };

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
        <div className="absolute top-3 right-3">
          <span className="bg-white text-gray-900 px-2 py-1 rounded-md text-sm font-medium shadow-sm">
            {vehicle.year}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-600 text-sm">{vehicle.trim}</p>
        </div>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Color:</span>
            <span className="font-medium text-gray-900">{vehicle.color}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Mileage:</span>
            <span className="font-medium text-gray-900">
              {formatMileage(vehicle.mileage)} mi
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(vehicle.price)}
              </span>
              <span className="text-gray-500 text-sm ml-1">/mo</span>
            </div>
            <button
              onClick={handleViewDetails}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
