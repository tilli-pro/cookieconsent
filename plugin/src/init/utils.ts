import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";
import type * as CookieConsent from "@tilli-pro/cookieconsent";

import { injectReactRemoveScrollToggle } from "../config/gui-options/scripts/forceDisableReactRemoveScroll";
import { injectManageCookiePrefsButton } from "../config/gui-options/scripts/injectManageCookiePrefsButton";
import type { ShowPreferencesFn } from "../config/gui-options/scripts/showPreferences.d";

export const makeInitFn = (
  initFn: typeof CookieConsent.run,
  config: CookieConsentConfig,
  showPreferences: ShowPreferencesFn,
) => {
  return async () => {
    /** inject the cookie-consent banner (pop-up) */
    await initFn(config);

    /** ...then, inject the floating cookie consent "manage preferences" icon button into the DOM (floats @ the bottom right) */
    injectManageCookiePrefsButton(showPreferences);

    /** ...and, force-disable "react-remove-scroll" -- only upon opening up the "manage preferences" dialog
     *
     *  > this handles the edge case where there's a shadcn (radix-ui) dialog open
     *    underneath the cookie banner's "manage preferences" dialog, which prevents
     *    the user from scrolling within the manage prefs dialog
     */
    injectReactRemoveScrollToggle();
  };
};

export const stripInvalidLinkedCategoriesFromTranslations = (
  translations: CookieConsentConfig["language"]["translations"],
  categories: CookieConsentConfig["categories"],
  alsoClearCookieTables: boolean = false, // FIXME: refactor this to actually just use the proper cookie table accoring to the categories var
): CookieConsentConfig["language"]["translations"] =>
  Object.fromEntries(
    Object.entries(translations).map(([lang, translation]) => {
      if (
        translation &&
        typeof translation === "object" &&
        translation.preferencesModal &&
        Array.isArray(translation.preferencesModal.sections)
      ) {
        /** filter out irrelevant sections */
        const filteredSections = translation.preferencesModal.sections.filter(
          (section: CookieConsent.Section) =>
            !section.linkedCategory || categories[section.linkedCategory],
        );

        if (alsoClearCookieTables)
          filteredSections.forEach(
            (section: CookieConsent.Section) => (section.cookieTable = undefined),
          );

        return [
          lang,
          {
            ...translation,
            preferencesModal: {
              ...translation.preferencesModal,
              sections: filteredSections,
            },
          },
        ];
      }

      return [lang, translation];
    }),
  );
