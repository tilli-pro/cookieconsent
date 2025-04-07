/** 🚧 INTENDED FOR Next.js USAGE ONLY!!! (server-side cookie validation) */
import "server-only";
import { cookies as getServerSideCookies } from "next/headers";
import { getUsersCookieConsent as _getUsersCookieConsent, hasUserConsentedTo as _hasUserConsentedTo, } from "./_utils.js";
/** server-side wrapper for {@link ./_utils.ts getUsersCookieConsent}. */
export const getUsersCookieConsent = (cookies = getServerSideCookies()) => _getUsersCookieConsent(cookies);
/** server-side wrapper for {@link ./_utils.ts hasUserConsentedTo}. */
export const hasUserConsentedTo = (...args) => _hasUserConsentedTo(getUsersCookieConsent(), ...args);
