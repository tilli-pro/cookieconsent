import analytics_datadog from "./analytics/datadog.js";
import functional_brfV2 from "./functional/brf/v2.js";
import necessary_brfV2Auth from "./necessary/brf/v2-auth.js";
import necessary_nextAuth from "./necessary/next-auth.js";
export default {
    necessary: {
        brf: (lang) => [
            ...necessary_nextAuth(lang),
            ...necessary_brfV2Auth(lang),
        ],
        nextAuth: necessary_nextAuth,
    },
    functional: {
        brf: (lang) => [...functional_brfV2(lang)],
    },
    analytics: {
        datadog: analytics_datadog,
    },
};
