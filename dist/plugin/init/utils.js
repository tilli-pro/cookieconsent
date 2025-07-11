import { injectReactRemoveScrollToggle } from "../config/gui-options/scripts/forceDisableReactRemoveScroll.js";
import { injectManageCookiePrefsButton } from "../config/gui-options/scripts/injectManageCookiePrefsButton.js";
import { injectUTMParametersIntoATags } from "../config/gui-options/scripts/injectUTM.js";
export const makeInitFn = (initFn, config, showPreferences) => {
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
        /** finally, inject UTM parameters into the DOM (a tags) */
        injectUTMParametersIntoATags();
    };
};
export const stripInvalidLinkedCategoriesFromTranslations = (translations, categories, alsoClearCookieTables = false) => Object.fromEntries(Object.entries(translations).map(([lang, translation]) => {
    if (translation &&
        typeof translation === "object" &&
        translation.preferencesModal &&
        Array.isArray(translation.preferencesModal.sections)) {
        /** filter out irrelevant sections */
        const filteredSections = translation.preferencesModal.sections.filter((section) => !section.linkedCategory || categories[section.linkedCategory]);
        if (alsoClearCookieTables)
            filteredSections.forEach((section) => (section.cookieTable = undefined));
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
}));
