/**
 * Módulo de usuarios (solo administradores).
 * Permite listar, crear, editar (rol, estado, contraseña) y eliminar usuarios.
 * La autorización real la hace el backend; la ruta además está bajo <RoleRoute>.
 */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { notify } from "../lib/notify";
import { useConfirm } from "../componentes/ui/ConfirmProvider";
import UserDialog from "../componentes/users/UserDialog";
import UserAuditLog from "../componentes/users/UserAuditLog";
import { ErrorScreen } from "../componentes/ui/StatusScreen";
import { PageHold, UsersSkeleton } from "../componentes/ui/Skeletons";
import { useSkeletonGate } from "../hooks/useSkeletonGate";
import { ROLES, ROLE_LABELS } from "../config/roles";
import { useAuth } from "../context/useAuth";
import Pagination from "../componentes/ui/Pagination";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useUsers from "../hooks/useUsers";

// Columnas de la tabla en escritorio; en tablet y celular cada fila es una tarjeta de 2 columnas.
const COLS = "grid grid-cols-[minmax(0,1fr)_auto] min-[992px]:grid-cols-[minmax(0,2.2fr)_120px_110px_150px_132px]";
// Botones de acción: sin relleno ni borde; el icono se resalta en gris al pasar el cursor.
const ICON_BTN =
  "grid size-9 place-items-center rounded-full border-0 bg-transparent text-ink-soft transition duration-150 hover:bg-[#e5e6e8] hover:text-ink active:scale-95";

const formatDate = (iso) => new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

function UsersPage() {
  const { user: me } = useAuth();
  const [filters, setFilters] = useState({ page: 1, limit: 10, search: "", role: "", active: "" });
  // El buscador espera a que se deje de escribir antes de consultar al servidor.
  const search = useDebouncedValue(filters.search);
  const { items: users, total, totalPages, loading, fetching, loadError, reload, createUser, updateUser, deleteUser } = useUsers({
    ...filters,
    search,
  });
  const gate = useSkeletonGate(loading);
  const [params] = useSearchParams();
  const view = params.get("vista") === "historial" ? "historial" : "usuarios"; // pestaña activa, en la URL (?vista=historial)
  const [dialog, setDialog] = useState({ open: false, user: null });
  const confirm = useConfirm();

  /** Cambia un filtro y vuelve a la página 1 (el resultado puede tener menos páginas). */
  const setFilter = (name) => (e) => setFilters((f) => ({ ...f, [name]: e.target.value, page: 1 }));

  // Si tras eliminar quedó vacía la última página, retrocede a la anterior.
  useEffect(() => {
    if (!loading && filters.page > totalPages) setFilters((f) => ({ ...f, page: totalPages }));
  }, [loading, totalPages, filters.page]);

  const closeDialog = () => setDialog((d) => ({ ...d, open: false }));

  /** Crea o actualiza según el modo del diálogo; si falla, el error vuelve al formulario. */
  const handleSubmit = async (payload) => {
    if (dialog.user) {
      // Apagar el interruptor "Usuario activo" es desactivar la cuenta: también se confirma.
      if (dialog.user.active && payload.active === false && !(await confirmActiveChange(dialog.user))) return;
      await updateUser(dialog.user.id, payload);
      notify.success("Usuario actualizado");
    } else {
      await createUser(payload);
      notify.success("Usuario creado");
    }
    closeDialog();
  };

  /** Pide confirmación antes de desactivar o activar una cuenta (ambas quedan en el historial). */
  const confirmActiveChange = (u) =>
    u.active
      ? confirm({
          title: `¿Desactivar a ${u.username}?`,
          text: "No podrá iniciar sesión hasta que lo actives de nuevo. La acción queda registrada en el historial.",
          confirmText: "Sí, desactivar",
          icon: "bx-block",
        })
      : confirm({
          title: `¿Activar a ${u.username}?`,
          text: "Podrá volver a iniciar sesión. La acción queda registrada en el historial.",
          confirmText: "Sí, activar",
          icon: "bx-check-circle",
        });

  const toggleActive = async (u) => {
    if (!(await confirmActiveChange(u))) return;
    try {
      await updateUser(u.id, { active: !u.active });
      notify.success(u.active ? "Usuario desactivado" : "Usuario activado");
    } catch (error) {
      notify.error("No se pudo cambiar el estado", error.message);
    }
  };

  const confirmDelete = async (u) => {
    const accepted = await confirm({
      title: `¿Eliminar a ${u.username}?`,
      text: "Dejará de poder entrar y desaparecerá de la lista. La acción queda registrada en el historial.",
      confirmText: "Sí, eliminar",
      tone: "danger",
    });
    if (!accepted) return;
    try {
      await deleteUser(u.id);
      notify.success("Usuario eliminado");
    } catch (error) {
      notify.error("No se pudo eliminar", error.message);
    }
  };

  if (gate.waiting) return <PageHold />;
  if (gate.skeleton) return <UsersSkeleton />;
  if (loadError) return <ErrorScreen onRetry={reload} />;

  return (
    <div className={`page ${gate.settled ? "page--settled" : ""}`}>
      <header className="page-header">
        <div>
          <h1>Usuarios</h1>
          <p>Crea accesos y define quién es administrador. {total > 0 && <>Hay <b>{total}</b> {total === 1 ? "usuario" : "usuarios"}.</>}</p>
        </div>
        <div className="page-header__actions">
          <button type="button" className="btn btn--primary text-[14px]" onClick={() => setDialog({ open: true, user: null })}>
            <i className="bx bx-user-plus" aria-hidden="true"></i> Nuevo usuario
          </button>
        </div>
      </header>

      {/* Pestañas: la vista activa viaja en la URL (?vista=historial) */}
      <nav className="tabs" aria-label="Secciones de usuarios">
        <Link to="?" preventScrollReset className={`tabs__item ${view === "usuarios" ? "tabs__item--active" : ""}`} aria-current={view === "usuarios" ? "page" : undefined}>
          <i className="bx bx-group mr-2 text-[1.1rem]" aria-hidden="true"></i> Usuarios
        </Link>
        <Link to="?vista=historial" preventScrollReset className={`tabs__item ${view === "historial" ? "tabs__item--active" : ""}`} aria-current={view === "historial" ? "page" : undefined}>
          <i className="bx bx-history mr-2 text-[1.1rem]" aria-hidden="true"></i> Historial
        </Link>
      </nav>

      {view === "historial" ? (
        <UserAuditLog />
      ) : (
        <>
        <div className="toolbar" role="search">
          <div className="toolbar__search">
            <i className="bx bx-search" aria-hidden="true"></i>
            <input
              type="search"
              className="field__input"
              placeholder="Buscar por usuario o correo"
              aria-label="Buscar usuarios"
              value={filters.search}
              onChange={setFilter("search")}
              maxLength={50}
              style={{fontSize:"14.5px"}}
            />
          </div>
          <select style={{fontSize:"14.5px"}} className="field__input toolbar__select" aria-label="Filtrar por rol" value={filters.role} onChange={setFilter("role")}>
            <option value="" >Todos los roles</option>
            {Object.values(ROLES).map((r) => (
              <option key={r} value={r}>{ROLE_LABELS[r]}</option>
            ))}
          </select>
          <select style={{fontSize:"14.5px"}} className="field__input toolbar__select" aria-label="Filtrar por estado" value={filters.active} onChange={setFilter("active")}>
            <option value="" style={{fontSize:"14px !important"}}>Cualquier estado</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>

        {users.length === 0 && (
          <div className="empty">
            <i className="bx bx-user-x" aria-hidden="true"></i>
            <p>No hay usuarios que coincidan con la búsqueda.</p>
          </div>
        )}

        {/* Encabezados de la tabla (solo escritorio; en tablet y celular cada usuario es una tarjeta) */}
        {users.length > 0 && (
          <div
            className={`${COLS} mb-2 hidden gap-x-4 px-4 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink-soft min-[992px]:grid`}
            aria-hidden="true"
          >
            <span>Usuario</span>
            <span>Rol</span>
            <span>Estado</span>
            <span>Creado</span>
            <span className="text-right">Acciones</span>
          </div>
        )}

        <ul className={`user-list grid gap-2 ${fetching ? "user-list--loading" : ""}`} aria-label="Lista de usuarios" aria-busy={fetching}>
          {users.map((u) => {
            const isSelf = u.id === me?.id;
            const isAdmin = u.role === ROLES.ADMIN;
            return (
              <li
                key={u.id}
                className={`${COLS} items-center gap-x-4 gap-y-2.5 rounded-[var(--radius)] border border-line px-4 py-3 transition duration-200 hover:border-[var(--crema)] hover:[box-shadow:var(--shadow)] ${
                  u.active ? "bg-card" : "bg-latte"
                }`}
              >
                {/* Identidad */}
                <div className={`flex min-w-0 items-center gap-3 ${u.active ? "" : "opacity-70"}`}>
                  {/* Avatar con indicador de estado: punto verde = cuenta activa, gris = inactiva */}
                  <span className="relative shrink-0">
                    <span
                      className={`grid size-10 place-items-center rounded-full border font-display font-semibold uppercase ${
                        isAdmin ? "border-espresso-950 bg-espresso-950 text-white" : "border-transparent bg-[#e5e6e8] text-ink"
                      }`}
                      aria-hidden="true"
                    >
                      {u.username.charAt(0)}
                    </span>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 ${
                        u.active ? "border-white bg-up" : "border-[#f4f3f3] bg-[#82848e]"
                      }`}
                      aria-hidden="true"
                    ></span>
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-x-2 font-semibold leading-tight">
                      <span className="truncate">{u.username}</span>
                      {isSelf && (
                        <span className="rounded-full bg-[#e5e6e8] px-2 py-px text-[0.625rem] font-bold uppercase tracking-wider text-ink-soft">
                          Tú
                        </span>
                      )}
                    </p>
                    <p className="truncate text-sm text-ink-soft">{u.email}</p>
                  </div>
                </div>

                {/* Rol · estado · fecha (en escritorio cada uno es su columna) */}
                <div className="col-span-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 pl-[52px] min-[992px]:contents">
                  <span className="justify-self-start">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        isAdmin ? "bg-espresso-950 text-white" : "bg-[#e5e6e8] text-ink-soft"
                      }`}
                    >
                      {ROLE_LABELS[u.role]}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                    <span className={`size-2.5 rounded-full ${u.active ? "bg-up shadow-[0_0_0_3px_rgba(0,183,74,0.18)]" : "bg-[#82848e]"}`} aria-hidden="true"></span>
                    {u.active ? "Activo" : "Inactivo"}
                  </span>
                  <span className="whitespace-nowrap text-sm text-ink-soft">
                    <span className="min-[992px]:hidden">Creado el </span>
                    {formatDate(u.createdAt)}
                  </span>
                </div>

                {/* Acciones: botones de ícono con descripción */}
                <div className="row-start-1 col-start-2 flex items-center justify-end gap-1.5 min-[992px]:row-auto min-[992px]:col-auto">
                  <button type="button" className={ICON_BTN} onClick={() => setDialog({ open: true, user: u })} title="Editar" aria-label={`Editar a ${u.username}`}>
                    <i className="bx bx-edit text-[1.3rem]" aria-hidden="true"></i>
                  </button>
                  {!isSelf && (
                    <>
                      <button
                        type="button"
                        className={ICON_BTN}
                        onClick={() => toggleActive(u)}
                        title={u.active ? "Desactivar" : "Activar"}
                        aria-label={`${u.active ? "Desactivar" : "Activar"} a ${u.username}`}
                      >
                        <i className={`bx ${u.active ? "bx-block" : "bx-check-circle"} text-[1.3rem]`} aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className={`${ICON_BTN} hover:!bg-down-bg hover:!text-down`}
                        onClick={() => confirmDelete(u)}
                        title="Eliminar"
                        aria-label={`Eliminar a ${u.username}`}
                      >
                        <i className="bx bx-trash text-[1.3rem]" aria-hidden="true"></i>
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <Pagination
          page={filters.page}
          limit={filters.limit}
          total={total}
          totalPages={totalPages}
          disabled={fetching}
          onPage={(page) => setFilters((f) => ({ ...f, page }))}
          onLimit={(limit) => setFilters((f) => ({ ...f, limit, page: 1 }))}
        />
        </>
      )}

      <UserDialog
        open={dialog.open}
        user={dialog.user}
        isSelf={dialog.user?.id === me?.id}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default UsersPage;
