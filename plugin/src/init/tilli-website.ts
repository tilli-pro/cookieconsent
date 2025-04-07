import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "../config";
import { run } from "../init";
import { makeInitFn } from "./utils";

// TODO: auto-detect detect language
const __LANGUAGE__ = "en"; // "English" ("English")

const categories: CookieConsentConfig["categories"] = {
  necessary: {
    enabled: true, // "necessary" category is always enabled.
    readOnly: true,
  },
  analytics: {},
  marketing: {},
};

const translations: CookieConsentConfig["language"]["translations"] = {
  ..._config.language.translations,
  en: {
    ..._config.language.translations.en,
    preferencesModal: {
      ..._config.language.translations.en.preferencesModal,
      sections: _config.language.translations.en.preferencesModal.sections
        .map((section) => {
          if (section.linkedCategory && !categories[section.linkedCategory])
            return null!;

          return section;
        })
        .filter(Boolean),
    },
  },
};

const language: CookieConsentConfig["language"] = {
  ..._config.language,
  translations,
};

const config: CookieConsentConfig = {
  ..._config,
  categories,
  language,
};

// console.debug({ config }, "Initializing Cookie Consent (BRF)...");
const init = makeInitFn(run, config);
void init();
