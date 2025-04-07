import { COOKIE_PREFERENCES_COOKIE_NAME } from "../../_consts.js";
/** type-safe way to get the user's cookie consent (incl. prefs + metadata)
 * > requires the cookies to be passed in (if server-side, use `cookies()`) */
export const getUsersCookieConsent = (cookies) => {
    try {
        return JSON.parse(cookies.get(COOKIE_PREFERENCES_COOKIE_NAME)?.value ?? "");
    }
    catch {
        return null;
    }
};
/**
 * Checks if the user has consented to a specific service within a given consent category.
 *
 * @template T - The type of the consent category.
 * @template U - The type of the service name within the consent category.
 *
 * @param userCookieConsent - The user's cookie consent object, which may be undefined.
 * @param category - The consent category to check.
 * @param service - The specific service within the consent category to check.
 *
 * @returns `true` if the user has consented to the specified service within the given category, `false` otherwise.
 *
 * @example
 * ```ts
 * const userCookieConsent = getUsersCookieConsent(cookies);
 * const hasConsented = hasUserConsentedTo(userCookieConsent, "analytics", "datadog");
 * ```
 */
export const hasUserConsentedTo = (userCookieConsent, category, service) => userCookieConsent?.services?.[category]?.includes(service) ?? false;
