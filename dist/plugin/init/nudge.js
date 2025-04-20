import _config from "../config/index.js";
import { run } from "../init.js";
import { makeInitFn, stripInvalidLinkedCategoriesFromTranslations, } from "./utils.js";
import { showPreferences } from "../config/gui-options/scripts/showPreferences.mjs.js";
const categories = {
    necessary: {
        enabled: true, // "necessary" category is always enabled.
        readOnly: true,
        services: {
            "Authentication": {
                label: "Authentication",
                cookies: [
                    {
                        name: /^(refreshToken)/, // refresh token for authentication purposes only
                    },
                ],
            },
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
