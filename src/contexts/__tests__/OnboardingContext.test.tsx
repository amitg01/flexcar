import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OnboardingProvider } from '../OnboardingContext';
import { OnboardingContext } from '../OnboardingContextInstance';
import { useZipCodeModal } from '../ZipCodeModalContextInstance';
import { useVehicle } from '../../hooks/useVehicle';

// Mock dependencies
vi.mock('../ZipCodeModalContextInstance', () => ({
  useZipCodeModal: vi.fn(),
}));

vi.mock('@/hooks/useVehicle', () => ({
  useVehicle: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

const mockUseZipCodeModal = {
  isZipCodeModalOpen: false,
  openZipCodeModal: vi.fn(),
  closeZipCodeModal: vi.fn(),
};

const mockUseVehicle = {
  searchVehicles: vi.fn(),
};

// Create a test component that uses the context
const TestComponent = () => {
  const context = React.useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <OnboardingProvider>{children}</OnboardingProvider>
);

describe('OnboardingContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Reset localStorage mock
    vi.spyOn(Storage.prototype, 'getItem').mockRestore();
    vi.mocked(useZipCodeModal).mockReturnValue(mockUseZipCodeModal);
    vi.mocked(useVehicle).mockReturnValue(mockUseVehicle);
  });

  it('should provide initial state', () => {
    // Mock localStorage to have user data so modal doesn't show by default
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify({
        zipCode: '10001',
        age: '25',
        creditScore: '750',
      })
    );

    const { result } = renderHook(() => TestComponent(), { wrapper });

    expect(result.current.showModal).toBe(false);
    expect(result.current.currentStep).toBe(1);
    expect(result.current.zipCode).toBe('');
    expect(result.current.age).toBe('');
    expect(result.current.creditScore).toBe('');
    expect(result.current.isEditMode).toBe(false);
  });

  it('should show modal when no user data exists', () => {
    // Reset localStorage mock and ensure it returns null
    vi.spyOn(Storage.prototype, 'getItem').mockRestore();
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const { result } = renderHook(() => TestComponent(), { wrapper });

    expect(result.current.showModal).toBe(true);
  });

  it('should not show modal when user data exists', () => {
    const userData = { zipCode: '10001', age: '26-30', creditScore: '580-669' };
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify(userData)
    );

    const { result } = renderHook(() => TestComponent(), { wrapper });

    expect(result.current.showModal).toBe(false);
  });

  it('should show modal when zip code modal is open', () => {
    vi.mocked(useZipCodeModal).mockReturnValue({
      ...mockUseZipCodeModal,
      isZipCodeModalOpen: true,
    });

    const { result } = renderHook(() => TestComponent(), { wrapper });

    expect(result.current.showModal).toBe(true);
    expect(result.current.isEditMode).toBe(true);
    expect(result.current.currentStep).toBe(1);
  });

  it('should load existing user data when zip code modal opens', () => {
    const userData = { zipCode: '10001', age: '26-30', creditScore: '580-669' };
    localStorage.setItem('flexcar-user-data', JSON.stringify(userData));

    vi.mocked(useZipCodeModal).mockReturnValue({
      ...mockUseZipCodeModal,
      isZipCodeModalOpen: true,
    });

    const { result } = renderHook(() => TestComponent(), { wrapper });

    expect(result.current.zipCode).toBe('10001');
    expect(result.current.age).toBe('26-30');
    expect(result.current.creditScore).toBe('580-669');
  });

  it('should handle zip submit in edit mode', async () => {
    vi.mocked(useZipCodeModal).mockReturnValue({
      ...mockUseZipCodeModal,
      isZipCodeModalOpen: true,
    });

    const { result } = renderHook(() => TestComponent(), { wrapper });

    const formData = {
      zipCode: '90210',
      age: '31-35',
      creditScore: '670-739',
    };

    await act(async () => {
      result.current.handleZipSubmit(formData);
    });

    expect(result.current.zipCode).toBe('90210');
    expect(result.current.age).toBe('31-35');
    expect(result.current.creditScore).toBe('670-739');
    expect(result.current.showModal).toBe(false);
    expect(result.current.isEditMode).toBe(false);
    expect(mockUseZipCodeModal.closeZipCodeModal).toHaveBeenCalled();
    expect(mockUseVehicle.searchVehicles).toHaveBeenCalledWith('90210');

    // Check localStorage was updated
    const storedData = JSON.parse(
      localStorage.getItem('flexcar-user-data') || '{}'
    );
    expect(storedData).toEqual(formData);
  });

  it('should advance to step 2 when not in edit mode', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    const formData = {
      zipCode: '10001',
      age: '',
      creditScore: '',
    };

    await act(async () => {
      result.current.handleZipSubmit(formData);
    });

    expect(result.current.currentStep).toBe(2);
    expect(result.current.zipCode).toBe('10001');
  });

  it('should handle user info submit', async () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    const formData = {
      zipCode: '10001',
      age: '26-30',
      creditScore: '580-669',
    };

    await act(async () => {
      result.current.handleUserInfoSubmit(formData);
    });

    expect(result.current.zipCode).toBe('10001');
    expect(result.current.age).toBe('26-30');
    expect(result.current.creditScore).toBe('580-669');
    expect(result.current.showModal).toBe(false);
    expect(result.current.isEditMode).toBe(false);

    // Check localStorage was updated
    const storedData = JSON.parse(
      localStorage.getItem('flexcar-user-data') || '{}'
    );
    expect(storedData).toEqual(formData);
  });

  it('should close modal', () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    act(() => {
      result.current.handleCloseModal();
    });

    expect(result.current.showModal).toBe(false);
    expect(result.current.isEditMode).toBe(false);
    expect(mockUseZipCodeModal.closeZipCodeModal).toHaveBeenCalled();
  });

  it('should go back to step 1', () => {
    const { result } = renderHook(() => TestComponent(), { wrapper });

    // First set to step 2
    act(() => {
      result.current.setCurrentStep(2);
    });

    expect(result.current.currentStep).toBe(2);

    // Then go back to step 1
    act(() => {
      result.current.handleBackToStep1();
    });

    expect(result.current.currentStep).toBe(1);
  });

  it('should open edit modal with existing data', () => {
    const userData = { zipCode: '10001', age: '26-30', creditScore: '580-669' };
    localStorage.setItem('flexcar-user-data', JSON.stringify(userData));

    const { result } = renderHook(() => TestComponent(), { wrapper });

    act(() => {
      result.current.openEditModal(1);
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.isEditMode).toBe(true);
    expect(result.current.showModal).toBe(true);
    expect(result.current.zipCode).toBe('10001');
    expect(result.current.age).toBe('26-30');
    expect(result.current.creditScore).toBe('580-669');
  });

  it('should handle locate me click', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const { result } = renderHook(() => TestComponent(), { wrapper });

    act(() => {
      result.current.handleLocateMe();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Locate me clicked');
    consoleSpy.mockRestore();
  });

  it('should handle corrupted localStorage data gracefully', () => {
    localStorage.setItem('flexcar-user-data', 'invalid-json');

    vi.mocked(useZipCodeModal).mockReturnValue({
      ...mockUseZipCodeModal,
      isZipCodeModalOpen: true,
    });

    const { result } = renderHook(() => TestComponent(), { wrapper });

    // Should not crash and should have empty values
    expect(result.current.zipCode).toBe('');
    expect(result.current.age).toBe('');
    expect(result.current.creditScore).toBe('');
  });
});
