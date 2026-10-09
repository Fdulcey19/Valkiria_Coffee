import { formatRemaining } from "./formatRemaining";

/**
 * Texto fijo (visible, no solo un aviso emergente) cuando el servicio de precios tiene límites:
 * tope diario alcanzado o bloqueo temporal tras usar una API. Devuelve null si no hay nada que avisar.
 */
export function refreshNotice(data) {
  const r = data?.meta?.refresco;
  if (!r) return null;
  if (r.limiteDiario) {
    return "Se alcanzó el límite diario de consultas al servicio de precios. Verifica el precio en «Ver más» o vuelve a intentarlo más tarde.";
  }
  if (r.porApi && r.segundosRestantes > 0) {
    return `Este precio viene de una API con límite de consultas: podrás actualizar de nuevo en ${formatRemaining(r.segundosRestantes)}. Mientras tanto, verifica el precio en «Ver más».`;
  }
  return null;
}
