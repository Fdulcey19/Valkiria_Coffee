import axios from "./axios";

export const getPreciosRequest = () => axios.get(`/precios`);

export const getPrecioRequest = id => axios.get(`/precio/${id}`);

export const createPreciosRequest = (precio) => axios.post(`/precio`, precio);

export const updatePrecioRequest = (precio) => axios.put(`/precio/${precio._id}`, precio); // Pasar el ID en la URL

export const deletePrecioRequest = id => axios.delete(`/precio/${id}`);

export const getPreciosRequestNuevo = () => axios.get(`/preciosNuevo`);

export const createPreciosRequestNuevo = (precio) => axios.post(`/precioNuevo`, precio);

export const updatePrecioRequestNuevo = (precio) => axios.put(`/precioNuevo/${precio._id}`, precio); // Pasar el ID en la URL