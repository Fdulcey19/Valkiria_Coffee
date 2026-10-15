/**
 * Afiche "Oferta de compra para pergamino" (se descarga como imagen).
 * Estructura: encabezado (logo + título) · una tarjeta por lote con su precio y sus
 * condiciones (kilos, factor, taza, humedad) · indicadores del mercado · términos.
 */
import { Navigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo4.png";
import mark from "../assets/images/valkiria8.png";
import usePosterImage from "../hooks/usePosterImage";
import PosterMarket from "../componentes/ui/PosterMarket";
import ShareToolbar from "../componentes/ui/ShareToolbar";

// Condiciones de compra de cada tipo de lote. `strict` marca el lote con la etiqueta "Estricta".
const LOTES = [
  {
    nombre: "Origen",
    precio: "origenSumado",
    specs: [["Kilos", "≥ 250"], ["Factor", "93"], ["Taza", "80 - 83,75"], ["Humedad", "10 - 12,5"]],
  },
  {
    nombre: "Especial",
    precio: "tazaSumado",
    specs: [["Kilos", "≥ 125"], ["Factor", "91"], ["Taza", "81 - 84,75"], ["Humedad", "10 - 12"]],
  },
  {
    nombre: "Microlote",
    precio: "micLoteSumado",
    strict: true,
    specs: [["Kilos", "≥ 125"], ["Factor", "90"], ["Taza", "85 - 85,75"], ["Humedad", "10 - 11,5"]],
  },
  {
    nombre: "Med. Lote",
    precio: "medLoteSumado",
    strict: true,
    specs: [["Kilos", "≥ 500"], ["Factor", "93"], ["Taza", "Limpia"], ["Humedad", "10 - 12,5"]],
  },
];

const today = () =>
  new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });

function ValkiriaShare() {
  const { state } = useLocation();
  const poster = usePosterImage("Oferta-Valkiria");

  // Si se entra directo a la URL (sin datos calculados), volvemos al panel.
  if (!state) return <Navigate to="/dash" replace />;

  return (
    <div className="page">
      <ShareToolbar backTo="/dash" poster={poster} />

      <div className="poster poster--valkiria" ref={poster.ref}>
        <header className="poster__head poster__head--split">
          <img className="poster__logo" src={logo} alt="Valkiria" width="66" height="44" />
          <div className="poster__head-text">
            <h1 className="poster__title">Oferta de compra para pergamino</h1>
            <p className="poster__date">{today()}</p>
          </div>
        </header>

        <div className="lotes">
          <div className="poster__watermark" aria-hidden="true">
            <img src={logo} alt="" />
          </div>
          {LOTES.map(({ nombre, precio, specs, strict }) => (
            <section className="lote" key={nombre} aria-label={nombre}>
              <img className="lote__mark" src={mark} alt="" aria-hidden="true" />
              <div className="lote__price">
                <span className="lote__name">
                  {nombre}
                  {strict && <em className="lote__strict">Estricta</em>}
                </span>
                <span className="lote__value">{`$ ${Math.round(state[precio]).toLocaleString()}`}</span>
              </div>
              <dl className="lote__specs">
                {specs.map(([label, value]) => (
                  <div className="lote__spec" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <PosterMarket {...state} className="poster__market--row" />

        <div className="poster__terms">
          <strong>
            SE RECOMIENDA TENER EN CUENTA LAS CARACTERÍSTICAS Y CONDICIONES DE CADA LOTE ANTES DE ENTREGARLO.
          </strong>{" "}
          Comuníquese con los encargados de bodega antes de entregar su café.
          <ul>
            <li>Las ofertas tienen un vencimiento de 4 días hábiles.</li>
            <li>Los lotes mayores a 250 kilos pueden tener un retraso en la cancelación de 12 a 36 horas.</li>
            <li>LOS ANUNCIOS DEBERÁN SER CONFIRMADOS.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ValkiriaShare;
