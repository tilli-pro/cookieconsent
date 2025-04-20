import { config as brf } from "./brf.config";
import { config as nudge } from "./nudge.config";
import { config as nudgeWebsite } from "./nudge-website.config";
import { config as tilliPay } from "./tilli-pay.config";
import { config as tilliPayWebsite } from "./tilli-pay-website.config";
import { config as tilliWebsite } from "./tilli-website.config";
import { config as tilliX } from "./tilliX.config";

export const configs = {
  brf,
  "nudge-website": nudgeWebsite,
  nudge,
  "tilli-pay-website": tilliPayWebsite,
  "tilli-pay": tilliPay,
  "tilli-website": tilliWebsite,
  "tilliX": tilliX,
};
export type ConfigId = keyof typeof configs;

export const getConfig = (configId: ConfigId) => configs[configId];