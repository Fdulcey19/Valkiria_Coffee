/**
 * Datos del Responsable del Tratamiento y de la versión de los textos legales.
 *
 * Los campos de contacto son OPCIONALES: los que se dejen vacíos ("") simplemente no
 * aparecen en los documentos. Cuando la empresa tenga los datos, basta con
 * completarlos aquí y se mostrarán solos en Términos y Política de Privacidad.
 */
export const LEGAL = {
  brand: "Valkiria",
  legalName: "",
  nit: "",
  address: "",
  city: "",
  phone: "",
  /** Correo para consultas y reclamos de datos personales (habeas data). */
  privacyEmail: "",
  /** Fecha de la última actualización de ambos documentos. */
  updatedAt: "1 de octubre de 2026",
};

/** Líneas "Etiqueta: valor" solo de los datos que sí están definidos. */
export const legalDetails = (legal) =>
  [
    legal.legalName && `Razón social / nombre: ${legal.legalName}`,
    legal.nit && `NIT / identificación: ${legal.nit}`,
    (legal.address || legal.city) && `Domicilio: ${[legal.address, legal.city].filter(Boolean).join(", ")}`,
    legal.phone && `Teléfono: ${legal.phone}`,
    legal.privacyEmail && `Correo: ${legal.privacyEmail}`,
  ].filter(Boolean);
