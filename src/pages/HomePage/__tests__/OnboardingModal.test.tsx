import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import OnboardingModal from '../OnboardingModal';

// Mock the hooks and components
const mockUseOnboarding = vi.fn();
const mockUseForm = vi.fn();

vi.mock('@/hooks/useOnboarding', () => ({
  useOnboarding: () => mockUseOnboarding(),
}));

vi.mock('react-hook-form', () => ({
  useForm: () => mockUseForm(),
  Controller: ({
    render: renderProp,
  }: {
    render: (props: {
      field: { value: string; onChange: () => void };
    }) => React.ReactNode;
  }) => renderProp({ field: { value: '', onChange: vi.fn() } }),
}));

vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: vi.fn(),
}));

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  showCloseButton: boolean;
  closeOnBackdropClick: boolean;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className: string;
}

vi.mock('@/components/ui', () => ({
  Modal: ({
    children,
    isOpen,
    onClose,
    title,
    showCloseButton,
    closeOnBackdropClick,
  }: ModalProps) =>
    isOpen ? (
      <div
        data-testid="modal"
        data-title={title}
        data-show-close={showCloseButton}
        data-close-backdrop={closeOnBackdropClick}
      >
        <button onClick={onClose} data-testid="modal-close">
          Close
        </button>
        {children}
      </div>
    ) : null,
  Select: ({ label, value, onChange, options, className }: SelectProps) => (
    <div>
      <label>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={className}
        data-testid={`select-${label.toLowerCase().replace(' ', '-')}`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock('@/constants/onboarding-constants', () => ({
  AGE_OPTIONS: [
    { value: '18-24', label: '18-24' },
    { value: '25-34', label: '25-34' },
    { value: '35-44', label: '35-44' },
  ],
  CREDIT_SCORE_OPTIONS: [
    { value: 'excellent', label: 'Excellent (750+)' },
    { value: 'good', label: 'Good (700-749)' },
    { value: 'fair', label: 'Fair (650-699)' },
  ],
}));

vi.mock('@/validation/onboarding', () => ({
  onboardingSchema: {},
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('OnboardingModal', () => {
  const defaultOnboardingProps = {
    showModal: true,
    currentStep: 1,
    zipCode: '',
    age: '',
    creditScore: '',
    isEditMode: false,
    handleZipSubmit: vi.fn(),
    handleUserInfoSubmit: vi.fn(),
    handleLocateMe: vi.fn(),
    handleCloseModal: vi.fn(),
    handleBackToStep1: vi.fn(),
  };

  const defaultFormProps = {
    register: vi.fn(() => ({
      name: 'zipCode',
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    })),
    handleSubmit: vi.fn(fn => (e: React.FormEvent) => {
      e.preventDefault();
      fn({ zipCode: '12345', age: '25-34', creditScore: 'good' });
    }),
    watch: vi.fn(() => ({
      zipCode: '12345',
      age: '25-34',
      creditScore: 'good',
    })),
    control: {},
    formState: { errors: {} },
    reset: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseOnboarding.mockReturnValue(defaultOnboardingProps);
    mockUseForm.mockReturnValue(defaultFormProps);
  });

  describe('User Interactions - Step 1', () => {
    it('should call handleLocateMe when locate me button is clicked', () => {
      renderWithRouter(<OnboardingModal />);

      const locateButton = screen.getByText('Locate me');
      fireEvent.click(locateButton);

      expect(defaultOnboardingProps.handleLocateMe).toHaveBeenCalledTimes(1);
    });

    it('should call handleZipSubmit when next button is clicked', () => {
      renderWithRouter(<OnboardingModal />);

      const nextButton = screen.getByTestId('zip-next-button');
      fireEvent.click(nextButton);

      expect(defaultOnboardingProps.handleZipSubmit).toHaveBeenCalledWith({
        zipCode: '12345',
        age: '25-34',
        creditScore: 'good',
      });
    });
  });

  describe('User Interactions - Step 2', () => {
    beforeEach(() => {
      mockUseOnboarding.mockReturnValue({
        ...defaultOnboardingProps,
        currentStep: 2,
      });
    });

    it('should call handleBackToStep1 when back button is clicked', () => {
      renderWithRouter(<OnboardingModal />);

      const backButton = screen.getByTestId('back-to-step1-button');
      fireEvent.click(backButton);

      expect(defaultOnboardingProps.handleBackToStep1).toHaveBeenCalledTimes(1);
    });

    it('should call handleUserInfoSubmit when form is submitted', () => {
      renderWithRouter(<OnboardingModal />);

      const submitButton = screen.getByTestId('modal-view-cars-button');
      fireEvent.click(submitButton);

      expect(defaultOnboardingProps.handleUserInfoSubmit).toHaveBeenCalledWith({
        zipCode: '12345',
        age: '25-34',
        creditScore: 'good',
      });
    });
  });

  describe('User Interactions - Modal', () => {
    it('should call handleCloseModal when modal close is clicked', () => {
      renderWithRouter(<OnboardingModal />);

      const closeButton = screen.getByTestId('modal-close');
      fireEvent.click(closeButton);

      expect(defaultOnboardingProps.handleCloseModal).toHaveBeenCalledTimes(1);
    });
  });
});
