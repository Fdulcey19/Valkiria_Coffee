import axios from "./axios";

export const getPreciosRequest = () => axios.get(`/precio`);

export const getPrecioRequest = id => axios.get(`/precio/${id}`);

export const createPreciosRequest = (precio) => axios.post(`/precio`, precio);

export const updatePrecioRequest = (precio) => axios.put(`/precio/${precio.id}`, precio);

export const deletePrecioRequest = id => axios.delete(`/precio/${id}`);