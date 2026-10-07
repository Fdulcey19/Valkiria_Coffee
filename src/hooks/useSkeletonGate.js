import { useEffect, useRef, useState } from "react";
import { withViewTransition } from "../lib/viewTransition";

/**
 * Controla cuándo mostrar el esqueleto de carga para que no parpadee:
 *  - Si los datos llegan rápido (antes de `delay`), NO se muestra: el contenido entra directo.
 *  - Si tarda, el esqueleto aparece pasado `delay` y se queda al menos `min` ms.
 *  - Al terminar, pasa del esqueleto al contenido con un desvanecido cruzado.
 *
 * Devuelve:
 *  - `waiting`  → cargando pero todavía dentro del `delay`: no mostrar nada aún.
 *  - `skeleton` → mostrar el esqueleto.
 *  - `settled`  → el esqueleto llegó a verse: el contenido no debe repetir su animación de entrada.
 * Cuando ninguno es verdadero, se muestra el contenido real.
 */
export function useSkeletonGate(loading, { delay = 200, min = 500 } = {}) {
  const [phase, setPhase] = useState(loading ? "wait" : "done"); // wait | skeleton | done
  const shownAt = useRef(0);
  const wasShown = useRef(false);

  useEffect(() => {
    if (loading) {
      const id = setTimeout(() => {
        shownAt.current = Date.now();
        wasShown.current = true;
        setPhase("skeleton");
      }, delay);
      return () => clearTimeout(id);
    }
    // Terminó de cargar.
    const remaining = Math.max(0, min - (Date.now() - shownAt.current));
    if (!wasShown.current || remaining === 0) {
      // Nunca se mostró (carga rápida) o ya cumplió su tiempo mínimo.
      if (wasShown.current) withViewTransition(() => setPhase("done"));
      else setPhase("done");
      return undefined;
    }
    const id = setTimeout(() => withViewTransition(() => setPhase("done")), remaining);
    return () => clearTimeout(id);
  }, [loading, delay, min]);

  return {
    waiting: loading && phase === "wait",
    skeleton: phase === "skeleton",
    settled: wasShown.current,
  };
}
