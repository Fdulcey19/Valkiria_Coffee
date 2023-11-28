import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/LoginRegister";
import Sidebar from "../componentes/Sidebar";
import Home from "../pages/Home";
import NuevoFuturo from "../pages/NuevoFuturo";
import ValkiriaShare from "../pages/ValkiriaShare";
import NuevoFuturoShare from "../pages/NuevoFuturoShare";

function AppRoutes() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Sidebar/>}>
            <Route index  element={<Home/>} />
            <Route path="nuevo"  element={<NuevoFuturo/>} />
            <Route path="share"  element={<ValkiriaShare/>} />
            <Route path="nuevo/share"  element={<NuevoFuturoShare/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
