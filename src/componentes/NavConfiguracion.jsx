import { Link, useSearchParams } from "react-router-dom";
import Valkiria from "./Precios/Valkiria";
import NuevoFuturo from "./Precios/NuevoFuturo";

/**
 * Configuración de precios en UNA sola ruta (/dash/configuracion). La pestaña activa viaja en la
 * URL como parámetro (?tab=valkiria · ?tab=nuevo), así se puede compartir o recargar sin perderla.
 * Cada pestaña muestra su formulario de edición, o el de creación si aún no hay precios guardados.
 *
 * Las dos pestañas se montan a la vez y solo se alterna cuál se ve: así al cambiar no se vuelve a
 * pedir nada ni aparece el esqueleto de carga (sin parpadeo).
 */
const TABS = [
  { key: "valkiria", label: "Precios Valkiria", view: Valkiria },
  { key: "nuevo", label: "Precios Nuevo Futuro", view: NuevoFuturo },
];
const DEFAULT_TAB = TABS[0].key;

function NavConfiguracion() {
  const [params] = useSearchParams();
  // Un valor desconocido en la URL cae en la primera pestaña (nunca rompe la pantalla).
  const active = TABS.find(({ key }) => key === params.get("tab")) ?? TABS[0];

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Configuración</h1>
          <p>Define los valores base con los que se calculan los precios.</p>
        </div>
      </header>

      <nav className="tabs" aria-label="Configuración de precios">
        {TABS.map(({ key, label }) => {
          const isActive = key === active.key;
          return (
            <Link
              key={key}
              to={key === DEFAULT_TAB ? "?" : `?tab=${key}`}
              preventScrollReset
              className={`tabs__item ${isActive ? "tabs__item--active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {TABS.map(({ key, view: View }) => (
        <div key={key} className={key === active.key ? "" : "hidden"} hidden={key !== active.key}>
          <View />
        </div>
      ))}
    </div>
  );
}

export default NavConfiguracion;
