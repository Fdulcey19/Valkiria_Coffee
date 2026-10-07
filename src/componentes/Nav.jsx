import { useLocation } from "react-router-dom";
import logo from "../assets/images/valkiria3.png";
import { useAuth } from "../context/useAuth";
import Clock from "./ui/Clock";
import { ROLE_LABELS } from "../config/roles";

const TITLES = [
  ["/dash/configuracion", "Configuración"],
  ["/dash/nuevo", "Nuevo Futuro"],
  ["/dash/usuarios", "Usuarios"],
  ["/dash", "Valkiria"],
];

const titleFor = (pathname) => TITLES.find(([prefix]) => pathname.startsWith(prefix))?.[1] ?? "Valkiria";

/** Barra superior de la app. */
function Nav() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const name = user?.username ?? "";

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-3 border-b border-line bg-white/90 px-gutter backdrop-blur-[10px] min-[992px]:min-h-[72px] min-[992px]:overflow-hidden min-[992px]:after:pointer-events-none min-[992px]:after:absolute min-[992px]:after:inset-y-0 min-[992px]:after:right-0 min-[992px]:after:z-0 min-[992px]:after:w-[clamp(320px,30vw,460px)] min-[992px]:after:bg-[linear-gradient(100deg,#e5e6e8_0%,#a9abb3_28%,#82848e_52%,#585962_78%,#3a3a3f_100%)] min-[992px]:after:content-[''] min-[992px]:after:[clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]">
      <div className="relative z-10 min-[992px]:hidden">
        <img className="h-[26px] w-auto" src={logo} alt="Valkiria" width="96" height="26" />
      </div>
      <h2 className="relative z-10 hidden font-display text-[1.05rem] font-semibold min-[992px]:block">{titleFor(pathname)}</h2>
      <div className="relative z-10 flex items-center gap-2.5">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-[0.8125rem] font-semibold text-ink-soft">
          <i className="bx bx-time-five text-[1.05rem] text-espresso-950" aria-hidden="true"></i>
          <Clock />
        </span>
        <span className="inline-flex items-center gap-2.5 text-sm font-semibold min-[992px]:text-white">
          <span
            className="grid size-[38px] place-items-center rounded-full bg-espresso-950 font-display font-semibold uppercase text-white"
            aria-hidden="true"
          >
            {name.charAt(0) || "?"}
          </span>
          <span className="hidden leading-tight min-[640px]:inline">
            {name}
            <small className="block text-[0.6875rem] font-medium text-ink-soft min-[992px]:text-white/85">
              {ROLE_LABELS[user?.role]}
            </small>
          </span>
        </span>
      </div>
    </header>
  );
}

export default Nav;
