import type { Language, Locale } from "./config/translations/types";
import type { TenantRefId, Theme } from "./_types";
import { COOKIE_CONSENT_TEST_SEARCH_PARAM_KEY_PREFIX } from "./_consts";

type SupportedTenantThemes = Partial<Record<TenantRefId, Theme[]>>;
const SUPPORTED_TENANT_THEMES = {
  "con-edison": ["light"],
  oru: ["light"],
  freeman: ["light"],
  frontier: ["light"],
} satisfies SupportedTenantThemes;
type SupportedTenant = keyof typeof SUPPORTED_TENANT_THEMES;

interface CookieConsentThemeParams {
  theme?: Theme;
  defaultTo?: Exclude<Theme, "system">;
  tenantRefId?: TenantRefId;
  url?: URL | null;
}

export const cookieConsentTheme = ({
  theme,
  defaultTo = "light",
  tenantRefId,
  url,
}: CookieConsentThemeParams) => {
  theme ??= defaultTo; // apply default theme (if not provided)

  /** handle cookie consent __test__ overrides */
  if (url) {
    const prefix = COOKIE_CONSENT_TEST_SEARCH_PARAM_KEY_PREFIX;
    const searchParams = new URLSearchParams(url.search);
    const cookieConsentTestParams = Object.fromEntries(
      (["lang", "locale", "tenant", "product", "theme"] as const).map((key) => [
        key,
        searchParams.get(`${prefix}${key}`),
      ]),
    ) as {
      lang?: Language;
      locale?: Locale;
      tenant?: TenantRefId;
      product?: "tilliX" | "nudge" | "tilli-pay"; // TODO: add type
      theme?: Exclude<Theme, "system">;
    };

    if (cookieConsentTestParams.tenant)
      tenantRefId = cookieConsentTestParams.tenant;

    if (cookieConsentTestParams.theme) theme = cookieConsentTestParams.theme;
  }

  /** handle tenant-specific themes */
  const tenantThemes = SUPPORTED_TENANT_THEMES[
    tenantRefId as SupportedTenant
  ] as SupportedTenantThemes[SupportedTenant];
  if (tenantThemes?.includes(theme))
    return `cc--tenant:${tenantRefId}-${theme}`;

  /** fallback to first tenant theme */
  if (tenantThemes) return `cc--tenant:${tenantRefId}-${tenantThemes[0]}`;

  /** handle dark mode */
  if (theme === "dark") return "cc--elegant-black dark";
};
