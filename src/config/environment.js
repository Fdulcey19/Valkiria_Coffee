/**
 * Variables de entorno del front, en un solo lugar (va en git: no hay secretos aquí, la URL de la API es pública).
 *
 * - Desarrollo: `.env.local` define VITE_API_URL=/api y Vite lo reenvía al backend local.
 * - Producción: se usa PRODUCTION_API_URL; si quieres otro destino, cámbialo aquí.
 */
const PRODUCTION_API_URL = "https://apivalkiria.fsegura.tech/api";

export const API_URL = import.meta.env.VITE_API_URL || PRODUCTION_API_URL;
