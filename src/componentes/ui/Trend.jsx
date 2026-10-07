import PropTypes from "prop-types";

const ICONS = {
  up: "M12 5l7 8h-4.5v6h-5v-6H5z",
  down: "M12 19l-7-8h4.5V5h5v6H19z",
  flat: "M5 10h14v4H5z",
};

const SR_LABEL = { up: "Sube", down: "Baja", flat: "Sin cambio" };

/** Indicador de variación: flecha SVG + valor. state: "up" | "down" | "flat" */
function Trend({ state, children }) {
  return (
    <span className={`trend trend--${state}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={ICONS[state]} />
      </svg>
      <span className="sr-only">{SR_LABEL[state]}: </span>
      {children}
    </span>
  );
}

Trend.propTypes = {
  state: PropTypes.oneOf(["up", "down", "flat"]).isRequired,
  children: PropTypes.node,
};

export default Trend;
