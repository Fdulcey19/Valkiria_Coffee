/** Peticiones del módulo de usuarios (solo administradores). */
import axios from './axios';

/** Lista paginada. `params`: { page, limit, search, role, active }. `signal` permite cancelarla. */
export const getUsersRequest = (params, signal) => axios.get('/users', { params, signal });

export const createUserRequest = (user) => axios.post('/users', user);

export const updateUserRequest = (id, changes) => axios.put(`/users/${id}`, changes);

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);

/** Historial de acciones sobre usuarios. `params`: { page, limit, action, search }. */
export const getUserAuditRequest = (params, signal) => axios.get('/users/audit', { params, signal });
