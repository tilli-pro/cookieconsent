import "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.umd.js?min=1";
import _config from "./config/index.js";
import { makeInitFn } from "./init/utils.js";
const CSS_URL = "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.css?min=1";
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
loadCSS(CSS_URL);
export async function run(config = _config) {
    return await CookieConsent.run(config);
}
if (isEntryModule()) {
    const init = makeInitFn(run, _config);
    void init();
}
