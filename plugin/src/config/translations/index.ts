import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import de from "./de";
import en from "./en";
import es from "./es";
import fr from "./fr";
import it from "./it";

export default {
  de,
  en,
  es,
  fr,
  it,
} satisfies CookieConsentConfig["language"]["translations"];
