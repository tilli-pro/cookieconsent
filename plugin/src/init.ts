import "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.umd.js?min=1";

import type * as _CookieConsent from "@tilli-pro/cookieconsent";
import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "./config";
import { makeInitFn } from "./init/utils";

declare module CookieConsent {
  const run: typeof _CookieConsent.run;
}

const CSS_URL =
  "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.css?min=1";

function loadCSS(url: string) {
  if (document.querySelector('link[href*="cookieconsent.css"]')) return; // prevent duplication

  const link = document.createElement("link");
  Object.assign(link, {
    rel: "stylesheet",
    type: "text/css",
    href: url,
  });
  document.head.appendChild(link);
}

function isEntryModule(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const currentModuleUrl = new URL(import.meta.url, document.baseURI).href;
    const scripts = Array.from(
      document.querySelectorAll('script[type="module"]'),
    );
    return scripts.some((script) => {
      const src = script.getAttribute("src");
      if (!src) return false;
      return new URL(src, document.baseURI).href === currentModuleUrl;
    });
  } catch (err) {
    console.error("Error checking module entry:", err);
    return false;
  }
}

loadCSS(CSS_URL);

export async function run(
  config: CookieConsentConfig = _config,
): ReturnType<typeof CookieConsent.run> {
  return await CookieConsent.run(config);
}

if (isEntryModule()) {
  console.debug({ config: _config }, "Initializing Cookie Consent (entry module)...");
  const init = makeInitFn(run, _config);
  void init();
}
