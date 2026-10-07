/**
 * Política de Tratamiento de Datos Personales (Colombia).
 * Cumple el contenido mínimo del artículo 13 del Decreto 1377 de 2013
 * (compilado en el Decreto 1074 de 2015) y la Ley 1581 de 2012.
 */
import { legalDetails } from "../config/legal";

export const privacyDocument = (legal) => ({
  title: "Política de privacidad y tratamiento de datos personales",
  intro: `En ${legal.brand} protegemos tus datos personales. Esta política explica qué datos recolectamos, para qué los usamos, cómo los protegemos y cómo puedes ejercer tus derechos como titular, de acuerdo con la normativa colombiana.`,
  sections: [
    {
      id: "marco",
      title: "Marco normativo",
      blocks: [
        { p: "Esta política se fundamenta en los artículos 15 y 20 de la Constitución Política de Colombia y en las siguientes normas:" },
        {
          ul: [
            "Ley 1581 de 2012: régimen general de protección de datos personales (habeas data).",
            "Decreto 1377 de 2013, compilado en el Decreto 1074 de 2015: reglamentación parcial de la Ley 1581.",
            "Ley 1266 de 2008: habeas data financiero, en lo que resulte aplicable.",
            "Ley 527 de 1999: mensajes de datos y comercio electrónico.",
            "Ley 1273 de 2009: protección de la información y de los datos.",
            "Circulares y guías de la Superintendencia de Industria y Comercio (SIC), autoridad de protección de datos.",
          ],
        },
      ],
    },
    {
      id: "responsable",
      title: "Responsable del tratamiento",
      blocks: [
        { p: `El responsable del tratamiento de los datos personales es ${legal.brand}. Puedes comunicarte con el responsable a través del botón «Contáctenos» de la página de inicio.` },
        ...(legalDetails(legal).length ? [{ ul: legalDetails(legal) }] : []),
      ],
    },
    {
      id: "definiciones",
      title: "Definiciones",
      blocks: [
        {
          ul: [
            "Titular: persona natural cuyos datos personales son objeto de tratamiento.",
            "Dato personal: cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.",
            "Tratamiento: cualquier operación sobre datos personales, como recolección, almacenamiento, uso, circulación o supresión.",
            "Responsable: quien decide sobre la base de datos y el tratamiento. Encargado: quien trata datos por cuenta del responsable.",
            "Autorización: consentimiento previo, expreso e informado del titular para el tratamiento de sus datos.",
          ],
        },
      ],
    },
    {
      id: "datos",
      title: "Datos que recolectamos",
      blocks: [
        {
          ul: [
            "Datos de identificación y cuenta: nombre de usuario y correo electrónico.",
            "Credenciales: la contraseña se almacena únicamente cifrada mediante un algoritmo de hash irreversible; nunca en texto plano.",
            "Datos de rol y estado de la cuenta (usuario o administrador, activa o inactiva) y fechas de creación y actualización.",
            "Datos de uso de la plataforma: valores de precios que el usuario configura y guarda.",
            "Datos técnicos de seguridad: dirección IP y fecha/hora de las solicitudes en los registros del servidor, y una cookie técnica de sesión.",
            "Datos temporales de recuperación de contraseña: un código de un solo uso, guardado de forma cifrada, que se elimina automáticamente al vencer.",
          ],
        },
        { p: "No recolectamos datos sensibles (los que afectan la intimidad o cuyo uso indebido puede generar discriminación, como salud, origen racial o datos biométricos) ni datos de niños, niñas y adolescentes. La plataforma está dirigida a mayores de edad." },
      ],
    },
    {
      id: "finalidades",
      title: "Finalidades del tratamiento",
      blocks: [
        {
          ul: [
            "Crear, administrar y autenticar las cuentas de usuario y controlar los permisos por rol.",
            "Prestar el servicio: calcular, guardar y mostrar los precios y generar ofertas.",
            "Permitir la recuperación de contraseña y enviar comunicaciones transaccionales y de seguridad.",
            "Prevenir fraudes, accesos no autorizados y abusos, y mantener la seguridad de la plataforma.",
            "Atender consultas, solicitudes, reclamos y requerimientos de autoridades competentes.",
            "Cumplir obligaciones legales y contractuales.",
          ],
        },
        { p: "No vendemos, alquilamos ni usamos tus datos para publicidad o perfilamiento comercial." },
      ],
    },
    {
      id: "autorizacion",
      title: "Autorización",
      blocks: [
        { p: "El tratamiento de datos requiere tu autorización previa, expresa e informada (artículo 9 de la Ley 1581 de 2012). Se otorga al aceptar esta política y al usar la plataforma con la cuenta creada para ti. Puedes revocarla o solicitar la supresión de tus datos en cualquier momento, salvo que exista un deber legal o contractual de conservarlos." },
        { p: "Los Administradores que crean cuentas para otras personas deben haberles informado sobre esta política y contar con su consentimiento." },
      ],
    },
    {
      id: "derechos",
      title: "Derechos de los titulares",
      blocks: [
        { p: "Conforme al artículo 8 de la Ley 1581 de 2012, tienes derecho a:" },
        {
          ul: [
            "Conocer, actualizar y rectificar tus datos personales.",
            "Solicitar prueba de la autorización otorgada.",
            "Ser informado sobre el uso que se ha dado a tus datos.",
            "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.",
            "Revocar la autorización y/o solicitar la supresión de tus datos cuando no se respeten los principios, derechos y garantías legales.",
            "Acceder de forma gratuita a tus datos personales objeto de tratamiento.",
          ],
        },
      ],
    },
    {
      id: "consultas",
      title: "Consultas y reclamos",
      blocks: [
        { p: `Para ejercer tus derechos comunícate con ${legal.brand} ${legal.privacyEmail ? `escribiendo a ${legal.privacyEmail}` : "a través del botón «Contáctenos» de la página de inicio"}, indicando tu identificación, la descripción de tu solicitud, una dirección de contacto y los documentos que quieras hacer valer.` },
        {
          ul: [
            "Consultas: las atenderemos en un máximo de diez (10) días hábiles contados desde su recibo. Si no es posible, te informaremos los motivos y la nueva fecha, que no superará cinco (5) días hábiles adicionales (artículo 14).",
            "Reclamos (corrección, actualización, supresión o por presunto incumplimiento): los atenderemos en un máximo de quince (15) días hábiles; si no es posible, te informaremos el motivo y la nueva fecha, que no superará ocho (8) días hábiles adicionales (artículo 15).",
            "Si tu reclamo está incompleto, te pediremos subsanarlo dentro de los cinco (5) días siguientes a su recibo.",
            "Solo puedes acudir a la Superintendencia de Industria y Comercio una vez agotado este trámite ante el responsable (artículo 16).",
          ],
        },
      ],
    },
    {
      id: "seguridad",
      title: "Medidas de seguridad",
      blocks: [
        {
          ul: [
            "Contraseñas cifradas con hash y nunca almacenadas en texto plano.",
            "Sesión mediante cookie protegida (httpOnly) que el código del navegador no puede leer.",
            "Control de acceso por roles y revisión del estado de la cuenta en cada solicitud.",
            "Límites de intentos de acceso y de recuperación de contraseña; códigos de un solo uso con vencimiento.",
            "Cifrado de las comunicaciones (HTTPS) en producción.",
          ],
        },
        { p: "Ningún sistema es infalible. Si ocurre un incidente que afecte tus datos, lo gestionaremos y, cuando corresponda, lo reportaremos a la SIC conforme a la ley." },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        { p: "Usamos únicamente una cookie técnica y necesaria para mantener tu sesión iniciada (vence en 24 horas o al cerrar sesión). No usamos cookies publicitarias ni de seguimiento de terceros." },
      ],
    },
    {
      id: "terceros",
      title: "Transmisión y transferencia de datos",
      blocks: [
        { p: "No vendemos tus datos. Para operar la plataforma contamos con proveedores que actúan como encargados del tratamiento (por ejemplo, alojamiento, base de datos y envío de correos electrónicos), con quienes se suscriben las obligaciones de confidencialidad y seguridad exigidas por la ley." },
        { p: "Algunos de estos proveedores pueden almacenar información fuera de Colombia. Cuando ocurra, la transferencia o transmisión internacional se hará conforme al artículo 26 de la Ley 1581 de 2012 y a las instrucciones de la SIC. También podremos entregar información a autoridades cuando exista un requerimiento legal." },
      ],
    },
    {
      id: "conservacion",
      title: "Conservación de los datos",
      blocks: [
        { p: "Conservamos tus datos mientras tu cuenta esté activa y por el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales. Después los suprimimos o anonimizamos. Los códigos de recuperación se eliminan automáticamente al vencer." },
      ],
    },
    {
      id: "rnbd",
      title: "Registro Nacional de Bases de Datos",
      blocks: [
        { p: "Cuando sea exigible conforme a la normativa vigente, las bases de datos serán inscritas en el Registro Nacional de Bases de Datos (RNBD) administrado por la SIC." },
      ],
    },
    {
      id: "cambios",
      title: "Cambios y vigencia",
      blocks: [
        { p: `Esta política rige desde su publicación y puede ser actualizada. La versión vigente estará siempre en esta página con su fecha de actualización (${legal.updatedAt}). Si los cambios son sustanciales, te lo informaremos por un medio eficaz antes de implementarlos.` },
      ],
    },
  ],
});
