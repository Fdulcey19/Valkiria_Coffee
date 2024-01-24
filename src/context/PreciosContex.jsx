import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createPreciosRequest, getPreciosRequest } from "../api/precios";

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
    try {
      const res = await getPreciosRequest();
      setPrecios(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPrecios = async (precios) => {
    try {
      const res = await createPreciosRequest(precios);
      console.log(res);
    } catch (error) {
      console.log(error);
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
