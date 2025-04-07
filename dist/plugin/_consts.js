export const COOKIE_CONSENT_ENABLED = true;
/** NOTE(IMPORTANT): if bumped (e.g. 2 -> 3): users who had already consented to the prev. revision # will be prompted again for re-consent (w/ a notice that the policy has changed) */
export const REVISION = 0; // "revision" refers to our cookie/privacy policy version number (handled by a simple incremental counter rather than traditional "semvar" syntax)
export const COOKIE_PREFERENCES_COOKIE_NAME = "_tilli_cookie-preferences"; // name of the cookie that stores the user's cookie preferences
/** __tests__ */
export const COOKIE_CONSENT_TEST_SEARCH_PARAM_KEY_PREFIX = "cc-";
