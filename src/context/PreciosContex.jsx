import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createPreciosRequest, createPreciosRequestNuevo, getPreciosRequest, getPreciosRequestNuevo, updatePrecioRequest, updatePrecioRequestNuevo } from "../api/precios";
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
      const id = response.data.id;
      const res = await getPreciosRequest();
      if (!res.data || res.data.length === 0) {
        console.log("No hay precios");
        return;
      }
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].user === id) {
          setPrecios(res.data[i]);
          return res.data[i]; // Devuelve los precios encontrados
        }
      }
      console.log("No se encontraron precios para este usuario");
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
        diferencia:precios.diferencia,
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
        }).then(() => {
          navigator.navigate("/dash/nuevofuturo");
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
  
  const updatePrecio = async (precioId, inputData) => {
    try {
      const precio = { ...inputData, _id: precioId }; // Agregar el ID al objeto precio
      const response = await updatePrecioRequest(precio);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Precio actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };
  
  // Contex Nuevo Futuro

  const createPreciosNuevo = async (precios) => {
    console.log("Hola");
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
        diferencia:precios.diferencia,
        organico:precios.organico, 
        organicoBonificacion:precios.organicoBonificacion, 
        convencional:precios.convencional, 
        convencionalBonificacion:precios.convencionalBonificacion,
        taza:precios.taza, 
        tazaBonificacion:precios.tazaBonificacion,  
        estandar:precios.estandar, 
        estandarBonificacion:precios.estandarBonificacion,  
      }
      console.log(data);
      const res = await createPreciosRequestNuevo(data);
      console.log(res);
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
  
const getPreciosNuevo = async () => {
  const tokenLocal = localStorage.getItem("token");
    if (!tokenLocal) {
      console.log("No hay token");
      return;
    }
    try {
      const response = await verifyTokenRequest(tokenLocal);
      const id = response.data.id;
      const res = await getPreciosRequestNuevo();
      if (!res.data || res.data.length === 0) {
        console.log("No hay precios");
        return;
      }
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].user === id) {
          setPrecios(res.data[i]);
          return res.data[i]; // Devuelve los precios encontrados
        }
      }
      console.log("No se encontraron precios para este usuario");
    } catch (error) {
      console.error("Error fetching precios:", error);
    }
}

  const updatePreciosNuevo = async (precioId, inputData) => {
    try {
      console.log("Hola", precioId, inputData);
      const precio = { ...inputData, _id: precioId }; // Agregar el ID al objeto precio
      const response = await updatePrecioRequestNuevo(precio);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Precio actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  }

  return (
    <PreciosContext.Provider
      value={{
        precios,
        createPrecios,
        getPrecios,
        updatePrecio,
        createPreciosNuevo,
        getPreciosNuevo,
        updatePreciosNuevo
      }}
    >
      {children}
    </PreciosContext.Provider>
  );
}

PreciosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
