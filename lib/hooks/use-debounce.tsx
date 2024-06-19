import { useState, useEffect } from "react";

/**
 * Returns a debounced value that updates after a specified delay.
 *
 * @param {T} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @return {T} The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
