import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "../config";
import { run } from "../init";
import {
  makeInitFn,
  stripInvalidLinkedCategoriesFromTranslations,
} from "./utils";

const categories: CookieConsentConfig["categories"] = {
  necessary: {
    enabled: true, // "necessary" category is always enabled.
    readOnly: true,
    services: {
      "Session": {
        label: "Session",
        cookies: [
          {
            name: /^(_scc_session)/, // session ID for core functionality
          },
        ],
      },
    },
  },
  analytics: {
    services: {
      "Google Analytics": {
        label: "Google Analytics",
        cookies: [
          {
            name: /^(_ga_)/, // Google Analytics
            domain: ".nudge.pro",
          },
        ],
      },
      "TelemetryDeck": {
        label: "TelemetryDeck",
        cookies: [
          {
            name: /^(_tccl_)/, // TelemetryDeck
            domain: ".nudge.pro",
          },
        ],
      },
    },
    autoClear: {
      // TODO: DRY this with the services above
      cookies: [
        /** Google Analytics */
        {
          name: /^(_ga_)/, // Google Analytics
          domain: ".nudge.pro",
        },

        /** TelemetryDeck */
        {
          name: /^(_tccl_)/, // TelemetryDeck
          domain: ".nudge.pro",
        },
      ],
    },
  },
  marketing: {
    services: {
      "Google Adsense": {
        label: "Google Adsense",
        cookies: [
          {
            name: /^(_gcl_)/, // Google Adsense
            domain: ".nudge.pro",
          },
        ],
      },
      "zoominfo": {
        label: "zoominfo",
        cookies: [
          {
            name: /^(visitorld)/, // zoominfo (simply ws marketing tool)
            domain: ".ws.zoominfo.com",
          },
          {
            name: /^(_cfuvid)/, // zoominfo (Cloudflare)
            domain: ".zoominfo.com",
          },
        ],
      },
      "Twitter": {
        label: "Twitter",
        cookies: [
          {
            name: /^(muc_ads)/, // Twitter (ads)
            domain: ".t.co",
          },
        ],
      },
    },
    autoClear: {
      // TODO: DRY this with the services above
      cookies: [
        /** Google Adsense */
        {
          name: /^(_gcl_)/, // Google Adsense
          domain: ".nudge.pro",
        },

        /** zoominfo */
        {
          name: /^(_cfuvid)/, // zoominfo (Cloudflare)
          domain: ".zoominfo.com",
        },

        /** Twitter */
        {
          name: /^(muc_ads)/, // Twitter (ads)
          domain: ".t.co",
        },
      ],
    },
  },
};

// TODO: DRY further w/ `./brf.ts`
const language: CookieConsentConfig["language"] = {
  ..._config.language,
  translations: stripInvalidLinkedCategoriesFromTranslations(
    _config.language.translations,
    categories,
    true, // clear cookie tables // FIXME: refactor this to actually just use the proper cookie table accoring to the categories var
  ),
};

const config: CookieConsentConfig = {
  ..._config,
  categories,
  language,
};

// console.debug({ config }, "Initializing Cookie Consent (tilli Website)...");
const init = makeInitFn(run, config);
void init();
