import type { CookieValue } from "@tilli-pro/cookieconsent";

import type cookies from ".";
import type { LABELS } from "../categories/labels";
import type { Language } from "../translations/types";

export type CookieTableHeaders = {
  name: string;
  service: string;
  description: string;
  expiration: string;
};

export type CookieTableItem = {
  name: string; // -> "tx-theme" | "_tilli_analytics_dd_s"
  service: string; // -> "tilliX" | "Datadog"
  description: string; // -> "Keeps track of your selected theme." | 'Cookie set by <a href="https://www.datadoghq.com" target="_blank">Datadog</a>.'
  expiration: string; // -> "Expires after 1 year" | "Session"
};

type CookieSection = Record<string, (lang: Language) => CookieTableItem[]>;

export interface CookieSections {
  necessary?: CookieSection;
  performance?: CookieSection;
  functional?: CookieSection;
  advertising?: CookieSection;
  analytics?: CookieSection;
}

type ExtractServiceNames<T> = {
  [K in keyof T]: (keyof T[K])[];
};

export interface UserCookieConsent extends Omit<CookieValue, "services"> {
  services: ExtractServiceNames<(typeof LABELS)["en"]>; // -> { necessary: ["tilliX"], ..., analytics: ["datadog"] }
}

export type RawTilliCookieConsentValue = string & {
  __struct: UserCookieConsent;
}; // URI-encoded JSON string

export type ConsentCategory = keyof typeof cookies; // -> "necessary" | "functional" | "analytics"
export type ServiceName<T extends ConsentCategory> =
  keyof (typeof LABELS)["en"][T]; // -> "tilliX" | "datadog"
