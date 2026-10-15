import PropTypes from "prop-types";
import eeuu from "../../assets/images/Iconos/eeuu.png";
import MarketCard from "./MarketCard";
import MarketStatus from "./MarketStatus";
import { coffeeTrend, dollarTrend } from "./marketData";

/** Indicadores compactos (USD y café) para los afiches de compartir. */
function PosterMarket({ className = "", dolar, dolarchange, dolarPorChange, dolarstate, dolarClock, lastCoffe, coffechange, coffePorChange, coffestate, coffeClock }) {
  return (
    <div className={`poster__market ${className}`}>
      <MarketCard
        mark
        title="Precio USD"
        value={`$ ${dolar}`}
        flag={eeuu}
        flagAlt="Estados Unidos"
        trend={{ state: dollarTrend(dolarstate), text: `${dolarchange} ${dolarPorChange}` }}
        note="Información en tiempo real. Valores en COP."
      >
        <MarketStatus open={dolarClock === "positivo"} />
      </MarketCard>
      <MarketCard
        mark
        title="Café EE.UU."
        value={`$ ${lastCoffe}`}
        flag={eeuu}
        flagAlt="Estados Unidos"
        trend={{ state: coffeeTrend(coffestate), text: `${coffechange} ${coffePorChange}` }}
        note="Datos derivados en tiempo real."
      >
        <MarketStatus open={coffeClock === "positivo"} />
      </MarketCard>
    </div>
  );
}

PosterMarket.propTypes = {
  className: PropTypes.string,
  dolar: PropTypes.number,
  dolarchange: PropTypes.string,
  dolarPorChange: PropTypes.string,
  dolarstate: PropTypes.string,
  dolarClock: PropTypes.string,
  lastCoffe: PropTypes.number,
  coffechange: PropTypes.string,
  coffePorChange: PropTypes.string,
  coffestate: PropTypes.string,
  coffeClock: PropTypes.string,
};

export default PosterMarket;
