import { useEffect, useState } from 'react';

/**
 * Debounce a rapidly-changing value.
 *
 * @param value  - The value to debounce
 * @param delay  - Delay in milliseconds (default: 300ms)
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 400);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
