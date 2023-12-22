import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import colombia from "../assets/images/Iconos/colombia.png";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo.png";
import {
  getPosts,
  getPrecioMercadoNuevo,
  getPrecioOrganico,
  getPrecioTaza,
  getPrecioEstandar,
  getPrecioCombencional,
  getPrecioOrganico88,
  getPrecioEstandar88,
} from "../domain/services";

function NuevoFuturo() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [valorPuntoDiferencia, setValorPuntoDiferencia] = useState(2000);
  const [valorPrecioMercado, setValorPrecioMercado] = useState(144000);
  const [valorFactorOrganico, setValorFactorOrganico] = useState(10000);
  const [valorFactorOrganico92, setValorFactorOrganico92] = useState(152000);
  const [valorFactorOrganicoBonificacion, setValorFactorOrganicoBonificacion] =
    useState(4000);
  const [valorFactorOrganico88, setValorFactorOrganico88] = useState(156000);
  const [valorFactorCombencional, setValorFactorCombencional] = useState(10000);
  const [valorFactorCombencional92, setValorFactorCombencional92] =
    useState(152000);
  const [
    valorFactorCombencionalBonificacion,
    setValorFactorCombencionalBonificacion,
  ] = useState(4000);
  const [valorFactorCombencional88, setValorFactorCombencional88] =
    useState(156000);
  const [valorFactorEstandar, setValorFactorEstandar] = useState(10000);
  const [valorFactorEstandar92, setValorFactorEstandar92] = useState(152000);
  const [valorFactorEstandarBonificacion, setValorFactorEstandarBonificacion] =
    useState(4000);
  const [valorFactorEstandar88, setValorFactorEstandar88] = useState(156000);

  const [valorFactorTazaN, setValorFactorTazaN] = useState(10000);
  const [valorFactorTazaN92, setValorFactorTazaN92] = useState(152000);
  const [valorFactorTazaNBonificacion, setValorFactorTazaNBonificacion] =
    useState(4000);
  const [valorFactorTazaN88, setValorFactorTazaN88] = useState(156000);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function LoadingSpinner() {
    return (
      <div>
        <div className="loader"></div>
        <p className="loader_text">Loading...</p>
      </div>
    );
  }

  useEffect(() => {
    fetchData();
    const intervalDataId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalDataId);
  }, [valorPuntoDiferencia]);

  const fetchData = async () => {
    try {
      const response = await getPosts();
      setData(response.data);

      const precioMercado = getPrecioMercadoNuevo(
        response,
        valorPuntoDiferencia
      );

      const precioOrganico = getPrecioOrganico(response, valorFactorOrganico);

      const precioOrganico88 =
        getPrecioOrganico88(response, valorFactorOrganicoBonificacion) +
        valorFactorOrganico;

      const precioCombencional = getPrecioCombencional(
        response,
        valorFactorCombencional
      );

      const precioCombencional88 =
        getPrecioCombencional(response, valorFactorCombencionalBonificacion) +
        valorFactorCombencional;

      const precioEstandar = getPrecioEstandar(response, valorFactorEstandar);

      const precioEstandar88 =
        getPrecioEstandar88(response, valorFactorEstandarBonificacion) +
        valorFactorEstandar;

      const precioTaza92 = getPrecioTaza(response, valorFactorTazaN);

      const precioTaza88 =
        getPrecioTaza(response, valorFactorTazaNBonificacion) +
        valorFactorTazaN;

      setValorPrecioMercado(precioMercado);
      setValorFactorOrganico92(precioOrganico);
      setValorFactorOrganico88(precioOrganico88);
      setValorFactorCombencional92(precioCombencional);
      setValorFactorCombencional88(precioCombencional88);
      setValorFactorEstandar92(precioEstandar);
      setValorFactorEstandar88(precioEstandar88);
      setValorFactorTazaN92(precioTaza92);
      setValorFactorTazaN88(precioTaza88);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReload = () => {
    // Recargar el componente
    fetchData();
    window.location.replace(window.location.pathname);
  };

  const formattedDateTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      (
        <div className="Reload d-flex flex-column align-content-center">
          <p>Error: {error.message}</p>
          <button
            className="btn btn-dark button"
            onClick={() => handleReload()}
          >
            <i className="bx bx-reset"></i> Reload Componente
          </button>
        </div>
      ),
      () => handleReload()
    );
  }

  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-9">
            <img className="fondo" src={logo} alt="" />
            <div className="precio-pergamino">
              <span className="text subtitulo">Precio Pergamino</span>
              <span className="text precio">{`$ ${data.arroba.toLocaleString()}`}</span>
              <span className="text hora">{formattedDateTime}</span>
              <button className="button-reload">
                Reload <i className="bx bx-reset"></i>
              </button>
            </div>
            <div className="precio-mercado mt-3 col-12 col-6">
              <div className="contenedores">
                <span className="text">Punto Diferencia</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorPuntoDiferencia.toLocaleString()}
                  onChange={(e) => setValorPuntoDiferencia(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Precio Mercado</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorPrecioMercado.toLocaleString()}
                  onChange={(e) => setValorPrecioMercado(e.target.value)}
                />
              </div>
            </div>
            {/* Organico */}
            <div className="precio-mercado primer-precio-factor contenedores-nuevo precio-factor mt-3 col-12 col-6">
              <div className="contenedores">
                <span className="text text-3">Organico</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorOrganico.toLocaleString()}
                  onChange={(e) => setValorFactorOrganico(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorOrganico92.toLocaleString()}
                  onChange={(e) => setValorFactorOrganico92(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorOrganicoBonificacion.toLocaleString()}
                  onChange={(e) =>
                    setValorFactorOrganicoBonificacion(e.target.value)
                  }
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorOrganico88.toLocaleString()}
                  onChange={(e) => setValorFactorOrganico88(e.target.value)}
                />
              </div>
            </div>

            {/*  */}
            {/* Combencional */}
            <div className="precio-mercado contenedores-nuevo precio-factor col-12 col-6">
              <div className="contenedores">
                <span className="text text-3">Combencional</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorCombencional.toLocaleString()}
                  onChange={(e) => setValorFactorCombencional(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorCombencional92.toLocaleString()}
                  onChange={(e) => setValorFactorCombencional92(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorCombencionalBonificacion.toLocaleString()}
                  onChange={(e) =>
                    setValorFactorCombencionalBonificacion(e.target.value)
                  }
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorCombencional88.toLocaleString()}
                  onChange={(e) => setValorFactorCombencional88(e.target.value)}
                />
              </div>
            </div>

            {/*  */}
            {/* Estandar */}
            <div className="precio-mercado contenedores-nuevo precio-factor col-12 col-6">
              <div className="contenedores">
                <span className="text text-3">Estandar</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorEstandar.toLocaleString()}
                  onChange={(e) => setValorFactorEstandar(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorEstandar92.toLocaleString()}
                  onChange={(e) => setValorFactorEstandar92(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorEstandarBonificacion.toLocaleString()}
                  onChange={(e) =>
                    setValorFactorEstandarBonificacion(e.target.value)
                  }
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorEstandar88.toLocaleString()}
                  onChange={(e) => setValorFactorEstandar88(e.target.value)}
                />
              </div>
            </div>

            {/*  */}
            {/* Taza */}
            <div className="precio-mercado contenedores-nuevo precio-factor col-12 col-6">
              <div className="contenedores">
                <span className="text text-3">Taza</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorTazaN.toLocaleString()}
                  onChange={(e) => setValorFactorTazaN(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorTazaN92.toLocaleString()}
                  onChange={(e) => setValorFactorTazaN92(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorTazaNBonificacion.toLocaleString()}
                  onChange={(e) =>
                    setValorFactorTazaNBonificacion(e.target.value)
                  }
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorFactorTazaN88.toLocaleString()}
                  onChange={(e) => setValorFactorTazaN88(e.target.value)}
                />
              </div>
            </div>
            {/* Boton Compartir */}
            <div className="precio-factor col-12 col-6">
              <div className="btn container-compartir col-12 col-md-6">
                <Link className="botton-compartir" to={"share"}>
                  Compartir <i className="bx bxs-share-alt"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="container-indicadores">
              <div className="indicador">
                <span className="text subtitulo">Precio Libra</span>
                <span className="text precio">
                  {Math.round(data.libra).toLocaleString()}
                </span>
                <span
                  className="text precio_indicador"
                  style={{
                    color: data.indicador.resultState > 0 ? "red" : "green",
                  }}
                >
                  <span className="flecha">
                    {data.indicador.resultState > 0 ? "↓" : "↑"}
                  </span>
                  {data.indicador.cambioValorVar}{" "}
                  {data.indicador.cambioValorPorcentaje}
                </span>
                <img className="img" src={colombia} alt="" />
                <span className="vermas">
                  <a
                    href="https://es.investing.com/commodities/us-coffee-c"
                    target="blank"
                  >
                    Ver Mas
                  </a>
                </span>
              </div>
              <div className="indicador">
                <span className="text subtitulo">Precio USD</span>
                <span className="text precio">{data.dolar}</span>
                <span
                  className="text precio_indicador"
                  style={{
                    color:
                      data.indicadorDolar.resultStateDollar > 0
                        ? "green"
                        : "red",
                  }}
                >
                  <span className="flecha">
                    {data.indicadorDolar.resultStateDollar > 0 ? "↑" : "↓"}
                  </span>
                  {data.indicadorDolar.dollarPriceChange}{" "}
                  {data.indicadorDolar.dollarPricePorChange}
                </span>
                <img className="img" src={eeuu} alt="" />
                <span className="vermas">
                  <a
                    href="https://es.investing.com/currencies/usd-cop"
                    target="blank"
                  >
                    Ver Mas
                  </a>
                </span>
              </div>
              <div className="indicador">
                <span className="text subtitulo clock">Café EE.UU. </span>
                <span className="text precio">{data.lastCoffe}</span>
                <span
                  className="text precio_indicador"
                  style={{
                    color: data.indicador.resultState > 0 ? "red" : "green",
                  }}
                >
                  <span className="flecha">
                    {data.indicador.resultState > 0 ? "↓" : "↑"}
                  </span>
                  {data.indicador.cambioValorVar}{" "}
                  {data.indicador.cambioValorPorcentaje}
                </span>
                <img className="img" src={eeuu} alt="" />
                <span
                  className={`clock ${
                    data.indicador.clock === "positivo"
                      ? "texto-verde"
                      : "texto-rojo"
                  }`}
                >
                  {data.indicador.clock === "positivo"
                    ? "🕑 Mercado Abierto"
                    : "⏰ Mercado Cerrado"}
                </span>
                <span className="vermas">
                  <a
                    href="https://es.investing.com/commodities/us-coffee-c"
                    target="blank"
                  >
                    Ver Mas
                  </a>
                </span>
              </div>
              <button className="button-reload">
                Reload <i className="bx bx-reset"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoFuturo;
