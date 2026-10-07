import PropTypes from "prop-types";
import { useId } from "react";

/** Campo numérico con prefijo "$". Acepta las mismas props que un <input>. */
function MoneyField({ label, className = "", ...inputProps }) {
  const id = useId();
  return (
    <div className={`field ${className}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <div className="field__control">
        <span className="field__prefix" aria-hidden="true">$</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className="field__input field__input--money"
          {...inputProps}
        />
      </div>
    </div>
  );
}

MoneyField.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MoneyField;
