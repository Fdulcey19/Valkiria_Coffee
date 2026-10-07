import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__inner">
        <p className="notfound__code" aria-hidden="true">
          4<span>0</span>4
        </p>
        <h1>Página no encontrada</h1>
        <p>La página que buscas no existe, cambió de dirección o no está disponible por ahora.</p>
        <Link to="/" className="btn btn--primary">
          <i className="bx bx-home-alt-2" aria-hidden="true"></i> Ir al inicio
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
