import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import viper from "../assets/images/viper.png";
import chapola from "../assets/images/chapola.png";

function LoginRegister() {
  return (
    <>
      <body className="login" style={{ height: "100vh" }}>
        <div className="container pt-lg-5 pt-4 rounded-5 h-100">
          <div className="row align-items-stretch h-100">
            <div className="col-lg-6 d-none d-lg-block pb-5 ">
              <div className="position-relative h-100">
                <div className="text-white w-50">
                  <p className="fs-3 fw-bold name">VALKIRIA</p>
                  <p className="fs-5 subtitle">
                    SOLUCIONES INFORMATICAS QUE FUNCIONAN PARA SU EMPRESA
                    CAFETERA{" "}
                  </p>
                </div>
                <div
                  className="position-absolute  text-center"
                  style={{ bottom: "0%" }}
                >
                  <span>
                    <a
                      className="text-decoration-none text-black-50 mx-2 fw-bold d-inline-block"
                      href="#"
                    >
                      Terminos y condiciones
                    </a>
                  </span>
                  <span>
                    <a
                      className="text-decoration-none text-black-50 mx-2 fw-bold d-inline-block"
                      href="#"
                    >
                      Politica de Privacidad
                    </a>
                  </span>
                  <span>
                    <a
                      className="text-decoration-none text-black-50 mx-2 fw-bold d-inline-block"
                      href="#"
                    >
                      Contactanos
                    </a>
                  </span>
                  <span>
                    <a
                      className="text-decoration-none text-black-50 mx-2 fw-bold d-inline-block mt-lg-3"
                      href="#"
                    >
                      Version
                    </a>
                  </span>
                </div>
                <div className="logos">
                  <div className="images logo-1">
                    <img src={viper} alt="" />
                  </div>
                  <div className="images logo-2">
                    <img src={chapola} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="d-flex justify-content-lg-end justify-content-center login-form">
                <div className="w-75 p-5 bg-white rounded-5 shadow ">
                  <div className="text-center">
                    {/* Inicio de Sesion */}
                    {/* Logo */}
                    <div className="logo">
                      <img src={logo} alt="" />
                    </div>
                  </div>
                  <div>
                    <form action="#">
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="text-1 text-login form-label fw-bold"
                        >
                          Usuario
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg fs-6 small-placeholder"
                          name="email"
                          placeholder="Usuario"
                          style={{ height: "50px" }}
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="password"
                          className="text-1 text-login form-label fw-bold"
                        >
                          Contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg fs-6 small-placeholder"
                          name="password"
                          placeholder="Contraseña"
                          style={{ height: "50px" }}
                        />
                      </div>
                      <div className="mb-4 w-100">
                        <span className="w-100 d-flex justify-content-end ">
                          <a
                            className="text-decoration-none mt-3 text-1 text-login"
                            href="#"
                          >
                            Has olvidado tu contraseña?
                          </a>
                        </span>
                      </div>

                      <div className="d-grid">
                        <Link
                          to="dash"
                          type="submit"
                          className="btn btn-inicio-sesion text-white fs-6"
                        >
                          Iniciar Sesion
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default LoginRegister;
