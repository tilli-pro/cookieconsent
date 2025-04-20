export const showPreferences = typeof CookieConsent !== "undefined" &&
    typeof CookieConsent.showPreferences === "function"
    ? CookieConsent.showPreferences
    : (() => {
        console.error("Attempted to open cookie preferences modal, but the cookie consent plugin is not available at this time.");
    })();
