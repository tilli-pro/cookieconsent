import _config from "../config/index.js";
import { run } from "../init.js";
import { makeInitFn, stripInvalidLinkedCategoriesFromTranslations, } from "./utils.js";
import { showPreferences } from "../config/gui-options/scripts/showPreferences.mjs.js";
const categories = {
    necessary: {
        enabled: true, // "necessary" category is always enabled.
        readOnly: true,
        services: {
            "Session": {
                label: "Session",
                cookies: [
                    {
                        name: /^(_scc_session)/, // session ID for core functionality
                    },
                ],
            },
        },
    },
    analytics: {
        services: {
            "Google Analytics": {
                label: "Google Analytics",
                cookies: [
                    {
                        name: /^(_ga_)/, // Google Analytics
                        domain: "tilli.pro",
                    },
                ],
            },
            "TelemetryDeck": {
                label: "TelemetryDeck",
                cookies: [
                    {
                        name: /^(_tccl_)/, // TelemetryDeck
                        domain: "tilli.pro",
                    },
                ],
            },
        },
        autoClear: {
            // TODO: DRY this with the services above
            cookies: [
                /** Google Analytics */
                {
                    name: /^(_ga_)/, // Google Analytics
                    domain: "tilli.pro",
                },
                /** TelemetryDeck */
                {
                    name: /^(_tccl_)/, // TelemetryDeck
                    domain: "tilli.pro",
                },
            ],
        },
    },
    marketing: {
        services: {
            "Google Tag Manager": {
                label: "Google Tag Manager",
                cookies: [
                    {
                        name: /^(_gtm_)/, // Google Tag Manager
                        domain: "tilli.pro",
                    },
                    {
                        name: /^(_gat)/, // Google Tag Manager (analytics)
                        domain: "tilli.pro",
                    },
                    {
                        name: /^(_gid)/, // Google Tag Manager (session ID)
                        domain: "tilli.pro",
                    },
                ],
            },
            "Hubspot": {
                label: "Hubspot",
                cookies: [
                    {
                        name: /^(__hs)/, // Hubspot (Session Tracking)
                        domain: "tilli.pro",
                    },
                    {
                        name: /^(hubspotutk)/, // Hubspot (User Tracking)
                        domain: "tilli.pro",
                    },
                    {
                        name: /^(__cf_bm)/, // Hubspot (Analytics - Cloudfare)
                        domain: ".hs-analytics.net",
                    },
                    {
                        name: /^(__cf_bm)/, // Hubspot (Banner - Cloudfare)
                        domain: ".hs-banner.com",
                    },
                    {
                        name: /^(__cf_bm)/, // Hubspot (Scripts - Cloudfare)
                        domain: ".hs-scripts.com",
                    },
                    {
                        name: /^(__cf_bm)/, // Hubspot (Adspixel - Cloudfare)
                        domain: ".hsadspixel.net",
                    },
                    {
                        name: /^(__cf_bm)/, // Hubspot (Twitter - Cloudfare)
                        domain: ".t.co",
                    },
                    {
                        name: /^(__cf_bm)/, // Hubspot (User Messages - Cloudfare)
                        domain: ".usermessages.com",
                    },
                    {
                        name: /^(_cfuvid)/, // Hubspot (Visitor ID - Cloudfare)
                        domain: ".hubspot.com",
                    },
                ],
            },
            "Facebook": {
                label: "Facebook",
                cookies: [
                    {
                        name: /^(_fb)/, // Facebook (ads)
                        domain: "tilli.pro",
                    },
                ],
            },
            "Twitter": {
                label: "Twitter",
                cookies: [
                    {
                        name: /^(muc_ads)/, // Twitter (ads)
                        domain: ".t.co",
                    },
                ],
            },
        },
        autoClear: {
            // TODO: DRY this with the services above
            cookies: [
                /** Google Tag Manager */
                {
                    name: /^(_gtm_)/, // Google Tag Manager
                    domain: "tilli.pro",
                },
                {
                    name: /^(_gat)/, // Google Tag Manager (analytics)
                    domain: "tilli.pro",
                },
                {
                    name: /^(_gid)/, // Google Tag Manager (session ID)
                    domain: "tilli.pro",
                },
                /** Hubspot */
                {
                    name: /^(__hs)/, // Hubspot (Session Tracking)
                    domain: "tilli.pro",
                },
                {
                    name: /^(__cf_bm)/, // Hubspot (Analytics - Cloudfare)
                    domain: ".hs-analytics.net",
                },
                {
                    name: /^(__cf_bm)/, // Hubspot (Banner - Cloudfare)
                    domain: ".hs-banner.com",
                },
                {
                    name: /^(__cf_bm)/, // Hubspot (Scripts - Cloudfare)
                    domain: ".hs-scripts.com",
                },
                {
                    name: /^(__cf_bm)/, // Hubspot (Adspixel - Cloudfare)
                    domain: ".hsadspixel.net",
                },
                {
                    name: /^(__cf_bm)/, // Hubspot (Twitter - Cloudfare)
                    domain: ".t.co",
                },
                {
                    name: /^(__cf_bm)/, // Hubspot (User Messages - Cloudfare)
                    domain: ".usermessages.com",
                },
                {
                    name: /^(_cfuvid)/, // Hubspot (Visitor ID - Cloudfare)
                    domain: ".hubspot.com",
                },
                /** Facebook */
                {
                    name: /^(_fb)/, // Facebook (ads)
                    domain: "tilli.pro",
                },
                /** Twitter */
                {
                    name: /^(muc_ads)/, // Twitter (ads)
                    domain: ".t.co",
                },
            ],
        },
    },
};
// TODO: DRY further w/ `./brf.ts`
const language = {
    ..._config.language,
    translations: stripInvalidLinkedCategoriesFromTranslations(_config.language.translations, categories, true),
};
const config = {
    ..._config,
    categories,
    language,
};
// console.debug({ config }, "Initializing Cookie Consent (tilli Website)...");
const init = makeInitFn(run, config, showPreferences);
void init();
