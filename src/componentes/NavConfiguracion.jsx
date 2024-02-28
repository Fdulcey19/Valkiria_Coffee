import { Link, Outlet, useLocation } from 'react-router-dom';

function NavConfiguracion() {
  const location = useLocation(); // Obtener la ubicación actual

  return (
    <>
      <div className='nav-configuracion'>
        <div className="d-flex justify-content-center">
          <Link to={"/dash/configuracion"} className={`centrar ${location.pathname === "/dash/configuracion" || location.pathname === "/dash/configuracion/valkiria" ? "active" : ""}`}>
            <a>Precios Valkiria</a>
          </Link>
          <Link to={"/dash/configuracion/nuevo"} className={`ms-5 centrar ${location.pathname === "/dash/configuracion/nuevofuturo" || location.pathname === "/dash/configuracion/nuevo" ? "active" : ""}`}>
            <a>Precios Nuevo Futuro</a>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavConfiguracion;