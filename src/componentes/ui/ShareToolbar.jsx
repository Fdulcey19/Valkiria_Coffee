import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/** Botón de acción con estados: normal → generando (spinner) → listo (check). */
function ActionButton({ icon, label, busyLabel, doneLabel, action, state, className, onClick, disabled }) {
  const isBusy = state.busy === action;
  const isDone = state.done === action;
  return (
    <button type="button" className={`btn ${className} ${isDone ? "btn--done" : ""}`} onClick={onClick} disabled={disabled}>
      {isBusy ? <span className="btn__spinner" aria-hidden="true" /> : <i className={`bx ${isDone ? "bx-check" : icon}`} aria-hidden="true"></i>}
      <span>{isBusy ? busyLabel : isDone ? doneLabel : label}</span>
    </button>
  );
}

ActionButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  busyLabel: PropTypes.string.isRequired,
  doneLabel: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  state: PropTypes.shape({ busy: PropTypes.string, done: PropTypes.string }).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

/**
 * Barra de acciones de los afiches: volver · estado de la imagen · copiar / descargar / compartir.
 * Queda fija arriba al desplazarse, para tener las acciones siempre a mano.
 */
function ShareToolbar({ backTo, poster }) {
  const { supports, busy, done, info, failed, download, share, copy } = poster;
  const state = { busy, done };
  const disabled = Boolean(busy);

  return (
    <div className="share-bar">
      <Link to={backTo} className="btn btn--ghost share-bar__back" aria-label="Volver">
        <i className="bx bx-arrow-back" aria-hidden="true"></i>
        <span className="text-[15px]">Volver</span>
      </Link>

      <div className="share-bar__info" role="status" aria-live="polite">
        <strong>Tu oferta está lista</strong>
        <span>
          {failed ? (
            <span className="share-bar__error">No se pudo preparar la imagen. Pulsa de nuevo.</span>
          ) : info ? (
            <>
              <i className="bx bx-image" aria-hidden="true"></i> PNG · {info.width} × {info.height} px · {info.size}
            </>
          ) : (
            <>
              <span className="btn__spinner btn__spinner--sm" aria-hidden="true" /> Preparando imagen…
            </>
          )}
        </span>
      </div>

      <div className="share-bar__actions">
        {supports.copy && (
          <ActionButton
            icon="bx-copy"
            label="Copiar"
            busyLabel="Copiando…"
            doneLabel="Copiada"
            action="copy"
            state={state}
            className="btn--ghost text-[15px]"
            onClick={copy}
            disabled={disabled}
          />
        )}
        <ActionButton
          icon="bx-download"
          label="Descargar"
          busyLabel="Descargando…"
          doneLabel="Descargada"
          action="download"
          state={state}
          className={supports.share ? "btn--ghost text-[15px]" : "btn--primary text-[15px]"}
          onClick={download}
          disabled={disabled}
        />
        {supports.share && (
          <ActionButton
            icon="bxl-whatsapp"
            label="Compartir"
            busyLabel="Abriendo…"
            doneLabel="Enviada"
            action="share"
            state={state}
            className="btn--whatsapp text-[15px]"
            onClick={share}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
}

ShareToolbar.propTypes = {
  backTo: PropTypes.string.isRequired,
  poster: PropTypes.shape({
    supports: PropTypes.shape({ share: PropTypes.bool, copy: PropTypes.bool }).isRequired,
    busy: PropTypes.string,
    done: PropTypes.string,
    info: PropTypes.object,
    failed: PropTypes.bool,
    download: PropTypes.func.isRequired,
    share: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShareToolbar;
