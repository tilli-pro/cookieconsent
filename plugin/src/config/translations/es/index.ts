import type { Translation } from "@tilli-pro/cookieconsent";

import type { CookieTableHeaders } from "../../cookies/types";
import cookies from "../../cookies";
import CookieIcon from "../../gui-options/html-components/assets/CookieIcon";
import TilliXCallout from "../../gui-options/html-components/TilliXCallout";

const __LANGUAGE__ = "es"; // "Spanish" ("Español")

const COOKIE_TABLE_HEADERS: CookieTableHeaders = {
  name: "Nombre",
  service: "Servicio",
  description: "Descripción",
  expiration: "Vencimiento",
};

export default {
  consentModal: {
    title: `${CookieIcon()} Aviso de Cookies`,
    description: `{{revisionMessage}}Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies estrictamente necesarias son esenciales para el funcionamiento de este sitio y no se pueden desactivar. Otras cookies requieren tu consentimiento. Al hacer clic en "Aceptar todas", consientes el uso de nuestras cookies. Alternativamente, puedes gestionar tus preferencias de cookies seleccionando el botón "Gestionar preferencias" a continuación. Puedes revisar y actualizar tus preferencias de cookies en cualquier momento mediante el icono ${CookieIcon(1, 0.5, 0, -0.3333)} en la esquina inferior derecha. Por favor, lee nuestra <a id="tilli-cc-privacy-policy-link-consent" href="https://tilli.pro/privacy-policy" target="_blank">Política de Privacidad</a> para más información.`,
    acceptAllBtn: "Aceptar todas",
    acceptNecessaryBtn: "Solo estrictamente necesarias",
    showPreferencesBtn: "Gestionar preferencias",
    // closeIconLabel: "Cerrar", // generates a big "X" ("accept necessary") button – let's disable it for now (to force a choice)
    revisionMessage: `Nuestra <a id="tilli-cc-privacy-policy-link-revision" href="https://tilli.pro/privacy-policy" target="_blank">Política de Privacidad</a> se actualizó recientemente. <br><br> `,
    footer: `
      <a id="tilli-cc-privacy-policy-link-footer" href="https://tilli.pro/privacy-policy" target="_blank">Política de Privacidad</a>
      <a id="tilli-cc-terms-and-conditions-link-footer" href="https://tilli.pro/industries/terms-and-conditions" target="_blank">Términos y Condiciones</a>

      ${TilliXCallout(__LANGUAGE__)}
    `,
  },

  preferencesModal: {
    title: `${TilliXCallout(__LANGUAGE__, 1)} Gestionar preferencias de cookies`,
    acceptAllBtn: "Aceptar todas",
    acceptNecessaryBtn: "Solo estrictamente necesarias",
    savePreferencesBtn: "Guardar preferencias",
    closeIconLabel: "Cerrar",
    sections: [
      {
        title: "Uso de cookies",
        description:
          'Utilizamos cookies para garantizar la funcionalidad básica del sitio web y para mejorar tu experiencia en línea. Puedes elegir, para cada categoría, habilitarlas o deshabilitarlas cuando lo desees. Para más detalles relacionados con cookies y otros datos sensibles, por favor lee la <a id="tilli-cc-privacy-policy-link-preferences" href="https://tilli.pro/privacy-policy" target="_blank">Política de Privacidad</a> completa.',
      },

      {
        title: "Cookies estrictamente necesarias",
        description:
          "Estas cookies son esenciales para el funcionamiento básico del sitio web. Permiten funcionalidades clave como la seguridad y la accesibilidad. Sin estas cookies, ciertos servicios y funcionalidades pueden no funcionar correctamente.",
        linkedCategory: "necessary",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.necessary.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Cookies de rendimiento",
      //   description:
      //     "Estas cookies nos ayudan a entender cómo interactúas con nuestro sitio web para mejorar su rendimiento. Rastrean métricas como vistas de página, tiempos de carga o cualquier error encontrado, permitiéndonos identificar y resolver problemas.",
      //   linkedCategory: "performance",
      // },

      {
        title: "Cookies funcionales",
        description:
          "Estas cookies recuerdan tus preferencias y configuraciones para personalizar tu experiencia de navegación, como recordar tus elecciones de idioma o tema.",
        linkedCategory: "functional",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.functional.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Cookies de publicidad",
      //   description:
      //     "Estas cookies se utilizan para mostrar anuncios relevantes según tus intereses. Pueden rastrear tu comportamiento de navegación en diferentes sitios y ayudar a los anunciantes a ofrecer anuncios más personalizados.",
      //   linkedCategory: "advertising",
      // },

      {
        title: "Cookies de análisis",
        description:
          "Estas cookies recopilan datos anonimizados para ayudarnos a entender cómo los visitantes interactúan con nuestro sitio web. Los conocimientos que proporcionan nos ayudan a mejorar la experiencia del usuario.",
        linkedCategory: "analytics",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.analytics.datadog(__LANGUAGE__)],
        },
      },

      {
        title: "Cookies de marketing",
        description:
          "Estas cookies se utilizan para mostrar anuncios relevantes según tus intereses. Pueden rastrear tu comportamiento de navegación en diferentes sitios y ayudar a los anunciantes a ofrecer anuncios más personalizados.",
        linkedCategory: "marketing",
      },
      
      {
        // title: "Más información",
        title: "",
        description:
          'Para cualquier consulta relacionada con nuestra política de cookies y tus opciones, por favor <a href="mailto:privacy@tilli.pro">contáctanos</a>.',
      },
    ],
  },
} satisfies Translation;
