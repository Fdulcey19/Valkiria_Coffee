import Nav from "./Nav";
import logo from "../assets/images/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggleClick = () => {
    setIsToggle(!isToggle);
  };

  return (
    <>
      <Nav></Nav>
      <nav className={`sidebar ${isToggle ? "close" : ""}`}>
        <header>
          <div className="img-text">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <div className="text header-text">
              <span className="name">VALKIRIA </span>
            </div>
          </div>
          <i
            className={`bx ${isToggle ? "bx-chevron-right" : "bx-chevron-left"} toggle`}
            onClick={handleToggleClick}
          ></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-links search-box">
                <Link to="/dash">
                  <i className="bx bx-home icon"></i>
                  <span className="text nav-text">Home</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/dash">
                  <i className="bx bx-bar-chart-alt-2 icon"></i>
                  <span className="text nav-text">Valkirya</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="nuevo">
                  <i className="bx bx-pie-chart-alt icon"></i>
                  <span className="text nav-text">Nuevo Futuro</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/notifications">
                  <i className="bx bx-bell icon"></i>
                  <span className="text nav-text">Notificaciones</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/configuracion">
                  <i className="bx  bx-help-circle icon"></i>
                  <span className="text nav-text">Configuración</span>
                </Link>
              </li>
              <li className="nav-links">
                <Link to="/perfil">
                  <i className="bx bx-user-pin icon"></i>
                  <span className="text nav-text">Perfil</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="">
              <Link to="/">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;