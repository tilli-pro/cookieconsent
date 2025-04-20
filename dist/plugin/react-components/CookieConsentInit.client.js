"use client";
import { useCookieConsent } from "./hooks/useCookieConsent.js";
import "@tilli-pro/cookieconsent/dist/cookieconsent.css";
// TODO: make theme imports below dynamic
import "../styles/tilli-website.css";
import "../styles/tilli-pay.css";
import "../styles/nudge.css";
import "../styles/tenants/freeman.css";
import "../styles/tenants/frontier.css";
import "../styles/tenants/con-edison.css";
import "../styles/tenants/oru.css";
export default function CookieConsentInit({ config, }) {
    useCookieConsent(config);
    return null;
}
