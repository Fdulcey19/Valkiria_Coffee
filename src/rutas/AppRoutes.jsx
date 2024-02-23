import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/LoginRegister";
import Sidebar from "../componentes/Sidebar";
import Home from "../pages/Home";
import NuevoFuturo from "../pages/NuevoFuturo";
import ValkiriaShare from "../pages/ValkiriaShare";
import NuevoFuturoShare from "../pages/NuevoFuturoShare";
import Configuracion from "../pages/Configuracion";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../helpers/ProtectedRoute";
import NotFound from "../pages/NotFound";
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
              <Route path="nuevo/share" element={<NuevoFuturoShare />} />
              <Route path="configuracion" element={<Configuracion />} />
              <Route path="register" element={<RegisterPage />} />
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
