import AppRoutes from "./rutas/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { PreciosProvider } from "./context/PreciosContex";
function App() {
  return (
    <AuthProvider>
      <PreciosProvider>
        <AppRoutes />
      </PreciosProvider>
    </AuthProvider>
  );
}

export default App;
