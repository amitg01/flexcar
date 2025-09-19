import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Card,
  Badge,
  LoadingSpinner,
  EmptyState,
} from '../components/ui';
import { getVehiclesByZipCode } from '../data/vehicles';
import type { Vehicle } from '../data/vehicles';

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find vehicle by ID from all vehicles
        const allVehicles = getVehiclesByZipCode('10001').concat(
          getVehiclesByZipCode('90210')
        );
        const foundVehicle = allVehicles.find(v => v.id === id);

        if (foundVehicle) {
          setVehicle(foundVehicle);
        } else {
          setError('Vehicle not found');
        }
      } catch {
        setError('Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

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
      'https://via.placeholder.com/800x600/0049B7/FFFFFF?text=Vehicle+Image';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          title="Vehicle Not Found"
          description={error || "The vehicle you're looking for doesn't exist."}
          action={{
            label: 'Back to Search',
            onClick: () => navigate('/'),
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-flexcar-blue text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
              FlexCar
            </Link>
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-700"
              >
                ← Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Image */}
          <div className="space-y-4">
            <Card variant="elevated" padding="none" className="overflow-hidden">
              <img
                src={vehicle.image}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                className="w-full h-96 object-cover max-h-96"
                onError={handleImageError}
                loading="lazy"
              />
            </Card>

            {/* Additional Images Placeholder */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">Image {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h1>
                  <p className="text-xl text-gray-600">{vehicle.trim}</p>
                </div>
                <Badge variant="primary" size="lg">
                  {vehicle.year}
                </Badge>
              </div>

              <div className="text-4xl font-bold text-flexcar-blue mb-6">
                {formatPrice(vehicle.price)}
              </div>
            </div>

            {/* Key Details */}
            <Card variant="outlined" padding="lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Make:</span>
                  <span className="ml-2 font-medium">{vehicle.make}</span>
                </div>
                <div>
                  <span className="text-gray-600">Model:</span>
                  <span className="ml-2 font-medium">{vehicle.model}</span>
                </div>
                <div>
                  <span className="text-gray-600">Trim:</span>
                  <span className="ml-2 font-medium">{vehicle.trim}</span>
                </div>
                <div>
                  <span className="text-gray-600">Year:</span>
                  <span className="ml-2 font-medium">{vehicle.year}</span>
                </div>
                <div>
                  <span className="text-gray-600">Color:</span>
                  <span className="ml-2 font-medium">{vehicle.color}</span>
                </div>
                <div>
                  <span className="text-gray-600">Mileage:</span>
                  <span className="ml-2 font-medium">
                    {formatMileage(vehicle.mileage)} mi
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">ZIP Code:</span>
                  <span className="ml-2 font-medium">{vehicle.zipCode}</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => {
                  // In a real app, this would open a contact form or call-to-action
                  alert(
                    'Contact dealer functionality would be implemented here'
                  );
                }}
              >
                Contact Dealer
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    // In a real app, this would add to favorites
                    alert(
                      'Add to favorites functionality would be implemented here'
                    );
                  }}
                >
                  Add to Favorites
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    // In a real app, this would share the vehicle
                    navigator
                      .share?.({
                        title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
                        text: `Check out this ${vehicle.year} ${vehicle.make} ${vehicle.model} for ${formatPrice(vehicle.price)}`,
                        url: window.location.href,
                      })
                      .catch(() => {
                        // Fallback to copying URL
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      });
                  }}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetail;
