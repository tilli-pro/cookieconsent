import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import { COOKIE_PREFERENCES_COOKIE_NAME, REVISION } from "../_consts";
import categories from "./categories";
import guiOptions from "./gui-options";
import translations from "./translations";

export default {
  revision: REVISION,
  guiOptions,
  categories,
  language: { default: "en", autoDetect: "browser", translations },
  cookie: { name: COOKIE_PREFERENCES_COOKIE_NAME },
  hideFromBots: process.env.NODE_ENV === "production", // disabled in local dev to enable ui-testing (via Playwright)
} satisfies CookieConsentConfig;
