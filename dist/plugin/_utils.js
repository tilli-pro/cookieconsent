import { COOKIE_CONSENT_TEST_SEARCH_PARAM_KEY_PREFIX } from "./_consts.js";
const SUPPORTED_TENANT_THEMES = {
    "con-edison": ["light"],
    oru: ["light"],
    freeman: ["light"],
    frontier: ["light"],
};
export const cookieConsentTheme = ({ theme, defaultTo = "light", tenantRefId, url, }) => {
    theme ??= defaultTo; // apply default theme (if not provided)
    /** handle cookie consent __test__ overrides */
    if (url) {
        const prefix = COOKIE_CONSENT_TEST_SEARCH_PARAM_KEY_PREFIX;
        const searchParams = new URLSearchParams(url.search);
        const cookieConsentTestParams = Object.fromEntries(["lang", "locale", "tenant", "product", "theme"].map((key) => [
            key,
            searchParams.get(`${prefix}${key}`),
        ]));
        if (cookieConsentTestParams.tenant)
            tenantRefId = cookieConsentTestParams.tenant;
        if (cookieConsentTestParams.theme)
            theme = cookieConsentTestParams.theme;
    }
    /** handle tenant-specific themes */
    const tenantThemes = SUPPORTED_TENANT_THEMES[tenantRefId];
    if (tenantThemes?.includes(theme))
        return `cc--tenant:${tenantRefId}-${theme}`;
    /** fallback to first tenant theme */
    if (tenantThemes)
        return `cc--tenant:${tenantRefId}-${tenantThemes[0]}`;
    /** handle dark mode */
    if (theme === "dark")
        return "cc--elegant-black dark";
};
