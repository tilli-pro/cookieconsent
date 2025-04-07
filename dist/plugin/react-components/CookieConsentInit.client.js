"use client";
import { useEffect } from "react";
import { run } from "@tilli-pro/cookieconsent";
import { COOKIE_CONSENT_ENABLED } from "../_consts";
import config from "../config";
import { injectReactRemoveScrollToggle } from "../config/gui-options/scripts/forceDisableReactRemoveScroll";
import injectManageCookiePrefsButton from "../config/gui-options/scripts/injectManageCookiePrefsButton";
export default function CookieConsentInit() {
    useEffect(() => {
        if (!COOKIE_CONSENT_ENABLED)
            return;
        void (async () => {
            /** inject the cookie-consent banner (pop-up) */
            await run(config);
            /** ...then, inject the floating cookie consent "manage preferences" icon button into the DOM (floats @ the bottom right) */
            injectManageCookiePrefsButton();
            /** ...and, force-disable "react-remove-scroll" -- only upon opening up the "manage preferences" dialog
             *
             *  > this handles the edge case where there's a shadcn (radix-ui) dialog open
             *    underneath the cookie banner's "manage preferences" dialog, which prevents
             *    the user from scrolling within the manage prefs dialog
             */
            injectReactRemoveScrollToggle();
        })();
    }, []);
    return null;
}
