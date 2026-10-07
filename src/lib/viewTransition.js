import { flushSync } from "react-dom";

/** ¿El navegador soporta transiciones de vista y el usuario no pidió reducir el movimiento? */
export const canViewTransition = () =>
  typeof document !== "undefined" &&
  typeof document.startViewTransition === "function" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Ejecuta un cambio de pantalla con un desvanecido cruzado entre la vista anterior y la nueva
 * (API nativa `document.startViewTransition`). Donde no existe, simplemente aplica el cambio.
 * (Donde existen las transiciones de vista, <html data-vt> desactiva las animaciones de entrada de las
 * páginas para que no se sumen al desvanecido: se marca una sola vez en main.jsx.)
 */
export function withViewTransition(update) {
  if (!canViewTransition()) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}
