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
        console.log("Ya estás conectado");
  
        // Llamada a la API de Facebook para obtener información del usuario
        window.FB.api("/me?fields=id,name,email,picture", { access_token: response.authResponse.accessToken }, (userData) => {
          console.log("Datos del usuario de Facebook", userData);
  
          const user = {
            ...userData,
            accessToken: response.authResponse.accessToken,
          };
  
          // Almacena el usuario en local storage
          window.localStorage.setItem("Token", JSON.stringify(user));
  
          // Llama a la función onLogin con la información del usuario
          onLogin(user);
        });
      } else {
        console.log("No estás conectado");
      }
    };
  
    return (
      <button onClick={facebookLogin} className="btn-primary"><i className='bx bxl-facebook'></i> Continuar con Facebook</button>
    )
  }
  
  export default Button;