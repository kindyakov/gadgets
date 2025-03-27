import { useState, useEffect } from "react";

export function useDebounce(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очистка таймера при изменении значения или размонтировании компонента
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
