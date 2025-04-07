import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import type * as CookieConsent from "@tilli-pro/cookieconsent";

// import { injectReactRemoveScrollToggle } from "../config/gui-options/scripts/forceDisableReactRemoveScroll";
// import injectManageCookiePrefsButton from "../config/gui-options/scripts/injectManageCookiePrefsButton";

export const makeInitFn = (initFn: typeof CookieConsent.run, config: CookieConsentConfig) => {
  return async () => {
    /** inject the cookie-consent banner (pop-up) */
    await initFn(config);

    /** ...then, inject the floating cookie consent "manage preferences" icon button into the DOM (floats @ the bottom right) */
    // injectManageCookiePrefsButton();

    /** ...and, force-disable "react-remove-scroll" -- only upon opening up the "manage preferences" dialog
     *
     *  > this handles the edge case where there's a shadcn (radix-ui) dialog open
     *    underneath the cookie banner's "manage preferences" dialog, which prevents
     *    the user from scrolling within the manage prefs dialog
     */
    // injectReactRemoveScrollToggle();
  };
};