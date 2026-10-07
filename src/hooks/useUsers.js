import { useCallback, useEffect, useRef, useState } from "react";
import { createUserRequest, deleteUserRequest, getUsersRequest, updateUserRequest } from "../api/users";
import { errorText } from "../api/errors";

const EMPTY_PAGE = { items: [], total: 0, page: 1, limit: 10, totalPages: 1 };

/**
 * Estado y acciones del módulo de usuarios con paginación en servidor.
 *  - `params` ({ page, limit, search, role, active }) cambia → se vuelve a consultar.
 *  - Una consulta nueva cancela la anterior (AbortController): una respuesta lenta
 *    nunca pisa a una más reciente.
 *  - Mientras llega la página siguiente se conservan los datos actuales (`fetching`),
 *    así la tabla no parpadea.
 *  - Las acciones lanzan un Error con mensaje legible para que la vista decida cómo avisar.
 */
export default function useUsers(params) {
  const [data, setData] = useState(EMPTY_PAGE);
  const [loading, setLoading] = useState(true); // primera carga
  const [fetching, setFetching] = useState(false); // recargas posteriores
  const [loadError, setLoadError] = useState(false);
  const controllerRef = useRef(null);

  const { page, limit, search, role, active } = params;

  const load = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setFetching(true);
    try {
      // Solo se envían los filtros con valor.
      const query = { page, limit, ...(search && { search }), ...(role && { role }), ...(active !== "" && active !== undefined && { active }) };
      const res = await getUsersRequest(query, controller.signal);
      setData(res.data);
      setLoadError(false);
    } catch (error) {
      if (error.code === "ERR_CANCELED") return; // reemplazada por una consulta más nueva
      setLoadError(true);
    } finally {
      if (controllerRef.current === controller) {
        setLoading(false);
        setFetching(false);
      }
    }
  }, [page, limit, search, role, active]);

  useEffect(() => {
    load();
    return () => controllerRef.current?.abort();
  }, [load]);

  /** Ejecuta una escritura, refresca la página actual y traduce los errores de la API. */
  const run = useCallback(
    async (request) => {
      try {
        await request();
      } catch (error) {
        throw new Error(errorText(error));
      }
      await load();
    },
    [load]
  );

  return {
    ...data,
    loading,
    fetching,
    loadError,
    reload: load,
    createUser: (payload) => run(() => createUserRequest(payload)),
    updateUser: (id, changes) => run(() => updateUserRequest(id, changes)),
    deleteUser: (id) => run(() => deleteUserRequest(id)),
  };
}
