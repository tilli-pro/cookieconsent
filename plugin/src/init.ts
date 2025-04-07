import "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.umd.js?min=1";

import type * as _CookieConsent from "@tilli-pro/cookieconsent";
import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import _config from "./config";
import { makeInitFn } from "./init/utils";
import { cookieConsentTheme } from "./_utils";

declare module CookieConsent {
  const run: typeof _CookieConsent.run;
}

declare global {
  interface Window {
    cookieConsentTheme: typeof cookieConsentTheme;
  }
}

const GIT_SHA = "0f888b603ba1077d94776af62d2bfb7247e5ffe4";
const GIT_REPO = "tilli-pro/cookieconsent";
const GIT_CDN_BASE_URL = `https://rawcdn.githack.com`;
const GIT_CDN_URL = `${GIT_CDN_BASE_URL}/${GIT_REPO}/${GIT_SHA}`;
const GIT_DIST_URL = `${GIT_CDN_URL}/dist`;
export const makeRemotePath = (path: string) => `${GIT_DIST_URL}/${path}?min=1`;

const CC_CSS_URL = makeRemotePath("cookieconsent.css");

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

function always() {
  loadCSS(CC_CSS_URL);
  window.cookieConsentTheme = cookieConsentTheme; // used to fetch the correct classname to apply a specified theme
}

always();

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
