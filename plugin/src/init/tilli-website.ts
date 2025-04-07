import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "../config";
import { run } from "../init";
import {
  makeInitFn,
  stripInvalidLinkedCategoriesFromTranslations,
} from "./utils";

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

// TODO: DRY further w/ `./brf.ts`
const language: CookieConsentConfig["language"] = {
  ..._config.language,
  translations: stripInvalidLinkedCategoriesFromTranslations(
    _config.language.translations,
    categories,
  ),
};

const config: CookieConsentConfig = {
  ..._config,
  categories,
  language,
};

// console.debug({ config }, "Initializing Cookie Consent (tilli Website)...");
const init = makeInitFn(run, config);
void init();
