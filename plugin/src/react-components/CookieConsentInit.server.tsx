import "server-only";

import { COOKIE_CONSENT_ENABLED } from "../_consts";
import CookieConsentInitClient from "./CookieConsentInit.client";

/** we use a server component to handle dynamic injection of the script all together
 * > basically, there's no need to inject the client-side cookie-consent script if it's not in scope */
export default function CookieConsentInit() {
  return COOKIE_CONSENT_ENABLED ? <CookieConsentInitClient /> : null;
}
