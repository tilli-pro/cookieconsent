import type { Translation } from "@tilli-pro/cookieconsent";

import type { CookieTableHeaders } from "../../cookies/types";
import cookies from "../../cookies";
import CookieIcon from "../../gui-options/html-components/assets/CookieIcon";
import TilliXCallout from "../../gui-options/html-components/TilliXCallout";

const __LANGUAGE__ = "fr"; // "French" ("Français")

const COOKIE_TABLE_HEADERS: CookieTableHeaders = {
  name: "Nom",
  service: "Service",
  description: "Description",
  expiration: "Expiration",
};

export default {
  consentModal: {
    title: `${CookieIcon()} Notification sur les cookies`,
    description: `{{revisionMessage}}Nous utilisons des cookies pour améliorer votre expérience sur notre site. Les cookies strictement nécessaires sont essentiels au fonctionnement de ce site et ne peuvent pas être désactivés. Les autres cookies nécessitent votre consentement. En cliquant sur "Tout accepter", vous consentez à l'utilisation de nos cookies. Vous pouvez également gérer vos préférences en matière de cookies en sélectionnant le bouton "Gérer les préférences" ci-dessous. Vous pouvez consulter et mettre à jour vos préférences relatives aux cookies à tout moment via l'icône ${CookieIcon(1, 0.5, 0, -0.3333)} en bas à droite. Veuillez lire notre <a id="tilli-cc-privacy-policy-link-consent" href="https://tilli.pro/privacy-policy" target="_blank">Politique de confidentialité</a> pour plus d'informations.`,
    acceptAllBtn: "Tout accepter",
    acceptNecessaryBtn: "Strictement nécessaires uniquement",
    showPreferencesBtn: "Gérer les préférences",
    // closeIconLabel: "Fermer", // generates a big "X" ("accept necessary") button – let's disable it for now (to force a choice)
    revisionMessage: `Notre <a id="tilli-cc-privacy-policy-link-revision" href="https://tilli.pro/privacy-policy" target="_blank">Politique de confidentialité</a> a récemment été mise à jour. <br><br> `,
    footer: `
      <a id="tilli-cc-privacy-policy-link-footer" href="https://tilli.pro/privacy-policy" target="_blank">Politique de confidentialité</a>
      <a id="tilli-cc-terms-and-conditions-link-footer" href="https://tilli.pro/industries/terms-and-conditions" target="_blank">Conditions générales</a>

      ${TilliXCallout(__LANGUAGE__)}
    `,
  },

  preferencesModal: {
    title: `${TilliXCallout(__LANGUAGE__, 1)} Gérer les préférences en matière de cookies`,
    acceptAllBtn: "Tout accepter",
    acceptNecessaryBtn: "Strictement nécessaires uniquement",
    savePreferencesBtn: "Enregistrer les préférences",
    closeIconLabel: "Fermer",
    sections: [
      {
        title: "Utilisation des cookies",
        description:
          'Nous utilisons des cookies pour garantir les fonctionnalités de base du site et améliorer votre expérience en ligne. Vous pouvez choisir d’activer/désactiver chaque catégorie à tout moment. Pour plus de détails sur les cookies et autres données sensibles, veuillez consulter la <a id="tilli-cc-privacy-policy-link-preferences" href="https://tilli.pro/privacy-policy" target="_blank">Politique de confidentialité</a>.',
      },

      {
        title: "Cookies strictement nécessaires",
        description:
          "Ces cookies sont essentiels au bon fonctionnement du site. Ils permettent des fonctionnalités de base telles que la sécurité et l’accessibilité. Sans ces cookies, certains services et fonctionnalités peuvent ne pas fonctionner correctement.",
        linkedCategory: "necessary",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.necessary.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Cookies de performance",
      //   description:
      //     "Ces cookies nous aident à comprendre comment vous interagissez avec notre site pour en améliorer les performances. Ils suivent des métriques telles que les pages consultées, les temps de chargement ou les erreurs rencontrées, nous permettant d'identifier et de résoudre les problèmes.",
      //   linkedCategory: "performance",
      // },

      {
        title: "Cookies fonctionnels",
        description:
          "Ces cookies mémorisent vos préférences et paramètres pour personnaliser votre expérience de navigation, comme le choix du thème ou de la langue.",
        linkedCategory: "functional",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.functional.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Cookies publicitaires",
      //   description:
      //     "Ces cookies sont utilisés pour diffuser des publicités correspondant à vos centres d’intérêt. Ils peuvent suivre vos comportements de navigation sur différents sites et aider les annonceurs à proposer des annonces plus personnalisées.",
      //   linkedCategory: "advertising",
      // },

      {
        title: "Cookies d’analyse",
        description:
          "Ces cookies collectent des données anonymisées pour nous aider à comprendre comment les visiteurs interagissent avec notre site. Les informations qu’ils fournissent nous permettent d’améliorer l’expérience utilisateur.",
        linkedCategory: "analytics",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.analytics.datadog(__LANGUAGE__)],
        },
      },

      {
        title: "Cookies de marketing",
        description:
          "Ces cookies sont utilisés pour diffuser des publicités correspondant à vos centres d’intérêt. Ils peuvent suivre vos comportements de navigation sur différents sites et aider les annonceurs à proposer des annonces plus personnalisées.",
        linkedCategory: "marketing",
      },
      
      {
        // title: "Plus d'informations",
        title: "",
        description:
          'Pour toute question relative à notre politique sur les cookies et vos choix, veuillez <a href="mailto:privacy@tilli.pro">nous contacter</a>.',
      },
    ],
  },
} satisfies Translation;
