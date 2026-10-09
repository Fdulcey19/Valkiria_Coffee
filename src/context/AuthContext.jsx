/**
 * Contexto de autenticación.
 *
 * Expone el usuario actual (con su rol) y las acciones signIn / signOut.
 * La sesión se guarda en una cookie httpOnly gestionada por el backend, por eso aquí
 * no se almacena ningún token: al cargar la app se pregunta al servidor quién es el usuario.
 */
import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { notify } from "../lib/notify";
import { useConfirm } from "../componentes/ui/ConfirmProvider";
import { loginRequest, logoutRequest, getSessionRequest } from "../api/auth";
import { onUnauthorized } from "../api/axios";
import { errorText } from "../api/errors";
import { ROLES } from "../config/roles";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // true mientras se consulta la sesión inicial
  // true tras un cierre de sesión voluntario: el login arranca limpio (no recuerda la página anterior).
  const [signedOut, setSignedOut] = useState(false);
  const confirm = useConfirm();

  /** Deja la app en estado "sin sesión". */
  const clearSession = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /** Inicia sesión: el backend responde con el usuario y deja la cookie de sesión. */
  const signIn = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      setUser(res.data);
      setIsAuthenticated(true);
      setSignedOut(false);

      notify.success("Sesión iniciada", `Hola, ${res.data.username}`);
      return true;
    } catch (error) {
      notify.error("No se pudo iniciar sesión", errorText(error, "No pudimos validara tus credenciales. Inténtalo de nuevo."));
      return false;
    }
  };

  /** Cierra la sesión (pide confirmación) y le pide al backend borrar la cookie. */
  const signOut = async () => {
    const accepted = await confirm({
      title: "¿Cerrar sesión?",
      text: "Tendrás que volver a iniciar sesión para entrar a Valkiria.",
      confirmText: "Sí, salir",
    });
    if (!accepted) return;

    try {
      await logoutRequest();
    } catch {
      // Aunque falle la red, se cierra la sesión localmente.
    }
    setSignedOut(true);
    clearSession();
  };

  // Al cargar la app: ¿hay una sesión válida? (la cookie se envía automáticamente)
  useEffect(() => {
    let active = true;
    getSessionRequest()
      .then((res) => {
        if (!active) return;
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        // 401 aquí es lo normal cuando nadie ha iniciado sesión.
        if (active) clearSession();
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [clearSession]);

  // Si en cualquier momento el backend dice que la sesión venció, se cierra la sesión local.
  useEffect(() => {
    onUnauthorized(clearSession);
    return () => onUnauthorized(null);
  }, [clearSession]);

  const value = useMemo(
    () => ({
      signIn,
      signOut,
      user,
      loading,
      isAuthenticated,
      signedOut,
      isAdmin: user?.role === ROLES.ADMIN,
    }),
    // signIn/signOut solo dependen de setters estables.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, isAuthenticated, signedOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
