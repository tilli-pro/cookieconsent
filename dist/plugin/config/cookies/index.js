import analytics_datadog from "./analytics/datadog";
import functional_brfV2 from "./functional/brf/v2";
import necessary_brfV2Auth from "./necessary/brf/v2-auth";
import necessary_nextAuth from "./necessary/next-auth";
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
