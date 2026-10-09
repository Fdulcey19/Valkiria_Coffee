import { useEffect, useState } from "react";

/**
 * Segundos que faltan para poder volver a pulsar "Recargar".
 * El backend informa `meta.refresco.segundosRestantes` en cada respuesta; aquí se cuenta hacia atrás.
 */
export function useCooldown(data) {
  const seconds = data?.meta?.refresco?.segundosRestantes ?? 0;
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = Date.now();
    setDeadline(t + seconds * 1000);
    setNow(t);
  }, [data, seconds]);

  useEffect(() => {
    if (deadline <= Date.now()) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
