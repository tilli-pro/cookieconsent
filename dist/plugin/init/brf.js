import _config from "../config/index.js";
import { LABELS } from "../config/categories/labels.js";
import cookies from "../config/cookies/index.js";
import { run } from "../init.js";
import { makeInitFn, stripInvalidLinkedCategoriesFromTranslations, } from "./utils.js";
// TODO: auto-detect detect language
const __LANGUAGE__ = "en"; // "English" ("English")
const categories = {
    necessary: {
        enabled: true, // "necessary" category is always enabled.
        readOnly: true,
        services: {
            /** tilliX (BRF) */
            tilliX: {
                label: LABELS.en.necessary.tilliX,
                cookies: [...cookies.necessary.brf(__LANGUAGE__)],
            },
        },
    },
    functional: {
        services: {
            /** tilliX (BRF) */
            tilliX: {
                label: LABELS.en.functional.tilliX,
                cookies: [...cookies.functional.brf(__LANGUAGE__)],
            },
        },
        autoClear: {
            cookies: [
                {
                    name: /^(tx-theme)/, // tilliX theme (-> "light" | "dark")
                },
            ],
        },
    },
    analytics: {
        services: {
            /** Datadog (RUM) */
            datadog: {
                label: LABELS.en.analytics.datadog,
                cookies: [...cookies.analytics.datadog(__LANGUAGE__)],
            },
        },
        autoClear: {
            cookies: [
                {
                    name: /^(_tilli_analytics_dd_)/, // Datadog (RUM)
                },
            ],
        },
    },
};
// TODO: DRY further w/ `./tilli-website.ts`
const language = {
    ..._config.language,
    translations: stripInvalidLinkedCategoriesFromTranslations(_config.language.translations, categories),
};
const config = {
    ..._config,
    categories,
    language,
};
// console.debug({ config }, "Initializing Cookie Consent (BRF)...");
const init = makeInitFn(run, config);
void init();
