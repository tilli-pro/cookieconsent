import { LABELS } from "../../../categories/labels.js";
import commonTranslations from "../../common-translations.js";
const COOKIE_PREFIX = "tx-";
export const translations = {
    de: {
        [`${COOKIE_PREFIX}theme`]: "Speichert Ihre ausgewählte Oberflächenthematik",
    },
    en: {
        [`${COOKIE_PREFIX}theme`]: "Keeps track of your selected interface theme",
    },
    es: {
        [`${COOKIE_PREFIX}theme`]: "Guarda el tema de interfaz que seleccionaste",
    },
    fr: {
        [`${COOKIE_PREFIX}theme`]: "Enregistre votre thème d'interface sélectionné",
    },
    it: {
        [`${COOKIE_PREFIX}theme`]: "Tiene traccia del tema dell'interfaccia selezionato",
    },
};
export default (lang) => [
    {
        name: `${COOKIE_PREFIX}theme`,
        service: LABELS.en.functional.tilliX,
        description: translations[lang][`${COOKIE_PREFIX}theme`],
        expiration: commonTranslations[lang]["1 year"],
    },
];
