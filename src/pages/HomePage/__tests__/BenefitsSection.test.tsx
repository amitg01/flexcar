import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import BenefitsSection from '../BenefitsSection';

describe('BenefitsSection', () => {
  describe('Rendering', () => {
    it('should render the benefits section with correct structure', () => {
      render(<BenefitsSection />);

      expect(
        screen.getByText('Traditional car ownership is highway robbery.')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Flexcar is freedom without financial burden. It's car ownership completely reimagined."
        )
      ).toBeInTheDocument();
      expect(screen.getByText('View cars')).toBeInTheDocument();
    });

    it('should render all benefit categories', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('Unparalleled savings')).toBeInTheDocument();
      expect(screen.getByText('Comprehensive coverage')).toBeInTheDocument();
    });

    it('should render all benefit items', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('• 20%+ lower car payments')).toBeInTheDocument();
      expect(screen.getByText('• No down payment')).toBeInTheDocument();
      expect(screen.getByText('• Zero debt')).toBeInTheDocument();
      expect(screen.getByText('• Save 30¢ per gal on gas')).toBeInTheDocument();
      expect(screen.getByText('• Insurance included')).toBeInTheDocument();
      expect(screen.getByText('• Maintenance included')).toBeInTheDocument();
      expect(
        screen.getByText('• 24/7 roadside assistance included')
      ).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    it('should have proper main heading', () => {
      render(<BenefitsSection />);

      const heading = screen.getByText(
        'Traditional car ownership is highway robbery.'
      );
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

    it('should have proper description text', () => {
      render(<BenefitsSection />);

      const description = screen.getByText(
        "Flexcar is freedom without financial burden. It's car ownership completely reimagined."
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass(
        'text-sm',
        'xs:text-lg',
        'sm:text-xl',
        'text-gray-600'
      );
    });

    it('should have proper section styling', () => {
      render(<BenefitsSection />);

      const section = screen
        .getByText('Traditional car ownership is highway robbery.')
        .closest('section');
      expect(section).toHaveClass(
        'py-8',
        'xs:py-12',
        'sm:py-16',
        'md:py-20',
        'bg-gray-50'
      );
    });
  });

  describe('Benefit Categories', () => {
    it('should render savings category with proper styling', () => {
      render(<BenefitsSection />);

      const savingsHeading = screen.getByText('Unparalleled savings');
      expect(savingsHeading).toHaveClass(
        'text-lg',
        'xs:text-xl',
        'sm:text-2xl',
        'font-bold',
        'text-gray-900'
      );

      const savingsDivider = savingsHeading.nextElementSibling;
      expect(savingsDivider).toHaveClass(
        'w-10',
        'xs:w-12',
        'sm:w-14',
        'h-1',
        'bg-gray-900'
      );
    });

    it('should render coverage category with proper styling', () => {
      render(<BenefitsSection />);

      const coverageHeading = screen.getByText('Comprehensive coverage');
      expect(coverageHeading).toHaveClass(
        'text-lg',
        'xs:text-xl',
        'sm:text-2xl',
        'font-bold',
        'text-gray-900'
      );

      const coverageDivider = coverageHeading.nextElementSibling;
      expect(coverageDivider).toHaveClass(
        'w-10',
        'xs:w-12',
        'sm:w-14',
        'h-1',
        'bg-gray-900'
      );
    });

    it('should have proper list styling for benefit items', () => {
      render(<BenefitsSection />);

      const benefitLists = screen.getAllByRole('list');
      expect(benefitLists).toHaveLength(2);

      benefitLists.forEach(list => {
        expect(list).toHaveClass(
          'space-y-1',
          'text-xs',
          'xs:text-sm',
          'sm:text-base',
          'text-gray-700'
        );
      });
    });
  });

  describe('Button', () => {
    it('should render the view cars button with proper styling', () => {
      render(<BenefitsSection />);

      const button = screen.getByTestId('benefits-view-cars-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('View cars');
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

    it('should have proper responsive button sizing', () => {
      render(<BenefitsSection />);

      const button = screen.getByTestId('benefits-view-cars-button');
      expect(button).toHaveClass('w-full', 'sm:w-auto');
    });
  });

  describe('Responsive Design', () => {
    it('should have proper responsive text sizing for main heading', () => {
      render(<BenefitsSection />);

      const heading = screen.getByText(
        'Traditional car ownership is highway robbery.'
      );
      expect(heading).toHaveClass(
        'text-xl',
        'xs:text-2xl',
        'sm:text-3xl',
        'md:text-4xl'
      );
    });

    it('should have proper responsive text sizing for description', () => {
      render(<BenefitsSection />);

      const description = screen.getByText(
        "Flexcar is freedom without financial burden. It's car ownership completely reimagined."
      );
      expect(description).toHaveClass('text-sm', 'xs:text-lg', 'sm:text-xl');
    });

    it('should have proper responsive spacing', () => {
      render(<BenefitsSection />);

      const heading = screen.getByText(
        'Traditional car ownership is highway robbery.'
      );
      expect(heading).toHaveClass('mb-3', 'xs:mb-4', 'sm:mb-6');
    });
  });

  describe('Layout', () => {
    it('should have proper grid layout', () => {
      render(<BenefitsSection />);

      const gridContainer = screen
        .getByText('Traditional car ownership is highway robbery.')
        .closest('div')?.parentElement;
      expect(gridContainer).toHaveClass(
        'grid',
        'md:grid-cols-2',
        'gap-6',
        'xs:gap-8',
        'sm:gap-12',
        'items-center'
      );
    });

    it('should have proper order classes', () => {
      render(<BenefitsSection />);

      const contentContainer = screen
        .getByText('Traditional car ownership is highway robbery.')
        .closest('div');
      expect(contentContainer).toHaveClass('order-2', 'md:order-1');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<BenefitsSection />);

      const mainHeading = screen.getByText(
        'Traditional car ownership is highway robbery.'
      );
      expect(mainHeading.tagName).toBe('H2');

      const categoryHeadings = screen.getAllByText(
        /Unparalleled savings|Comprehensive coverage/
      );
      categoryHeadings.forEach(heading => {
        expect(heading.tagName).toBe('H3');
      });
    });

    it('should have proper list structure', () => {
      render(<BenefitsSection />);

      const lists = screen.getAllByRole('list');
      expect(lists).toHaveLength(2);
    });
  });
});
