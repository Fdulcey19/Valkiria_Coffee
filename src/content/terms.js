/**
 * Términos y Condiciones de uso de la plataforma Valkiria (Colombia).
 * Cada sección: { id, title, blocks }, donde un bloque es { p } (párrafo) o { ul } (lista).
 * Los datos del responsable salen de config/legal.js.
 */
import { legalDetails } from "../config/legal";

export const termsDocument = (legal) => ({
  title: "Términos y condiciones de uso",
  intro: `Estos términos regulan el acceso y uso de la plataforma ${legal.brand}. Léelos con atención: al ingresar o usar la plataforma declaras que los entiendes y que los aceptas.`,
  sections: [
    {
      id: "aceptacion",
      title: "Aceptación y objeto",
      blocks: [
        { p: `${legal.brand} es una herramienta web para empresas cafeteras que calcula precios de compra de café pergamino a partir de cotizaciones del mercado y de la tasa de cambio, permite guardar valores base de cálculo y genera ofertas de compra en formato de imagen para compartir.` },
        { p: "El acceso y uso de la plataforma implica la aceptación plena de estos Términos y Condiciones y de la Política de Privacidad. La aceptación por medios electrónicos tiene plena validez y efectos jurídicos conforme a la Ley 527 de 1999 (comercio electrónico y mensajes de datos). Si no estás de acuerdo, debes abstenerte de usar la plataforma." },
      ],
    },
    {
      id: "definiciones",
      title: "Definiciones",
      blocks: [
        {
          ul: [
            `Plataforma: el sitio web y los servicios de ${legal.brand}.`,
            `Responsable: el titular de la plataforma (${legal.brand}).`,
            "Usuario: persona con una cuenta activa que usa la plataforma.",
            "Administrador: usuario con permisos para crear, editar, desactivar y eliminar otras cuentas.",
            "Oferta: la imagen de precios que la plataforma genera para que el usuario la comparta con terceros.",
          ],
        },
      ],
    },
    {
      id: "cuentas",
      title: "Cuentas, acceso y seguridad",
      blocks: [
        { p: "El acceso es solo para usuarios autorizados. Las cuentas son creadas por un Administrador; no existe registro público. Cada cuenta es personal e intransferible." },
        {
          ul: [
            "Eres responsable de custodiar tu usuario, contraseña y los códigos de recuperación que recibas, y de toda actividad realizada con tu cuenta.",
            "Debes informar de inmediato cualquier uso no autorizado o sospecha de vulneración de tu cuenta.",
            "Las contraseñas deben tener mínimo 8 caracteres, con letras y números.",
            "El Responsable o un Administrador pueden desactivar o eliminar una cuenta cuando se incumplan estos términos, cuando deje de ser necesaria o por razones de seguridad.",
            "Existen límites de intentos de inicio de sesión y de solicitudes de recuperación para proteger las cuentas.",
          ],
        },
      ],
    },
    {
      id: "uso",
      title: "Uso permitido y conductas prohibidas",
      blocks: [
        { p: "Te obligas a usar la plataforma de forma lícita, de buena fe y conforme a estos términos. Está prohibido:" },
        {
          ul: [
            "Acceder sin autorización a cuentas, sistemas o datos, o intentar vulnerar, probar o eludir las medidas de seguridad. Estas conductas pueden constituir delitos informáticos conforme a la Ley 1273 de 2009.",
            "Suplantar a otra persona o compartir tus credenciales.",
            "Realizar ingeniería inversa, extraer información de forma masiva (scraping) o sobrecargar la plataforma.",
            "Introducir código malicioso o interferir con el funcionamiento del servicio.",
            "Usar la plataforma para fines ilícitos, fraudulentos o contrarios a la ley colombiana.",
          ],
        },
      ],
    },
    {
      id: "informacion",
      title: "Información de mercado, cálculos y ofertas",
      blocks: [
        { p: "Los precios, cotizaciones y tasas mostrados provienen de fuentes de terceros y pueden presentar retrasos, interrupciones o errores. Son informativos y no constituyen asesoría financiera, de inversión ni una garantía de precio." },
        {
          ul: [
            "Los valores calculados dependen de los parámetros (diferencias, primas, bonificaciones) que configura el propio usuario o su empresa; su definición es responsabilidad exclusiva de quien los ingresa.",
            "Antes de tomar decisiones o publicar una oferta, debes verificar las cifras. La plataforma no garantiza que coincidan con el precio final de una negociación.",
            "Las ofertas generadas son comunicaciones del usuario que las comparte, quien responde por su contenido y por su confirmación. Las ofertas no constituyen por sí mismas un contrato de compraventa y deben ser confirmadas con la contraparte, según lo indicado en cada oferta.",
          ],
        },
      ],
    },
    {
      id: "propiedad",
      title: "Propiedad intelectual",
      blocks: [
        { p: `El software, diseño, textos, marcas y logotipos de ${legal.brand} están protegidos por la Ley 23 de 1982, la Decisión Andina 351 de 1993, la Ley 1915 de 2018 y demás normas de propiedad intelectual. Se concede al usuario una licencia limitada, personal, revocable y no exclusiva para usar la plataforma mientras tenga una cuenta activa.` },
        { p: "Los nombres y logotipos de los aliados que aparecen en la plataforma pertenecen a sus respectivos titulares y se muestran con fines de reconocimiento. Su aparición no implica cesión de derechos ni garantía alguna." },
      ],
    },
    {
      id: "datos",
      title: "Protección de datos personales",
      blocks: [
        { p: "El tratamiento de datos personales se rige por la Ley 1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015) y la Política de Privacidad, que forma parte integral de estos términos." },
        { p: "Si eres Administrador y creas cuentas para otras personas, declaras que cuentas con su conocimiento y que les has informado sobre la Política de Privacidad." },
      ],
    },
    {
      id: "disponibilidad",
      title: "Disponibilidad y cambios del servicio",
      blocks: [
        { p: "Procuramos mantener la plataforma disponible, pero no garantizamos un servicio ininterrumpido ni libre de errores. Pueden presentarse suspensiones por mantenimiento, fallas de proveedores de infraestructura o de las fuentes de datos externas. Podemos modificar, añadir o retirar funciones cuando sea necesario." },
      ],
    },
    {
      id: "responsabilidad",
      title: "Limitación de responsabilidad",
      blocks: [
        { p: "En la máxima medida permitida por la ley colombiana, el Responsable no responde por daños indirectos, lucro cesante o pérdidas derivadas de decisiones tomadas con base en la información de la plataforma, de la indisponibilidad de fuentes de terceros, del uso indebido de credenciales por parte del usuario, ni de eventos de fuerza mayor o caso fortuito (artículo 64 del Código Civil)." },
        { p: "Nada en estos términos limita la responsabilidad que no pueda excluirse por ley, como la derivada de dolo o culpa grave, ni los derechos irrenunciables que correspondan al usuario conforme al Estatuto del Consumidor (Ley 1480 de 2011) cuando este resulte aplicable." },
      ],
    },
    {
      id: "terminacion",
      title: "Suspensión y terminación",
      blocks: [
        { p: "Podemos suspender o cerrar el acceso de un usuario que incumpla estos términos o ponga en riesgo la seguridad de la plataforma. El usuario puede dejar de usar la plataforma en cualquier momento y solicitar la eliminación de su cuenta mediante los canales indicados en la Política de Privacidad." },
      ],
    },
    {
      id: "modificaciones",
      title: "Modificaciones de los términos",
      blocks: [
        { p: `Podemos actualizar estos términos. La versión vigente estará siempre publicada en esta página con su fecha de actualización (${legal.updatedAt}). El uso de la plataforma después de la publicación de los cambios implica su aceptación; si los cambios afectan de forma sustancial el tratamiento de datos personales, se solicitará nuevamente la autorización cuando la ley lo exija.` },
      ],
    },
    {
      id: "ley",
      title: "Ley aplicable y solución de controversias",
      blocks: [
        { p: `Estos términos se rigen por las leyes de la República de Colombia. Las partes procurarán resolver cualquier diferencia de forma directa y, de no ser posible, mediante conciliación. Agotadas estas instancias, será competente la jurisdicción ordinaria colombiana. Las quejas por el tratamiento de datos personales pueden presentarse ante la Superintendencia de Industria y Comercio (SIC).` },
      ],
    },
    {
      id: "contacto",
      title: "Contacto",
      blocks: [
        { p: `Si tienes preguntas sobre estos términos, puedes comunicarte con ${legal.brand} a través del botón «Contáctenos» de la página de inicio.` },
        ...(legalDetails(legal).length ? [{ ul: legalDetails(legal) }] : []),
      ],
    },
  ],
});
