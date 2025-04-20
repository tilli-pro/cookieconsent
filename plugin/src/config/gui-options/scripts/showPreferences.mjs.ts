import type * as _CookieConsent from "@tilli-pro/cookieconsent";
import type { ShowPreferencesFn } from "./showPreferences.d";

declare const CookieConsent:
  | {
      showPreferences?: typeof _CookieConsent.showPreferences;
    }
  | undefined;

export const showPreferences =
  typeof CookieConsent !== "undefined" &&
  typeof CookieConsent.showPreferences === "function"
    ? CookieConsent.showPreferences
    : (() => {
        console.error(
          "Attempted to open cookie preferences modal, but the cookie consent plugin is not available at this time.",
        );
      })() as unknown as ShowPreferencesFn;
