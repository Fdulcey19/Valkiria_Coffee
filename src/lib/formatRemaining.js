/** Tiempo restante legible: segundos si falta menos de 1 min; si no, minutos redondeados hacia arriba. */
export function formatRemaining(seconds) {
  if (seconds < 60) return `${seconds} s`;
  return `${Math.ceil(seconds / 60)} min`;
}
