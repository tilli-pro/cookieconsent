import type CookieConsent from "@tilli-pro/cookieconsent";

export type ShowPreferencesFn = NonNullable<
  NonNullable<typeof CookieConsent>["showPreferences"]
>;
