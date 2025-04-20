import _config from "../config/index.js";
import { stripInvalidLinkedCategoriesFromTranslations } from "./utils.js";
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
export const config = {
    ..._config,
    categories,
    language,
};
