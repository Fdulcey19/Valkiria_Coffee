/**
 * Menú de la zona privada, definido como datos.
 *  - `roles`: si se indica, solo esos roles ven la opción (sin `roles` = todos).
 *  - `match`: rutas que marcan la opción como activa.
 * El menú oculta lo que no corresponde, pero la protección real está en el backend
 * y en RoleRoute; ocultar un enlace no es seguridad.
 */
import { ROLES } from "./roles";

export const NAV_ITEMS = [
  { to: "/dash", label: "Inicio", icon: "bx-home-alt-2", match: ["/dash", "/dash/share"] },
  { to: "/dash/nuevo", label: "Nuevo Futuro", icon: "bx-leaf", match: ["/dash/nuevo", "/dash/nuevoshare"] },
  { to: "/dash/usuarios", label: "Usuarios", icon: "bx-group", match: ["/dash/usuarios"], roles: [ROLES.ADMIN] },
  { to: "/dash/configuracion", label: "Configuración", icon: "bx-slider-alt", match: ["/dash/configuracion"] },
];

/** Opciones del menú visibles para un rol. */
export const navItemsFor = (role) =>
  NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role));

/** ¿La ruta `pathname` pertenece a esta opción del menú? */
export const isNavActive = (pathname, match) =>
  match.some((m) => pathname === m || (m !== "/dash" && pathname.startsWith(`${m}/`)));
