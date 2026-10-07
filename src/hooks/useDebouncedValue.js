import { useEffect, useState } from "react";

/** Devuelve `value` solo después de que deja de cambiar durante `delay` ms (útil en buscadores). */
export default function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
