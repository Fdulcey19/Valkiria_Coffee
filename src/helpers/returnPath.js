/**
 * Destino al que se vuelve tras iniciar sesión.
 *
 * Recibe la ubicación que se pidió antes del login (`state.from`) y devuelve una ruta interna segura
 * de la zona privada, conservando los parámetros (p. ej. `?tab=nuevo`). Cualquier otra cosa
 * (otro sitio, `//dominio`, rutas públicas, datos raros) cae en `/dash`: así no hay redirecciones abiertas.
 */
export const DEFAULT_RETURN = "/dash";

export function safeReturnPath(from) {
  const pathname = from?.pathname;
  const isPrivate = typeof pathname === "string" && /^\/dash(\/[\w-]*)*$/.test(pathname);
  if (!isPrivate) return DEFAULT_RETURN;
  const search = typeof from.search === "string" && /^\?[\w=&%.-]*$/.test(from.search) ? from.search : "";
  return `${pathname}${search}`;
}
