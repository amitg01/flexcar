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
    price: 270,
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
    price: 242,
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
    price: 321,
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
    price: 450,
    image:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
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
    price: 472,
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
    price: 277,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
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
    price: 202,
    image:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop',
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
    price: 442,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop',
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
    price: 249,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
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
    price: 322,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
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
    price: 351,
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    zipCode: '10001',
  },
  // Additional vehicles for different ZIP codes
  // Additional vehicles for demo purposes
  {
    id: '17',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    trim: 'C300',
    year: 2023,
    color: 'Silver',
    mileage: 8000,
    price: 465,
    image:
      'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '18',
    make: 'Lexus',
    model: 'ES',
    trim: '350',
    year: 2022,
    color: 'Black',
    mileage: 15000,
    price: 490,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '19',
    make: 'Infiniti',
    model: 'Q50',
    trim: 'Luxe',
    year: 2023,
    color: 'Red',
    mileage: 6000,
    price: 432,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '20',
    make: 'Acura',
    model: 'TLX',
    trim: 'Technology',
    year: 2022,
    color: 'Blue',
    mileage: 18000,
    price: 399,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '21',
    make: 'Volvo',
    model: 'S60',
    trim: 'Momentum',
    year: 2023,
    color: 'Gray',
    mileage: 4000,
    price: 403,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '24',
    make: 'Lincoln',
    model: 'Continental',
    trim: 'Reserve',
    year: 2022,
    color: 'Silver',
    mileage: 14000,
    price: 360,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '25',
    make: 'Jaguar',
    model: 'XF',
    trim: 'P250',
    year: 2023,
    color: 'Blue',
    mileage: 7000,
    price: 342,
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  // More vehicles for 90210
  {
    id: '28',
    make: 'Lamborghini',
    model: 'Huracán',
    trim: 'EVO',
    year: 2023,
    color: 'Orange',
    mileage: 1000,
    price: 355,
    image:
      'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '29',
    make: 'McLaren',
    model: '720S',
    trim: 'Coupe',
    year: 2022,
    color: 'Black',
    mileage: 3000,
    price: 285,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  {
    id: '30',
    make: 'Bentley',
    model: 'Continental',
    trim: 'GT',
    year: 2023,
    color: 'White',
    mileage: 1500,
    price: 336,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '10001',
  },
  // Beverly Hills, CA (90210) vehicles
  {
    id: '33',
    make: 'BMW',
    model: 'M3',
    trim: 'Competition',
    year: 2023,
    color: 'Silver',
    mileage: 3000,
    price: 585,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '90210',
  },
  {
    id: '34',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    trim: 'AMG S63',
    year: 2023,
    color: 'Black',
    mileage: 1500,
    price: 580,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '90210',
  },
  {
    id: '35',
    make: 'Audi',
    model: 'R8',
    trim: 'V10 Performance',
    year: 2023,
    color: 'Red',
    mileage: 1000,
    price: 520,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '90210',
  },
  // Chicago, IL (60601) vehicles
  {
    id: '36',
    make: 'Ford',
    model: 'Mustang',
    trim: 'GT',
    year: 2023,
    color: 'Blue',
    mileage: 8000,
    price: 428,
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '60601',
  },
  {
    id: '39',
    make: 'Jeep',
    model: 'Wrangler',
    trim: 'Rubicon',
    year: 2023,
    color: 'Green',
    mileage: 5000,
    price: 250,
    image:
      'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '60601',
  },
  // Miami, FL (33101) vehicles
  {
    id: '42',
    make: 'Ferrari',
    model: '488',
    trim: 'GTB',
    year: 2023,
    color: 'Red',
    mileage: 1500,
    price: 279,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '33101',
  },
  {
    id: '43',
    make: 'McLaren',
    model: '720S',
    trim: 'Spider',
    year: 2023,
    color: 'White',
    mileage: 1000,
    price: 384,
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '33101',
  },
  {
    id: '44',
    make: 'Aston Martin',
    model: 'DB11',
    trim: 'V8',
    year: 2023,
    color: 'Silver',
    mileage: 3000,
    price: 306,
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '33101',
  },
  {
    id: '45',
    make: 'Maserati',
    model: 'Ghibli',
    trim: 'Trofeo',
    year: 2023,
    color: 'Black',
    mileage: 2500,
    price: 669,
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '33101',
  },
  // San Francisco, CA (94102) vehicles
  {
    id: '46',
    make: 'Tesla',
    model: 'Model 3',
    trim: 'Performance',
    year: 2023,
    color: 'Blue',
    mileage: 12000,
    price: 392,
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '94102',
  },
  {
    id: '47',
    make: 'Volvo',
    model: 'XC90',
    trim: 'T8 Inscription',
    year: 2023,
    color: 'White',
    mileage: 8000,
    price: 268,
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
    zipCode: '94102',
  },
];

export const getVehiclesByZipCode = (zipCode: string): Vehicle[] => {
  return vehicles.filter(vehicle => vehicle.zipCode === zipCode);
};

export const getUniqueMakes = (vehicles: Vehicle[]): string[] => {
  return [...new Set(vehicles.map(vehicle => vehicle.make))].sort();
};

export const getUniqueColors = (vehicles: Vehicle[]): string[] => {
  return [...new Set(vehicles.map(vehicle => vehicle.color))].sort();
};
