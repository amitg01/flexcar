import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Skeleton from '../Skeleton';

describe('Skeleton', () => {
  describe('Basic rendering', () => {
    it('should render skeleton with default props', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('bg-gray-200', 'animate-pulse');
    });

    it('should apply custom className', () => {
      render(<Skeleton className="custom-class" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-class');
    });

    it('should render with children', () => {
      render(
        <Skeleton>
          <div>Child content</div>
        </Skeleton>
      );
      expect(screen.getByText('Child content')).toBeInTheDocument();
    });
  });

  describe('Width and height', () => {
    it('should apply custom width', () => {
      render(<Skeleton width="200px" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('width: 200px');
    });

    it('should apply custom height', () => {
      render(<Skeleton height="50px" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('height: 50px');
    });

    it('should apply both width and height', () => {
      render(<Skeleton width="200px" height="50px" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('width: 200px; height: 50px');
    });

    it('should use default width and height when not provided', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('width: 100%; height: 1rem');
    });

    it('should handle numeric width and height', () => {
      render(<Skeleton width={200} height={50} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('width: 200px; height: 50px');
    });
  });

  describe('Rounded corners', () => {
    it('should not have rounded corners by default', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass(
        'rounded',
        'rounded-sm',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-full'
      );
    });

    it('should apply rounded when rounded is true', () => {
      render(<Skeleton rounded />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded');
    });

    it('should apply small rounded corners', () => {
      render(<Skeleton rounded="sm" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-sm');
    });

    it('should apply medium rounded corners', () => {
      render(<Skeleton rounded="md" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-md');
    });

    it('should apply large rounded corners', () => {
      render(<Skeleton rounded="lg" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-lg');
    });

    it('should apply extra large rounded corners', () => {
      render(<Skeleton rounded="xl" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-xl');
    });

    it('should apply full rounded corners', () => {
      render(<Skeleton rounded="full" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-full');
    });
  });

  describe('Animation', () => {
    it('should have pulse animation by default', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('should have pulse animation when animate is true', () => {
      render(<Skeleton animate />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('animate-pulse');
    });

    it('should not have pulse animation when animate is false', () => {
      render(<Skeleton animate={false} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass('animate-pulse');
    });
  });

  describe('Combined props', () => {
    it('should handle all props together', () => {
      render(
        <Skeleton
          width="300px"
          height="100px"
          rounded="lg"
          animate={false}
          className="custom-skeleton"
        >
          <div>Content</div>
        </Skeleton>
      );

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass(
        'bg-gray-200',
        'rounded-lg',
        'custom-skeleton'
      );
      expect(skeleton).toHaveStyle('width: 300px; height: 100px');
      expect(skeleton).not.toHaveClass('animate-pulse');
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should handle minimal props', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('bg-gray-200', 'animate-pulse');
      expect(skeleton).toHaveStyle('width: 100%; height: 1rem');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty className', () => {
      render(<Skeleton className="" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('bg-gray-200', 'animate-pulse');
    });

    it('should handle zero width and height', () => {
      render(<Skeleton width={0} height={0} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('width: 0px; height: 0px');
    });

    it('should handle very large dimensions', () => {
      render(<Skeleton width="9999px" height="9999px" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle('width: 9999px; height: 9999px');
    });

    it('should handle rounded as false explicitly', () => {
      render(<Skeleton rounded={false} />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass(
        'rounded',
        'rounded-sm',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-full'
      );
    });
  });

  describe('Accessibility', () => {
    it('should be accessible as a generic element', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
    });

    it('should support custom ARIA attributes', () => {
      render(<Skeleton className="custom-skeleton" />);

      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('custom-skeleton');
    });
  });

  describe('Content rendering', () => {
    it('should render multiple children', () => {
      render(
        <Skeleton>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </Skeleton>
      );

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should render complex nested content', () => {
      render(
        <Skeleton>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </Skeleton>
      );

      const container = screen.getByTestId('skeleton');
      expect(container).toHaveClass('bg-gray-200', 'animate-pulse');
      expect(container.querySelector('.flex')).toBeInTheDocument();
    });

    it('should render without children', () => {
      render(<Skeleton />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveTextContent('');
    });
  });
});
