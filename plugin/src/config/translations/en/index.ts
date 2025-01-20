import type { Translation } from "@tilli-pro/cookieconsent";

import type { CookieTableHeaders } from "../../cookies/types";
import cookies from "../../cookies";
import CookieIcon from "../../gui-options/html-components/assets/CookieIcon";
import TilliXCallout from "../../gui-options/html-components/TilliXCallout";

const __LANGUAGE__ = "en"; // "English" ("English")

const COOKIE_TABLE_HEADERS: CookieTableHeaders = {
  name: "Name",
  service: "Service",
  description: "Description",
  expiration: "Expiration",
};

export default {
  consentModal: {
    title: `${CookieIcon()} Cookie Notice`,
    description: `{{revisionMessage}}We use cookies to improve your experience on our website. Strictly necessary cookies are essential for this site's functionality and cannot be turned off. Other cookies require your consent. By clicking "Accept all," you consent to our use of cookies. Alternatively, you can manage your cookie preferences by selecting the "Manage preferences" button below. You can review and update your cookie preferences anytime via the ${CookieIcon(1, 0.5, 0, -0.3333)} icon in the bottom-right corner. Please read our <a href="https://tilli.pro/privacy-policy" target="_blank">Privacy Policy</a> for more information.`,
    acceptAllBtn: "Accept all",
    acceptNecessaryBtn: "Strictly necessary only",
    showPreferencesBtn: "Manage preferences",
    // closeIconLabel: "Close", // generates a big "X" ("accept necessary") button – let's disable it for now (to force a choice)
    revisionMessage: `Our <a href="https://tilli.pro/privacy-policy" target="_blank">Privacy Policy</a> was recently updated. <br><br> `,
    footer: `
      <a href="https://tilli.pro/privacy-policy" target="_blank">Privacy Policy</a>
      <a href="https://tilli.pro/industries/terms-and-conditions" target="_blank">Terms & Conditions</a>

      ${TilliXCallout(__LANGUAGE__)}
    `,
  },

  preferencesModal: {
    title: `${TilliXCallout(__LANGUAGE__, 1)} Manage cookie preferences`,
    acceptAllBtn: "Accept all",
    acceptNecessaryBtn: "Strictly necessary only",
    savePreferencesBtn: "Save preferences",
    closeIconLabel: "Close",
    sections: [
      {
        title: "Cookie Usage",
        description:
          'We use cookies to ensure basic website functionality and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="https://tilli.pro/privacy-policy" target="_blank">Privacy Policy</a>.',
      },

      {
        title: "Strictly necessary cookies",
        description:
          "These cookies are essential for the basic functioning of the website. They enable core functionalities such as security and accessibility. Without these cookies, certain services and functionality may not work properly.",
        linkedCategory: "necessary",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.necessary.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Performance cookies",
      //   description:
      //     "These cookies help us understand how you interact with our website to enhance its performance.  They track metrics such as page views, loading times or any errors encountered, allowing us to identify and resolve the issues.",
      //   linkedCategory: "performance",
      // },

      {
        title: "Functional cookies",
        description:
          "These cookies remember your preferences and settings to personalize your browsing experience, such as remembering your theme or language choices.",
        linkedCategory: "functional",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.functional.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Advertising cookies",
      //   description:
      //     "These cookies are used to deliver advertisements that are relevant to your interests. They may track your browsing behaviours across different sites and help advertisers serve more personalized ads.",
      //   linkedCategory: "advertising",
      // },

      {
        title: "Analytics cookies",
        description:
          "These cookies collect anonymized data to help us understand how visitors interact with our website. The insights they provide help us improve the user experience.",
        linkedCategory: "analytics",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.analytics.datadog(__LANGUAGE__)],
        },
      },

      {
        title: "More information",
        description:
          'For any queries in relation to our policy on cookies and your choices, please <a href="mailto:privacy@tilli.pro">contact us</a>.',
      },
    ],
  },
} satisfies Translation;
