import { createContext } from 'react';

export interface ZipCodeModalContextType {
  isZipCodeModalOpen: boolean;
  openZipCodeModal: () => void;
  closeZipCodeModal: () => void;
}

export const ZipCodeModalContext = createContext<
  ZipCodeModalContextType | undefined
>(undefined);
