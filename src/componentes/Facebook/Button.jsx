

function Button(onLogin) {
    const facebookLogin = () => {
        if (!window.FB) return;
    
        // Hacer Login
        window.FB.getLoginStatus((response) => {
          if (response.status === "connected") {
            // Leer los datos del perfil
            facebookLoginHandler(response);
          } else {
            // Intentar iniciar sesion
            window.FB.login(facebookLoginHandler, {
              scope: "public_profile, email",
            });
          }
        });
      };
    
      const facebookLoginHandler = (response) => {
        console.log("Respuesta de facebook", response);
        if (response.status === "connected") {
          console.log("Ya estas conectado");
          // Leer los datos del perfil
        }  else {
            window.FB.api("me?fields=id,name,email,picture", (userData) => {
              console.log("Datos del usuario de Facebook", userData);
              const user = {
                ...userData,
                accessToken: response.authResponse.accessToken,
              };
              const token = response.authResponse.accessToken;
                console.log(token);
                
              onLogin(user);
            });
          }
      };
  return (
    <button onClick={facebookLogin} className="btn-primary"><i className='bx bxl-facebook'></i> Continuar con Facebook</button>
  )
}

export default Button