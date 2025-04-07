import { LABELS } from "../../../categories/labels.js";
import commonTranslations from "../../common-translations.js";
const COOKIE_PREFIX = "tx-brf-session:";
export const translations = {
    de: {
        [`${COOKIE_PREFIX}<i>i</i>`]: "Speichert Ihre <i>i</i><sup>te</sup> aktive Sitzungskennung",
        [`${COOKIE_PREFIX}meta`]: "Ihre unverfallenen Sitzungsindizes (siehe oben)",
    },
    en: {
        [`${COOKIE_PREFIX}<i>i</i>`]: "Stores your <i>i</i><sup>th</sup> active session identifier",
        [`${COOKIE_PREFIX}meta`]: "Your unexpired session indicies (view above)",
    },
    es: {
        [`${COOKIE_PREFIX}<i>i</i>`]: "Almacena tu identificador de sesión activa número <i>i</i><sup>th</sup>",
        [`${COOKIE_PREFIX}meta`]: "Tus índices de sesión no caducados (ver arriba)",
    },
    fr: {
        [`${COOKIE_PREFIX}<i>i</i>`]: "Stocke votre identifiant de session active <i>i</i><sup>ème</sup>",
        [`${COOKIE_PREFIX}meta`]: "Vos indices de session non expirés (voir ci-dessus)",
    },
    it: {
        [`${COOKIE_PREFIX}<i>i</i>`]: "Memorizza il tuo identificatore di sessione attiva numero <i>i</i><sup>esimo</sup>",
        [`${COOKIE_PREFIX}meta`]: "I tuoi indici di sessione non scaduti (vedi sopra)",
    },
};
export default (lang) => [
    {
        name: `${COOKIE_PREFIX}<i>i</i>`,
        service: LABELS.en.necessary.tilliX,
        description: translations[lang][`${COOKIE_PREFIX}<i>i</i>`],
        expiration: commonTranslations[lang]["session-end"],
    },
    {
        name: `${COOKIE_PREFIX}meta`,
        service: LABELS.en.necessary.tilliX,
        description: translations[lang][`${COOKIE_PREFIX}meta`],
        expiration: commonTranslations[lang]["1 year"],
    },
];
