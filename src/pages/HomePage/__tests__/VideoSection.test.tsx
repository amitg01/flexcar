import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import VideoSection from '../VideoSection';

describe('VideoSection', () => {
  describe('Rendering', () => {
    it('should render the video section with correct structure', () => {
      render(<VideoSection />);

      expect(screen.getByText('Flexcar in 75 seconds.')).toBeInTheDocument();
    });

    it('should render the iframe with correct attributes', () => {
      render(<VideoSection />);

      const iframe = screen.getByTitle('Flexcar in 75 seconds');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        'src',
        'https://www.youtube-nocookie.com/embed/O0sEu131MaE?autoplay=1&mute=1&controls=0&showinfo=0&rel=0'
      );
      expect(iframe).toHaveAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      );
    });

    it('should have proper container structure', () => {
      render(<VideoSection />);

      const section = screen
        .getByText('Flexcar in 75 seconds.')
        .closest('section');
      expect(section).toHaveClass(
        'py-8',
        'xs:py-12',
        'sm:py-16',
        'md:py-20',
        'bg-white'
      );
    });

    it('should have proper aspect ratio container', () => {
      render(<VideoSection />);

      const aspectContainer = screen
        .getByTitle('Flexcar in 75 seconds')
        .closest('div');
      expect(aspectContainer).toHaveClass(
        'aspect-video',
        'bg-gray-200',
        'rounded-lg',
        'xs:rounded-xl',
        'sm:rounded-2xl',
        'overflow-hidden'
      );
    });
  });

  describe('Responsive Design', () => {
    it('should have proper responsive text sizing', () => {
      render(<VideoSection />);

      const heading = screen.getByText('Flexcar in 75 seconds.');
      expect(heading).toHaveClass(
        'text-xl',
        'xs:text-2xl',
        'sm:text-3xl',
        'md:text-4xl'
      );
    });

    it('should have proper responsive spacing', () => {
      render(<VideoSection />);

      const heading = screen.getByText('Flexcar in 75 seconds.');
      expect(heading).toHaveClass('mb-6', 'xs:mb-8', 'sm:mb-12');
    });
  });

  describe('Accessibility', () => {
    it('should have proper iframe title', () => {
      render(<VideoSection />);

      const iframe = screen.getByTitle('Flexcar in 75 seconds');
      expect(iframe).toBeInTheDocument();
    });

    it('should have proper iframe dimensions', () => {
      render(<VideoSection />);

      const iframe = screen.getByTitle('Flexcar in 75 seconds');
      expect(iframe).toHaveClass('w-full', 'h-full');
    });
  });

  describe('Content', () => {
    it('should display the correct heading text', () => {
      render(<VideoSection />);

      expect(screen.getByText('Flexcar in 75 seconds.')).toBeInTheDocument();
    });

    it('should have centered text alignment', () => {
      render(<VideoSection />);

      const heading = screen.getByText('Flexcar in 75 seconds.');
      expect(heading).toHaveClass('text-center');
    });
  });
});
