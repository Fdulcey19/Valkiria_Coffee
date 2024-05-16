import Nav from "./Nav";
import logo from "../assets/images/valkiria3.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isToggle, setIsToggle] = useState(false);
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    if (!isAuthenticated) {
      navigate("/");
    }
  };

  const handleToggleClick = () => {
    setIsToggle(!isToggle);

    // Agregar o quitar la clase 'closed' al elemento .home
    const homeElement = document.querySelector(".home");
    if (homeElement) {
      homeElement.classList.toggle("closed", !isToggle);
    }
  };

  return (
    <>
      <Nav></Nav>
      <nav className={`sidebar ${isToggle ? "close" : ""}`}>
        <header>
          <div className="img-text">
            <div className="image">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <i
            className={`bx ${
              isToggle ? "bx-chevron-right" : "bx-chevron-left"
            } toggle`}
            onClick={handleToggleClick}
          ></i>
        </header>
        <div className={isToggle ? "menu-bar toogle" : "menu-bar"}>
          <div className="menu">
          <ul className="menu-links inicio">
          <li className={`nav-links ${location.pathname === "/dash" || location.pathname === "/dash/share" ? "active" : ""}`}>
            <Link to="/dash">
              <i className="bx bxs-home icon"></i>
              <span className="text nav-text">Inicio</span>
            </Link>
          </li>
          {/* <li className={`nav-links ${location.pathname === "/dash" ? "active" : ""}`}>
            <Link to="/dash">
              <i className="bx bxs-coffee-bean icon"></i>
              <span className="text nav-text">Valkiria</span>
            </Link>
          </li> */}
          <li className={`nav-links ${location.pathname === "/dash/nuevo" || location.pathname === "/dash/nuevoshare" ? "active" : ""}`}>
            <Link to="/dash/nuevo">
              <i className="bx bxs-tree icon"></i>
              <span className="text nav-text">Nuevo Futuro</span>
            </Link>
          </li>
          <li className={`nav-links ${location.pathname === "/dash/configuracion" || location.pathname === "/dash/configuracion/nuevofuturo" || location.pathname === "/dash/configuracion/nuevo" || location.pathname === "/dash/configuracion/valkiria" ? "active" : ""}`}>
            <Link to="/dash/configuracion">
              <i className="bx bxs-cog icon"></i>
              <span className="text nav-text">Configuración</span>
            </Link>
          </li>
        </ul>
          </div>
          <div className="bottom-content">
            <li className="">
              <Link onClick={handleSignOut}>
                <i className="bx bx-log-out-circle icon"></i>
                <span className="text nav-text">Cerrar Sesion</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
