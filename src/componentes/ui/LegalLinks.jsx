import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { returnStateFor } from "../../lib/returnTo";

/**
 * Enlaces a los documentos legales (landing, login, recuperación).
 * Con `replace`, pasar de un documento a otro no apila entradas en el historial.
 */
function LegalLinks({ className = "", replace = false }) {
  const location = useLocation();
  // Cada enlace recuerda de qué página viene, para que "Volver" regrese allí.
  const state = returnStateFor(location);
  return (
    <nav className={`legal-links ${className}`} aria-label="Información legal">
      <Link to="/terminos" replace={replace} state={state}>Términos y condiciones</Link>
      <Link to="/privacidad" replace={replace} state={state}>Política de privacidad</Link>
    </nav>
  );
}

LegalLinks.propTypes = { className: PropTypes.string, replace: PropTypes.bool };

export default LegalLinks;
