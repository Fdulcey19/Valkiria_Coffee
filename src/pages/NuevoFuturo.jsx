import { useEffect, useState } from "react";
import {
  getPosts,
  getPrecioMercadoNuevo,
  getPrecioOrganico,
  getPrecioTaza,
  getPrecioEstandar,
  getPrecioConvencional,
  getPrecioOrganico88,
  getPrecioEstandar88,
  getPrecioConvencional88,
  getPrecioTaza88,
} from "../domain/services";
import { usePrecios } from "../context/PreciosContex";

import colombia from "../assets/images/Iconos/colombia.png";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function NuevoFuturo() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [valorPrecioMercado, setValorPrecioMercado] = useState(0);
  const [valorFactorOrganico92, setValorFactorOrganico92] = useState(0);
    useState(0);
  const [valorFactorOrganico88, setValorFactorOrganico88] = useState(0);
  const [valorFactorConvencional92, setValorFactorConvencional92] = useState(0);
  const [valorFactorConvencional88, setValorFactorConvencional88] = useState(0);
  const [valorFactorEstandar92, setValorFactorEstandar92] = useState(0);
  const [valorFactorEstandar88, setValorFactorEstandar88] = useState(0);
  const [valorFactorTazaN92, setValorFactorTazaN92] = useState(0);
  const [valorFactorTazaN88, setValorFactorTazaN88] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [precios, setPrecios] = useState({
    diferencia: 0,
    organico: 0,
    organicoBonificacion: 0,
    convencional: 0,
    convencionalBonificacion: 0,
    estandar: 0,
    estandarBonificacion: 0,
    taza: 0,
    tazaBonificacion: 0,
  });

  const navigate = useNavigate();


  const { getPreciosNuevo } = usePrecios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPreciosNuevo();
        setPrecios((prev)=> !data  ? prev : data);
      } catch (error) {
        console.error("Error al obtener precios:", error);
      }
    };

    fetchData();
  }, []);

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
    const fetchDataInterval = setInterval(fetchData, 3000);
    return () => clearInterval(fetchDataInterval);
  }, [
    precios.diferencia,
    precios.organico,
    precios.organicoBonificacion,
    precios.convencional,
    precios.convencionalBonificacion,
    precios.estandar,
    precios.estandarBonificacion,
    precios.taza,
    precios.tazaBonificacion,
  ]);

  const fetchData = async () => {
    try {
      const response = await getPosts();
      setData(response.data);

      const precioMercado = Math.floor(getPrecioMercadoNuevo(response, precios.diferencia) / 100) * 100;


      const precioOrganico = getPrecioOrganico(precioMercado, precios.organico);

      const precioOrganico88 = getPrecioOrganico88(
        precioMercado,
        precios.organicoBonificacion,
        precios.organico
      );

      const precioConvencional = getPrecioConvencional(
        precioMercado,
        precios.convencional
      );

      const precioConvencional88 = getPrecioConvencional88(
        precioMercado,
        precios.convencional,
        precios.convencionalBonificacion
      );

      const precioEstandar = getPrecioEstandar(precioMercado, precios.estandar);

      const precioEstandar88 = getPrecioEstandar88(
        precioMercado,
        precios.estandarBonificacion,
        precios.estandar
      );

      const precioTaza92 = getPrecioTaza(precioMercado, precios.taza);

      const precioTaza88 = getPrecioTaza88(
        precioMercado,
        precios.tazaBonificacion,
        precios.taza
      );

      setValorPrecioMercado(precioMercado);
      setValorFactorOrganico92(precioOrganico);
      setValorFactorOrganico88(precioOrganico88);
      setValorFactorConvencional92(precioConvencional);
      setValorFactorConvencional88(precioConvencional88);
      setValorFactorEstandar92(precioEstandar);
      setValorFactorEstandar88(precioEstandar88);
      setValorFactorTazaN92(precioTaza92);
      setValorFactorTazaN88(precioTaza88);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
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
    return window.location.reload();
  }

  return (
    <div className="home">
      <div className="container nuevo">
        <div className="row">
          <div className="col-12 col-md-9">
            <img className="fondo" src={logo} alt="" />
            <div className="precio-pergamino">
              <span className="text subtitulo">Precio Pergamino</span>
              <span className="text precio">{`$ ${data.arroba.toLocaleString()}`}</span>
              <span className="text hora">{formattedDateTime}</span>
              <button className="button-reload">
                Recargar <i className="bx bx-reset"></i>
              </button>
            </div>
            <div className="precio-mercado punto-diferencia mt-3 col-12 col-6">
              <div className="contenedores punto-diferencia">
                <span className="text">Punto Diferencia</span>
                <span className="signo-2-mercado">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.diferencia}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios,diferencia: e.target.value,}))}
                />
              </div>
              <div className="contenedores punto-diferencia col-12 col-md-6">
                <span className="text">Precio Mercado</span>
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
                  name="organico"
                  defaultValue={precios.organico}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios,organico: e.target.value,}))}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorOrganico92).toLocaleString()}`}
                  disabled
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.organicoBonificacion}
                  onChange={(e) =>
                    setPrecios({
                      ...precios,
                      organicoBonificacion: e.target.value,
                    })
                  }
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorOrganico88).toLocaleString()}`}
                  disabled
                />
              </div>
            </div>

            {/* Convencional */}
            <div className="precio-mercado contenedores-nuevo precio-factor col-12 col-6">
              <div className="contenedores">
                <span className="text text-3">Convencional</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.convencional}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios, convencional: e.target.value,}))}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorConvencional92).toLocaleString()}`}
                  disabled
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.convencionalBonificacion}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios, convencionalBonificacion: e.target.value,}))}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorConvencional88).toLocaleString()}`}
                  disabled
                />
              </div>
            </div>

            {/* Estandar */}
            <div className="precio-mercado contenedores-nuevo precio-factor col-12 col-6">
              <div className="contenedores">
                <span className="text text-3">Estandar</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.estandar}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios, estandar: e.target.value,}))}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorEstandar92).toLocaleString()}`}
                  disabled
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.estandarBonificacion}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios, estandarBonificacion: e.target.value,}))}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorEstandar88).toLocaleString()}`}
                  disabled
                />
              </div>
            </div>

            {/* Taza */}
            <div className="precio-mercado contenedores-nuevo precio-factor col-12 col-6">
              <div className="contenedores">
                <span className="text text-3">Taza</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.taza}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios, taza: e.target.value,}))}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor 92</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorTazaN92).toLocaleString()}`}
                  disabled
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Bonificación</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  defaultValue={precios.tazaBonificacion}
                  onChange={(e) =>
                    setPrecios((prevPrecios) => ({...prevPrecios,tazaBonificacion: e.target.value,}))}
                  
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Factor +88</span>
                <input
                  type="text"
                  className="info info_sumado"
                  value={`$  ${Math.round(valorFactorTazaN88).toLocaleString()}`}
                  disabled
                />
              </div>
            </div>

            {/* Boton Compartir */}
            <div className="precio-mercado col-12 col-6">
              <div className="btn contain-compartir col-12 col-md-6">
                <button className="button-compartir"
                onClick={() => {
                  navigate("/dash/nuevoshare", {
                    state: {
                      organico92: valorFactorOrganico92,
                      organico88: valorFactorOrganico88,
                      convencional92: valorFactorConvencional92,
                      convencional88: valorFactorConvencional88,
                      estandar92: valorFactorEstandar92,
                      estandar88: valorFactorEstandar88,
                      taza92: valorFactorTazaN92,
                      taza88: valorFactorTazaN88,
                      dolar: data.dolar,
                      lastCoffe: data.lastCoffe,
                      dolarchange: data.indicadorDolar.dollarPriceChange,
                      dolarPorChange: data.indicadorDolar.dollarPricePorChange,
                      dolarstate: data.indicadorDolar.resultStateDollar,
                      coffechange: data.indicador.cambioValorVar,
                      coffePorChange: data.indicador.cambioValorPorcentaje,
                      coffestate: data.indicador.resultState,
                      coffeClock: data.indicador.clock,

                    },
                  });
                }}>
                  Compartir <i className="bx bxs-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
          {/* Indicadores */}
          <div className="col-12 col-md-3">
            {/* Inicio Indicadores */}
            <div className="container-indicadores">
              <div className="indicador libra">
                <span className="text subtitulo">Precio Libra</span>
                <span className="text precio precio-libra">
                  $ {data.libra.toLocaleString()}
                </span>

                <img className="img" src={colombia} alt="" />
              </div>
              <div className="indicador">
                <span className="text subtitulo">Precio USD</span>
                <span className="text precio">$ {data.dolar}</span>
                <span
                  className="text precio_indicador precio_indicador_dolar"
                  style={{
                    color:
                      data.indicadorDolar.resultStateDollar === "positivo"
                        ? "green"
                        : data.indicadorDolar.resultStateDollar === "negativo"
                        ? "red"
                        : "inherit",
                  }}
                >
                  <span className="flecha" style={{ color: "inherit" }}>
                    {data.indicadorDolar.resultStateDollar === "positivo"
                     ? "⬆"
                     : "⬇"}
                  </span>
                  {data.indicadorDolar.dollarPriceChange}{" "}
                  {data.indicadorDolar.dollarPricePorChange}
                </span>
                <img className="img" src={eeuu} alt="" />
                <span className="info_two">Info en tiempo real. Valores en <span className="fw-bold">COP</span> <br /> <a href="" className="text-dark">(Aviso Legal)</a> </span>
                <span className="vermas">
                  <a
                    href="https://es.investing.com/currencies/usd-cop"
                    target="blank"
                  >
                    Ver Mas
                  </a>
                </span>
              </div>
              {/*  */}
              <div className="indicador">
                <span className="text subtitulo">
                  Café EE.UU.{" "}
                  {data.indicador.clock === "positivo" ? "🕑" : "⏰"}
                </span>
                <span className="text precio">$ {data.lastCoffe}</span>
                <span
                  className="text precio_indicador"
                  style={{
                    color:
                      data.indicador.resultState === "positivo"
                        ? "green"
                        : "red",
                  }}
                >
                  <span className="flecha">
                    {data.indicador.resultState === "positivo" ? "⬆"
                      : "⬇"}
                  </span>
                  {data.indicador.cambioValorVar}{" "}
                  {data.indicador.cambioValorPorcentaje}
                </span>
                <img className="img" src={eeuu} alt="" />
                <span
                  className={`mt-2 clock ${
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
                <span className="info_two info-three">Datos derivados en tiempo real</span>

              </div>

              {/*  */}
            </div>
            {/* Fin Indicadores */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoFuturo;
