import { COOKIE_PREFERENCES_COOKIE_NAME, REVISION } from "../_consts.js";
import categories from "./categories/index.js";
import guiOptions from "./gui-options/index.js";
import translations from "./translations/index.js";
export default {
    revision: REVISION,
    guiOptions,
    categories,
    language: { default: "en", autoDetect: "browser", translations },
    cookie: { name: COOKIE_PREFERENCES_COOKIE_NAME },
    hideFromBots: process.env.NODE_ENV === "production", // disabled in local dev to enable ui-testing (via Playwright)
};
