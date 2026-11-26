import { useEffect, useState } from 'react';

export const useDebounce = <T>(query: T, delay: number): T => {
  const [value, setValue] = useState<T>(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  return value;
};
