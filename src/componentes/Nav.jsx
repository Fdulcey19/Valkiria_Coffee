import { Link, Outlet } from "react-router-dom"
import vector from "../assets/images/Ilustraciones/Vector3-04.png"

function Nav() {
  return (
    <>
    <div className="NavContain">
      <img className="Vector" src={vector} alt="" />
      <Link to="/" className="Inicio">
      <span className="LogOut">Cerrar Sesion</span>
      </Link>
    </div>
    <Outlet />
  </>
  )
}

export default Nav