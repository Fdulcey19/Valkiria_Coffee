/** Peticiones de autenticación. La sesión viaja en cookie, no se pasa token. */
import axios from './axios';

export const registerRequest = user => axios.post(`/register`, user);

export const loginRequest = user => axios.post(`/login`, user);

export const logoutRequest = () => axios.post(`/logout`);

/** Devuelve el usuario de la sesión activa; responde 401 si no hay sesión. */
export const getSessionRequest = () => axios.get('/verify');

/** Recuperación de contraseña: pide un enlace por correo (responde igual exista o no el correo). */
export const forgotPasswordRequest = (email) => axios.post('/forgot-password', { email });

/** Comprueba si el enlace recibido sigue vigente (no lo consume). */
export const checkResetTokenRequest = (token) => axios.post('/reset-password/check', { token });

/** Usa el enlace y establece la nueva contraseña ({ token, password }). */
export const resetPasswordRequest = (data) => axios.post('/reset-password', data);
