/** Roles de la aplicación (deben coincidir con los del backend). */
export const ROLES = Object.freeze({ USER: "user", ADMIN: "admin" });

export const ROLE_LABELS = {
  [ROLES.USER]: "Usuario",
  [ROLES.ADMIN]: "Administrador",
};
