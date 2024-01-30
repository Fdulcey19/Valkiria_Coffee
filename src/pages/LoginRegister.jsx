import logo from "../assets/images/logo.png";
import viper from "../assets/images/viper.png";
import chapola from "../assets/images/chapola.png";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../componentes/Facebook/Button";
// import * as storage from "../componentes/Facebook/storage";

function LoginRegister() {
  
  const onLogin = (user) => {
    // Almacenar en el localStorage
    console.log(user);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
    console.log(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dash");
    }
  }, [isAuthenticated]);

  return (
    <>
      <body className="login" style={{ height: "100vh" }}>
        <div className="container pt-lg-5 pt-4 rounded-5 h-100">
          <div className="row align-items-stretch h-100">
            <div className="col-lg-6 d-none d-lg-block pb-5 ">
              <div className="position-relative h-100">
                <div className="text-white w-50">
                  <p className="fw-bold name">VALKIRIA</p>
                  <p className="subtitle">
                    SOLUCIONES INFORMATICAS QUE FUNCIONAN PARA SU EMPRESA
                    CAFETERA{" "}
                  </p>
                </div>
                <div className="terminos text-center">
                  <span>
                    <a
                      className="links text-decoration-none text-black-50 mx-2 fw-bold d-inline-block"
                      href="#"
                    >
                      Terminos y condiciones
                    </a>
                  </span>
                  <span>
                    <a
                      className="links text-decoration-none text-black-50 mx-2 fw-bold d-inline-block"
                      href="#"
                    >
                      Politica de Privacidad
                    </a>
                  </span>
                  <span>
                    <a
                      className="links text-decoration-none text-black-50 mx-2 fw-bold d-inline-block"
                      href="#"
                    >
                      Contactanos
                    </a>
                  </span>
                  <span>
                    <a
                      className="links text-decoration-none text-black-50 mx-2 fw-bold d-inline-block mt-lg-3"
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
                <div className="login-contain p-5 bg-white rounded-5 shadow ">
                  <div className="text-center">
                    {/* Inicio de Sesion */}
                    {/* Logo */}
                    <div className="logo">
                      <img src={logo} alt="" />
                    </div>
                  </div>
                  <div>
                    {/* ------------------------------------------- */}
                    <form onSubmit={onSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="text-1 text-login form-label fw-bold"
                        >
                          Usuario
                        </label>
                        <input
                          type="text"
                          {...register("username", { required: true })}
                          className="form-control form-control-lg fs-6 small-placeholder"
                          placeholder="Usuario"
                          style={{ height: "50px" }}
                        />
                        {errors.username && (
                          <p className="text-danger">Username is required</p>
                        )}
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
                          {...register("password", { required: true })}
                          className="form-control form-control-lg fs-6 small-placeholder"
                          placeholder="Contraseña"
                          style={{ height: "50px" }}
                        />
                        {errors.password && (
                          <p className="text-danger">Password is required</p>
                        )}
                      </div>
                      <div className="mb-4 w-100">
                        <span className="w-100 d-flex justify-content-end ">
                          <a
                            className="text-decoration-none mt-3 text-1 text-3 text-login"
                            href="#"
                          >
                            Has olvidado tu contraseña?
                          </a>
                        </span>
                      </div>

                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-inicio-sesion text-white fs-6"
                        >
                          Iniciar Sesion
                        </button>
                      </div>
                      <div>
                        <span className="text-1 text-login">
                          O inicia sesion con
                        </span>
                      <Button onLogin={onLogin} />
                      </div>
                    </form>
                    {/* ------------------------- */}
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
