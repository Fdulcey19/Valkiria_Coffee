/**
 * Restablecer la contraseña desde el enlace del correo: /reset-password#token=…
 *
 *  - El token viaja en el fragmento (#), que el navegador no envía al servidor; aquí se lee y se
 *    borra de la barra de direcciones para que no quede en el historial ni en capturas.
 *  - Antes de mostrar el formulario se comprueba que el enlace siga vigente (15 min, un solo uso).
 *  - Al cambiar la contraseña el enlace queda inutilizable y se cierran las demás sesiones.
 */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import stacked from "../assets/images/logo4.png";
import AuthShell from "../componentes/auth/AuthShell";
import { CARD, FOOT, FORM, MARK, SUB, TITLE } from "../componentes/auth/authStyles";
import { checkResetTokenRequest, resetPasswordRequest } from "../api/auth";
import { errorText } from "../api/errors";
import { notify } from "../lib/notify";

/** Lee `#token=…` de la URL (solo una vez: el estado conserva el valor). */
const tokenFromHash = () => new URLSearchParams(window.location.hash.slice(1)).get("token") || "";

function ResetPassword() {
  const navigate = useNavigate();
  const [token] = useState(tokenFromHash);
  const [status, setStatus] = useState(token ? "checking" : "invalid"); // checking | valid | invalid
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  // Oculta el token de la barra de direcciones y comprueba que el enlace siga vigente.
  useEffect(() => {
    if (window.location.hash) window.history.replaceState(null, "", window.location.pathname);
    if (!token) return undefined;
    let cancelled = false;
    checkResetTokenRequest(token)
      .then(() => !cancelled && setStatus("valid"))
      .catch(() => !cancelled && setStatus("invalid"));
    return () => {
      cancelled = true;
    };
  }, [token]);

  const onSubmit = handleSubmit(async ({ password }) => {
    setFormError("");
    try {
      await resetPasswordRequest({ token, password });
      notify.success("Contraseña actualizada", "Ya puedes iniciar sesión con tu nueva contraseña.");
      navigate("/login", { replace: true });
    } catch (error) {
      // 400 con mensaje de contraseña = no cumple la política; otro 400 = el enlace venció o ya se usó;
      // sin respuesta = problema de conexión (se puede reintentar).
      const message = errorText(error, "No pudimos conectar con el servidor.");
      if (error?.response?.status === 400 && !/password/i.test(message)) setStatus("invalid");
      else setFormError(message);
    }
  });

  return (
    <AuthShell
      title={<>Crea una nueva <em>contraseña</em></>}
      text="Elige una contraseña segura. El enlace del correo se desactiva en cuanto la cambies."
    >
      <div className={CARD}>
        <img className={MARK} src={stacked} alt="Valkiria" width="84" height="55" />

        {status === "checking" && (
          <p className={SUB} role="status">Verificando enlace…</p>
        )}

        {status === "invalid" && (
          <div>
            <h1 className={TITLE}>Enlace no válido</h1>
            <p className={SUB}>
              Este enlace venció (dura 15 minutos), ya se usó o no es correcto. Solicita uno nuevo para continuar.
            </p>
            <Link to="/forgot-password" className="btn btn--primary btn--lg btn--block mt-5">
              Pedir un enlace nuevo
            </Link>
          </div>
        )}

        {status === "valid" && (
          <div>
            <h1 className={TITLE}>Nueva contraseña</h1>
            <p className={SUB}>Escríbela dos veces para confirmarla.</p>

            <form className={FORM} onSubmit={onSubmit} noValidate>
              <div className="field">
                <label className="field__label" htmlFor="rp-password">Nueva contraseña</label>
                <div className="field__control">
                  <input
                    id="rp-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="field__input pr-[52px]"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                      required: "Ingresa la nueva contraseña",
                      validate: (v) =>
                        (v.length >= 8 && v.length <= 72 && /[A-Za-z]/.test(v) && /\d/.test(v)) ||
                        "Mínimo 8 caracteres, con letras y números",
                    })}
                  />
                  <button
                    type="button"
                    className="field__toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={showPassword}
                  >
                    <i className={`bx ${showPassword ? "bx-hide" : "bx-show"}`} aria-hidden="true"></i>
                  </button>
                </div>
                {errors.password && <p className="field__error" role="alert">{errors.password.message}</p>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="rp-confirm">Confirma la contraseña</label>
                <input
                  id="rp-confirm"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="field__input"
                  aria-invalid={errors.confirm ? "true" : "false"}
                  {...register("confirm", {
                    required: "Confirma la contraseña",
                    validate: (v) => v === getValues("password") || "Las contraseñas no coinciden",
                  })}
                />
                {errors.confirm && <p className="field__error" role="alert">{errors.confirm.message}</p>}
              </div>

              {formError && <p className="field__error" role="alert">{formError}</p>}

              <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={isSubmitting}>
                {isSubmitting ? "Guardando…" : "Cambiar contraseña"}
              </button>
            </form>
          </div>
        )}

        <p className={FOOT}>
          <Link to="/login">← Volver al inicio de sesión</Link>
        </p>
      </div>
    </AuthShell>
  );
}

export default ResetPassword;
