import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "../config";
import { stripInvalidLinkedCategoriesFromTranslations } from "./utils";
import { LABELS } from "../config/categories/labels";
import cookies from "../config/cookies";

// TODO: auto-detect detect language
const __LANGUAGE__ = "en"; // "English" ("English")

const categories: CookieConsentConfig["categories"] = {
  necessary: {
    enabled: true, // "necessary" category is always enabled.
    readOnly: true,
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

// TODO: DRY further w/ `./brf.ts`
const language: CookieConsentConfig["language"] = {
  ..._config.language,
  translations: stripInvalidLinkedCategoriesFromTranslations(
    _config.language.translations,
    categories,
    true, // clear cookie tables // FIXME: refactor this to actually just use the proper cookie table accoring to the categories var
  ),
};

export const config: CookieConsentConfig = {
  ..._config,
  categories,
  language,
};
