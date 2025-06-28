"use client";

import assets from "../../../assets";

const translations = {
  de: {
    poweredByTilliX: "unterstützt von tilliX",
  },
  en: {
    poweredByTilliX: "powered by tilliX",
  },
  es: {
    poweredByTilliX: "impulsado por tilliX",
  },
  fr: {
    poweredByTilliX: "propulsé par tilliX",
  },
  it: {
    poweredByTilliX: "alimentato da tilliX",
  },
};

export default (
  lang: keyof typeof translations = "en",
  inPrefs?: boolean | (1 | 0), // 😉
): string => `
<!-- "powered by tilliX" callout -->
<div style="${!inPrefs ? "margin-left: auto; " : ""}margin-top: auto; margin-bottom: auto">
  <abbr title="${translations[lang].poweredByTilliX}" style="${inPrefs ? "margin-right: 1em" : "margin-left: 1.3rem"}; display: flex; align-items: center">
    <a id="tilli-cc-powered-by-tillix-link${inPrefs ? "-preferences" : ""}" href="https://tilli.pro" target="_blank" style="display: inline-block; background-image: none">
      <img src="data:image/svg+xml;charset=utf8,${encodeURIComponent(assets.logo)}" alt="tilli" style="height: 1em; width: auto; min-height: 1em; min-width: 1em; vertical-align: middle" />
    </a>
  </abbr>
</div>`;
