import type { Translation } from "@tilli-pro/cookieconsent";

import type { CookieTableHeaders } from "../../cookies/types";
import cookies from "../../cookies";
import CookieIcon from "../../gui-options/html-components/assets/CookieIcon";
import TilliXCallout from "../../gui-options/html-components/TilliXCallout";

const __LANGUAGE__ = "it"; // "Italian" ("Italiano")

const COOKIE_TABLE_HEADERS: CookieTableHeaders = {
  name: "Nome",
  service: "Servizio",
  description: "Descrizione",
  expiration: "Scadenza",
};

export default {
  consentModal: {
    title: `${CookieIcon()} Informativa sui Cookie`,
    description: `{{revisionMessage}}Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito web. I cookie strettamente necessari sono essenziali per il funzionamento di questo sito e non possono essere disattivati. Gli altri cookie richiedono il tuo consenso. Cliccando su "Accetta tutto", acconsenti all'uso dei cookie. In alternativa, puoi gestire le tue preferenze sui cookie selezionando il pulsante "Gestisci preferenze" qui sotto. Puoi rivedere e aggiornare le tue preferenze sui cookie in qualsiasi momento tramite l'icona ${CookieIcon(1, 0.5, 0, -0.3333)} nell'angolo in basso a destra. Ti invitiamo a leggere la nostra <a href="https://tilli.pro/privacy-policy" target="_blank">Informativa sulla Privacy</a> per ulteriori informazioni.`,
    acceptAllBtn: "Accetta tutto",
    acceptNecessaryBtn: "Solo strettamente necessari",
    showPreferencesBtn: "Gestisci preferenze",
    // closeIconLabel: "Chiudi", // generates a big "X" ("accept necessary") button – let's disable it for now (to force a choice)
    revisionMessage: `La nostra <a href="https://tilli.pro/privacy-policy" target="_blank">Informativa sulla Privacy</a> è stata recentemente aggiornata. <br><br> `,
    footer: `
      <a href="https://tilli.pro/privacy-policy" target="_blank">Informativa sulla Privacy</a>
      <a href="https://tilli.pro/industries/terms-and-conditions" target="_blank">Termini e Condizioni</a>

      ${TilliXCallout(__LANGUAGE__)}
    `,
  },

  preferencesModal: {
    title: `${TilliXCallout(__LANGUAGE__, 1)} Gestisci preferenze sui cookie`,
    acceptAllBtn: "Accetta tutto",
    acceptNecessaryBtn: "Solo strettamente necessari",
    savePreferencesBtn: "Salva preferenze",
    closeIconLabel: "Chiudi",
    sections: [
      {
        title: "Uso dei cookie",
        description:
          'Utilizziamo i cookie per garantire la funzionalità di base del sito web e per migliorare la tua esperienza online. Puoi scegliere, per ogni categoria, se acconsentire o meno in qualsiasi momento. Per maggiori dettagli sui cookie e altri dati sensibili, consulta l\'intera <a href="https://tilli.pro/privacy-policy" target="_blank">Informativa sulla Privacy</a>.',
      },

      {
        title: "Cookie strettamente necessari",
        description:
          "Questi cookie sono essenziali per il funzionamento di base del sito web. Consentono funzionalità fondamentali come sicurezza e accessibilità. Senza questi cookie, alcuni servizi e funzionalità potrebbero non funzionare correttamente.",
        linkedCategory: "necessary",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.necessary.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Cookie di prestazione",
      //   description:
      //     "Questi cookie ci aiutano a capire come interagisci con il nostro sito web per migliorarne le prestazioni. Tracciano metriche come visualizzazioni di pagina, tempi di caricamento o eventuali errori riscontrati, permettendoci di identificare e risolvere i problemi.",
      //   linkedCategory: "performance",
      // },

      {
        title: "Cookie funzionali",
        description:
          "Questi cookie memorizzano le tue preferenze e impostazioni per personalizzare la tua esperienza di navigazione, come ricordare la scelta del tema o della lingua.",
        linkedCategory: "functional",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.functional.brf(__LANGUAGE__)],
        },
      },

      /** DISABLED– not in use as of 12/17/2024. */
      // {
      //   title: "Cookie pubblicitari",
      //   description:
      //     "Questi cookie vengono utilizzati per offrire pubblicità pertinenti ai tuoi interessi. Possono tracciare i tuoi comportamenti di navigazione su diversi siti e aiutare gli inserzionisti a servire annunci più personalizzati.",
      //   linkedCategory: "advertising",
      // },

      {
        title: "Cookie di analisi",
        description:
          "Questi cookie raccolgono dati anonimi per aiutarci a comprendere come i visitatori interagiscono con il nostro sito web. Le informazioni che forniscono ci aiutano a migliorare l'esperienza dell'utente.",
        linkedCategory: "analytics",
        cookieTable: {
          headers: COOKIE_TABLE_HEADERS,
          body: [...cookies.analytics.datadog(__LANGUAGE__)],
        },
      },

      {
        title: "Cookie di marketing",
        description:
          "Questi cookie vengono utilizzati per offrire pubblicità pertinenti ai tuoi interessi. Possono tracciare i tuoi comportamenti di navigazione su diversi siti e aiutare gli inserzionisti a servire annunci più personalizzati.",
        linkedCategory: "marketing",
      },
      
      {
        title: "Ulteriori informazioni",
        description:
          'Per qualsiasi domanda relativa alla nostra politica sui cookie e alle tue scelte, ti preghiamo di <a href="mailto:privacy@tilli.pro">contattarci</a>.',
      },
    ],
  },
} satisfies Translation;
