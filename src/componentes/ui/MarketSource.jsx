import PropTypes from "prop-types";

const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleString("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })
    : null;

/** Nombre visible del origen: la fuente principal por su nombre; un respaldo solo como "API" (sin decir cuál). */
const label = (info) => (info.tipo === "api" ? "API" : info.tipo === "simulado" ? "Simulado" : info.fuente);

/** Origen de un dato en una sola línea compacta: fuente · diferido · hora de la cotización. */
function MarketSource({ info }) {
  if (!info) return null;
  const quoted = fmt(info.cotizadoEn);
  // Una sola frase para cualquier dato que no sea la fuente principal al día: respaldo y/o desactualizado.
  const warnings = [info.tipo === "api" && "Dato de API", info.desactualizado && "Desactualizado"].filter(Boolean);
  return (
    <p className="market-source">
      <strong>{label(info)}</strong>
      {info.diferido && <span>· Diferido</span>}
      {quoted && <span>· {quoted}</span>}
      {warnings.length > 0 && (
        <span className="market-source__note" role="note">
          {warnings.join(" · ")}: verifica el precio en «Ver más».
        </span>
      )}
    </p>
  );
}

MarketSource.propTypes = {
  info: PropTypes.shape({
    fuente: PropTypes.string,
    tipo: PropTypes.string,
    cotizadoEn: PropTypes.string,
    diferido: PropTypes.bool,
    desactualizado: PropTypes.bool,
  }),
};

export default MarketSource;
