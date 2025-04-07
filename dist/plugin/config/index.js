import { COOKIE_PREFERENCES_COOKIE_NAME, REVISION } from "../_consts.js";
import categories from "./categories/index.js";
import guiOptions from "./gui-options/index.js";
import translations from "./translations/index.js";
const isProduction = (typeof process !== "undefined" &&
    typeof process.env !== "undefined" &&
    typeof process.env.NODE_ENV === "string" &&
    process.env.NODE_ENV === "production") || true;
export default {
    revision: REVISION,
    guiOptions,
    categories,
    language: { default: "en", autoDetect: "browser", translations },
    cookie: { name: COOKIE_PREFERENCES_COOKIE_NAME },
    hideFromBots: isProduction, // disabled in local dev to enable ui-testing (via Playwright)
};
