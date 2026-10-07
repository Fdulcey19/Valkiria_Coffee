import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import stacked from "../assets/images/logo4.png";
import AuthShell from "../componentes/auth/AuthShell";
import { useAuth } from "../context/useAuth";
import { safeReturnPath } from "../helpers/returnPath";

function LoginRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      const ok = await signIn(values);
      if (ok) {
        // Vuelve a la ruta que se pidió antes del login (solo rutas internas de /dash, con sus parámetros).
        navigate(safeReturnPath(location.state?.from), { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <AuthShell
      title={<>Soluciones informáticas que <em>funcionan</em> para su empresa cafetera</>}
      text="Precios del mercado, cálculo por lote y ofertas listas para compartir, en un solo lugar."
    >
      <div className="w-full max-w-[440px] animate-[rise_0.45s_var(--ease)_both] rounded-[var(--radius-lg)] border border-line bg-card p-[clamp(20px,4vw,28px)] min-[992px]:p-10 [box-shadow:var(--shadow)] md:max-w-[440px]">
        <img className="mx-auto mb-3 w-16 min-[992px]:mb-[18px] min-[992px]:w-[84px]" src={stacked} alt="Valkiria" width="84" height="55" />
        <h1 className="text-center font-display text-2xl font-semibold min-[992px]:text-[1.55rem] tracking-[-0.01em]">Bienvenido</h1>
        <p className="mt-1.5 text-center text-ink-soft text-[13px]">Ingresa con tu usuario para continuar.</p>

        <form className="mt-5 grid gap-3.5 min-[992px]:mt-7 min-[992px]:gap-[18px]" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="username">
              Usuario o correo
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck="false"
              placeholder="Tu usuario o correo"
              className="field__input"
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby={errors.username ? "username-error" : undefined}
              {...register("username", { required: "Ingresa tu usuario o correo", setValueAs: (v) => v.trim() })}
            />
            {errors.username && (
              <p className="field__error" id="username-error" role="alert">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="password">
              Contraseña
            </label>
            <div className="field__control">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Tu contraseña"
                className="field__input"
                style={{ paddingRight: 52 }}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password", {
                  required: "Ingresa tu contraseña",
                  minLength: { value: 6, message: "Debe tener al menos 6 caracteres" },
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
            {errors.password && (
              <p className="field__error" id="password-error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link to="/forgot-password" className="ml-auto w-fit text-sm font-semibold text-accent hover:underline">¿Olvidaste tu contraseña?</Link>

          <button type="submit" className="btn btn--primary btn--lg btn--block text-[14px]" disabled={submitting}>
            {submitting ? "Ingresando…" : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink-soft min-[992px]:mt-5 [&_a:hover]:underline [&_a]:font-semibold [&_a]:text-accent">
          <Link to="/">← Volver al inicio</Link>
        </p>
      </div>
    </AuthShell>
  );
}

export default LoginRegister;
