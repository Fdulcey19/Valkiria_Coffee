import Nav from "./Nav";
import logo from "../assets/images/logo.png";
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
            <div className="text header-text">
              <span className="name">VALKIRIA </span>
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
            <ul className="menu-links">
              <li className="nav-links search-box">
                <Link to="/dash">
                  <i className="bx bxs-home icon"></i>
                  <span className="text nav-text">Inicio</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/dash">
                  <i className="bx bxs-coffee-bean icon"></i>
                  <span className="text nav-text">Valkiria</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="nuevo">
                  <i className="bx bxs-tree icon"></i>
                  <span className="text nav-text">Nuevo Futuro</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/dash/Configuracion">
                  <i className="bx bxs-cog icon"></i>
                  <span className="text nav-text">Configuración</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/perfil">
                  <i className="bx bxs-user-pin icon"></i>
                  <span className="text nav-text">Perfil</span>
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
