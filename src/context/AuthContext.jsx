import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  //   Contexto de autenticación de registro
  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered.",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response.data || "An error occurred during registration.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  //   Contexto de autenticación de inicio de sesión

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenticated(true);
      setUser(res.data);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in.",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response || "An error occurred during login.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  // Contexto de cerrar sesión
  const signOut = () => {
    Swal.fire({
      title: "Deseas cerrar sesion?",
      text: "Estas seguro que deseas salir de Valkiria!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Salir!",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token"); // Elimina la cookie del token
        setIsAuthenticated(false);
        setUser(null);
        Swal.fire({
          title: "Cerraste Sesion!",
          text: "Tu sesion ha sido cerrada.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    async function checkLogin() {
      console.log("Checking login...");
      const cookies = Cookies.get();
      console.log("Cookies:", cookies);
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }
        setLoading(false);
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
      }
      console.log("After try-catch block. isAuthenticated:", isAuthenticated);
      console.log("Loading:", loading);
      console.log("User:", user);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, user, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
