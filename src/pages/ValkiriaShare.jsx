import { useRef } from "react";
import html2canvas from "html2canvas";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo4.png";
import { NavLink, useLocation } from "react-router-dom";

function ValkiriaShare() {
  const containerRef = useRef(null);
  const location = useLocation();
  const {
    origenSumado,
    tazaSumado,
    micLoteSumado,
    medLoteSumado,
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
    <div className="home home-share">
      <div>
        <div className="container-descargar">
          <button
            className="btn btn-success button-descargar"
            onClick={handleGenerateImage}
          >
            Compartir <i className="bx bxl-whatsapp compartir"></i>
          </button>
        </div>
        <NavLink to="/dash" className=" retroceder">
          <li className="link"><i className='bx bx-arrow-back fw-bold'></i> Atrás</li>
        </NavLink>
        <div className="picture" ref={containerRef}>
          {/* Contenido para convertir en imagen */}

          {/* <h2 className="Title text-center">Oferta de compra para pergaminos</h2> */}
          <h2 className="Title text-center">OFERTA DE COMPRA PARA PERGAMINO</h2>

          <div className="row">
            <div className="col-12 ">
              <img className="fondo-valkiria-share" src={logo} alt="" />
              {/* Origen */}
              <div className="precio-mercado valkiria-share">
                <div className="contenedores col-12 col-md-5">
                  <span className="text text-price">Origen</span>

                  <input
                    type="text"
                    className="info price"
                    value={`$ ${origenSumado.toLocaleString()}`}
                  />
                </div>
                <div className="contenedores contenedores_derecha  col-12 col-md-7">
                  <span className="text text-2">
                    <span className="Subtitle">Kilos:</span> &ge; 250 ,{" "}
                    <span className="Subtitle">Factor:</span> 93,{" "}
                    <span className="Subtitle">Taza:</span> 80 - 83,75{" "}
                    <span className="Subtitle">Humedad:</span>: 10 - 12,5
                  </span>
                </div>
              </div>
              {/* Especial */}
              <div className="precio-mercado valkiria-share m-top">
                <div className="contenedores col-12 col-md-5">
                  <span className="text text-price">Especial</span>

                  <input
                    type="text"
                    className="info price"
                    value={`$ ${tazaSumado.toLocaleString()}`}
                  />
                </div>
                <div className="contenedores contenedores_derecha col-12 col-md-7">
                  <span className="text text-2">
                    <span className="Subtitle">Kilos:</span> &ge; 125 ,{" "}
                    <span className="Subtitle">Factor:</span> 91,{" "}
                    <span className="Subtitle">Taza:</span> 81 - 84,75{" "}
                    <span className="Subtitle">Humedad:</span>: 10 - 12
                  </span>
                </div>
              </div>
              {/* Microlote */}
              <div className="precio-mercado valkiria-share m-top">
                <div className="contenedores col-12 col-md-5">
                  <span className="text text-price">Microlote</span>

                  <input
                    type="text"
                    className="info price"
                    value={`$ ${micLoteSumado.toLocaleString()}`}
                  />
                </div>
                <div className="contenedores contenedores_derecha col-12 col-md-7">
                  <span className="text text-2">
                    <span className="Subtitle">Kilos:</span>  &ge; 125 ,{" "}
                    <span className="Subtitle">Factor:</span> 90,{" "}
                    <span className="Subtitle">Taza:</span> 85 - 85,75{" "}
                    <span className="text-danger fw-bold">Estricta</span>{" "}
                    <span className="Subtitle">Humedad:</span>: 10 - 11,5
                  </span>
                </div>
              </div>
              {/* Mediano Lote */}
              <div className="precio-mercado valkiria-share m-top">
                <div className="contenedores  col-12 col-md-5">
                  <span className="text text-price">Med.Lote</span>

                  <input
                    type="text"
                    className="info price"
                    value={`$ ${medLoteSumado.toLocaleString()}`}
                  />
                </div>
                <div className="contenedores contenedores_derecha col-12 col-md-7">
                  <span className="text text-2">
                    <span className="Subtitle">Kilos:</span> &ge; 500 ,{" "}
                    <span className="Subtitle">Factor:</span> 93,{" "}
                    <span className="Subtitle">Taza:</span> Limpia{" "}
                    <span className="text-danger fw-bold">Estricta</span>{" "}
                    <span className="Subtitle">Humedad:</span>: 10 - 12,5
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="container-indicadores container_share">
                <div className="indicador valkiria">
                  <img src={logo} alt="" />
                </div>
                {/*  */}
                <div className="indicadores_share">
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
                    <span className="info_two mt-2">Info en tiempo real. Valores en <span className="fw-bold">COP</span> <br /> <a href="" className="text-dark">(Aviso Legal)</a> </span>
                    <img className="img" src={eeuu} alt="" />

                  </div>
                  {/*  */}
                  <div className="indicador indicador-fondo">
                    <span className="text subtitulo">
                      Café EE.UU.{" "}
                      {coffestate === "positivo" ? "🕑" : "⏰"}
                    </span>
                    <span className="text precio">$ {lastCoffe}</span>
                    <span
                      className="text precio_indicador"
                      style={{
                        color:
                          coffestate === "positivo"
                            ? "green"
                            : "red",
                      }}
                    >
                      <span className="flecha">
                        {coffestate === "positivo" ? "⬆"
                          : "⬇"}
                      </span>
                      {coffechange}{" "}
                      {coffePorChange}
                    </span>
                    <img className="img" src={eeuu} alt="" />
                    <span
                      className={`mt-2 clock ${coffeClock === "positivo"
                          ? "texto-verde"
                          : "texto-rojo"
                        }`}
                    >
                      {coffeClock === "positivo"
                        ? `🕑 Mercado Abierto`
                        : "⏰ Mercado Cerrado"}
                    </span>
                    <span className="info_two mt-2">Datos derivados en tiempo real</span>

                  </div>
                  {/*  */}
                </div>


              </div>
            </div>{/* Fin Container */}
            {/* Terminos y condiciones */}
            <div className="precio-mercado valkiria-share ">
              <p className="Terminos">
                SE RECOMIENDA TENER EN CUENTA LAS CARACTERISTICAS Y CONDICIONES
                DE CADA LOTE ANTES DE ENTREGARLO, se recomienda comunicarce con
                los encargados de bodega antes de entregar su café. <br /> - Las ofertas
                tienen un vencimiento de 4 dias habiles <br /> - Los lotes mayores a
                250 kilos pueden tener un retraso en la cancelacion de 12 a 36
                horas <br /> - LOS ANUNCIOS DEVERAN SER CONFIRMADOS
              </p>
            </div>
            {/* Fin */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValkiriaShare;
