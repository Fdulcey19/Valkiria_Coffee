import { Link } from "react-router-dom";
import logo from "../assets/images/valkiria5.png";
import horizontal from "../assets/images/valkiria2.png";

const HomePage = () => {
  return (
    <>
      <div className="container-fluid homepage">
        <nav className="nav_bar w-50">
          <div className="logo mt-3">
            <img src={horizontal} alt="" />
          </div>
          <ul className="d-flex">
            <li className="nav-item">
              <Link to="/" className="nav-link text-secondary fs-6">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="https://www.instagram.com/viper_venomcoffe/"
                target="blank"
                className="nav-link"
              >
                Contacto
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </nav>
        <div className="conainer_text">
          <div className="logo_1 mb-5">
            <img className="w-50 text-center" src={logo} alt="" />
          </div>
          <p>Soluciones informaticas que funcionan <br /> para su empresa cafetera</p>
          
        </div>
        <footer className="footer">
          <p className="text-center derechos ">
          Valkiria &copy; 2023 Todos los derechos reservados by{" "}
            <a href="https://www.instagram.com/felipe_dullcey/" target="blank">Felipe Dulcey</a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
