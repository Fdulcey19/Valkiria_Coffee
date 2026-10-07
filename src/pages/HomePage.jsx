import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logo from "../assets/images/valkiria3.png";
import mark from "../assets/images/valkiria5.png";
import LegalLinks from "../componentes/ui/LegalLinks";
import Sponsors from "../componentes/ui/Sponsors";

const FEATURES = [
  {
    icon: "bx-line-chart",
    title: "Mercado en vivo",
    text: "Café de EE.UU. y dólar en tiempo real para fijar el precio del día con respaldo.",
  },
  {
    icon: "bx-calculator",
    title: "Precios por lote",
    text: "Origen, taza, micro y mediano lote, además de factores 92 y +88 calculados al instante.",
  },
  {
    icon: "bx-share-alt",
    title: "Ofertas para compartir",
    text: "Genera la oferta de compra como imagen lista para enviar por WhatsApp.",
  },
];

// Entrada escalonada de los bloques del hero (misma animación "rise" de style.css)
// (las clases van completas para que Tailwind las detecte)
const RISE = [
  "animate-[rise_0.5s_var(--ease)_both]",
  "animate-[rise_0.5s_var(--ease)_both] [animation-delay:0.06s]",
  "animate-[rise_0.5s_var(--ease)_both] [animation-delay:0.12s]",
  "animate-[rise_0.5s_var(--ease)_both] [animation-delay:0.18s]",
  "animate-[rise_0.5s_var(--ease)_both] [animation-delay:0.24s]",
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const entryLabel = isAuthenticated ? "Ir al panel" : "Ingresar";
  const entryTo = isAuthenticated ? "/dash" : "/login";

  return (
    <div className="bg-espresso-900 text-on-dark">
      <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-[radial-gradient(900px_500px_at_85%_10%,rgba(130,132,142,0.28),transparent_60%),radial-gradient(700px_500px_at_0%_100%,rgba(88,89,98,0.45),transparent_60%),linear-gradient(160deg,var(--espresso-900),var(--espresso-950))]">
        <img
          className="pointer-events-none absolute right-[-8%] top-1/2 -z-10 w-[min(760px,90vw)] -translate-y-[46%] opacity-[0.07] animate-[drift_16s_ease-in-out_infinite]"
          src={mark}
          alt=""
          aria-hidden="true"
        />

        <nav
          className="mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-gutter py-5"
          aria-label="Principal"
        >
          <Link to="/" aria-label="Valkiria, inicio">
            <img
              className="h-[34px] w-auto opacity-95 brightness-0 invert"
              src={logo}
              alt="Valkiria"
              width="126"
              height="34"
            />
          </Link>
          <div className="flex items-center gap-1.5">
            <a
              className="hidden rounded-full px-3.5 py-2.5 font-medium text-on-dark-soft transition-colors duration-150 hover:bg-on-dark/10 hover:text-on-dark min-[480px]:inline-flex"
              href="https://www.instagram.com/viper_venomcoffe/"
              target="_blank"
              rel="noreferrer"
            >
              Contacto
            </a>
            <Link to={entryTo} className="btn btn--primary btn--sm">
              {entryLabel}
            </Link>
          </div>
        </nav>

        <div className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-gutter pb-14 pt-[clamp(32px,8vh,96px)]">
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(229,230,232,0.4)] px-3.5 py-[7px] text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-gold ${RISE[0]}`}
          >
            <i className="bx bx-coffee" aria-hidden="true"></i> Para empresas cafeteras
          </span>
          <h1
            className={`mt-[22px] max-w-[14ch] font-display text-[clamp(2.5rem,8vw,4rem)]  font-semibold leading-[1.03] tracking-[-0.02em] [text-wrap:balance] ${RISE[1]}`}
          >
            Soluciones informáticas que <em className="not-italic text-gold">funcionan</em> para su empresa cafetera
          </h1>
          <p
            className={`mt-[22px] max-w-[46ch] text-[clamp(1.05rem,2.4vw,1.25rem)] text-on-dark-soft ${RISE[2]}`}
          >
            Controle sus precios de compra, siga el mercado en tiempo real y comparta ofertas claras con sus
            caficultores.
          </p>
          <div className={`mt-[34px] flex flex-wrap gap-3 ${RISE[3]}`}>
            <Link to={entryTo} className="btn btn--primary btn--lg">
              {isAuthenticated ? "Ir al panel" : "Ingresar a Valkiria"}{" "}
              <i className="bx bx-right-arrow-alt" aria-hidden="true"></i>
            </Link>
            <a
              className="btn btn--ghost-light btn--lg"
              href="https://www.instagram.com/viper_venomcoffe/"
              target="_blank"
              rel="noreferrer"
            >
              Contáctenos
            </a>
          </div>

          <ul
            className={`mt-[clamp(40px,8vh,80px)] grid gap-3.5 min-[640px]:grid-cols-3 ${RISE[4]}`}
          >
            {FEATURES.map(({ icon, title, text }) => (
              <li
                className="rounded-[var(--radius)] border border-on-dark/10 bg-on-dark/5 p-[22px] transition duration-300 hover:-translate-y-[3px] hover:border-[rgba(229,230,232,0.45)] hover:bg-on-dark/10"
                key={title}
              >
                <i
                  className={`bx ${icon} mb-3.5 grid size-11 place-items-center rounded-xl bg-[rgba(229,230,232,0.16)] text-2xl text-gold`}
                  aria-hidden="true"
                ></i>
                <h2 className="font-display text-[1.2rem] font-semibold">{title}</h2>
                <p className="mt-1.5 text-[0.95rem] text-on-dark-soft">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section
        className="border-t-[3px] border-gold bg-white py-[clamp(40px,7vw,72px)] text-ink [&_.sponsors__title]:px-gutter [&_.sponsors__title]:text-accent"
        aria-label="Aliados"
      >
        <Sponsors variant="marquee" title="Con el respaldo de nuestros aliados" />
      </section>

      <footer className="grid justify-items-center gap-2.5 border-t border-on-dark/10 px-gutter py-[22px] text-center text-sm text-on-dark-soft [&_.legal-links_a:hover]:text-on-dark [&_.legal-links_a]:text-on-dark-soft [&_p_a:hover]:underline [&_p_a]:font-semibold [&_p_a]:text-gold">
        <LegalLinks />
        <p>
          Valkiria &copy; {new Date().getFullYear()}. Todos los derechos reservados por{" "}
          <a href="https://www.instagram.com/felipe_dullcey/" target="_blank" rel="noreferrer">
            Felipe Dulcey
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
