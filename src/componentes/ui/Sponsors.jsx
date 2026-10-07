import PropTypes from "prop-types";
import { SPONSORS } from "../../config/sponsors";

/**
 * Franja de aliados. Cada logo va sobre una tarjeta clara para que se lea bien
 * tanto en fondos oscuros (landing, login) como claros.
 */
/** Cuántas veces se repite el grupo de logos en cada mitad del carrusel (debe cubrir el ancho de pantalla). */
const MARQUEE_COPIES = 4;

/**
 * Carrusel infinito de logos (solo CSS: una pista con dos mitades idénticas que se
 * desplaza exactamente media pista y vuelve a empezar, sin saltos). Las copias son
 * decorativas: se ocultan a lectores de pantalla y al teclado. Se pausa al pasar el
 * mouse y se vuelve una fila estática si el usuario prefiere menos movimiento.
 */
function SponsorsMarquee({ title, className }) {
  const copies = Array.from({ length: MARQUEE_COPIES * 2 }, (_, i) => i);
  return (
    <section className={`sponsors sponsors--marquee ${className}`} aria-label={title}>
      <h2 className="sponsors__title">{title}</h2>
      <div className="marquee">
        <ul className="marquee__track">
          {copies.map((copy) =>
            SPONSORS.map(({ name, logo, width, height, href }) => {
              const duplicate = copy > 0;
              const image = (
                <img src={logo} alt={duplicate ? "" : name} width={width} height={height} decoding="async" draggable="false" />
              );
              return (
                <li className="marquee__item" key={`${copy}-${name}`} aria-hidden={duplicate || undefined} title={name}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      tabIndex={duplicate ? -1 : undefined}
                      aria-label={duplicate ? undefined : `${name} (se abre en una pestaña nueva)`}
                    >
                      {image}
                    </a>
                  ) : (
                    image
                  )}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </section>
  );
}

SponsorsMarquee.propTypes = { title: PropTypes.string.isRequired, className: PropTypes.string };

function Sponsors({ title = "Con el respaldo de", tone = "light", variant = "chips", className = "" }) {
  if (variant === "marquee") return <SponsorsMarquee title={title} className={className} />;

  return (
    <section className={`sponsors sponsors--${tone} ${className}`} aria-label={title}>
      <h2 className="sponsors__title">{title}</h2>
      <ul className="sponsors__list">
        {SPONSORS.map(({ name, logo, width, height, href }) => {
          const image = (
            <img src={logo} alt={name} width={width} height={height} loading="lazy" decoding="async" />
          );
          return (
            <li className="sponsor" key={name} title={name}>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer noopener" aria-label={`${name} (se abre en una pestaña nueva)`}>
                  {image}
                </a>
              ) : (
                image
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

Sponsors.propTypes = {
  title: PropTypes.string,
  tone: PropTypes.oneOf(["light", "dark"]),
  variant: PropTypes.oneOf(["chips", "marquee"]),
  className: PropTypes.string,
};

export default Sponsors;
