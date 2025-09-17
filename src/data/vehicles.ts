export interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  image: string;
  zipCode: string;
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    trim: 'LE',
    year: 2022,
    color: 'Silver',
    mileage: 15000,
    price: 28500,
    image:
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    year: 2023,
    color: 'White',
    mileage: 8000,
    price: 26500,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '3',
    make: 'Ford',
    model: 'F-150',
    trim: 'XLT',
    year: 2021,
    color: 'Black',
    mileage: 25000,
    price: 42000,
    image:
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '4',
    make: 'BMW',
    model: '3 Series',
    trim: '330i',
    year: 2022,
    color: 'Blue',
    mileage: 12000,
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '5',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    trim: 'C300',
    year: 2023,
    color: 'Silver',
    mileage: 5000,
    price: 48000,
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '6',
    make: 'Audi',
    model: 'A4',
    trim: 'Premium',
    year: 2022,
    color: 'Red',
    mileage: 18000,
    price: 42000,
    image:
      'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '7',
    make: 'Toyota',
    model: 'RAV4',
    trim: 'XLE',
    year: 2023,
    color: 'White',
    mileage: 10000,
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '8',
    make: 'Honda',
    model: 'Accord',
    trim: 'Sport',
    year: 2022,
    color: 'Black',
    mileage: 20000,
    price: 32000,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '9',
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Standard Range',
    year: 2023,
    color: 'White',
    mileage: 5000,
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '10',
    make: 'Nissan',
    model: 'Altima',
    trim: 'SV',
    year: 2022,
    color: 'Gray',
    mileage: 22000,
    price: 28000,
    image:
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '11',
    make: 'Chevrolet',
    model: 'Silverado',
    trim: 'LT',
    year: 2021,
    color: 'Red',
    mileage: 30000,
    price: 38000,
    image:
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  {
    id: '12',
    make: 'Volkswagen',
    model: 'Jetta',
    trim: 'S',
    year: 2023,
    color: 'Blue',
    mileage: 7000,
    price: 24000,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  // Additional vehicles for different ZIP codes
  {
    id: '13',
    make: 'Toyota',
    model: 'Prius',
    trim: 'LE',
    year: 2022,
    color: 'Green',
    mileage: 15000,
    price: 27000,
    image:
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop',
    zipCode: '90210',
  },
  {
    id: '14',
    make: 'Honda',
    model: 'Pilot',
    trim: 'EX-L',
    year: 2023,
    color: 'Black',
    mileage: 8000,
    price: 42000,
    image:
      'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop',
    zipCode: '90210',
  },
  {
    id: '15',
    make: 'BMW',
    model: 'X5',
    trim: 'xDrive40i',
    year: 2022,
    color: 'White',
    mileage: 12000,
    price: 65000,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    zipCode: '90210',
  },
];

export const getVehiclesByZipCode = (zipCode: string): Vehicle[] => {
  return vehicles.filter((vehicle) => vehicle.zipCode === zipCode);
};

export const getUniqueMakes = (vehicles: Vehicle[]): string[] => {
  return [...new Set(vehicles.map((vehicle) => vehicle.make))].sort();
};

export const getUniqueColors = (vehicles: Vehicle[]): string[] => {
  return [...new Set(vehicles.map((vehicle) => vehicle.color))].sort();
};
