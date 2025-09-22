import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
import Modal from '../Modal';

describe('Modal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset body styles
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = 'unset';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render modal when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('should not render modal when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('should render modal with custom className', () => {
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          title="Test Modal"
          className="custom-modal-class"
        >
          <p>Modal content</p>
        </Modal>
      );

      const modalContent = container.querySelector('.custom-modal-class');
      expect(modalContent).toBeInTheDocument();
    });
  });

  describe('Close button functionality', () => {
    it('should show close button by default', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('should hide close button when showCloseButton is false', () => {
      render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          title="Test Modal"
          showCloseButton={false}
        >
          <p>Modal content</p>
        </Modal>
      );

      const closeButton = screen.queryByLabelText('Close modal');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Backdrop click functionality', () => {
    it('should close modal when backdrop is clicked by default', () => {
      const { container } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      // Click on the backdrop div, not the close button
      const backdrop = container.querySelector('.fixed.inset-0');
      fireEvent.click(backdrop!);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not close modal when backdrop is clicked if closeOnBackdropClick is false', () => {
      const { container } = render(
        <Modal
          isOpen={true}
          onClose={mockOnClose}
          title="Test Modal"
          closeOnBackdropClick={false}
        >
          <p>Modal content</p>
        </Modal>
      );

      // Click on the backdrop div, not the close button
      const backdrop = container.querySelector('.fixed.inset-0');
      fireEvent.click(backdrop!);

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should not close modal when modal content is clicked', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const modalContent = screen.getByText('Modal content');
      fireEvent.click(modalContent);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard functionality', () => {
    it('should close modal when Escape key is pressed', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not close modal when other keys are pressed', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });
      fireEvent.keyDown(document, { key: 'Tab' });

      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('should not close modal when Escape is pressed and modal is closed', () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Body scroll prevention', () => {
    it('should prevent body scroll when modal is open', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when modal is closed', () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('unset');
    });

    it('should add padding to prevent layout shift', () => {
      // Mock window.innerWidth and document.documentElement.clientWidth
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1000,
      });

      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(document.body.style.paddingRight).toBe('24px');
    });
  });

  describe('Event listener cleanup', () => {
    it('should clean up event listeners when component unmounts', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { unmount } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
    });

    it('should clean up event listeners when modal closes', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

      const { rerender } = render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      rerender(
        <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('should render title as heading', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      );

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveTextContent('Test Modal');
    });
  });

  describe('Content rendering', () => {
    it('should render children content', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <div>
            <h3>Custom Content</h3>
            <p>This is custom modal content</p>
            <button>Custom Button</button>
          </div>
        </Modal>
      );

      expect(screen.getByText('Custom Content')).toBeInTheDocument();
      expect(
        screen.getByText('This is custom modal content')
      ).toBeInTheDocument();
      expect(screen.getByText('Custom Button')).toBeInTheDocument();
    });

    it('should handle complex nested content', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title="Complex Modal">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Left content</span>
              <span>Right content</span>
            </div>
            <form>
              <input type="text" placeholder="Enter text" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </Modal>
      );

      expect(screen.getByText('Left content')).toBeInTheDocument();
      expect(screen.getByText('Right content')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });

  describe('Multiple modals', () => {
    it('should handle multiple modals correctly', () => {
      const mockOnClose1 = vi.fn();
      const mockOnClose2 = vi.fn();

      render(
        <div>
          <Modal isOpen={true} onClose={mockOnClose1} title="Modal 1">
            <p>Content 1</p>
          </Modal>
          <Modal isOpen={true} onClose={mockOnClose2} title="Modal 2">
            <p>Content 2</p>
          </Modal>
        </div>
      );

      expect(screen.getByText('Modal 1')).toBeInTheDocument();
      expect(screen.getByText('Modal 2')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });
});
