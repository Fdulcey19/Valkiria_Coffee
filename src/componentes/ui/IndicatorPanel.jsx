import PropTypes from "prop-types";
import colombia from "../../assets/images/Iconos/colombia.png";
import eeuu from "../../assets/images/Iconos/eeuu.png";
import MarketCard from "./MarketCard";
import MarketStatus from "./MarketStatus";
import { coffeeTrend, dollarTrend } from "./marketData";

/** Columna de indicadores en vivo, compartida por Valkiria y Nuevo Futuro. */
function IndicatorPanel({ data }) {
  const { libra, dolar, lastCoffe, indicador, indicadorDolar } = data;
  return (
    <section className="indicators" aria-label="Indicadores de mercado">
      <MarketCard
        accent
        title="Precio libra"
        value={`$ ${libra.toLocaleString()}`}
        flag={colombia}
        flagAlt="Colombia"
        note="Pesos colombianos por libra"
      />

      <MarketCard
        title="Precio USD"
        value={`$ ${dolar}`}
        flag={eeuu}
        flagAlt="Estados Unidos"
        trend={{
          state: dollarTrend(indicadorDolar.resultStateDollar),
          text: `${indicadorDolar.dollarPriceChange} ${indicadorDolar.dollarPricePorChange}`,
        }}
        note="Información en tiempo real. Valores en COP."
        href="https://es.investing.com/currencies/usd-cop"
      />

      <MarketCard
        title="Café EE.UU."
        value={`$ ${lastCoffe}`}
        flag={eeuu}
        flagAlt="Estados Unidos"
        trend={{
          state: coffeeTrend(indicador.resultState),
          text: `${indicador.cambioValorVar} ${indicador.cambioValorPorcentaje}`,
        }}
        note="Datos derivados en tiempo real."
        href="https://es.investing.com/commodities/us-coffee-c"
      >
        <MarketStatus open={indicador.clock === "positivo"} />
      </MarketCard>
    </section>
  );
}

IndicatorPanel.propTypes = {
  data: PropTypes.shape({
    libra: PropTypes.number.isRequired,
    dolar: PropTypes.number.isRequired,
    lastCoffe: PropTypes.number.isRequired,
    indicador: PropTypes.object.isRequired,
    indicadorDolar: PropTypes.object.isRequired,
  }).isRequired,
};

export default IndicatorPanel;
