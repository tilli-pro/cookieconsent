import _config from "../config/index.js";
import { stripInvalidLinkedCategoriesFromTranslations } from "./utils.js";
import { LABELS } from "../config/categories/labels.js";
import cookies from "../config/cookies/index.js";
// TODO: auto-detect detect language
const __LANGUAGE__ = "en"; // "English" ("English")
const categories = {
    necessary: {
        enabled: true, // "necessary" category is always enabled.
        readOnly: true,
    },
    functional: {},
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
// TODO: DRY further w/ `./brf.ts`
const language = {
    ..._config.language,
    translations: stripInvalidLinkedCategoriesFromTranslations(_config.language.translations, categories, true),
};
export const config = {
    ..._config,
    categories,
    language,
};
