import { useContext } from 'react';
import { ZipCodeModalContext } from '../contexts/ZipCodeModalContextTypes';

export const useZipCodeModal = () => {
  const context = useContext(ZipCodeModalContext);
  if (context === undefined) {
    throw new Error(
      'useZipCodeModal must be used within a ZipCodeModalProvider'
    );
  }
  return context;
};
