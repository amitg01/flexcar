import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import CTASection from '../CTASection';

describe('CTASection', () => {
  describe('Rendering', () => {
    it('should render the CTA section with correct structure', () => {
      render(<CTASection />);

      expect(
        screen.getByText('Own the road. Not the debt.')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Flexcar is the world's first ever month-to-month car lease. No down payments. No multi-year contracts. No B.S."
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Get your Flexcar')).toBeInTheDocument();
    });

    it('should have proper section styling', () => {
      render(<CTASection />);

      const section = screen
        .getByText('Own the road. Not the debt.')
        .closest('section');
      expect(section).toHaveClass(
        'py-8',
        'xs:py-12',
        'sm:py-16',
        'md:py-20',
        'bg-white'
      );
    });
  });

  describe('Content', () => {
    it('should display the main heading with proper text', () => {
      render(<CTASection />);

      const heading = screen.getByText('Own the road. Not the debt.');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass(
        'text-xl',
        'xs:text-2xl',
        'sm:text-3xl',
        'md:text-4xl',
        'font-bold',
        'text-gray-900'
      );
    });

    it('should display the description with proper text', () => {
      render(<CTASection />);

      const description = screen.getByText(
        "Flexcar is the world's first ever month-to-month car lease. No down payments. No multi-year contracts. No B.S."
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass(
        'text-sm',
        'xs:text-lg',
        'sm:text-xl',
        'text-gray-600'
      );
    });

    it('should display the CTA button with correct text', () => {
      render(<CTASection />);

      const button = screen.getByText('Get your Flexcar');
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

  describe('Layout', () => {
    it('should have centered content', () => {
      render(<CTASection />);

      const contentContainer = screen
        .getByText('Own the road. Not the debt.')
        .closest('div');
      expect(contentContainer).toHaveClass('text-center');
    });

    it('should have proper max width for description', () => {
      render(<CTASection />);

      const description = screen.getByText(
        "Flexcar is the world's first ever month-to-month car lease. No down payments. No multi-year contracts. No B.S."
      );
      expect(description).toHaveClass('max-w-3xl', 'mx-auto');
    });
  });

  describe('Responsive Design', () => {
    it('should have proper responsive text sizing for heading', () => {
      render(<CTASection />);

      const heading = screen.getByText('Own the road. Not the debt.');
      expect(heading).toHaveClass(
        'text-xl',
        'xs:text-2xl',
        'sm:text-3xl',
        'md:text-4xl'
      );
    });

    it('should have proper responsive text sizing for description', () => {
      render(<CTASection />);

      const description = screen.getByText(
        "Flexcar is the world's first ever month-to-month car lease. No down payments. No multi-year contracts. No B.S."
      );
      expect(description).toHaveClass('text-sm', 'xs:text-lg', 'sm:text-xl');
    });

    it('should have proper responsive spacing', () => {
      render(<CTASection />);

      const heading = screen.getByText('Own the road. Not the debt.');
      expect(heading).toHaveClass('mb-3', 'xs:mb-4', 'sm:mb-6');
    });

    it('should have proper responsive button sizing', () => {
      render(<CTASection />);

      const button = screen.getByText('Get your Flexcar');
      expect(button).toHaveClass('w-full', 'sm:w-auto');
    });
  });

  describe('Button Functionality', () => {
    it('should render button as clickable element', () => {
      render(<CTASection />);

      const button = screen.getByText('Get your Flexcar');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveClass('hover:shadow-lg', 'transition-all');
    });

    it('should have gradient background', () => {
      render(<CTASection />);

      const button = screen.getByText('Get your Flexcar');
      expect(button).toHaveClass(
        'bg-gradient-to-r',
        'from-teal-400',
        'to-purple-600'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<CTASection />);

      const heading = screen.getByText('Own the road. Not the debt.');
      expect(heading.tagName).toBe('H2');
    });

    it('should have proper text contrast', () => {
      render(<CTASection />);

      const heading = screen.getByText('Own the road. Not the debt.');
      expect(heading).toHaveClass('text-gray-900');

      const description = screen.getByText(
        "Flexcar is the world's first ever month-to-month car lease. No down payments. No multi-year contracts. No B.S."
      );
      expect(description).toHaveClass('text-gray-600');
    });
  });

  describe('Visual Design', () => {
    it('should have white background', () => {
      render(<CTASection />);

      const section = screen
        .getByText('Own the road. Not the debt.')
        .closest('section');
      expect(section).toHaveClass('bg-white');
    });

    it('should have proper button styling with gradient', () => {
      render(<CTASection />);

      const button = screen.getByText('Get your Flexcar');
      expect(button).toHaveClass(
        'bg-gradient-to-r',
        'from-teal-400',
        'to-purple-600',
        'text-white'
      );
    });
  });
});
