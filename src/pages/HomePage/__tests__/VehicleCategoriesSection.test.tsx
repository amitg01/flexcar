import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import VehicleCategoriesSection from '../VehicleCategoriesSection';

describe('VehicleCategoriesSection', () => {
  describe('Rendering', () => {
    it('should render the vehicle categories section with correct structure', () => {
      render(<VehicleCategoriesSection />);

      expect(screen.getByText('Swap cars in 30 seconds')).toBeInTheDocument();
      expect(screen.getByText('View all cars')).toBeInTheDocument();
    });

    it('should render all vehicle category cards', () => {
      render(<VehicleCategoriesSection />);

      expect(screen.getByText('SUVs')).toBeInTheDocument();
      expect(screen.getByText('Sedans')).toBeInTheDocument();
      expect(screen.getByText('Trucks')).toBeInTheDocument();
      expect(screen.getByText('Minivans')).toBeInTheDocument();
    });

    it('should render all vehicle category images', () => {
      render(<VehicleCategoriesSection />);

      expect(screen.getByAltText('SUVs')).toBeInTheDocument();
      expect(screen.getByAltText('Sedans')).toBeInTheDocument();
      expect(screen.getByAltText('Trucks')).toBeInTheDocument();
      expect(screen.getByAltText('Minivans')).toBeInTheDocument();
    });
  });

  describe('Vehicle Categories', () => {
    it('should have correct image sources for each category', () => {
      render(<VehicleCategoriesSection />);

      const suvImage = screen.getByAltText('SUVs');
      expect(suvImage).toHaveAttribute(
        'src',
        'https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/suv.webp'
      );

      const sedanImage = screen.getByAltText('Sedans');
      expect(sedanImage).toHaveAttribute(
        'src',
        'https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/sedan.webp'
      );

      const truckImage = screen.getByAltText('Trucks');
      expect(truckImage).toHaveAttribute(
        'src',
        'https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/truck.webp'
      );

      const minivanImage = screen.getByAltText('Minivans');
      expect(minivanImage).toHaveAttribute(
        'src',
        'https://d3lxvmq39yvk72.cloudfront.net/web/images/homepage-live-large/minivan.webp'
      );
    });

    it('should have proper image attributes', () => {
      render(<VehicleCategoriesSection />);

      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('fetchPriority', 'high');
        expect(image).toHaveAttribute('loading', 'lazy');
        expect(image).toHaveClass('w-full', 'object-contain');
      });
    });

    it('should have proper card styling for each category', () => {
      render(<VehicleCategoriesSection />);

      const cards = screen.getAllByText(/SUVs|Sedans|Trucks|Minivans/);
      cards.forEach(card => {
        const cardContainer = card.closest('div');
        expect(cardContainer).toHaveClass(
          'bg-white',
          'border',
          'border-gray-200',
          'rounded-xl',
          'xs:rounded-2xl',
          'sm:rounded-3xl',
          'p-3',
          'xs:p-4',
          'sm:p-6',
          'hover:border-purple-500',
          'transition-colors',
          'cursor-pointer'
        );
      });
    });
  });

  describe('Grid Layout', () => {
    it('should have proper grid structure', () => {
      render(<VehicleCategoriesSection />);

      const gridContainer = screen
        .getByText('SUVs')
        .closest('div')?.parentElement;
      expect(gridContainer).toHaveClass(
        'grid',
        'grid-cols-2',
        'md:grid-cols-4',
        'gap-3',
        'xs:gap-4',
        'sm:gap-6'
      );
    });

    it('should have proper responsive grid columns', () => {
      render(<VehicleCategoriesSection />);

      const gridContainer = screen
        .getByText('SUVs')
        .closest('div')?.parentElement;
      expect(gridContainer).toHaveClass('grid-cols-2', 'md:grid-cols-4');
    });
  });

  describe('Content', () => {
    it('should display the main heading', () => {
      render(<VehicleCategoriesSection />);

      const heading = screen.getByText('Swap cars in 30 seconds');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass(
        'text-xl',
        'xs:text-2xl',
        'sm:text-3xl',
        'md:text-4xl',
        'font-bold',
        'text-gray-900',
        'text-center'
      );
    });

    it('should display the view all cars button', () => {
      render(<VehicleCategoriesSection />);

      const button = screen.getByText('View all cars');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(
        'bg-gradient-to-r',
        'from-teal-400',
        'to-purple-600',
        'text-white',
        'px-4',
        'xs:px-6',
        'sm:px-8',
        'py-2',
        'xs:py-3',
        'sm:py-4',
        'rounded-full'
      );
    });
  });

  describe('Responsive Design', () => {
    it('should have proper responsive text sizing', () => {
      render(<VehicleCategoriesSection />);

      const heading = screen.getByText('Swap cars in 30 seconds');
      expect(heading).toHaveClass(
        'text-xl',
        'xs:text-2xl',
        'sm:text-3xl',
        'md:text-4xl'
      );
    });

    it('should have proper responsive spacing', () => {
      render(<VehicleCategoriesSection />);

      const heading = screen.getByText('Swap cars in 30 seconds');
      expect(heading).toHaveClass('mb-6', 'xs:mb-8', 'sm:mb-12');
    });

    it('should have proper responsive button sizing', () => {
      render(<VehicleCategoriesSection />);

      const button = screen.getByText('View all cars');
      expect(button).toHaveClass('w-full', 'sm:w-auto');
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for all images', () => {
      render(<VehicleCategoriesSection />);

      expect(screen.getByAltText('SUVs')).toBeInTheDocument();
      expect(screen.getByAltText('Sedans')).toBeInTheDocument();
      expect(screen.getByAltText('Trucks')).toBeInTheDocument();
      expect(screen.getByAltText('Minivans')).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
      render(<VehicleCategoriesSection />);

      const mainHeading = screen.getByText('Swap cars in 30 seconds');
      expect(mainHeading.tagName).toBe('H2');

      const categoryHeadings = screen.getAllByText(
        /SUVs|Sedans|Trucks|Minivans/
      );
      categoryHeadings.forEach(heading => {
        expect(heading.tagName).toBe('H3');
      });
    });
  });

  describe('Button Functionality', () => {
    it('should render button as clickable element', () => {
      render(<VehicleCategoriesSection />);

      const button = screen.getByText('View all cars');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('hover:shadow-lg', 'transition-all');
    });
  });
});
