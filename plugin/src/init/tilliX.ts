import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "../config";
import { run } from "../init";
import {
  makeInitFn,
  stripInvalidLinkedCategoriesFromTranslations,
} from "./utils";
import { showPreferences } from "../config/gui-options/scripts/showPreferences.mjs";

const categories: CookieConsentConfig["categories"] = {
  necessary: {
    enabled: true, // "necessary" category is always enabled.
    readOnly: true,
  },
  functional: {},
  analytics: {},
};

// TODO: DRY further w/ `./brf.ts`
const language: CookieConsentConfig["language"] = {
  ..._config.language,
  translations: stripInvalidLinkedCategoriesFromTranslations(
    _config.language.translations,
    categories,
    true, // clear cookie tables // FIXME: refactor this to actually just use the proper cookie table accoring to the categories var
  ),
};

const config: CookieConsentConfig = {
  ..._config,
  categories,
  language,
};

// console.debug({ config }, "Initializing Cookie Consent (tilli Website)...");
const init = makeInitFn(run, config, showPreferences);
void init();
