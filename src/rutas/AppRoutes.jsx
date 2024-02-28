import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/LoginRegister";
import Sidebar from "../componentes/Sidebar";
import Home from "../pages/Home";
import NuevoFuturo from "../pages/NuevoFuturo";
import ValkiriaShare from "../pages/ValkiriaShare";
import NuevoFuturoShare from "../pages/NuevoFuturoShare";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../helpers/ProtectedRoute";
import NotFound from "../pages/NotFound";
import ValkiriaCreate from "../componentes/Precios/ValkiriaCreate";
import NuevoCreate from "../componentes/Precios/NuevoCreate";
import Nuevou from "../componentes/Precios/NuevoFuturo";
import Valkiriau from "../componentes/Precios/Valkiria";
import NavConfiguracion from "../componentes/NavConfiguracion";
function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dash" element={<Sidebar />}>
              <Route index element={<Home />} />
              <Route path="nuevo" element={<NuevoFuturo />} />
              <Route path="share" element={<ValkiriaShare />} />
              <Route path="nuevoshare" element={<NuevoFuturoShare />} />
              <Route path="valkiriau" element={<Valkiriau />} />
              <Route path="nuevou" element={<Nuevou />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="configuracion" element={<NavConfiguracion />}>
                <Route index element={<Valkiriau />} />
                <Route path="nuevo" element={<Nuevou />} />
                <Route path="valkiria" element={<ValkiriaCreate />} />
                <Route path="nuevofuturo" element={<NuevoCreate />} />
              </Route>
            </Route>
          </Route>

          {/* Ruta para manejar 404 Not Found fuera de las rutas protegidas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
