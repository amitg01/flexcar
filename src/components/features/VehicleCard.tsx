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
    <Card
      variant='elevated'
      padding='none'
      hover
      className={`overflow-hidden ${className}`}
    >
      <div className='relative'>
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className='w-full h-48 object-cover'
          onError={handleImageError}
          loading='lazy'
        />
        <div className='absolute top-2 right-2'>
          <Badge variant='primary' size='sm'>
            {vehicle.year}
          </Badge>
        </div>
      </div>

      <div className='p-4'>
        <div className='mb-3'>
          <h3 className='text-xl font-bold text-gray-900 mb-1 line-clamp-1'>
            {vehicle.make} {vehicle.model}
          </h3>
          <p className='text-gray-600 text-sm'>{vehicle.trim}</p>
        </div>

        <div className='space-y-2 mb-4'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Color:</span>
            <span className='font-medium'>{vehicle.color}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Mileage:</span>
            <span className='font-medium'>
              {formatMileage(vehicle.mileage)} mi
            </span>
          </div>
        </div>

        <div className='border-t pt-4'>
          <div className='flex justify-between items-center'>
            <span className='text-2xl font-bold text-flexcar-blue'>
              {formatPrice(vehicle.price)}
            </span>
            <Button onClick={handleViewDetails} size='sm' variant='primary'>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
