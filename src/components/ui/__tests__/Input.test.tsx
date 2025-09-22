import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input', () => {
  describe('Basic rendering', () => {
    it('should render input without label', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render input with label', () => {
      render(<Input label="Username" placeholder="Enter username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Input className="custom-class" placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveClass('custom-class');
    });

    it('should pass through HTML input attributes', () => {
      render(<Input type="email" name="email" data-testid="email-input" />);
      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('name', 'email');
    });
  });

  describe('Label functionality', () => {
    it('should render label when provided', () => {
      render(<Input label="Email Address" />);
      const label = screen.getByText('Email Address');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('should not render label when not provided', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('should have proper label styling', () => {
      render(<Input label="Test Label" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass(
        'block',
        'text-sm',
        'font-semibold',
        'text-gray-700',
        'mb-2'
      );
    });
  });

  describe('Error state', () => {
    it('should render error message when error is provided', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should apply error styling to input when error is provided', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500', 'focus:ring-red-500');
    });

    it('should not show helper text when error is present', () => {
      render(<Input error="Error message" helperText="Helper text" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('should have proper error message styling', () => {
      render(<Input error="Error message" />);
      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveClass('text-red-500', 'text-sm', 'mt-1');
    });
  });

  describe('Helper text', () => {
    it('should render helper text when provided and no error', () => {
      render(<Input helperText="This is helpful information" />);
      expect(
        screen.getByText('This is helpful information')
      ).toBeInTheDocument();
    });

    it('should not render helper text when error is present', () => {
      render(<Input helperText="Helper text" error="Error message" />);
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('should have proper helper text styling', () => {
      render(<Input helperText="Helper text" />);
      const helperText = screen.getByText('Helper text');
      expect(helperText).toHaveClass('text-gray-500', 'text-sm', 'mt-1');
    });
  });

  describe('Input styling', () => {
    it('should have default styling', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(
        'w-full',
        'px-3',
        'py-2',
        'border',
        'rounded-lg',
        'text-base',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-flexcar-blue',
        'focus:border-flexcar-blue',
        'border-gray-300'
      );
    });

    it('should have error styling when error is present', () => {
      render(<Input error="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500', 'focus:ring-red-500');
      expect(input).not.toHaveClass('border-gray-300');
    });
  });

  describe('User interactions', () => {
    it('should handle onChange events', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test input' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should handle onFocus events', () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should handle onBlur events', () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should handle keyboard events', () => {
      const handleKeyDown = vi.fn();
      render(<Input onKeyDown={handleKeyDown} />);

      const input = screen.getByRole('textbox');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Input types', () => {
    it('should render text input by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render email input', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      render(<Input type="password" />);
      const input = screen.getByDisplayValue('');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('should render number input', () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('Accessibility', () => {
    it('should associate label with input', () => {
      render(<Input label="Username" id="username" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Username');

      expect(input).toHaveAttribute('id', 'username');
      expect(label).toHaveAttribute('for', 'username');
    });

    it('should have proper focus styles', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-flexcar-blue'
      );
    });

    it('should be focusable', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Combined props', () => {
    it('should handle all props together', () => {
      const handleChange = vi.fn();
      render(
        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          error="Invalid email"
          className="custom-class"
          onChange={handleChange}
          data-testid="email-input"
        />
      );

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Invalid email')).toBeInTheDocument();

      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveClass('custom-class', 'border-red-500');

      fireEvent.change(input, { target: { value: 'test@example.com' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should prioritize error over helper text', () => {
      render(<Input error="Error message" helperText="Helper text" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });
});
