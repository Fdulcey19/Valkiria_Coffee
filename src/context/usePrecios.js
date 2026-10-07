import { createContext, useContext } from "react";

export const PreciosContext = createContext();

/** Acceso a los precios guardados del usuario y a sus acciones (crear / actualizar). */
export const usePrecios = () => {
  const context = useContext(PreciosContext);
  if (!context) {
    throw new Error("usePrecios debe estar dentro del proveedor PreciosContext");
  }
  return context;
};
