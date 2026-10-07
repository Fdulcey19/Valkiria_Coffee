import PropTypes from "prop-types";
import { useEffect, useState } from "react";

/** Reloj aislado: solo este componente se re-renderiza cada segundo. */
function Clock({ withDate = false }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const options = withDate
    ? { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }
    : { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  return <time dateTime={now.toISOString()}>{now.toLocaleString("es-CO", options)}</time>;
}

Clock.propTypes = { withDate: PropTypes.bool };

export default Clock;
