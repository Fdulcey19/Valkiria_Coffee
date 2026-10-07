import PropTypes from "prop-types";

/** Valor calculado (solo lectura). */
function ResultField({ label, value }) {
  return (
    <div className="result">
      <span className="field__label">{label}</span>
      <output key={String(value)} className="result__value">{value}</output>
    </div>
  );
}

ResultField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
};

export default ResultField;
