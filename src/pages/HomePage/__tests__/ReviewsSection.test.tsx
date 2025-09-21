import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ReviewsSection from '../ReviewsSection';

describe('ReviewsSection', () => {
  describe('User Interactions', () => {
    it('should render button as clickable element', () => {
      render(<ReviewsSection />);

      const button = screen.getByText('See our reviews');
      expect(button.tagName).toBe('BUTTON');
    });

    it('should render the main heading text', () => {
      render(<ReviewsSection />);

      // Check for the heading text that spans multiple elements with br tag
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Thousands of drivers');
      expect(heading).toHaveTextContent('are switching to Flexcar.');
    });
  });
});
