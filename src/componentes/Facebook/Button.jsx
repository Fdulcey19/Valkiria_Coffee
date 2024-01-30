import PropTypes from 'prop-types';

function Button({ onLogin }) {
  const facebookLoginHandler = (response) => {
    console.log("Respuesta de facebook", response);
    if (response.status === "connected") {
      console.log("Ya estas conectado");
      // Leer los datos del perfil

      window.FB.api("me?fields=id,name,email,picture", (userData) => {
        console.log("Datos del usuario de Facebook", userData);
        console.log(userData);

        // Llamada a la función onLogin pasando los datos del usuario
        onLogin(userData);
      });
    }
  };

  const facebookLogin = () => {
    if (!window.FB) return;

    // Hacer Login
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        // Leer los datos del perfil
        facebookLoginHandler(response);
      } else {
        // Intentar iniciar sesión
        window.FB.login(facebookLoginHandler, {
          scope: "public_profile,email",
        });
      }
    });
  };

  return (
    <button onClick={facebookLogin} className="btn btn-success">
      <i className="bx bxl-facebook"></i> Continuar con Facebook
    </button>
  );
}

Button.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Button;