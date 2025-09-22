import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Card from '../Card';

describe('Card', () => {
  describe('Basic rendering', () => {
    it('should render card with children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      render(<Card>Default Card</Card>);
      const card = screen.getByText('Default Card').closest('div');
      expect(card).toHaveClass(
        'rounded-lg',
        'bg-white',
        'shadow-sm',
        'border',
        'border-gray-200',
        'p-6'
      );
    });

    it('should apply custom className', () => {
      render(<Card className="custom-class">Card</Card>);
      const card = screen.getByText('Card').closest('div');
      expect(card).toHaveClass('custom-class');
    });

    it('should pass through HTML div attributes', () => {
      render(
        <Card data-testid="test-card" role="article">
          Card
        </Card>
      );
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('role', 'article');
    });
  });

  describe('Variants', () => {
    it('should render default variant', () => {
      render(<Card variant="default">Default Card</Card>);
      const card = screen.getByText('Default Card').closest('div');
      expect(card).toHaveClass(
        'bg-white',
        'shadow-sm',
        'border',
        'border-gray-200'
      );
    });

    it('should render elevated variant', () => {
      render(<Card variant="elevated">Elevated Card</Card>);
      const card = screen.getByText('Elevated Card').closest('div');
      expect(card).toHaveClass(
        'bg-white',
        'shadow-lg',
        'border',
        'border-gray-100'
      );
    });

    it('should render outlined variant', () => {
      render(<Card variant="outlined">Outlined Card</Card>);
      const card = screen.getByText('Outlined Card').closest('div');
      expect(card).toHaveClass('bg-white', 'border-2', 'border-gray-200');
    });

    it('should use default variant when not specified', () => {
      render(<Card>Card</Card>);
      const card = screen.getByText('Card').closest('div');
      expect(card).toHaveClass(
        'bg-white',
        'shadow-sm',
        'border',
        'border-gray-200'
      );
    });
  });

  describe('Padding', () => {
    it('should render with no padding', () => {
      render(<Card padding="none">No Padding Card</Card>);
      const card = screen.getByText('No Padding Card').closest('div');
      expect(card).not.toHaveClass('p-3', 'p-6', 'p-8');
    });

    it('should render with small padding', () => {
      render(<Card padding="sm">Small Padding Card</Card>);
      const card = screen.getByText('Small Padding Card').closest('div');
      expect(card).toHaveClass('p-3');
    });

    it('should render with medium padding by default', () => {
      render(<Card>Medium Padding Card</Card>);
      const card = screen.getByText('Medium Padding Card').closest('div');
      expect(card).toHaveClass('p-6');
    });

    it('should render with large padding', () => {
      render(<Card padding="lg">Large Padding Card</Card>);
      const card = screen.getByText('Large Padding Card').closest('div');
      expect(card).toHaveClass('p-8');
    });
  });

  describe('Hover effects', () => {
    it('should not have hover effects by default', () => {
      render(<Card>Card</Card>);
      const card = screen.getByText('Card').closest('div');
      expect(card).not.toHaveClass(
        'hover:shadow-xl',
        'hover:scale-[1.02]',
        'cursor-pointer'
      );
    });

    it('should have hover effects when hover prop is true', () => {
      render(<Card hover>Hover Card</Card>);
      const card = screen.getByText('Hover Card').closest('div');
      expect(card).toHaveClass(
        'hover:shadow-xl',
        'hover:scale-[1.02]',
        'cursor-pointer'
      );
    });

    it('should not have hover effects when hover prop is false', () => {
      render(<Card hover={false}>No Hover Card</Card>);
      const card = screen.getByText('No Hover Card').closest('div');
      expect(card).not.toHaveClass(
        'hover:shadow-xl',
        'hover:scale-[1.02]',
        'cursor-pointer'
      );
    });
  });

  describe('Content rendering', () => {
    it('should render simple text content', () => {
      render(<Card>Simple text content</Card>);
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('should render complex nested content', () => {
      render(
        <Card>
          <div>
            <h3>Card Title</h3>
            <p>Card description</p>
            <button>Action Button</button>
          </div>
        </Card>
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card description')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <Card>
          <div>First child</div>
          <div>Second child</div>
          <div>Third child</div>
        </Card>
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
      expect(screen.getByText('Third child')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to the div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Card with ref</Card>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveTextContent('Card with ref');
    });

    it('should allow ref to be used for DOM manipulation', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Card with ref</Card>);

      if (ref.current) {
        expect(ref.current).toBeInTheDocument();
        expect(ref.current).toHaveTextContent('Card with ref');
      }
    });
  });

  describe('Combined props', () => {
    it('should handle all props together', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card
          ref={ref}
          variant="elevated"
          padding="lg"
          hover
          className="custom-class"
          data-testid="combined-card"
        >
          Combined Card
        </Card>
      );

      const card = screen.getByTestId('combined-card');
      expect(card).toHaveClass(
        'rounded-lg',
        'bg-white',
        'shadow-lg',
        'border',
        'border-gray-100',
        'p-8',
        'hover:shadow-xl',
        'hover:scale-[1.02]',
        'cursor-pointer',
        'custom-class'
      );
      expect(card).toHaveTextContent('Combined Card');
      expect(ref.current).toBe(card);
    });

    it('should handle minimal props', () => {
      render(<Card>Minimal Card</Card>);
      const card = screen.getByText('Minimal Card').closest('div');
      expect(card).toHaveClass(
        'rounded-lg',
        'bg-white',
        'shadow-sm',
        'border',
        'border-gray-200',
        'p-6'
      );
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a generic container', () => {
      render(
        <Card role="region" aria-label="Content card">
          Card content
        </Card>
      );
      const card = screen.getByRole('region');
      expect(card).toHaveAttribute('aria-label', 'Content card');
    });

    it('should support custom ARIA attributes', () => {
      render(
        <Card aria-describedby="card-description" aria-labelledby="card-title">
          <h2 id="card-title">Card Title</h2>
          <p id="card-description">Card description</p>
        </Card>
      );

      const card = screen.getByText('Card Title').closest('div');
      expect(card).toHaveAttribute('aria-describedby', 'card-description');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    });
  });

  describe('Event handling', () => {
    it('should handle click events', () => {
      const handleClick = vi.fn();
      render(<Card onClick={handleClick}>Clickable Card</Card>);

      fireEvent.click(screen.getByText('Clickable Card').closest('div')!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle mouse events', () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();

      render(
        <Card onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Interactive Card
        </Card>
      );

      const card = screen.getByText('Interactive Card').closest('div')!;
      fireEvent.mouseEnter(card);
      fireEvent.mouseLeave(card);

      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });
});
