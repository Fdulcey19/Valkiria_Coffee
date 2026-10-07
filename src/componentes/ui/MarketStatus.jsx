import PropTypes from "prop-types";

function MarketStatus({ open }) {
  return (
    <span className={`pill ${open ? "pill--open" : "pill--closed"}`}>
      {open ? "Mercado abierto" : "Mercado cerrado"}
    </span>
  );
}

MarketStatus.propTypes = { open: PropTypes.bool.isRequired };

export default MarketStatus;
