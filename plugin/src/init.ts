import "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.umd.js?min=1";

import type * as _CookieConsent from "@tilli-pro/cookieconsent";
import config from "./config";

declare module CookieConsent {
  const run: typeof _CookieConsent.run;
}

CookieConsent.run(config);
