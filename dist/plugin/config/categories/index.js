import cookies from "../cookies/index.js";
import { LABELS } from "./labels.js";
// TODO: determine whether we need to add "language support" here... This file is probably just for backend purposes.
const __LANGUAGE__ = "en"; // "English" ("English")
export default {
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
