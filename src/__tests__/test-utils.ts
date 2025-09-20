import {
  render as rtlRender,
  screen,
  waitFor,
  type RenderOptions,
} from '@testing-library/react';
import { type ReactElement } from 'react';
import AllTheProviders from './AllTheProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Explicit exports
export { screen, waitFor };
export * from '@testing-library/react';
export { customRender as render };
