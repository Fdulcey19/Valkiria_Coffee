/**
 * Recuperación de contraseña: el usuario escribe su correo y recibe un enlace de un solo uso
 * (vence en 15 minutos) que lo lleva a /reset-password para crear la nueva contraseña.
 *
 * La pantalla nunca revela si el correo existe (el backend responde igual en ambos casos).
 */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import stacked from "../assets/images/logo4.png";
import AuthShell from "../componentes/auth/AuthShell";
import { CARD, FOOT, FORM, MARK, SUB, TITLE } from "../componentes/auth/authStyles";
import { forgotPasswordRequest } from "../api/auth";
import { errorText } from "../api/errors";

const RESEND_SECONDS = 60;

/** Cuenta regresiva en segundos; `restart()` la reinicia. */
function useCountdown() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);
  return [seconds, () => setSeconds(RESEND_SECONDS)];
}

function ForgotPassword() {
  const [sentTo, setSentTo] = useState(""); // correo al que se envió el enlace ("" = aún no)
  const [formError, setFormError] = useState("");
  const [resending, setResending] = useState(false);
  const [seconds, restartCountdown] = useCountdown();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  /** Pide (o re-pide) el enlace. */
  const requestLink = async (address) => {
    setFormError("");
    try {
      await forgotPasswordRequest(address);
      setSentTo(address);
      restartCountdown();
    } catch (error) {
      setFormError(errorText(error, "No pudimos conectar con el servidor."));
    }
  };

  const onSubmit = handleSubmit(({ email }) => requestLink(email.trim().toLowerCase()));

  const resend = async () => {
    setResending(true);
    await requestLink(sentTo);
    setResending(false);
  };

  return (
    <AuthShell
      title={<>Recupera el acceso a tu <em>cuenta</em></>}
      text="Te enviaremos un enlace a tu correo para crear una nueva contraseña. Vence en 15 minutos."
    >
      <div className={CARD}>
        <img className={MARK} src={stacked} alt="Valkiria" width="84" height="55" />

        {sentTo ? (
          <div key="sent">
            <h1 className={TITLE}>Hemos enviado tu correo de recuperación</h1>
            <p className={SUB}>
              Abre el enlace que te enviamos para crear una nueva contraseña. Dura <b>15 minutos</b> y solo se
              puede usar una vez.
            </p>
            <p className="mt-3 text-center text-sm text-ink-soft">
              ¿No llega? Revisa la carpeta de spam o pide otro enlace.
            </p>

            {formError && <p className="field__error mt-3 text-center" role="alert">{formError}</p>}

            <Link to="/login" className="btn btn--primary btn--lg btn--block mt-5 text-[14px]">
              Volver al inicio
            </Link>

            <div className="mt-4 flex flex-wrap justify-between gap-2">
              <button type="button" className="link-btn" onClick={() => { setSentTo(""); setFormError(""); }}>
                Cambiar correo
              </button>
              <button type="button" className="link-btn" onClick={resend} disabled={seconds > 0 || resending}>
                {seconds > 0 ? `Reenviar enlace en ${seconds}s` : "Reenviar enlace"}
              </button>
            </div>
          </div>
        ) : (
          <div key="email">
            <h1 className={TITLE}>¿Olvidaste tu contraseña?</h1>
            <p className={SUB}>Escribe tu correo y te enviaremos un enlace para recuperarla.</p>

            <form className={FORM} onSubmit={onSubmit} noValidate>
              <div className="field">
                <label className="field__label" htmlFor="fp-email">Correo electrónico</label>
                <input
                  id="fp-email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  className="field__input"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Ingresa tu correo",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Correo no válido" },
                  })}
                />
                {errors.email && <p className="field__error" role="alert">{errors.email.message}</p>}
              </div>
              {formError && <p className="field__error" role="alert">{formError}</p>}
              <button type="submit" className="btn btn--primary btn--lg btn--block text-[14px]" disabled={isSubmitting}>
                {isSubmitting ? "Enviando…" : "Enviar enlace"}
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

export default ForgotPassword;
