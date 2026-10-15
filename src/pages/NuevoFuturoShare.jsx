/**
 * Afiche "Precios Extras · Nuevo Futuro" (se descarga como imagen).
 * Estructura: encabezado (logo + título) · cuadrícula 2×2 de grupos con sus cajas
 * Factor 92 / +88 · indicadores del mercado · términos con la insignia de Nuevo Futuro.
 */
import { Navigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo4.png";
import mark from "../assets/images/valkiria8.png";
import badge from "../assets/images/nuevo.png";
import usePosterImage from "../hooks/usePosterImage";
import PosterMarket from "../componentes/ui/PosterMarket";
import ShareToolbar from "../componentes/ui/ShareToolbar";

// Orden de lectura de la cuadrícula 2×2. `tone` mantiene el código de color original
// (convencional azul, orgánico verde, el resto neutro).
const GRUPOS = [
  { nombre: "Estándar", key: "estandar", tone: "plain" },
  { nombre: "Convencional", key: "convencional", tone: "blue" },
  { nombre: "Orgánico", key: "organico", tone: "green" },
  { nombre: "Taza", key: "taza", tone: "plain" },
];

const money = (n) => `$ ${Math.round(n).toLocaleString()}`;

const today = () =>
  new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });

function NuevoFuturoShare() {
  const { state } = useLocation();
  const poster = usePosterImage("Precios-Nuevo-Futuro");

  if (!state) return <Navigate to="/dash/nuevo" replace />;

  return (
    <div className="page">
      <ShareToolbar backTo="/dash/nuevo" poster={poster} />

      <div className="poster poster--nuevo" ref={poster.ref}>
        <header className="poster__head poster__head--split">
          <img className="poster__logo" src={logo} alt="Valkiria" width="66" height="44" />
          <div className="poster__head-text">
            <h1 className="poster__title">Precios extras · Nuevo Futuro</h1>
            <p className="poster__date">{today()}</p>
          </div>
        </header>

        <div className="poster-groups">
          <div className="poster__watermark" aria-hidden="true">
            <img src={logo} alt="" />
          </div>
          {GRUPOS.map(({ nombre, key, tone }) => (
            <section className="poster-group" key={key} aria-label={nombre}>
              <img className="poster-group__mark" src={mark} alt="" aria-hidden="true" />
              <h2 className="poster-group__name">{nombre}</h2>
              <div className="poster-group__tiles">
                {[["Factor 92", `${key}92`], ["Factor +88", `${key}88`]].map(([label, field]) => (
                  <div className={`tile tile--${tone}`} key={field}>
                    <span className="tile__label">{label}</span>
                    <span className="tile__price">{money(state[field])}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <PosterMarket {...state} className="poster__market--row" />

        <div className="poster__terms poster__terms--badge">
          <img className="poster__badge" src={badge} alt="Nuevo Futuro" width="97" height="111" />
          <p>
            Se recomienda comunicarse con los encargados de bodega antes de entregar su café. Las ofertas tienen un
            vencimiento de 4 días hábiles. Los lotes mayores a 250 kilos pueden tener un retraso en la cancelación de
            12 a 36 horas. LOS ANUNCIOS DEBERÁN SER CONFIRMADOS. Los cafés convencionales y estándar se reciben de
            8:30 de la mañana a 5:30 de la tarde; los orgánicos solamente mientras el precio del día esté vigente en
            la tabla de la Federación Nacional de Cafeteros. Los lotes deben cumplir mínimamente tazas limpias (sin
            defectos) con humedades del 10,00 - 12,00 %.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NuevoFuturoShare;
