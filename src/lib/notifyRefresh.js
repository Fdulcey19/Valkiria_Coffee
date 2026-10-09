import { notify } from "./notify";
import { formatRemaining } from "./formatRemaining";

/** Avisa el resultado de pulsar "Recargar" a partir de `meta.refresco` que devuelve el backend. */
export function notifyRefresh(data) {
  const refresco = data?.meta?.refresco;
  if (data?.error?.response?.status === 429) {
    notify.error("Demasiadas actualizaciones", "Espera unos minutos antes de volver a intentarlo.");
    return;
  }
  if (!refresco) {
    notify.error("No se pudo actualizar", "Revisa tu conexión e inténtalo de nuevo.");
    return;
  }
  switch (refresco.estado) {
    case "ok":
      notify.success("Precios actualizados");
      break;
    case "parcial":
      notify.info("Actualización parcial", "Una fuente falló: ese dato conserva su último valor guardado.");
      break;
    case "mercado_cerrado":
      notify.info("Mercado cerrado", "Se muestra el último precio guardado; no hay datos nuevos hasta la próxima apertura.");
      break;
    case "enfriamiento":
      notify.info("Los datos son recientes", `Podrás volver a actualizar en ${formatRemaining(refresco.segundosRestantes)}.`);
      break;
    default:
      notify.error("Las fuentes no respondieron", "Se muestran los últimos precios guardados.");
  }
}
