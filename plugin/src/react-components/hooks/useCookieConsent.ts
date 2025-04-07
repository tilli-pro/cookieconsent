"use client";

import { useEffect } from "react";

import type * as _CookieConsent from "@tilli-pro/cookieconsent";

import { COOKIE_CONSENT_ENABLED } from "../../_consts";
import config from "../../config";
import { makeInitFn } from "../../init/utils";

declare const CookieConsent:
  | {
      run?: typeof _CookieConsent.run;
    }
  | undefined;

export const run =
  typeof CookieConsent !== "undefined" &&
  typeof CookieConsent.run === "function"
    ? CookieConsent.run
    : (await import("@tilli-pro/cookieconsent")).run;

export default function useCookieConsent() {
  useEffect(() => {
    if (!COOKIE_CONSENT_ENABLED) return;

    const init = makeInitFn(run, config);
    void init();
  }, []);
}
