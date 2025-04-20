import { config as brf } from "./brf.config.js";
import { config as nudge } from "./nudge.config.js";
import { config as nudgeWebsite } from "./nudge-website.config.js";
import { config as tilliPay } from "./tilli-pay.config.js";
import { config as tilliPayWebsite } from "./tilli-pay-website.config.js";
import { config as tilliWebsite } from "./tilli-website.config.js";
import { config as tilliX } from "./tilliX.config.js";
export const configs = {
    brf,
    "nudge-website": nudgeWebsite,
    nudge,
    "tilli-pay-website": tilliPayWebsite,
    "tilli-pay": tilliPay,
    "tilli-website": tilliWebsite,
    "tilliX": tilliX,
};
export const getConfig = (configId) => configs[configId];
