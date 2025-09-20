import { describe, it, expect } from 'vitest';
import {
  getVehiclesByZipCode,
  getUniqueMakes,
  getUniqueColors,
} from '@/data/vehicles';

describe('Vehicle Data Functions', () => {
  it('should return vehicles for valid ZIP code', () => {
    const vehicles = getVehiclesByZipCode('10001');
    expect(vehicles.length).toBeGreaterThan(0);
    expect(vehicles[0]).toHaveProperty('make');
    expect(vehicles[0]).toHaveProperty('model');
    expect(vehicles[0]).toHaveProperty('price');
  });

  it('should return empty array for invalid ZIP code', () => {
    const vehicles = getVehiclesByZipCode('99999');
    expect(vehicles).toEqual([]);
  });

  it('should return unique makes', () => {
    const vehicles = getVehiclesByZipCode('10001');
    const makes = getUniqueMakes(vehicles);
    expect(makes.length).toBeGreaterThan(0);
    expect(new Set(makes).size).toBe(makes.length); // All unique
  });

  it('should return unique colors', () => {
    const vehicles = getVehiclesByZipCode('10001');
    const colors = getUniqueColors(vehicles);
    expect(colors.length).toBeGreaterThan(0);
    expect(new Set(colors).size).toBe(colors.length); // All unique
  });
});
