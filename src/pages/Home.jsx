import { useState, useEffect } from "react";
import axios from "axios";
import colombia from "../assets/images/Iconos/colombia.png";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function Home() {
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

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //  Ruta de la API del Servidor
          "https://valkiria-backend-felipe-dulceys-projects.vercel.app"
          // Ruta de la API Local
          // "http://localhost:3000"
        );
        setData(response.data);
        // Suma correctamente valorPuntoDiferencia y data.arroba
        const precioMercado =
          parseFloat(response.data.arroba) + parseFloat(valorPuntoDiferencia);
        const precioOrigen =
          parseFloat(response.data.arroba) + parseFloat(valorOrigen);
        const precioTaza =
          parseFloat(response.data.arroba) + parseFloat(valorTaza);
        const precioMicLote =
          parseFloat(response.data.arroba) + parseFloat(valorMicLote);
        const precioMedLote =
          parseFloat(response.data.arroba) + parseFloat(valorMedLote);
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

  const updateData = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await axios.get("http://localhost:3000");
      setData(response.data);
      // Suma correctamente valorPuntoDiferencia y data.arroba
      const precioMercado =
        parseFloat(response.data.arroba) + parseFloat(valorPuntoDiferencia);
      const precioOrigen =
        parseFloat(response.data.arroba) + parseFloat(valorOrigen);
      const precioTaza =
        parseFloat(response.data.arroba) + parseFloat(valorTaza);
      const precioMicLote =
        parseFloat(response.data.arroba) + parseFloat(valorMicLote);
      const precioMedLote =
        parseFloat(response.data.arroba) + parseFloat(valorMedLote);
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

  const formattedDateTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <body className="home">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-9">
            <img className="fondo" src={logo} alt="" />
            <div className="precio-pergamino">
              <span className="text subtitulo">Precio Pergamino</span>
              <span className="text precio">{`$ ${data.arroba.toLocaleString()}`}</span>
              <span className="text hora">{formattedDateTime}</span>
              <button className="button-reload" onClick={updateData}>
                Reload <i className="bx bx-reset"></i>
              </button>
            </div>
            <div className="precio-mercado mt-5 col-12 col-6">
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
            <div className="precio-mercado precio-extra mt-3 mb-1 col-12 col-6">
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
                  value={valorTazaSumado.toLocaleString()}
                  onChange={(e) => setValorTazaSumado(e.target.value)}
                />
              </div>
            </div>
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
                  value={valorMicLoteSumado.toLocaleString()}
                  onChange={(e) => setValorMicLoteSumado(e.target.value)}
                />
              </div>
            </div>
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
                  value={valorMedLoteSumado.toLocaleString()}
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
                  <a href="">Ver Mas</a>
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
                  <a href="">Ver Mas</a>
                </span>
              </div>
              <div className="indicador">
                <span className="text subtitulo">Café EE.UU.</span>
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
                <span className="vermas">
                  <a href="">Ver Mas</a>
                </span>
              </div>
              <button className="button-reload">
                Reload <i className="bx bx-reset"></i>
              </button>
            </div>
            {/* Fin Indicadores */}
          </div>
        </div>
      </div>
    </body>
  );
}

export default Home;
