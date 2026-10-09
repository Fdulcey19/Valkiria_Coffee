import PropTypes from "prop-types";
import { forwardRef, useId } from "react";

/**
 * Campo de formulario de configuración (monto en pesos) con etiqueta y error accesibles.
 * Reenvía la `ref` al <input>: react-hook-form (`register`) la necesita para leer y enfocar el campo.
 */
const ConfigField = forwardRef(function ConfigField({ label, error, ...inputProps }, ref) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="field">
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
          className="field__input field__input--money text-[17px]"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          {...inputProps}
          ref={ref}
        />
      </div>
      {error && (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

ConfigField.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default ConfigField;
