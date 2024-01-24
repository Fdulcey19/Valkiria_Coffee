import { Link, Outlet, useNavigate } from "react-router-dom"
import vector from "../assets/images/Ilustraciones/Vector3-04.png"
import { useAuth } from "../context/AuthContext";

function Nav() {
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    if (!isAuthenticated) {
      navigate("/");
    }
  };
  return (
    <>
    <div className="NavContain">
      <img className="Vector" src={vector} alt="" />
      <Link onClick={handleSignOut} className="Inicio">
      <span className="LogOut">Cerrar Sesion</span>
      </Link>
    </div>
    <Outlet />
  </>
  )
}

export default Nav