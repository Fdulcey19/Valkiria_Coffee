import { createContext, useContext } from "react";

export const AuthContext = createContext();

/** Acceso al contexto de autenticación (usuario, rol, signIn, signOut…). */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};
