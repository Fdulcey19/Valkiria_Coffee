import Componente1 from "../componentes/Precios/Valkiria";
import Componente2 from "../componentes/Precios/NuevoFuturo";
import { useState } from "react";

function Configuracion() {
  const [mostrarComponente1, setMostrarComponente1] = useState(true);


  const toggleComponente = () => {
    setMostrarComponente1((prevMostrarComponente1) => !prevMostrarComponente1);
  };
  return (
    <body className="home ">
      <div className="container valkiria">
        <div className="">
          <div className="d-flex justify-content-center w-100">
            <button onClick={toggleComponente} className="btn btn-success">
              {mostrarComponente1 ? "Precios Nuevo Futuro" : "Precios Valkiria"}
            </button>
          </div>

          {mostrarComponente1 ? <Componente1 /> : <Componente2 />}
        </div>
      </div>
    </body>
  );
}

export default Configuracion;
