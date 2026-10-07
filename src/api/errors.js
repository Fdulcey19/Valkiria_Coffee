/** Extrae un mensaje legible de un error de axios (o devuelve el texto de respaldo). */
export const errorText = (error, fallback = "Ocurrió un error inesperado.") => {
  const data = error?.response?.data;
  if (Array.isArray(data)) return data.flat().join(". ");
  if (typeof data === "string") return data;
  return data?.message ?? fallback;
};
