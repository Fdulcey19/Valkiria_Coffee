/**
 * Pista local de "esta persona ya inició sesión antes en este navegador". NO es la sesión (esa es una cookie
 * httpOnly que el JavaScript no puede leer): solo sirve para decidir qué mostrar mientras se verifica.
 * Sin pista (visitante nuevo, sesión cerrada o vencida) no se dibuja ningún esqueleto, para que no se vea
 * un instante el panel y luego salte al login.
 */
const KEY = "valkiria:session-hint";

export const hasSessionHint = () => {
  try { return localStorage.getItem(KEY) === "1"; } catch { return false; }
};
export const setSessionHint = () => {
  try { localStorage.setItem(KEY, "1"); } catch { /* sin almacenamiento: no pasa nada */ }
};
export const clearSessionHint = () => {
  try { localStorage.removeItem(KEY); } catch { /* idem */ }
};
