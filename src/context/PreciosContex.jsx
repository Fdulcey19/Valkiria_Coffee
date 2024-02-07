import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createPreciosRequest, getPreciosRequest } from "../api/precios";
import { verifyTokenRequest } from "../api/auth";
import Swal from "sweetalert2";

const PreciosContext = createContext();

export const usePrecios = () => {
  const context = useContext(PreciosContext);
  if (!context) {
    throw new Error(
      "usePrecios debe estar dentro del proveedor PreciosContext"
    );
  }
  return context;
};

export function PreciosProvider({ children }) {
  const [precios, setPrecios] = useState([]);

  const getPrecios = async () => {
    const tokenLocal = localStorage.getItem("token");
    if (!tokenLocal) {
      console.log("No hay token");
      return;
    }
    try {
      const response = await verifyTokenRequest(tokenLocal);
      if(!response){
        console.log("No hay token");
        return;
      }
      console.log("hola");
      const res = await getPreciosRequest();
      console.log(res.data); // Asegúrate de que res.data tenga valores aquí
      setPrecios(res.data); // Actualiza el estado con la nueva data
      return res.data;
    } catch (error) {
      console.error("Error fetching precios:", error);
    }
  };
  
  const createPrecios = async (precios) => {
    const tokenLocal = localStorage.getItem("token");
    if (!tokenLocal) {
      console.log("No hay token");
      return;
    }
    try {
      const response = await verifyTokenRequest(tokenLocal);
      if(!response){
        return;
      }
      const data ={
        idUser: response.data.id,
        origen:precios.origen, 
        taza:precios.taza, 
        microLote: precios.microLote, 
        medianoLote: precios.medianoLote
      }
      const res = await createPreciosRequest(data);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Precios guardados",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };
  return (
    <PreciosContext.Provider
      value={{
        precios,
        createPrecios,
        getPrecios,
      }}
    >
      {children}
    </PreciosContext.Provider>
  );
}

PreciosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
