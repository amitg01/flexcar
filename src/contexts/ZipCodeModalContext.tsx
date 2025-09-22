import React, { useState, type ReactNode } from 'react';
import {
  ZipCodeModalContext,
  type ZipCodeModalContextType,
} from '../types/contexts/ZipCodeModalContext.types';

interface ZipCodeModalProviderProps {
  children: ReactNode;
}

export const ZipCodeModalProvider: React.FC<ZipCodeModalProviderProps> = ({
  children,
}) => {
  const [isZipCodeModalOpen, setIsZipCodeModalOpen] = useState(false);

  const openZipCodeModal = () => {
    setIsZipCodeModalOpen(true);
  };

  const closeZipCodeModal = () => {
    setIsZipCodeModalOpen(false);
  };

  const value: ZipCodeModalContextType = {
    isZipCodeModalOpen,
    openZipCodeModal,
    closeZipCodeModal,
  };

  return (
    <ZipCodeModalContext.Provider value={value}>
      {children}
    </ZipCodeModalContext.Provider>
  );
};
