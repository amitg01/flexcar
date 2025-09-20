import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounce from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 100));
    expect(result.current).toBe('test');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 100 },
      }
    );

    expect(result.current).toBe('test');

    rerender({ value: 'updated', delay: 100 });
    expect(result.current).toBe('test'); // Should still be old value

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset timer on new value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test', delay: 100 },
      }
    );

    rerender({ value: 'updated1', delay: 100 });
    act(() => {
      vi.advanceTimersByTime(50);
    });

    rerender({ value: 'updated2', delay: 100 });
    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toBe('test'); // Should still be initial value

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(result.current).toBe('updated2');
  });
});
