/**
 * Esqueletos de carga: reproducen la forma real de cada vista (mismos paneles, columnas y alturas)
 * para que al llegar los datos no haya saltos de diseño. Usan el brillo `.skeleton` de style.css
 * (que respeta "reducir movimiento") y se anuncian a los lectores de pantalla como una sola carga.
 */
import PropTypes from "prop-types";

/** Pieza básica: una barra o bloque con brillo. Se dimensiona con clases de Tailwind. */
function Bone({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}
Bone.propTypes = { className: PropTypes.string };

/**
 * Espacio vacío mientras la carga aún no pasa el retardo del esqueleto (ver useSkeletonGate):
 * evita que la página "salte" y no muestra nada para no hacer destellar un esqueleto.
 */
export function PageHold() {
  return (
    <div className="min-h-[60dvh]" role="status" aria-busy="true">
      <span className="sr-only">Cargando…</span>
    </div>
  );
}

/** Envoltorio común: página con estado de carga accesible. */
function SkeletonPage({ label, children }) {
  return (
    <div className="page" role="status" aria-live="polite" aria-busy="true">
      <div aria-hidden="true" className="animate-[fade_0.3s_ease_both]">
        {children}
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
SkeletonPage.propTypes = { label: PropTypes.string.isRequired, children: PropTypes.node.isRequired };

/** Encabezado de página: título, subtítulo y botones de acción. */
function HeaderBones({ actions = 0 }) {
  return (
    <div className="mb-[clamp(20px,3vw,32px)] flex flex-wrap items-end justify-between gap-3.5">
      <div className="grid gap-2">
        <Bone className="h-7 w-44 !rounded-md" />
        <Bone className="h-3.5 w-72 max-w-full !rounded-md" />
      </div>
      {actions > 0 && (
        <div className="flex gap-2.5">
          {Array.from({ length: actions }, (_, i) => (
            <Bone key={i} className="h-11 w-32 !rounded-full" />
          ))}
        </div>
      )}
    </div>
  );
}
HeaderBones.propTypes = { actions: PropTypes.number };

/** Tarjeta del precio pergamino. */
const HeroBones = () => <Bone className="h-[112px] !rounded-[var(--radius-lg)]" />;

/** Panel con título y campos (Precio de mercado). */
function PanelBones({ fields = 2 }) {
  return (
    <div className="panel panel--compact grid gap-3">
      <Bone className="h-5 w-40 !rounded-md" />
      <div className="grid gap-2.5 min-[640px]:grid-cols-2">
        {Array.from({ length: fields }, (_, i) => (
          <div key={i} className="grid gap-1.5">
            <Bone className="h-3 w-28 !rounded-md" />
            <Bone className="h-10" />
          </div>
        ))}
      </div>
    </div>
  );
}
PanelBones.propTypes = { fields: PropTypes.number };

/** Fila "nombre + valor" (precios extras, factores). */
const RowBones = ({ cells = 1 }) => (
  <div className="grid grid-cols-[84px_1fr] items-center gap-3 rounded-[var(--radius)] bg-latte px-3.5 py-2">
    <Bone className="h-4 w-16 !rounded-md" />
    <div className={`grid gap-2.5 ${cells > 1 ? "grid-cols-2" : ""}`}>
      {Array.from({ length: cells }, (_, i) => (
        <Bone key={i} className="h-10 border border-line !bg-none !bg-white" />
      ))}
    </div>
  </div>
);
RowBones.propTypes = { cells: PropTypes.number };

/** Columna de indicadores (Libra, USD, Café). */
const IndicatorBones = () => (
  <div className="grid gap-3">
    {[0, 1, 2].map((i) => (
      <div key={i} className="grid gap-2.5 rounded-[var(--radius)] border border-line bg-card p-4">
        <div className="flex items-center justify-between">
          <Bone className="h-3.5 w-24 !rounded-md" />
          <Bone className="size-6 !rounded-full" />
        </div>
        <Bone className="h-8 w-36 !rounded-md" />
        <Bone className="h-6 w-28 !rounded-full" />
      </div>
    ))}
  </div>
);

/** Inicio (`/dash`). */
export function HomeSkeleton() {
  return (
    <SkeletonPage label="Cargando precios…">
      <HeaderBones actions={2} />
      <div className="dash-grid">
        <div className="dash-main">
          <HeroBones />
          <PanelBones />
          <div className="panel panel--compact grid gap-3">
            <div className="grid gap-2 min-[640px]:grid-cols-2 min-[640px]:gap-5">
              {[0, 1].map((col) => (
                <div key={col} className="grid content-start gap-2">
                  <Bone className="mb-1 h-5 w-36 !rounded-md" />
                  {[0, 1, 2, 3].map((r) => (
                    <RowBones key={r} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="dash-aside">
          <IndicatorBones />
        </aside>
      </div>
    </SkeletonPage>
  );
}

/** Nuevo Futuro (`/dash/nuevo`). */
export function NuevoFuturoSkeleton() {
  return (
    <SkeletonPage label="Cargando precios…">
      <HeaderBones actions={2} />
      <div className="dash-grid">
        <div className="dash-main">
          <HeroBones />
          <PanelBones />
          <div className="panel panel--compact grid gap-3">
            <Bone className="h-5 w-56 !rounded-md" />
            {[0, 1, 2].map((i) => (
              <RowBones key={i} cells={2} />
            ))}
          </div>
        </div>
        <aside className="dash-aside">
          <IndicatorBones />
        </aside>
      </div>
    </SkeletonPage>
  );
}

/** Formulario de configuración (dentro de las pestañas de Configuración, que ya están visibles). */
export function ConfigFormSkeleton() {
  return (
    <div className="form-card animate-[fade_0.3s_ease_both]" role="status" aria-live="polite" aria-busy="true">
      <div aria-hidden="true">
        <Bone className="h-6 w-48 !rounded-md" />
        <Bone className="mt-2 h-3.5 w-72 max-w-full !rounded-md" />
        <div className="mt-[14px] grid gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="grid gap-1.5">
              <Bone className="h-3 w-32 !rounded-md" />
              <Bone className="h-10" />
            </div>
          ))}
          <div className="mt-1 flex justify-end">
            <Bone className="h-11 w-32 !rounded-full" />
          </div>
        </div>
      </div>
      <span className="sr-only">Cargando precios…</span>
    </div>
  );
}

/** Usuarios (`/dash/usuarios`). */
export function UsersSkeleton() {
  return (
    <SkeletonPage label="Cargando usuarios…">
      <HeaderBones actions={1} />
      <div className="mb-4 grid gap-2.5 min-[640px]:grid-cols-[1fr_auto_auto]">
        <Bone className="h-11" />
        <Bone className="h-11 min-[640px]:w-44" />
        <Bone className="h-11 min-[640px]:w-44" />
      </div>
      <div className="grid gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2.5 rounded-[var(--radius)] border border-line bg-card px-4 py-3 min-[992px]:grid-cols-[minmax(0,2.2fr)_120px_110px_150px_132px]"
          >
            <div className="flex items-center gap-3">
              <Bone className="size-10 !rounded-full" />
              <div className="grid gap-1.5">
                <Bone className="h-4 w-32 !rounded-md" />
                <Bone className="h-3 w-44 max-w-full !rounded-md" />
              </div>
            </div>
            <div className="col-span-2 flex gap-3 pl-[52px] min-[992px]:contents">
              <Bone className="h-6 w-20 !rounded-full" />
              <Bone className="h-4 w-16 !rounded-md" />
              <Bone className="h-4 w-24 !rounded-md" />
            </div>
            <div className="row-start-1 col-start-2 flex justify-end gap-1.5 min-[992px]:row-auto min-[992px]:col-auto">
              <Bone className="size-9 !rounded-full" />
              <Bone className="size-9 !rounded-full" />
              <Bone className="size-9 !rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonPage>
  );
}
