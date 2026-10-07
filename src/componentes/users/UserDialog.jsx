import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ROLES, ROLE_LABELS } from "../../config/roles";
import { notify } from "../../lib/notify";

const EMPTY = { username: "", email: "", password: "", role: ROLES.USER, active: true };

const ROLE_HINTS = {
  [ROLES.USER]: "Usa los precios y las ofertas.",
  [ROLES.ADMIN]: "Además gestiona los usuarios.",
};

// Requisitos de la contraseña (los mismos que valida el backend).
const RULES = [
  { label: "8 caracteres o más", test: (v) => v.length >= 8 },
  { label: "Una letra", test: (v) => /[A-Za-z]/.test(v) },
  { label: "Un número", test: (v) => /\d/.test(v) },
];

/** Contraseña aleatoria de 14 caracteres (sin símbolos ambiguos), con generador criptográfico. */
function generatePassword() {
  const letters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const pool = letters + digits;
  const rand = (max) => crypto.getRandomValues(new Uint32Array(1))[0] % max;
  const chars = Array.from({ length: 12 }, () => pool[rand(pool.length)]);
  chars.push(letters[rand(letters.length)], digits[rand(digits.length)]); // siempre cumple letra + número
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = rand(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

// Campo con icono a la izquierda.
const ICON = "pointer-events-none absolute left-3.5 text-[1.2rem] text-ink-soft";
const INPUT = "field__input !pl-11";

/**
 * Diálogo para crear o editar un usuario (usa <dialog> nativo: foco atrapado y Esc gratis).
 *  - `user` = null  → modo crear (usuario y contraseña obligatorios).
 *  - `user` = {...} → modo editar (el usuario no cambia; la contraseña es opcional).
 *  - `isSelf`       → no permite quitarse el rol de administrador ni desactivarse.
 */
function UserDialog({ open, user, isSelf, onClose, onSubmit }) {
  const ref = useRef(null);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const editing = Boolean(user);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY });
  const password = watch("password") ?? "";

  // Abre/cierra el <dialog> según `open` y carga los valores del usuario a editar.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      reset(user ? { ...EMPTY, ...user, password: "" } : EMPTY);
      setServerError("");
      setShowPassword(false);
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, user, reset]);

  const fillGenerated = () => {
    setValue("password", generatePassword(), { shouldValidate: true, shouldDirty: true });
    setShowPassword(true);
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      notify.success("Contraseña copiada", "Pégala donde se la enviarás al usuario.");
    } catch {
      notify.error("No se pudo copiar", "Selecciónala y cópiala manualmente.");
    }
  };

  const submit = handleSubmit(async (values) => {
    setServerError("");
    // En edición solo se envían los campos editables; la contraseña vacía no se cambia.
    const payload = editing
      ? { email: values.email, role: values.role, active: values.active, ...(values.password ? { password: values.password } : {}) }
      : { username: values.username, email: values.email, password: values.password, role: values.role };
    try {
      await onSubmit(payload);
    } catch (error) {
      setServerError(error.message);
    }
  });

  return (
    <dialog ref={ref} className="dialog" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-labelledby="user-dialog-title">
      <form className="dialog__body" onSubmit={submit} noValidate>
        <header className="flex items-start gap-3.5">
          <span className="grid size-11 flex-none place-items-center rounded-full bg-espresso-950 text-[1.35rem] text-white" aria-hidden="true">
            <i className={`bx ${editing ? "bx-user-check" : "bx-user-plus"}`}></i>
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="user-dialog-title" className="font-display text-xl font-semibold leading-tight">
              {editing ? "Editar usuario" : "Nuevo usuario"}
            </h2>
            <p className="mt-0.5 truncate text-sm text-ink-soft">
              {editing ? <>Cuenta de <b className="text-ink">{user.username}</b></> : "Crea un acceso y define qué puede hacer."}
            </p>
          </div>
          <button
            type="button"
            className="grid size-9 flex-none place-items-center rounded-full border-0 bg-transparent text-[1.5rem] text-ink-soft transition-colors duration-150 hover:bg-[#e5e6e8] hover:text-ink"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <i className="bx bx-x" aria-hidden="true"></i>
          </button>
        </header>

        <div className="mt-5 grid gap-4">
          <div className="field">
            <label className="field__label" htmlFor="u-username">Usuario</label>
            <div className="field__control">
              <i className={`bx ${editing ? "bx-lock-alt" : "bx-user"} ${ICON}`} aria-hidden="true"></i>
              <input
                id="u-username"
                className={INPUT}
                autoComplete="off"
                placeholder="nombre.usuario"
                disabled={editing}
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username", {
                  required: !editing && "El usuario es requerido",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  pattern: { value: /^[a-zA-Z0-9._-]*$/, message: "Solo letras, números, punto, guion y guion bajo" },
                })}
              />
            </div>
            {editing && <p className="field__hint">El nombre de usuario no se puede cambiar.</p>}
            {errors.username && <p className="field__error" role="alert">{errors.username.message}</p>}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="u-email">Correo electrónico</label>
            <div className="field__control">
              <i className={`bx bx-envelope ${ICON}`} aria-hidden="true"></i>
              <input
                id="u-email"
                type="email"
                className={INPUT}
                autoComplete="off"
                placeholder="correo@empresa.com"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", { required: "El correo es requerido" })}
              />
            </div>
            {errors.email && <p className="field__error" role="alert">{errors.email.message}</p>}
          </div>

          <div className="field">
            <div className="flex items-center justify-between gap-3">
              <label className="field__label" htmlFor="u-password">
                {editing ? "Nueva contraseña (opcional)" : "Contraseña"}
              </label>
              <button type="button" className="link-btn text-[0.8125rem]" onClick={fillGenerated}>
                <i className="bx bx-refresh" aria-hidden="true"></i> Generar
              </button>
            </div>
            <div className="field__control">
              <i className={`bx bx-lock ${ICON}`} aria-hidden="true"></i>
              <input
                id="u-password"
                type={showPassword ? "text" : "password"}
                className={`${INPUT} !pr-24`}
                autoComplete="new-password"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: !editing && "La contraseña es requerida",
                  validate: (v) => !v || RULES.every(({ test }) => test(v)) || "Mínimo 8 caracteres, con letras y números",
                })}
              />
              <span className="absolute right-1.5 flex items-center">
                {password && (
                  <button type="button" className="grid size-9 place-items-center rounded-full border-0 bg-transparent text-[1.2rem] text-ink-soft hover:bg-[#e5e6e8] hover:text-ink" onClick={copyPassword} title="Copiar" aria-label="Copiar contraseña">
                    <i className="bx bx-copy" aria-hidden="true"></i>
                  </button>
                )}
                <button
                  type="button"
                  className="grid size-9 place-items-center rounded-full border-0 bg-transparent text-[1.3rem] text-ink-soft hover:bg-[#e5e6e8] hover:text-ink"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={showPassword}
                >
                  <i className={`bx ${showPassword ? "bx-hide" : "bx-show"}`} aria-hidden="true"></i>
                </button>
              </span>
            </div>
            {(password || !editing) && (
              <ul className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Requisitos de la contraseña">
                {RULES.map(({ label, test }) => {
                  const ok = test(password);
                  return (
                    <li key={label} className={`inline-flex items-center gap-1 text-xs transition-colors ${ok ? "font-medium text-up" : "text-ink-soft"}`}>
                      <i className={`bx ${ok ? "bxs-check-circle" : "bx-circle"} text-sm`} aria-hidden="true"></i>
                      {label}
                    </li>
                  );
                })}
              </ul>
            )}
            {errors.password && <p className="field__error" role="alert">{errors.password.message}</p>}
          </div>

          <fieldset className="m-0 grid gap-2 border-0 p-0">
            <legend className="field__label mb-1.5 p-0">Rol</legend>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.values(ROLES).map((role) => (
                <label key={role} className={`relative ${isSelf ? "cursor-not-allowed" : "cursor-pointer"}`}>
                  <input type="radio" value={role} disabled={isSelf} className="peer sr-only" {...register("role")} />
                  <span className="flex h-full flex-col gap-0.5 rounded-xl border border-line p-3 transition duration-150 hover:border-[#82848e] peer-checked:border-espresso-950 peer-checked:bg-latte peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#82848e] peer-disabled:opacity-60">
                    <span className="text-sm font-semibold">{ROLE_LABELS[role]}</span>
                    <span className="text-xs leading-snug text-ink-soft">{ROLE_HINTS[role]}</span>
                  </span>
                </label>
              ))}
            </div>
            {isSelf && <p className="field__hint">No puedes cambiar tu propio rol.</p>}
          </fieldset>

          {editing && (
            <label className="switch w-full justify-between rounded-xl border border-line p-3">
              <span>
                <span className="block text-sm font-semibold">Usuario activo</span>
                <span className="block text-xs text-ink-soft">
                  {isSelf ? "No puedes desactivar tu propia cuenta." : "Si lo desactivas, no podrá iniciar sesión."}
                </span>
              </span>
              <input type="checkbox" disabled={isSelf} {...register("active")} />
              <span className="switch__track" aria-hidden="true"></span>
            </label>
          )}

          {serverError && (
            <p className="flex items-start gap-2 rounded-xl bg-down-bg px-3 py-2.5 text-sm font-medium text-down" role="alert">
              <i className="bx bx-error-circle mt-px text-lg" aria-hidden="true"></i>
              {serverError}
            </p>
          )}
        </div>

        <footer className="mt-6 flex justify-end gap-2.5 max-[479px]:flex-col-reverse [&>button]:max-[479px]:w-full">
          <button type="button" className="btn btn--ghost text-[13px]" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn--primary text-[13px]" disabled={isSubmitting}>
            {isSubmitting ? "Guardando…" : editing ? "Guardar cambios" : "Crear usuario"}
          </button>
        </footer>
      </form>
    </dialog>
  );
}

UserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.object,
  isSelf: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserDialog;
