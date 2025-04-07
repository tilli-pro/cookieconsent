import "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.umd.js?min=1";
import { cookieConsentTheme } from "./_utils.js";
import _config from "./config/index.js";
import { makeInitFn } from "./init/utils.js";
import styles from "./styles/index.js";
const GIT_SHA = "0f888b603ba1077d94776af62d2bfb7247e5ffe4";
const GIT_REPO = "tilli-pro/cookieconsent";
const GIT_CDN_BASE_URL = `https://rawcdn.githack.com`;
const GIT_CDN_URL = `${GIT_CDN_BASE_URL}/${GIT_REPO}/${GIT_SHA}`;
const GIT_DIST_URL = `${GIT_CDN_URL}/dist`;
export const makeRemotePath = (path) => `${GIT_DIST_URL}/${path}?min=1`;
const CC_CSS_URL = makeRemotePath("cookieconsent.css");
function loadCSS(url) {
    if (document.querySelector('link[href*="cookieconsent.css"]'))
        return; // prevent duplication
    const link = document.createElement("link");
    Object.assign(link, {
        rel: "stylesheet",
        type: "text/css",
        href: url,
    });
    document.head.appendChild(link);
}
function loadNestedCSS(basePath, obj) {
    for (const [key, value] of Object.entries(obj))
        if (typeof value === "string") {
            const url = makeRemotePath(`${basePath}/${value}`);
            loadCSS(url);
        }
        else if (value && typeof value === "object")
            loadNestedCSS(`${basePath}/${key}`, value);
}
function isEntryModule() {
    if (typeof document === "undefined")
        return false;
    try {
        const currentModuleUrl = new URL(import.meta.url, document.baseURI).href;
        const scripts = Array.from(document.querySelectorAll('script[type="module"]'));
        return scripts.some((script) => {
            const src = script.getAttribute("src");
            if (!src)
                return false;
            return new URL(src, document.baseURI).href === currentModuleUrl;
        });
    }
    catch (err) {
        console.error("Error checking module entry:", err);
        return false;
    }
}
function always() {
    loadCSS(CC_CSS_URL);
    loadNestedCSS("/styles", styles);
    window.cookieConsentTheme = cookieConsentTheme; // used to fetch the correct classname to apply a specified theme | THIS SHOULD BE INJECTED INTO THE <HTML> TAG!!! // TODO: auto-inject (?)
}
always();
export async function run(config = _config) {
    return await CookieConsent.run(config);
}
if (isEntryModule()) {
    console.debug({ config: _config }, "Initializing Cookie Consent (entry module)...");
    const init = makeInitFn(run, _config);
    void init();
}
