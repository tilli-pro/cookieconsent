"use client";
import ManageCookiePrefsButton, { containerId, } from "../html-components/ManageCookiePrefsButton.js";
import cookiePrefsButtonDragObserver, { ontouchend, ontouchstart, } from "./cookiePrefsButtonDragObserver.js";
export const showPreferences = typeof CookieConsent !== "undefined" &&
    typeof CookieConsent.showPreferences === "function"
    ? CookieConsent.showPreferences
    : (await import("@tilli-pro/cookieconsent")).showPreferences;
/** injects the floating cookie consent "manage preferences" icon button into the DOM */
const inject = () => {
    const container = document.body.appendChild(Object.assign(document.createElement("div"), {
        id: containerId,
        innerHTML: ManageCookiePrefsButton( /* TODO: __LANGUAGE__ */),
        onclick: showPreferences /** prefer over `data-cc="show-preferencesModal"` -- @see https://cookieconsent.orestbida.com/reference/api-reference.html#showpreferences */,
        onmouseover: cookiePrefsButtonDragObserver,
        // [mobile (touch) support]
        ontouchend,
        ontouchstart,
    }));
    /** load drag observer upon DOM injection (unfortunate fix to prevent the need for 2x "ontouchstart" events) */
    cookiePrefsButtonDragObserver.call(container);
    return container;
};
export default () => ((container) => {
    /** observe the DOM (to handle the case where the injected manage prefs button somehow gets removed) */
    new MutationObserver(() => {
        const alreadyInjected = !!document.getElementById(containerId) ||
            document.body.contains(container);
        if (alreadyInjected)
            return;
        /** if the container is no longer in <body>, re-inject */
        container = inject();
    }).observe(document.body, { childList: true, subtree: true });
    return container;
})(document.getElementById(containerId) ?? inject());
