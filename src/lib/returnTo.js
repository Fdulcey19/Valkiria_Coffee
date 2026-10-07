/**
 * "Volver" lógico: en vez de depender del historial del navegador (que puede contener
 * cualquier cosa si el usuario editó la URL a mano), los enlaces que abren una página
 * secundaria anotan de dónde vienen en `location.state.from`, y el botón "Volver"
 * regresa exactamente allí.
 */
const SECONDARY_PATHS = ["/terminos", "/privacidad"];

/** Solo rutas internas válidas (evita redirecciones abiertas) y que no sean la propia página legal. */
export const safePath = (path) =>
  typeof path === "string" && path.startsWith("/") && !path.startsWith("//") && !SECONDARY_PATHS.includes(path)
    ? path
    : null;

/**
 * Estado a pasar al enlazar a una página secundaria desde `location`.
 * Si ya estamos en una página secundaria (p. ej. Términos → Privacidad), se conserva
 * el origen original en lugar de reemplazarlo.
 */
export const returnStateFor = (location) => ({
  from: safePath(location.state?.from) ?? safePath(location.pathname + location.search),
});
