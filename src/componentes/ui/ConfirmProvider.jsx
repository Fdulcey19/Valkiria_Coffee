/**
 * Diálogo de confirmación basado en promesas.
 *
 *   const confirm = useConfirm();
 *   if (await confirm({ title: "¿Eliminar?", tone: "danger" })) { ... }
 * Opciones: title, text, confirmText, cancelText, tone ("default" | "danger") e icon (clase de boxicons).
 *
 * Usa <dialog> nativo: foco atrapado, cierre con Esc y accesible sin dependencias.
 */
import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ConfirmContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  if (!confirm) throw new Error("useConfirm debe estar dentro de ConfirmProvider");
  return confirm;
};

export function ConfirmProvider({ children }) {
  const [request, setRequest] = useState(null);
  const ref = useRef(null);

  const confirm = useCallback(
    (options) => new Promise((resolve) => setRequest({ ...options, resolve })),
    []
  );

  const settle = useCallback(
    (result) => {
      request?.resolve(result);
      setRequest(null);
    },
    [request]
  );

  // Sincroniza el <dialog> nativo con el estado.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (request && !dialog.open) dialog.showModal();
    if (!request && dialog.open) dialog.close();
  }, [request]);

  const tone = request?.tone ?? "default";

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <dialog
        ref={ref}
        className="dialog dialog--confirm"
        aria-labelledby="confirm-title"
        onCancel={(e) => {
          e.preventDefault(); // Esc: se resuelve como "cancelar" a través del estado
          settle(false);
        }}
        onClick={(e) => e.target === ref.current && settle(false)}
      >
        {request && (
          <div className="dialog__body">
            <div className={`confirm__icon confirm__icon--${tone}`} aria-hidden="true">
              <i className={`bx ${request.icon ?? (tone === "danger" ? "bx-trash" : "bx-help-circle")}`}></i>
            </div>
            <h2 id="confirm-title" className="confirm__title">{request.title}</h2>
            {request.text && <p className="confirm__text">{request.text}</p>}
            <footer className="dialog__foot dialog__foot--center !mt-5 !gap-2.5">
              <button type="button" className="btn btn--ghost min-h-[42px] px-5 text-[15px]" onClick={() => settle(false)}>
                {request.cancelText ?? "Cancelar"}
              </button>
              <button
                type="button"
                className={`btn min-h-[42px] px-5 text-[15px] ${tone === "danger" ? "btn--danger-solid" : "btn--primary"}`}
                onClick={() => settle(true)}
                autoFocus
              >
                {request.confirmText ?? "Confirmar"}
              </button>
            </footer>
          </div>
        )}
      </dialog>
    </ConfirmContext.Provider>
  );
}

ConfirmProvider.propTypes = { children: PropTypes.node.isRequired };
