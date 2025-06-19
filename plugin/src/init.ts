import "https://cdn.jsdelivr.net/gh/tilli-pro/cookieconsent@dd31957f9ae95bb46f53594bf4d1d284c6e3c02c/dist/cookieconsent.umd.js";

import type * as _CookieConsent from "@tilli-pro/cookieconsent";
import type { CookieConsentConfig } from "@tilli-pro/cookieconsent";

import { cookieConsentTheme } from "./_utils";
import _config from "./config";
import styles from "./styles";
import { initTheme } from "./init/utils.script";

declare module CookieConsent {
  const run: typeof _CookieConsent.run;
}

declare global {
  interface Window {
    cookieConsentTheme: typeof cookieConsentTheme;
  }
}

const GIT_SHA = "dd31957f9ae95bb46f53594bf4d1d284c6e3c02c";
const GIT_REPO = "tilli-pro/cookieconsent";
const GIT_CDN_BASE_URL = "https://cdn.jsdelivr.net/gh";
const GIT_CDN_URL = `${GIT_CDN_BASE_URL}/${GIT_REPO}@${GIT_SHA}`;
const GIT_DIST_URL = `${GIT_CDN_URL}/dist`;
const makeRemoteURL = (path: string) => `${GIT_DIST_URL}/${path}`;
export const makeRemotePluginURL = (path: string) =>
  makeRemoteURL(`plugin/${path}`);

const CC_CSS_URL = makeRemoteURL("cookieconsent.css");

const getFilenameWithPathFromRemoteURL = (url: string) => {
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  const file = path.split("/").pop();
  return file;
};

function loadCSS(url: string) {
  if (
    document.querySelector(
      `link[href*="${getFilenameWithPathFromRemoteURL(url)}"]`,
    )
  ) {
    // console.debug(`CSS already loaded: ${url}`);
    return; // prevent duplication
  }

  const link = document.createElement("link");
  Object.assign(link, {
    rel: "stylesheet",
    type: "text/css",
    href: url,
  });
  document.head.appendChild(link);
}

function loadNestedPluginCSS(basePath: string, obj: any): void {
  for (const [key, value] of Object.entries(obj))
    if (typeof value === "string") {
      const url = makeRemotePluginURL(`${basePath}/${value}`);
      // console.debug(`Loading plugin CSS from ${url}`);
      loadCSS(url);
    } else if (value && typeof value === "object") {
      // console.debug(`Loading nested plugin CSS from ${basePath}/${key}`);
      loadNestedPluginCSS(`${basePath}/${key}`, value);
    }
}

async function always() {
  loadCSS(CC_CSS_URL);
  loadNestedPluginCSS("styles", styles); // TODO: make dynamic (only import dependent styles - aka if a certain `init` config is specified)
  window.cookieConsentTheme = cookieConsentTheme; // used to fetch the correct classname to apply a specified theme | THIS SHOULD BE INJECTED INTO THE <HTML> TAG!!! // TODO: auto-inject (?)
  initTheme();
}

void always();

export const run = async (
  config: CookieConsentConfig = _config,
): ReturnType<typeof CookieConsent.run> => await CookieConsent.run(config);

// ⚠️ NOTE: DISABLED THIS ENTRY MODULE SINCE ALL INITS SHOULD BE USING A SPECIFICALLY-CONFIGURED ENTRY MODULE INSTEAD (e.g. `init/brf.ts`, `init/tilli-website.ts`) !!!

// function isEntryModule(): boolean {
//   if (typeof document === "undefined") return false;
//   try {
//     const currentModuleUrl = new URL(import.meta.url, document.baseURI).href;
//     const scripts = Array.from(
//       document.querySelectorAll('script[type="module"]'),
//     );
//     return scripts.some((script) => {
//       const src = script.getAttribute("src");
//       if (!src) return false;
//       return new URL(src, document.baseURI).href === currentModuleUrl;
//     });
//   } catch (err) {
//     console.error("Error checking module entry:", err);
//     return false;
//   }
// }

// if (isEntryModule()) {
//   // console.debug(
//   //   { config: _config },
//   //   "Initializing Cookie Consent (entry module)...",
//   // );
//   const init = makeInitFn(run, _config);
//   void init();
// }
