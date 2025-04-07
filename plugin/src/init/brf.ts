import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "../config";
import { LABELS } from "../config/categories/labels";
import cookies from "../config/cookies";
import { run } from "../init";
import { makeInitFn } from "./utils";

// TODO: auto-detect detect language
const __LANGUAGE__ = "en"; // "English" ("English")

const categories: CookieConsentConfig["categories"] = {
  necessary: {
    enabled: true, // "necessary" category is always enabled.
    readOnly: true,
    services: {
      /** tilliX (BRF) */
      tilliX: {
        label: LABELS.en.necessary.tilliX,
        cookies: [...cookies.necessary.brf(__LANGUAGE__)],
      },
    },
  },
  functional: {
    services: {
      /** tilliX (BRF) */
      tilliX: {
        label: LABELS.en.functional.tilliX,
        cookies: [...cookies.functional.brf(__LANGUAGE__)],
      },
    },
    autoClear: {
      cookies: [
        {
          name: /^(tx-theme)/, // tilliX theme (-> "light" | "dark")
        },
      ],
    },
  },
  analytics: {
    services: {
      /** Datadog (RUM) */
      datadog: {
        label: LABELS.en.analytics.datadog,
        cookies: [...cookies.analytics.datadog(__LANGUAGE__)],
      },
    },
    autoClear: {
      cookies: [
        {
          name: /^(_tilli_analytics_dd_)/, // Datadog (RUM)
        },
      ],
    },
  },
};

const config: CookieConsentConfig = {
  ..._config,
  categories,
};

// console.debug({ config }, "Initializing Cookie Consent (BRF)...");
const init = makeInitFn(run, config);
void init();
