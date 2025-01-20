/** 🚧 INTENDED FOR Next.js USAGE ONLY!!! (server-side cookie validation) */

import "server-only";

import { cookies as getServerSideCookies } from "next/headers";

import type { ConsentCategory, ServiceName, UserCookieConsent } from "./types";
import {
  getUsersCookieConsent as _getUsersCookieConsent,
  hasUserConsentedTo as _hasUserConsentedTo,
} from "./_utils";

/** server-side wrapper for {@link ./_utils.ts getUsersCookieConsent}. */
export const getUsersCookieConsent = (
  cookies = getServerSideCookies(),
): UserCookieConsent | null => _getUsersCookieConsent(cookies);

/** server-side wrapper for {@link ./_utils.ts hasUserConsentedTo}. */
export const hasUserConsentedTo = <
  T extends ConsentCategory,
  U extends ServiceName<T>,
>(
  ...args: [T, U]
): boolean => _hasUserConsentedTo(getUsersCookieConsent(), ...args);
