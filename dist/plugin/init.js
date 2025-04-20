import "https://cdn.jsdelivr.net/gh/tilli-pro/cookieconsent@10ee557547798cf871a4921206d9deae25166d9d/dist/cookieconsent.umd.js";
import { cookieConsentTheme } from "./_utils.js";
import _config from "./config/index.js";
import styles from "./styles/index.js";
import { initTheme } from "./init/utils.script.js";
const GIT_SHA = "10ee557547798cf871a4921206d9deae25166d9d";
const GIT_REPO = "tilli-pro/cookieconsent";
const GIT_CDN_BASE_URL = "https://cdn.jsdelivr.net/gh";
const GIT_CDN_URL = `${GIT_CDN_BASE_URL}/${GIT_REPO}@${GIT_SHA}`;
const GIT_DIST_URL = `${GIT_CDN_URL}/dist`;
const makeRemoteURL = (path) => `${GIT_DIST_URL}/${path}`;
export const makeRemotePluginURL = (path) => makeRemoteURL(`plugin/${path}`);
const CC_CSS_URL = makeRemoteURL("cookieconsent.css");
const getFilenameWithPathFromRemoteURL = (url) => {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const file = path.split("/").pop();
    return file;
};
function loadCSS(url) {
    if (document.querySelector(`link[href*="${getFilenameWithPathFromRemoteURL(url)}"]`)) {
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
function loadNestedPluginCSS(basePath, obj) {
    for (const [key, value] of Object.entries(obj))
        if (typeof value === "string") {
            const url = makeRemotePluginURL(`${basePath}/${value}`);
            // console.debug(`Loading plugin CSS from ${url}`);
            loadCSS(url);
        }
        else if (value && typeof value === "object") {
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
export const run = async (config = _config) => await CookieConsent.run(config);
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
