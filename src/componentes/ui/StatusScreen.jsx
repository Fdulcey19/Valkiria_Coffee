import PropTypes from "prop-types";

/** Carga: esqueleto que anticipa la forma de la página (evita saltos de layout). */
export function LoadingScreen({ text = "Cargando precios…" }) {
  return (
    <div className="page" role="status" aria-live="polite" aria-busy="true">
      <div className="skeleton-page" aria-hidden="true">
        <div className="skeleton skeleton--hero" />
        <div className="skeleton skeleton--panel" />
        <div className="skeleton skeleton--panel" />
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}

LoadingScreen.propTypes = { text: PropTypes.string };

export function ErrorScreen({ onRetry }) {
  return (
    <div className="status-screen" role="alert">
      <i className="bx bx-error-circle status-screen__icon" aria-hidden="true"></i>
      <h2>No pudimos cargar los precios</h2>
      <p>
        Revisa tu conexión o inténtalo de nuevo en unos segundos. Seguimos
        intentándolo automáticamente.
      </p>
      <button type="button" className="btn btn--primary" onClick={onRetry}>
        <i className="bx bx-refresh" aria-hidden="true"></i> Reintentar
      </button>
    </div>
  );
}

ErrorScreen.propTypes = { onRetry: PropTypes.func.isRequired };
