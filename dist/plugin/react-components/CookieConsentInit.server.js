import { jsx as _jsx } from "react/jsx-runtime";
import "server-only";
import { COOKIE_CONSENT_ENABLED } from "../_consts.js";
import CookieConsentInitClient from "./CookieConsentInit.client.js";
import "@tilli-pro/cookieconsent/dist/cookieconsent.css";
import "../styles/tenants/freeman.css";
import "../styles/tenants/frontier.css";
/** we use a server component to handle dynamic injection of the script all together
 * > basically, there's no need to inject the client-side cookie-consent script if it's not in scope */
export default function CookieConsentInit() {
    return COOKIE_CONSENT_ENABLED ? _jsx(CookieConsentInitClient, {}) : null;
}
