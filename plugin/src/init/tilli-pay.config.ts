import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "../config";
import { stripInvalidLinkedCategoriesFromTranslations } from "./utils";

const categories: CookieConsentConfig["categories"] = {
  necessary: {
    enabled: true, // "necessary" category is always enabled.
    readOnly: true,
  },
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

export const config: CookieConsentConfig = {
  ..._config,
  categories,
  language,
};
