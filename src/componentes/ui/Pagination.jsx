import PropTypes from "prop-types";

/** Controles de paginación: resumen "X–Y de N", anterior/siguiente y tamaño de página. */
function Pagination({ page, limit, total, totalPages, onPage, onLimit, disabled }) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <nav className="pagination" aria-label="Paginación">
      <p className="pagination__summary" aria-live="polite">
        {total === 0 ? "Sin resultados" : <>Mostrando <b>{from}–{to}</b> de <b>{total}</b></>}
      </p>

      <div className="pagination__controls">
        <label className="pagination__size">
          <span className="sr-only">Usuarios por página</span>
          <select className="field__input" value={limit} onChange={(e) => onLimit(Number(e.target.value))} disabled={disabled}>
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>{n} por página</option>
            ))}
          </select>
        </label>

        <button type="button" className="btn btn--ghost btn--sm" onClick={() => onPage(page - 1)} disabled={disabled || page <= 1}>
          <i className="bx bx-chevron-left" aria-hidden="true"></i> Anterior
        </button>
        <span className="pagination__page">{page} / {totalPages}</span>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => onPage(page + 1)} disabled={disabled || page >= totalPages}>
          Siguiente <i className="bx bx-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired,
  onLimit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Pagination;
