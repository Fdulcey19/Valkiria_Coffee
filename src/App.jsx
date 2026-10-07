import { Toaster } from "sonner";
import AppRoutes from "./rutas/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { PreciosProvider } from "./context/PreciosContex";
import { ConfirmProvider } from "./componentes/ui/ConfirmProvider";

function App() {
  return (
    <ConfirmProvider>
      <AuthProvider>
        <PreciosProvider>
          <AppRoutes />
        </PreciosProvider>
      </AuthProvider>
      {/* Toasts globales (ver lib/notify.js) */}
      <Toaster
        position="top-center"
        theme="light"
        offset={16}
        mobileOffset={12}
        gap={10}
        visibleToasts={3}
        toastOptions={{
          style: {
            fontFamily: "var(--font-body)",
            borderRadius: 16,
            border: "1px solid var(--line)",
            boxShadow: "var(--shadow)",
          },
          classNames: {
            title: "!font-semibold",
            description: "!text-[var(--ink-soft)]",
            // Solo el ícono lleva el color del tipo; la tarjeta se mantiene blanca y limpia.
            success: "[&_[data-icon]]:!text-[#00b74a]",
            error: "[&_[data-icon]]:!text-[#b3322a]",
            info: "[&_[data-icon]]:!text-[#585962]",
          },
        }}
      />
    </ConfirmProvider>
  );
}

export default App;
