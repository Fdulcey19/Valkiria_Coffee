/**
 * Estructura común de las pantallas de acceso (login, recuperar contraseña):
 * panel de marca a la izquierda (escritorio) y tarjeta con el formulario a la derecha.
 * En móvil el panel de marca se reduce a la barra con el logo.
 */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logoLight from "../../assets/images/valkiria3.png";
import mark from "../../assets/images/valkiria5.png";
import LegalLinks from "../ui/LegalLinks";
import Sponsors from "../ui/Sponsors";

function AuthShell({ title, text, children }) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr] bg-paper min-[992px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] min-[992px]:grid-rows-none">
      <aside className="relative isolate flex flex-col justify-between gap-6 overflow-hidden bg-[radial-gradient(520px_320px_at_100%_0%,rgba(130,132,142,0.32),transparent_65%),linear-gradient(160deg,var(--espresso-900),var(--espresso-950))] px-gutter py-[22px] text-on-dark md:py-6 min-[992px]:px-12 min-[992px]:py-10">
        <img
          className="pointer-events-none absolute -bottom-[50px] -right-[60px] -z-10 w-[360px] opacity-[0.07] min-[992px]:-bottom-[70px] min-[992px]:-right-20 min-[992px]:w-[520px]"
          src={mark}
          alt=""
          aria-hidden="true"
        />
        <Link to="/" aria-label="Volver al inicio">
          <img className="h-[30px] w-auto brightness-0 invert md:h-9 min-[992px]:h-10" src={logoLight} alt="Valkiria" width="150" height="40" />
        </Link>

        <div className="hidden min-[992px]:block">
          <h2 className="max-w-[15ch] font-display text-[clamp(2.25rem,3.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.015em] [&_em]:not-italic [&_em]:text-gold">
            {title}
          </h2>
          <p className="mt-4 max-w-[40ch] text-[1.05rem] text-on-dark-soft">{text}</p>
        </div>

        <div className="hidden gap-[22px] min-[992px]:grid">
          <Sponsors tone="dark" />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-on-dark-soft [&_.legal-links]:justify-start [&_.legal-links_a:hover]:text-on-dark [&_.legal-links_a]:text-on-dark-soft [&_a:hover]:text-on-dark [&_a:hover]:underline">
            <LegalLinks />
            <a href="https://www.instagram.com/viper_venomcoffe/" target="_blank" rel="noreferrer">Contáctanos</a>
            <span>Versión 1.0</span>
          </div>
        </div>
      </aside>

      <main className="grid grid-rows-[1fr_auto_1fr] justify-items-center px-gutter py-6">
        <span aria-hidden="true" />
        {children}
        {/* En móvil y tablet el panel de marca no se muestra: aliados y enlaces legales van aquí,
            debajo de la tarjeta, sin quitarle el centrado vertical. */}
        <div className="grid w-full max-w-[440px] content-start justify-items-center gap-3 pt-5 md:max-w-[480px] min-[992px]:hidden [&_.sponsor]:h-[58px] [&_.sponsor]:w-[88px] [&_.sponsor]:p-1.5 [&_.sponsor_img]:max-h-[44px] [&_.sponsor_img]:max-w-[72px] [&_.sponsor_img]:object-contain [&_.sponsors__list]:gap-2 [&_.sponsors]:gap-2">
          <Sponsors tone="light" />
          <LegalLinks />
        </div>
      </main>
    </div>
  );
}

AuthShell.propTypes = {
  title: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthShell;
