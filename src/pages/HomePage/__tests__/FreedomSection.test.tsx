import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import FreedomSection from '../FreedomSection';

describe('FreedomSection', () => {
  describe('Rendering', () => {
    it('should render the freedom section with correct structure', () => {
      render(<FreedomSection />);

      expect(screen.getByText('Freedom to choose.')).toBeInTheDocument();
      expect(screen.getByText('Freedom to change.')).toBeInTheDocument();
      expect(
        screen.getByText('Cancel anytime. Swap cars on demand.')
      ).toBeInTheDocument();
      expect(screen.getByText('Learn more about swaps')).toBeInTheDocument();
    });

    it('should have proper container structure', () => {
      render(<FreedomSection />);

      const section = screen.getByText('Freedom to choose.').closest('section');
      expect(section).toHaveClass(
        'py-8',
        'xs:py-12',
        'sm:py-16',
        'md:py-20',
        'bg-white'
      );
    });

    it('should have proper button styling', () => {
      render(<FreedomSection />);

      const button = screen.getByText('Learn more about swaps');
      expect(button).toHaveClass(
        'bg-gray-900',
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

  describe('Content', () => {
    it('should display the main heading with proper text', () => {
      render(<FreedomSection />);

      const heading = screen.getByText('Freedom to choose.');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('font-bold', 'text-gray-900');
    });

    it('should display the subheading with proper text', () => {
      render(<FreedomSection />);

      const subheading = screen.getByText(
        'Cancel anytime. Swap cars on demand.'
      );
      expect(subheading).toBeInTheDocument();
      expect(subheading).toHaveClass('text-gray-600');
    });

    it('should have proper whitespace handling in heading', () => {
      render(<FreedomSection />);

      const heading = screen.getByText('Freedom to choose.');
      const span = heading.parentElement?.querySelector('span');
      expect(span).toHaveClass('whitespace-nowrap');
      expect(span).toHaveTextContent('Freedom to change.');
    });
  });

  describe('Responsive Design', () => {
    it('should have proper responsive text sizing for heading', () => {
      render(<FreedomSection />);

      const heading = screen.getByText('Freedom to choose.');
      expect(heading).toHaveClass(
        'text-xl',
        'xs:text-2xl',
        'sm:text-3xl',
        'md:text-4xl'
      );
    });

    it('should have proper responsive text sizing for subheading', () => {
      render(<FreedomSection />);

      const subheading = screen.getByText(
        'Cancel anytime. Swap cars on demand.'
      );
      expect(subheading).toHaveClass('text-sm', 'xs:text-lg', 'sm:text-xl');
    });

    it('should have proper responsive spacing', () => {
      render(<FreedomSection />);

      const heading = screen.getByText('Freedom to choose.');
      expect(heading).toHaveClass('mb-3', 'xs:mb-4', 'sm:mb-6');
    });

    it('should have proper responsive button sizing', () => {
      render(<FreedomSection />);

      const button = screen.getByText('Learn more about swaps');
      expect(button).toHaveClass('w-full', 'sm:w-auto');
    });
  });

  describe('Layout', () => {
    it('should have proper max width container', () => {
      render(<FreedomSection />);

      const container = screen.getByText('Freedom to choose.').closest('div')
        ?.parentElement?.parentElement;
      expect(container).toHaveClass('w-full', 'max-w-[1440px]');
    });
  });

  describe('Button Functionality', () => {
    it('should render button as clickable element', () => {
      render(<FreedomSection />);

      const button = screen.getByText('Learn more about swaps');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('hover:bg-gray-800', 'transition-colors');
    });
  });
});
