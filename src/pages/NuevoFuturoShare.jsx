import { useRef } from "react";
import html2canvas from "html2canvas";
import eeuu from "../assets/images/Iconos/eeuu.png";
import logo from "../assets/images/logo.png";
import nuevo from '../assets/images/nuevo.png'

function NuevoFuturoShare() {
  const containerRef = useRef(null);

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
    <div className="home home-share nuevo-share">
      <div className="container container-descargar">
        <button
          className="btn btn-success button-descargar"
          onClick={handleGenerateImage}
        >
          Compartir <i className="bx bxl-whatsapp compartir"></i>
        </button>
      </div>
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
                  <input type="text" className="info price" value={150000} />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input type="text" className="info price" value={150000} />
                </div>
                {/* Convencional */}
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor 92</span>
                  <input
                    type="text"
                    className="info price input-estandar"
                    value={150000}
                  />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input
                    type="text"
                    className="info price input-estandar"
                    value={150000}
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
                  <input type="text" className="info price input-organico" value={150000} />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input type="text" className="info price input-organico" value={150000} />
                </div>
                {/* Taza */}
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor 92</span>
                  <input
                    type="text"
                    className="info price"
                    value={150000}
                  />
                </div>
                <div className="col-3 contenedores">
                  <span className="text text-price">Factor +88</span>
                  <input
                    type="text"
                    className="info price"
                    value={150000}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoFuturoShare;
