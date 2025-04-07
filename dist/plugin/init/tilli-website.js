import _config from "../config/index.js";
import { run } from "../init.js";
import { makeInitFn } from "./utils.js";
// TODO: auto-detect detect language
const __LANGUAGE__ = "en"; // "English" ("English")
const categories = {
    necessary: {
        enabled: true, // "necessary" category is always enabled.
        readOnly: true,
    },
    analytics: {},
    marketing: {},
};
const translations = {
    ..._config.language.translations,
    en: {
        ..._config.language.translations.en,
        preferencesModal: {
            ..._config.language.translations.en.preferencesModal,
            sections: _config.language.translations.en.preferencesModal.sections
                .map((section) => {
                if (section.linkedCategory && !categories[section.linkedCategory])
                    return null;
                return section;
            })
                .filter(Boolean),
        },
    },
};
const language = {
    ..._config.language,
    translations,
};
const config = {
    ..._config,
    categories,
    language,
};
// console.debug({ config }, "Initializing Cookie Consent (BRF)...");
const init = makeInitFn(run, config);
void init();
