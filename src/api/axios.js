/**
 * Cliente HTTP único de la aplicación.
 *
 * La sesión vive en una cookie httpOnly que el navegador adjunta sola
 * (`withCredentials`); el JavaScript nunca ve ni guarda el token.
 */
import axios from "axios";
import { API_URL } from "../config/environment";

const instance = axios.create({
    baseURL: API_URL, // ver src/config/environment.js
    timeout: 15000,
    withCredentials: true,
    // Cabecera exigida por el backend en POST/PUT/DELETE como defensa contra CSRF.
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

// --- Sesión vencida ---------------------------------------------------------
// Si el backend responde 401 en una petición normal (no login ni consulta de sesión),
// la sesión expiró: se avisa a quien se haya registrado (AuthProvider) para cerrar sesión.
let unauthorizedHandler = null;

/** Registra la función a ejecutar cuando la sesión deja de ser válida. */
export const onUnauthorized = (handler) => {
    unauthorizedHandler = handler;
};

const AUTH_PATHS = ['/login', '/verify'];

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = error.config?.url ?? '';
        const isAuthCall = AUTH_PATHS.some((path) => url.includes(path));
        if (error.response?.status === 401 && !isAuthCall) {
            unauthorizedHandler?.();
        }
        return Promise.reject(error);
    }
);

export default instance;
