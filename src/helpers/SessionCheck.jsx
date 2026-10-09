import { useEffect, useState } from "react";
import { LoadingScreen } from "../componentes/ui/StatusScreen";
import { hasSessionHint } from "./sessionHint";

/**
 * Lo que se ve mientras se verifica la sesión. Primero nada (pantalla en blanco del mismo color de fondo);
 * el esqueleto solo aparece si hay pista de sesión previa Y la verificación tarda más de 350 ms.
 * Así, quien no tiene sesión y escribe /dash va directo al login sin ver el esqueleto del panel.
 */
function SessionCheck() {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (!hasSessionHint()) return undefined;
    const id = setTimeout(() => setShowSkeleton(true), 350);
    return () => clearTimeout(id);
  }, []);

  if (showSkeleton) return <LoadingScreen text="Verificando sesión…" />;
  return <div aria-busy="true" style={{ minHeight: "100dvh" }} />;
}

export default SessionCheck;
