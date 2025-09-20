import { createContext } from 'react';
import type { OnboardingContextType } from './OnboardingContext.types';

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);
