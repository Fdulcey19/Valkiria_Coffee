import PropTypes from "prop-types";
import colombia from "../../assets/images/Iconos/colombia.png";
import eeuu from "../../assets/images/Iconos/eeuu.png";
import MarketCard from "./MarketCard";
import MarketStatus from "./MarketStatus";
import MarketSource from "./MarketSource";
import { coffeeTrend, dollarTrend } from "./marketData";

/** Columna de indicadores en vivo, compartida por Valkiria y Nuevo Futuro. */
function IndicatorPanel({ data }) {
  const { libra, dolar, lastCoffe, indicador, indicadorDolar, meta } = data;
  return (
    <section className="indicators" aria-label="Indicadores de mercado">
      <MarketCard
        accent
        title="Precio libra"
        value={`$ ${libra.toLocaleString()}`}
        flag={colombia}
        flagAlt="Colombia"
        note={
          meta?.consultadoEn
            ? `Pesos colombianos por libra · consultado ${new Date(meta.consultadoEn).toLocaleString("es-CO", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}`
            : "Pesos colombianos por libra"
        }
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
        note="Valores en COP."
        href="https://es.investing.com/currencies/usd-cop"
        aside={<MarketSource info={meta?.dolar} />}
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
        note="Centavos de USD por libra."
        href="https://es.investing.com/commodities/us-coffee-c"
        aside={<MarketSource info={meta?.cafe} />}
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
    meta: PropTypes.object,
  }).isRequired,
};

export default IndicatorPanel;
