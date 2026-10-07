import { useEffect, useState } from "react";
import { getUserAuditRequest } from "../../api/users";
import { ROLE_LABELS } from "../../config/roles";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import Pagination from "../ui/Pagination";

// Cómo se muestra cada acción registrada (etiqueta, ícono y color).
const ACTIONS = {
  create: { label: "Creó", icon: "bx-user-plus", tone: "bg-espresso-950 text-white" },
  activate: { label: "Activó", icon: "bx-check-circle", tone: "bg-[#e6f7dc] text-up" },
  deactivate: { label: "Desactivó", icon: "bx-block", tone: "bg-[#e5e6e8] text-ink" },
  role_change: { label: "Cambió el rol", icon: "bx-shield-quarter", tone: "bg-[#e5e6e8] text-ink" },
  email_change: { label: "Cambió el correo", icon: "bx-envelope", tone: "bg-[#e5e6e8] text-ink" },
  password_change: { label: "Cambió la contraseña", icon: "bx-lock-alt", tone: "bg-[#e5e6e8] text-ink" },
  delete: { label: "Eliminó", icon: "bx-trash", tone: "bg-down-bg text-down" },
};

const COLS = "grid min-[992px]:grid-cols-[212px_172px_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.4fr)_104px]";

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("es-CO", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });

/** Texto del detalle según la acción (nunca incluye contraseñas: el backend no las guarda). */
function detail(row) {
  switch (row.action) {
    case "create":
      return `Rol: ${ROLE_LABELS[row.to] ?? row.to}`;
    case "role_change":
      return `${ROLE_LABELS[row.from] ?? row.from} → ${ROLE_LABELS[row.to] ?? row.to}`;
    case "email_change":
      return `${row.from} → ${row.to}`;
    case "activate":
      return "La cuenta quedó activa";
    case "deactivate":
      return "La cuenta quedó inactiva";
    case "delete":
      return `Estaba ${row.from ?? "—"}. Baja lógica: se conserva el registro`;
    case "password_change":
      return "Nueva contraseña definida por un administrador";
    default:
      return "";
  }
}

/** Historial de administración de usuarios: quién hizo qué, a quién, cuándo y desde dónde. */
function UserAuditLog() {
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "", action: "" });
  const search = useDebouncedValue(filters.search);
  const [data, setData] = useState({ items: [], total: 0, totalPages: 1 });
  const [state, setState] = useState("loading"); // loading | ready | error
  const { page, limit, action } = filters;

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => (s === "ready" ? "ready" : "loading"));
    getUserAuditRequest({ page, limit, ...(search && { search }), ...(action && { action }) }, controller.signal)
      .then((res) => {
        setData(res.data);
        setState("ready");
      })
      .catch((error) => {
        if (error.code !== "ERR_CANCELED") setState("error");
      });
    return () => controller.abort();
  }, [page, limit, search, action]);

  const setFilter = (name) => (e) => setFilters((f) => ({ ...f, [name]: e.target.value, page: 1 }));

  return (
    <section aria-label="Historial de acciones sobre usuarios">
      <div className="toolbar" role="search">
        <div className="toolbar__search">
          <i className="bx bx-search" aria-hidden="true"></i>
          <input
            type="search"
            className="field__input"
            placeholder="Buscar por usuario afectado, correo o quien lo hizo"
            aria-label="Buscar en el historial"
            value={filters.search}
            onChange={setFilter("search")}
            maxLength={60}
          />
        </div>
        <select className="field__input toolbar__select" aria-label="Filtrar por acción" value={filters.action} onChange={setFilter("action")}>
          <option value="">Todas las acciones</option>
          {Object.entries(ACTIONS).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {state === "error" && (
        <p className="field__error mb-3" role="alert">No se pudo cargar el historial. Inténtalo de nuevo en unos segundos.</p>
      )}

      {state === "loading" && (
        <div className="grid gap-2" role="status" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-[68px]" />
          ))}
          <span className="sr-only">Cargando historial…</span>
        </div>
      )}

      {state === "ready" && data.items.length === 0 && (
        <div className="empty">
          <i className="bx bx-history" aria-hidden="true"></i>
          <p>Todavía no hay acciones registradas{filters.search || filters.action ? " con ese filtro" : ""}.</p>
        </div>
      )}

      {state === "ready" && data.items.length > 0 && (
        <>
          <div
            className={`${COLS} mb-2 hidden gap-x-4 px-4 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink-soft`}
            aria-hidden="true"
          >
            <span>Fecha y hora</span>
            <span>Acción</span>
            <span>Realizada por</span>
            <span>Usuario afectado</span>
            <span>Detalle</span>
            <span>Origen (IP)</span>
          </div>
          <ul className="grid gap-2" aria-label="Acciones registradas">
            {data.items.map((row) => {
              const meta = ACTIONS[row.action] ?? { label: row.action, icon: "bx-info-circle", tone: "bg-[#e5e6e8] text-ink" };
              return (
                <li
                  key={row._id}
                  className={`${COLS} items-center gap-x-4 gap-y-1.5 rounded-[var(--radius)] border border-line bg-card px-4 py-3 text-sm`}
                >
                  <time className="whitespace-nowrap text-ink-soft" dateTime={row.createdAt} title={new Date(row.createdAt).toISOString()}>
                    {formatDateTime(row.createdAt)}
                  </time>
                  <span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.tone}`}>
                      <i className={`bx ${meta.icon} text-sm`} aria-hidden="true"></i>
                      {meta.label}
                    </span>
                  </span>
                  <span className="min-w-0 truncate">
                    <span className="text-ink-soft min-[992px]:hidden">Por </span>
                    <b className="font-semibold">{row.actorUsername}</b>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">
                      <span className="font-normal text-ink-soft min-[992px]:hidden">A </span>
                      {row.targetUsername}
                    </span>
                    {row.targetEmail && <span className="block truncate text-xs text-ink-soft">{row.targetEmail}</span>}
                  </span>
                  <span className="min-w-0 text-ink-soft [overflow-wrap:anywhere]">{detail(row)}</span>
                  <span className="text-xs text-ink-soft [overflow-wrap:anywhere]">{row.ip ?? "—"}</span>
                </li>
              );
            })}
          </ul>
          <Pagination
            page={filters.page}
            limit={filters.limit}
            total={data.total}
            totalPages={data.totalPages}
            onPage={(p) => setFilters((f) => ({ ...f, page: p }))}
            onLimit={(l) => setFilters((f) => ({ ...f, limit: l, page: 1 }))}
          />
        </>
      )}
    </section>
  );
}

export default UserAuditLog;
