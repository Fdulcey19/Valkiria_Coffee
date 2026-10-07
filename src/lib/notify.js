/**
 * Notificaciones de la aplicación (toasts).
 * Envoltorio sobre `sonner`: el resto del código usa `notify` y nunca importa la librería
 * directamente, así cambiarla toca un solo archivo (y el <Toaster> de App.jsx).
 */
import { toast } from "sonner";

export const notify = {
  success: (title, description) => toast.success(title, { description }),
  error: (title, description) => toast.error(title, { description, duration: 6000 }),
  info: (title, description) => toast.info(title, { description }),
};
