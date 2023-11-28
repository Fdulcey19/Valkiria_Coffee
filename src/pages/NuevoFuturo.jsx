import { useEffect, useState } from "react";
import colombia from "../assets/images/Iconos/colombia.png";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function NuevoFuturo() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [PrecioPergamino] = useState(142000);
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

  useEffect(() => {
    // Función para actualizar la fecha y hora cada segundo
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };

    // Actualizar la hora cada segundo
    const intervalId = setInterval(updateDateTime, 1000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-9">
              <img className="fondo" src={logo} alt="" />
            <div className="precio-pergamino">

              <span className="text subtitulo">Precio Pergamino</span>
              <span className="text precio">{`$ ${PrecioPergamino.toLocaleString()}`}</span>
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
            <div className="precio-mercado precio-factor mt-3 col-12 col-6">
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
            <div className="precio-mercado precio-factor col-12 col-6">
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
            <div className="precio-mercado precio-factor col-12 col-6">
              <div className="contenedores">
                <span className="text">Estandar</span>
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
                <span className="text precio">$ 142.193,200</span>
                <img className="img" src={colombia} alt="" />
                <span className="vermas">
                  <a href="">Ver Mas</a>
                </span>
              </div>
              <div className="indicador">
                <span className="text subtitulo">Precio USD</span>
                <span className="text precio">$ 142.193,200</span>
                <img className="img" src={eeuu} alt="" />
                <span className="vermas">
                  <a href="">Ver Mas</a>
                </span>
              </div>
              <div className="indicador">
                <span className="text subtitulo">Café EE.UU.</span>
                <span className="text precio">$ 142.193,200</span>
                <img className="img" src={eeuu} alt="" />
                <span className="vermas">
                  <a href="">Ver Mas</a>
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
