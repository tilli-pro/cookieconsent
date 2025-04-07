"use client";
import { useEffect } from "react";
import { COOKIE_CONSENT_ENABLED } from "../../_consts.js";
import config from "../../config/index.js";
import { makeInitFn } from "../../init/utils.js";
export const run = typeof CookieConsent !== "undefined" &&
    typeof CookieConsent.run === "function"
    ? CookieConsent.run
    : (await import("@tilli-pro/cookieconsent")).run;
export default function useCookieConsent() {
    useEffect(() => {
        if (!COOKIE_CONSENT_ENABLED)
            return;
        const init = makeInitFn(run, config);
        void init();
    }, []);
}
