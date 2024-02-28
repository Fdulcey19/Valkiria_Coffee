import { useRef } from "react";
import html2canvas from "html2canvas";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo.png";
import nuevo from "../assets/images/nuevo.png";
import { NavLink, useLocation } from "react-router-dom";

function NuevoFuturoShare() {
  const containerRef = useRef(null);

  const location = useLocation();
  const {
    organico92,
    organico88,
    convencional92,
    convencional88,
    estandar92,
    estandar88,
    taza92,
    taza88,
    dolar,
    lastCoffe,
    dolarchange,
    dolarPorChange,
    dolarstate,
    coffechange,
    coffePorChange,
    coffestate,
    coffeClock,
  } = location.state;
  const getFormattedDateTime = () => {
    const now = new Date();
    const month = ("0" + (now.getMonth() + 1)).slice(-2); // Agrega un cero al principio si es necesario
    const day = ("0" + now.getDate()).slice(-2); // Agrega un cero al principio si es necesario
    const hours = ("0" + now.getHours()).slice(-2); // Agrega un cero al principio si es necesario
    const minutes = ("0" + now.getMinutes()).slice(-2); // Agrega un cero al principio si es necesario

    return `${month}-${day}-${hours}-${minutes}`;
  };

  console.log(dolarchange, dolarPorChange, dolarstate);

  const handleGenerateImage = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current)
        .then((canvas) => {
          const imageUrl = canvas.toDataURL("image/png");

          // Construye el nombre del archivo con "Valkiria" y la fecha actual
          const fileName = `Valkiria-${getFormattedDateTime()}.png`;

          // Crea un elemento <a> con un enlace a la imagen
          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = fileName;

          // Simula un clic en el enlace para activar la descarga
          link.click();
        })
        .catch((error) => {
          console.error("Error al generar la imagen:", error);
        });
    }
  };
  return (
    <div className="home home-share nuevo-share">
      <div className="container container-descargar">
        <button
          className="btn btn-success button-descargar"
          onClick={handleGenerateImage}
        >
          Compartir <i className="bx bxl-whatsapp compartir"></i>
        </button>
      </div>
      <NavLink to="/dash/nuevo" className=" retroceder">
        <li className="link">
          <i className="bx bx-arrow-back fw-bold"></i> Atrás
        </li>
      </NavLink>
      <div ref={containerRef}>
        {/* Contenido que quieres convertir en imagen */}
        <h2 className="Title">Precios Extras </h2>

        <div className="row">
          <div className=" row col-12 col-md-9 home-fondo">
            <div className="container">
              {/* Primera Fila */}
              {/* Estandar */}
              <div className="row col-12 mt-5">
                <span className="estandar text-1">Estandar</span>
                <span className="Convencional text-1">Convencional</span>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor 92</span>
                  <input
                    type="text"
                    className="info price"
                    value={`$ ${estandar92.toLocaleString()}`}
                  />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input
                    type="text"
                    className="info price"
                    value={`$ ${estandar88.toLocaleString()}`}
                  />
                </div>
                {/* Convencional */}
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor 92</span>
                  <input
                    type="text"
                    className="info price input-estandar"
                    value={`$ ${convencional92.toLocaleString()}`}
                  />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input
                    type="text"
                    className="info price input-estandar"
                    value={`$ ${convencional88.toLocaleString()}`}
                  />
                </div>
              </div>
              {/* Segunda Fila */}
              {/* Organico */}
              <div className="row col-12 mt-3">
                <span className="estandar text-1">Organico</span>
                <span className="Convencional text-1">Taza</span>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor 92</span>
                  <input
                    type="text"
                    className="info price input-organico"
                    value={`$ ${organico92.toLocaleString()}`}
                  />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input
                    type="text"
                    className="info price input-organico"
                    value={`$ ${organico88.toLocaleString()}`}
                  />
                </div>
                {/* Taza */}
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor 92</span>
                  <input
                    type="text"
                    className="info price"
                    value={`$ ${taza92.toLocaleString()}`}
                  />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input
                    type="text"
                    className="info price"
                    value={`$ ${taza88.toLocaleString()}`}
                  />
                </div>
              </div>
            </div>
            {/* Terminos y condiciones */}
            <div className="precio-mercado valkiria-share terminos-nuevo">
              <p className="Terminos">
                Se recomienda comunicarce con los encargados de bodega antes de
                entregar su café-las ofertas tienen un vencimiento de 4 dias
                habiles -los lotes mayores a 250 kilos pueden tener un retraso
                en la cancelacion de 12 a 36 horas-LOS ANUNCIOS DEVERAN SER
                CONFIRMADOS, de cafes convencionales y estandar se reciben de
                8.30 de la mañana a 5.30 de la tarde -los organicos solamente
                mientras el precio del dia este vigente de la tabla federacion
                Nacional de cafeteros, los lotes devén de cumplir mínimamente
                tazas limpias (sin defectos) con humedades del 10.00-12.00%
              </p>
              <img className="nuevo" src={nuevo} alt="" />
            </div>
            {/* Fin */}
            {/* Indicadores */}
          </div>
          <div className="col-12 col-md-3">
            <div className="container-indicadores">
              <div className="indicador valkiria">
                <img src={logo} alt="" />
              </div>
              {/*  */}
              <div className="indicador indicador-fondo">
                <span className="text subtitulo">Precio USD</span>
                <span className="text precio">$ {dolar}</span>
                <span
                  className="text precio_indicador precio_indicador_dolar"
                  style={{
                    color:
                      dolarstate === "positivo"
                        ? "green"
                        : dolarstate === "negativo"
                        ? "red"
                        : "inherit",
                  }}
                >
                  <span className="flecha" style={{ color: "inherit" }}>
                    {dolarstate === "positivo" ? "⬆" : "⬇"}
                  </span>
                  {dolarchange} {dolarPorChange}
                </span>
                <span className="info_two">
                  Info en tiempo real. Valores en{" "}
                  <span className="fw-bold">COP</span> <br />{" "}
                  <a href="" className="text-dark">
                    (Aviso Legal)
                  </a>{" "}
                </span>
                <img className="img" src={eeuu} alt="" />
              </div>
              {/*  */}
              <div className="indicador indicador-fondo">
                <span className="text subtitulo">
                  Café EE.UU. {coffestate === "positivo" ? "🕑" : "⏰"}
                </span>
                <span className="text precio">$ {lastCoffe}</span>
                <span
                  className="text precio_indicador"
                  style={{
                    color: coffestate === "positivo" ? "green" : "red",
                  }}
                >
                  <span className="flecha">
                    {coffestate === "positivo" ? "⬆" : "⬇"}
                  </span>
                  {coffechange} {coffePorChange}
                </span>
                <img className="img" src={eeuu} alt="" />
                <span
                  className={`mt-2 clock ${
                    coffeClock === "positivo" ? "texto-verde" : "texto-rojo"
                  }`}
                >
                  {coffeClock === "positivo"
                    ? "🕑 Mercado Abierto"
                    : "⏰ Mercado Cerrado"}
                </span>
                <span className="info_two info-three">
                  Datos derivados en tiempo real
                </span>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoFuturoShare;
