import { useState, useEffect } from "react";
import colombia from "../assets/images/Iconos/colombia.png";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import {
  getPosts,
  getPrecioMedLote,
  getPrecioMercado,
  getPrecioMicLote,
  getPrecioOrigen,
  getValorTaza,
} from "../domain/services";
import { usePrecios } from "../context/PreciosContex";

function Home() {
  const { getPrecios } = usePrecios();

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [valorPuntoDiferencia, setValorPuntoDiferencia] = useState(2000);
  const [valorPrecioMercado, setValorPrecioMercado] = useState();
  const [valorOrigen, setValorOrigen] = useState(10000);
  const [valorOrigenSumado, setValorOrigenSumado] = useState(152000);
  const [valorTaza, setValorTaza] = useState(10000);
  const [valorTazaSumado, setValorTazaSumado] = useState(152000);
  const [valorMicLote, setValorMicLote] = useState(8000);
  const [valorMicLoteSumado, setValorMicLoteSumado] = useState(154000);
  const [valorMedLote, setValorMedLote] = useState(6000);
  const [valorMedLoteSumado, setValorMedLoteSumado] = useState(152000);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function LoadingSpinner() {
    return (
      <div>
        <div className="loader"></div>
        <p className="loader_text">Loading...</p>
      </div>
    );
  }

  useEffect(() => {
    getPrecios();
  }, [])


  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchData();
    const intervalDataId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalDataId);
  }, [
    valorPuntoDiferencia,
    valorOrigen,
    valorTaza,
    valorMicLote,
    valorMedLote,
  ]);

  const fetchData = async () => {
    try {
      const response = await getPosts();
      setData(response.data);
      // Suma correctamente valorPuntoDiferencia y data.arroba
      const precioMercado = getPrecioMercado(response, valorPuntoDiferencia);

      const precioOrigen = getPrecioOrigen(precioMercado, valorOrigen);

      const precioTaza = getValorTaza(precioMercado, valorTaza);

      const precioMicLote = getPrecioMicLote(precioMercado, valorMicLote);

      const precioMedLote = getPrecioMedLote(precioMercado, valorMedLote);

      setValorPrecioMercado(precioMercado);
      setValorOrigenSumado(precioOrigen);
      setValorTazaSumado(precioTaza);
      setValorMicLoteSumado(precioMicLote);
      setValorMedLoteSumado(precioMedLote);
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
    <body className="home">
      <div className="container valkiria">
        <div className="row">
          <div className="col-12 col-md-9">
            <img className="fondo" src={logo} alt="" />
            <div className="precio-pergamino">
              <span className="text subtitulo">Precio Pergamino</span>
              <span className="text precio">{`$ ${data.arroba.toLocaleString()}`}</span>
              <span className="text hora">{formattedDateTime}</span>
              <button className="button-reload" onClick={() => handleReload()}>
                Reload <i className="bx bx-reset"></i>
              </button>
            </div>
            <div className="precio-mercado mt-4 col-12 col-6">
              <div className="contenedores">
                <span className="text">Punto Diferencia</span>
                <span className="signo-2">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorPuntoDiferencia}
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
            {/* Origen */}
            <div className="precio-mercado precio-extra precio-inicio col-12 col-6">
              <div className="contenedores">
                <span className="text-2">Precios Extras</span>
                <span className="text">Origen</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorOrigen}
                  onChange={(e) => setValorOrigen(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text-2">Precios Extras</span>
                <span className="text">Origen</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={Math.round(valorOrigenSumado).toLocaleString()}
                  onChange={(e) => setValorOrigenSumado(e.target.value)}
                />
              </div>
            </div>

            {/* Taza */}
            <div className="precio-mercado precio-extra col-12 col-6">
              <div className="contenedores">
                <span className="text">Taza</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorTaza}
                  onChange={(e) => setValorTaza(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Taza</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={Math.round(valorTazaSumado).toLocaleString()}
                  onChange={(e) => setValorTazaSumado(e.target.value)}
                />
              </div>
            </div>

            {/* Micro Lote */}
            <div className="precio-mercado precio-extra col-12 col-6">
              <div className="contenedores">
                <span className="text">Mic-Lote</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorMicLote}
                  onChange={(e) => setValorMicLote(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Mic-Lote</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={Math.round(valorMicLoteSumado).toLocaleString()}
                  onChange={(e) => setValorMicLoteSumado(e.target.value)}
                />
              </div>
            </div>

            {/* Mediano Lote */}
            <div className="precio-mercado precio-extra col-12 col-6">
              <div className="contenedores">
                <span className="text">Med-Lote</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={valorMedLote}
                  onChange={(e) => setValorMedLote(e.target.value)}
                />
              </div>
              <div className="contenedores col-12 col-md-6">
                <span className="text">Med-Lote</span>
                <span className="signo">$</span>
                <input
                  type="text"
                  className="info"
                  value={Math.round(valorMedLoteSumado).toLocaleString()}
                  onChange={(e) => setValorMedLoteSumado(e.target.value)}
                />
              </div>
            </div>
            <div className="precio-mercado precio-venta col-12 col-6">
              <div className="btn contain-compartir col-12 col-md-6">
                <button
                  className="button-compartir"
                  onClick={() => {
                    navigate("/dash/share", {
                      state: {
                        origenSumado: valorOrigenSumado,
                        tazaSumado: valorTazaSumado,
                        micLoteSumado: valorMicLoteSumado,
                        medLoteSumado: valorMedLoteSumado,
                        dolar: data.dolar,
                        lastCoffe: data.lastCoffe,
                      },
                    });
                  }}
                >
                  Compartir <i className="bx bxs-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
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
                <span className="text subtitulo">
                  Café EE.UU.{" "}
                  {data.indicador.clock === "positivo" ? "🕑" : "⏰"}
                </span>
                <span className="text precio">$ {data.lastCoffe}</span>
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
            </div>
            {/* Fin Indicadores */}
          </div>
        </div>
      </div>
    </body>
  );
}

export default Home;
