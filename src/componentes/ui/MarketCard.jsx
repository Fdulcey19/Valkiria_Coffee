import PropTypes from "prop-types";
import Trend from "./Trend";
import watermark from "../../assets/images/valkiria8.png";

/** Tarjeta de un indicador de mercado (USD, café, libra…). */
function MarketCard({ title, value, flag, flagAlt, trend, accent, note, href, aside, mark, children }) {
  return (
    <article className={`market-card ${accent ? "market-card--accent" : ""}`}>
      {mark && <img className="market-card__mark" src={watermark} alt="" aria-hidden="true" />}
      <div className="market-card__head">
        <h3 className="market-card__title">{title}</h3>
        {flag && <img className="market-card__flag" src={flag} alt={flagAlt || ""} width="28" height="28" />}
      </div>
      <p className="market-card__value">{value}</p>
      {trend && <Trend state={trend.state}>{trend.text}</Trend>}
      {children}
      {note && <p className="market-card__note">{note}</p>}
      {(href || aside) && (
        <div className="market-card__foot">
          {href && (
            <a className="market-card__link" href={href} target="_blank" rel="noreferrer">
              Ver más <i className="bx bx-link-external" aria-hidden="true"></i>
            </a>
          )}
          {aside}
        </div>
      )}
    </article>
  );
}

MarketCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  flag: PropTypes.string,
  flagAlt: PropTypes.string,
  trend: PropTypes.shape({ state: PropTypes.string, text: PropTypes.node }),
  accent: PropTypes.bool,
  note: PropTypes.node,
  href: PropTypes.string,
  aside: PropTypes.node,
  mark: PropTypes.bool,
  children: PropTypes.node,
};

export default MarketCard;
