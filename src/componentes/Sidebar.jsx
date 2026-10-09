import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/valkiria3.png";
import mark from "../assets/images/valkiria5.png";
import { useAuth } from "../context/useAuth";
import Nav from "./Nav";
import { isNavActive, navItemsFor } from "../config/navigation";
import { canViewTransition, withViewTransition } from "../lib/viewTransition";

// Elemento del menú lateral. Con el menú contraído (`data-collapsed` en la raíz) solo se ve el icono.
const NAV_ITEM =
  "relative flex min-h-12 w-full items-center gap-3.5 rounded-xl border-0 text-[15px] px-3.5 text-left font-medium transition duration-150 group-data-[collapsed=true]/shell:justify-center group-data-[collapsed=true]/shell:px-0";
const NAV_ITEM_IDLE = "bg-transparent text-ink hover:translate-x-[3px] hover:bg-latte";
const NAV_ITEM_ACTIVE = "bg-espresso-950 font-semibold text-white";
const COLLAPSIBLE = "group-data-[collapsed=true]/shell:hidden";

// Rutas que contraen el menú lateral al entrar.
const AUTO_COLLAPSE_ON = ["/dash", "/dash/nuevo"];

// Elemento de la barra inferior (móvil y tablet).
const TAB = "flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl border-0 p-1 text-[0.6875rem] font-semibold transition duration-150 active:scale-[0.94]";

/** Layout de la zona privada: sidebar (escritorio) · barra inferior (móvil y tablet). */
function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut, user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Al entrar a Inicio o Nuevo Futuro (las pantallas con más contenido) el menú se contrae solo para dar espacio.
  // Solo reacciona al cambio de ruta: si la persona lo vuelve a abrir, se respeta hasta que cambie de pantalla.
  useEffect(() => {
    if (AUTO_COLLAPSE_ON.includes(pathname)) setCollapsed(true);
  }, [pathname]);
  // Menú dinámico: solo las opciones permitidas para el rol del usuario.
  const items = navItemsFor(user?.role);

  /** Cambia de ruta con un desvanecido cruzado (donde el navegador lo soporta); si no, navega normal. */
  const smoothTo = (to) => (event) => {
    const plainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
    if (!plainClick || !canViewTransition() || pathname === to) return;
    event.preventDefault();
    withViewTransition(() => navigate(to));
  };

  return (
    <div
      data-collapsed={collapsed}
      className="group/shell min-h-dvh [--sidebar-w:268px] data-[collapsed=true]:[--sidebar-w:92px] min-[992px]:grid min-[992px]:grid-cols-[var(--sidebar-w)_minmax(0,1fr)] min-[992px]:transition-[grid-template-columns] min-[992px]:duration-[240ms]"
    >
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <aside
        className="sticky top-0 hidden h-dvh flex-col gap-2 overflow-y-auto border-r border-line bg-white px-4 py-[22px] text-ink min-[992px]:flex"
        aria-label="Navegación principal"
      >
        <div className="flex min-h-16 items-center justify-between gap-2 px-2 pb-[18px] pt-1 group-data-[collapsed=true]/shell:flex-col group-data-[collapsed=true]/shell:justify-center group-data-[collapsed=true]/shell:pb-3">
          <img className={`h-10 w-auto ${COLLAPSIBLE}`} src={logo} alt="Valkiria" width="120" height="28" />
          <img className="hidden w-[44px] group-data-[collapsed=true]/shell:block" src={mark} alt="Valkiria" width="34" height="25" />
          <button
            type="button"
            className="grid size-9 flex-none place-items-center rounded-full border-0 bg-espresso-950 text-[1.3rem] text-white transition-colors duration-150 hover:bg-roast"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            aria-expanded={!collapsed}
          >
            <i className={`bx ${collapsed ? "bx-chevron-right" : "bx-chevron-left"}`} aria-hidden="true"></i>
          </button>
        </div>

        <p className={`px-3 pb-1.5 pt-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ink-soft ${COLLAPSIBLE}`}>Menú</p>
        <nav className="grid gap-1">
          {items.map(({ to, label, icon, match }) => {
            const active = isNavActive(pathname, match);
            return (
              <Link
                key={to}
                to={to}
                onClick={smoothTo(to)}
                className={`${NAV_ITEM} ${active ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE}`}
                aria-current={active ? "page" : undefined}
                title={collapsed ? label : undefined}
              >
                <i className={`bx ${icon} flex-none text-[1.4rem]`} aria-hidden="true"></i>
                <span className={COLLAPSIBLE}>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-line pt-3.5">
          <button
            type="button"
            className={`${NAV_ITEM} ${NAV_ITEM_IDLE}`}
            onClick={signOut}
            title={collapsed ? "Cerrar sesión" : undefined}
          >
            <i className="bx bx-log-out flex-none text-[1.4rem]" aria-hidden="true"></i>
            <span className={COLLAPSIBLE}>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      <div className="min-w-0 pb-[84px] min-[992px]:pb-0">
        <Nav />
        <main id="contenido" tabIndex={-1}>
          <Outlet />
        </main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[repeat(var(--cols,4),1fr)] border-t border-line bg-white px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] min-[992px]:hidden"
        aria-label="Navegación principal"
        style={{ "--cols": items.length + 1 }}
      >
        {items.map(({ to, label, icon, match }) => {
          const active = isNavActive(pathname, match);
          return (
            <Link
              key={to}
              to={to}
              onClick={smoothTo(to)}
              className={`${TAB} ${active ? "bg-espresso-950 text-white" : "bg-transparent text-ink-soft"}`}
              aria-current={active ? "page" : undefined}
            >
              <i className={`bx ${icon} text-[1.45rem]`} aria-hidden="true"></i>
              {label}
            </Link>
          );
        })}
        <button type="button" className={`${TAB} bg-transparent text-ink-soft`} onClick={signOut}>
          <i className="bx bx-log-out text-[1.45rem]" aria-hidden="true"></i>
          Salir
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
