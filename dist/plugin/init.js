import "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.umd.js?min=1";
import config from "./config/index.js";
const CSS_URL = "https://rawcdn.githack.com/tilli-pro/cookieconsent/0f888b603ba1077d94776af62d2bfb7247e5ffe4/dist/cookieconsent.css?min=1";
function loadCSS(url) {
    const link = document.createElement("link");
    Object.assign(link, {
        rel: "stylesheet",
        type: "text/css",
        href: url,
    });
    document.head.appendChild(link);
}
loadCSS(CSS_URL);
CookieConsent.run(config);
