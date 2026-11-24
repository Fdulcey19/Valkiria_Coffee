import PropTypes from "prop-types";

const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleString("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })
    : null;

const fmtTime = (iso) => (iso ? new Date(iso).toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" }) : null);

// ICE publishes free coffee futures quotes with a 10-minute delay.
const DELAY_MINUTES = { CNBC: 10 };

/** Nombre visible del origen: la fuente principal por su nombre; un respaldo solo como "API" (sin decir cuál). */
const label = (info) => (info.tipo === "api" ? "API" : info.tipo === "simulado" ? "Simulado" : info.fuente);

/**
 * Origen de un dato en una sola línea compacta: fuente · hora de la consulta · diferido.
 * La hora del precio en la fuente queda en el tooltip para no confundirla con la hora de la consulta.
 */
function MarketSource({ info, consultadoEn }) {
  if (!info) return null;
  const quoted = fmt(info.cotizadoEn);
  const fetched = fmtTime(consultadoEn);
  const delay = DELAY_MINUTES[info.fuente];
  // Una sola frase para cualquier dato que no sea la fuente principal al día: respaldo y/o desactualizado.
  const warnings = [info.tipo === "api" && "Dato de API", info.desactualizado && "Desactualizado"].filter(Boolean);
  return (
    <p className="market-source" title={quoted ? `Hora del precio en la fuente: ${quoted}` : undefined}>
      <strong>{label(info)}</strong>
      {fetched ? <span>· Consultado {fetched}</span> : quoted && <span>· {quoted}</span>}
      {info.diferido && <span>· Precio diferido{delay ? ` ${delay} min` : ""}</span>}
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
  consultadoEn: PropTypes.string,
};

export default MarketSource;
