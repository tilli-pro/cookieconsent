import { LABELS } from "../../categories/labels.js";
import commonTranslations from "../common-translations.js";
const COOKIE_PREFIX = "_tilli_analytics_dd_"; // remapped from library default ("_dd_")
export const translations = {
    de: {
        [`${COOKIE_PREFIX}s`]: "Speichert Ihre Sitzungskennung und einige grundlegende Metadaten",
    },
    en: {
        [`${COOKIE_PREFIX}s`]: "Stores your session identifier and some basic metadata",
    },
    es: {
        [`${COOKIE_PREFIX}s`]: "Almacena tu identificador de sesión y algunos metadatos básicos",
    },
    fr: {
        [`${COOKIE_PREFIX}s`]: "Stocke votre identifiant de session et quelques métadonnées de base",
    },
    it: {
        [`${COOKIE_PREFIX}s`]: "Memorizza il tuo identificatore di sessione e alcuni metadati di base",
    },
};
export default (lang) => [
    {
        name: `${COOKIE_PREFIX}s`,
        service: LABELS.en.analytics.datadog,
        description: translations[lang][`${COOKIE_PREFIX}s`],
        expiration: commonTranslations[lang]["session-end"],
    },
];
