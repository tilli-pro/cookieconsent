import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import { COOKIE_PREFERENCES_COOKIE_NAME, REVISION } from "../_consts";
import categories from "./categories";
import guiOptions from "./gui-options";
import translations from "./translations";

/** polyfill for pure JS support */
declare const process: {
  env: {
    NODE_ENV?: "development" | "production";
  };
} | undefined;

const isProduction =
  (typeof process !== "undefined" &&
  typeof process.env !== "undefined" &&
  typeof process.env.NODE_ENV === "string" &&
  process.env.NODE_ENV === "production") || true;

export default {
  revision: REVISION,
  guiOptions,
  categories,
  language: { default: "en", autoDetect: "browser", translations },
  cookie: { name: COOKIE_PREFERENCES_COOKIE_NAME },
  hideFromBots: isProduction, // disabled in local dev to enable ui-testing (via Playwright)
} satisfies CookieConsentConfig;
