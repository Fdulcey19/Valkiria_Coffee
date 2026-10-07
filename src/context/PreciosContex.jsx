/**
 * Contexto de precios guardados por el usuario (Valkiria y Nuevo Futuro).
 *
 * El backend ya devuelve solo los precios del usuario con sesión, así que aquí no se
 * filtra ni se envía el id del usuario: cada acción es una llamada directa a la API.
 */
import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { notify } from "../lib/notify";
import {
  createPreciosRequest,
  createPreciosRequestNuevo,
  getPreciosRequest,
  getPreciosRequestNuevo,
  updatePrecioRequest,
  updatePrecioRequestNuevo,
} from "../api/precios";
import { errorText } from "../api/errors";
import { PreciosContext } from "./usePrecios";

/** Campos que se envían al guardar cada tipo de precios. */
const CAMPOS_VALKIRIA = ["diferencia", "origen", "taza", "microLote", "medianoLote"];
const CAMPOS_NUEVO = [
  "diferencia",
  "organico",
  "organicoBonificacion",
  "convencional",
  "convencionalBonificacion",
  "estandar",
  "estandarBonificacion",
  "taza",
  "tazaBonificacion",
];

const pick = (source, fields) => Object.fromEntries(fields.map((f) => [f, source[f]]));

const showError = (error) => notify.error("No se pudo guardar", errorText(error));

const showSaved = (title) => notify.success(title);

/** Deja ver el aviso de éxito un instante antes de recargar la sección. */
const goTo = (path) => setTimeout(() => { window.location.href = path; }, 900);

export function PreciosProvider({ children }) {
  const [precios, setPrecios] = useState([]);

  /** Trae los precios del usuario y devuelve el primer registro (o undefined si no hay). */
  const fetchPrecios = useCallback(async (request) => {
    try {
      const res = await request();
      const guardado = res.data?.[0];
      if (guardado) setPrecios(guardado);
      return guardado;
    } catch (error) {
      console.error("Error al obtener precios:", error);
    }
  }, []);

  // ---- Valkiria ------------------------------------------------------------

  const getPrecios = useCallback(() => fetchPrecios(getPreciosRequest), [fetchPrecios]);

  /** Guarda por primera vez los precios de Valkiria y vuelve al panel. */
  const createPrecios = async (data) => {
    try {
      const res = await createPreciosRequest(pick(data, CAMPOS_VALKIRIA));
      if (res.status === 200) {
        showSaved("Precios guardados");
        goTo("/dash");
      }
    } catch (error) {
      showError(error);
    }
  };

  /** Actualiza los precios de Valkiria existentes. */
  const updatePrecio = async (precioId, data) => {
    try {
      const res = await updatePrecioRequest({ ...pick(data, CAMPOS_VALKIRIA), _id: precioId });
      if (res.status === 200) showSaved("Precio actualizado");
    } catch (error) {
      showError(error);
    }
  };

  // ---- Nuevo Futuro --------------------------------------------------------

  const getPreciosNuevo = useCallback(() => fetchPrecios(getPreciosRequestNuevo), [fetchPrecios]);

  /** Guarda por primera vez los precios de Nuevo Futuro y vuelve a su panel. */
  const createPreciosNuevo = async (data) => {
    try {
      const res = await createPreciosRequestNuevo(pick(data, CAMPOS_NUEVO));
      if (res.status === 200) {
        showSaved("Precios guardados");
        goTo("/dash/nuevo");
      }
    } catch (error) {
      showError(error);
    }
  };

  /** Actualiza los precios de Nuevo Futuro existentes. */
  const updatePreciosNuevo = async (precioId, data) => {
    try {
      const res = await updatePrecioRequestNuevo({ ...pick(data, CAMPOS_NUEVO), _id: precioId });
      if (res.status === 200) showSaved("Precio actualizado");
    } catch (error) {
      showError(error);
    }
  };

  const value = useMemo(
    () => ({
      precios,
      getPrecios,
      createPrecios,
      updatePrecio,
      getPreciosNuevo,
      createPreciosNuevo,
      updatePreciosNuevo,
    }),
    // Las acciones de escritura no capturan estado; solo cambia `precios`.
    [precios, getPrecios, getPreciosNuevo]
  );

  return <PreciosContext.Provider value={value}>{children}</PreciosContext.Provider>;
}

PreciosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
