import cookies from "../../cookies/index.js";
import CookieIcon from "../../gui-options/html-components/assets/CookieIcon.js";
import TilliXCallout from "../../gui-options/html-components/TilliXCallout.js";
const __LANGUAGE__ = "de"; // "German" ("Deutsch")
const COOKIE_TABLE_HEADERS = {
    name: "Name",
    service: "Dienst",
    description: "Beschreibung",
    expiration: "Ablauf",
};
export default {
    consentModal: {
        title: `${CookieIcon()} Cookie-Hinweis`,
        description: `{{revisionMessage}}Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Unbedingt erforderliche Cookies sind für die Funktionalität dieser Website unerlässlich und können nicht deaktiviert werden. Andere Cookies erfordern Ihre Zustimmung. Durch Klicken auf "Alle akzeptieren" stimmen Sie der Verwendung von Cookies zu. Alternativ können Sie Ihre Cookie-Einstellungen verwalten, indem Sie unten auf die Schaltfläche "Einstellungen verwalten" klicken. Sie können Ihre Cookie-Einstellungen jederzeit über das Symbol ${CookieIcon(1, 0.5, 0, -0.3333)} in der unteren rechten Ecke überprüfen und aktualisieren. Weitere Informationen finden Sie in unserer <a href="https://tilli.pro/privacy-policy" target="_blank">Datenschutzerklärung</a>.`,
        acceptAllBtn: "Alle akzeptieren",
        acceptNecessaryBtn: "Nur unbedingt erforderliche",
        showPreferencesBtn: "Einstellungen verwalten",
        // closeIconLabel: "Schließen", // generates a big "X" ("accept necessary") button – let's disable it for now (to force a choice)
        revisionMessage: `Unsere <a href="https://tilli.pro/privacy-policy" target="_blank">Datenschutzerklärung</a> wurde kürzlich aktualisiert. <br><br> `,
        footer: `
      <a href="https://tilli.pro/privacy-policy" target="_blank">Datenschutzerklärung</a>
      <a href="https://tilli.pro/industries/terms-and-conditions" target="_blank">Allgemeine Geschäftsbedingungen</a>

      ${TilliXCallout(__LANGUAGE__)}
    `,
    },
    preferencesModal: {
        title: `${TilliXCallout(__LANGUAGE__, 1)} Cookie-Einstellungen verwalten`,
        acceptAllBtn: "Alle akzeptieren",
        acceptNecessaryBtn: "Nur unbedingt erforderliche",
        savePreferencesBtn: "Einstellungen speichern",
        closeIconLabel: "Schließen",
        sections: [
            {
                title: "Verwendung von Cookies",
                description: 'Wir verwenden Cookies, um die grundlegende Funktionalität der Website zu gewährleisten und Ihre Online-Erfahrung zu verbessern. Sie können für jede Kategorie auswählen, ob Sie zustimmen oder ablehnen möchten. Weitere Informationen zu Cookies und anderen sensiblen Daten finden Sie in der vollständigen <a href="https://tilli.pro/privacy-policy" target="_blank">Datenschutzerklärung</a>.',
            },
            {
                title: "Unbedingt erforderliche Cookies",
                description: "Diese Cookies sind für die grundlegende Funktionalität der Website unerlässlich. Sie ermöglichen Kernfunktionen wie Sicherheit und Barrierefreiheit. Ohne diese Cookies können bestimmte Dienste und Funktionen nicht ordnungsgemäß funktionieren.",
                linkedCategory: "necessary",
                cookieTable: {
                    headers: COOKIE_TABLE_HEADERS,
                    body: [...cookies.necessary.brf(__LANGUAGE__)],
                },
            },
            /** DISABLED– not in use as of 12/17/2024. */
            // {
            //   title: "Leistungs-Cookies",
            //   description:
            //     "Diese Cookies helfen uns zu verstehen, wie Sie mit unserer Website interagieren, um deren Leistung zu verbessern. Sie verfolgen Metriken wie Seitenaufrufe, Ladezeiten oder auftretende Fehler und helfen uns, Probleme zu erkennen und zu beheben.",
            //   linkedCategory: "performance",
            // },
            {
                title: "Funktionale Cookies",
                description: "Diese Cookies speichern Ihre Präferenzen und Einstellungen, um Ihre Browsing-Erfahrung zu personalisieren, z. B. durch das Speichern Ihrer Themen- oder Spracheinstellungen.",
                linkedCategory: "functional",
                cookieTable: {
                    headers: COOKIE_TABLE_HEADERS,
                    body: [...cookies.functional.brf(__LANGUAGE__)],
                },
            },
            /** DISABLED– not in use as of 12/17/2024. */
            // {
            //   title: "Werbe-Cookies",
            //   description:
            //     "Diese Cookies werden verwendet, um Werbung bereitzustellen, die für Ihre Interessen relevant ist. Sie können Ihr Surfverhalten auf verschiedenen Websites verfolgen und Werbetreibenden helfen, personalisierte Anzeigen anzuzeigen.",
            //   linkedCategory: "advertising",
            // },
            {
                title: "Analyse-Cookies",
                description: "Diese Cookies sammeln anonymisierte Daten, um uns zu helfen, zu verstehen, wie Besucher mit unserer Website interagieren. Die von ihnen bereitgestellten Erkenntnisse helfen uns, die Benutzererfahrung zu verbessern.",
                linkedCategory: "analytics",
                cookieTable: {
                    headers: COOKIE_TABLE_HEADERS,
                    body: [...cookies.analytics.datadog(__LANGUAGE__)],
                },
            },
            {
                title: "Marketing-Cookies",
                description: "Diese Cookies werden verwendet, um Werbung bereitzustellen, die für Ihre Interessen relevant ist. Sie können Ihr Surfverhalten auf verschiedenen Websites verfolgen und Werbetreibenden helfen, personalisierte Anzeigen anzuzeigen.",
                linkedCategory: "marketing",
            },
            {
                title: "Weitere Informationen",
                description: 'Bei Fragen zu unserer Cookie-Richtlinie und Ihren Auswahlmöglichkeiten kontaktieren Sie uns bitte unter <a href="mailto:privacy@tilli.pro">privacy@tilli.pro</a>.',
            },
        ],
    },
};
