import type { Language } from "../../translations/types";
import type { CookieTableItem } from "../types";
import { LABELS } from "../../categories/labels";
import commonTranslations from "../common-translations";

const COOKIE_PREFIX = "tx-brf-auth."; // remapped from library default ("next-auth.")

export const translations = {
  de: {
    [`${COOKIE_PREFIX}session-token`]:
      "Speichert Ihre aktuelle Sitzungskennung",
    [`${COOKIE_PREFIX}csrf-token`]:
      'Verhindert <a href="https://de.wikipedia.org/wiki/Cross-Site-Request-Forgery" target="_blank">CSRF-Angriffe</a>',
    [`${COOKIE_PREFIX}callback-url`]:
      "Wir leiten Sie nach der Authentifizierung hierhin weiter",
    [`${COOKIE_PREFIX}nonce`]: "Eindeutige Kennung für jede Anfrage",
    [`${COOKIE_PREFIX}state`]: "URL-Zustand während der Authentifizierung",
    [`${COOKIE_PREFIX}pkce.code_verifier`]:
      "Verhindert Code-Injection-Angriffe",
  },
  en: {
    [`${COOKIE_PREFIX}session-token`]: "Stores your current session identifier",
    [`${COOKIE_PREFIX}csrf-token`]:
      'Prevents <a href="https://en.wikipedia.org/wiki/Cross-site_request_forgery" target="_blank">CSRF attacks</a>',
    [`${COOKIE_PREFIX}callback-url`]:
      "We'll redirect you here post-authentication",
    [`${COOKIE_PREFIX}nonce`]: "Unique identifier for each request",
    [`${COOKIE_PREFIX}state`]: "URL state during authentication",
    [`${COOKIE_PREFIX}pkce.code_verifier`]: "Prevents code injection attacks",
  },
  es: {
    [`${COOKIE_PREFIX}session-token`]:
      "Almacena tu identificador de sesión actual",
    [`${COOKIE_PREFIX}csrf-token`]:
      'Previene <a href="https://es.wikipedia.org/wiki/Cross-Site_Request_Forgery" target="_blank">ataques CSRF</a>',
    [`${COOKIE_PREFIX}callback-url`]:
      "Te redirigiremos aquí después de la autenticación",
    [`${COOKIE_PREFIX}nonce`]: "Identificador único para cada solicitud",
    [`${COOKIE_PREFIX}state`]: "Estado de la URL durante la autenticación",
    [`${COOKIE_PREFIX}pkce.code_verifier`]:
      "Previene ataques de inyección de código",
  },
  fr: {
    [`${COOKIE_PREFIX}session-token`]:
      "Stocke votre identifiant de session actuel",
    [`${COOKIE_PREFIX}csrf-token`]:
      'Empêche les <a href="https://fr.wikipedia.org/wiki/Cross-site_request_forgery" target="_blank">attaques CSRF</a>',
    [`${COOKIE_PREFIX}callback-url`]:
      "Nous vous redirigerons ici après l'authentification",
    [`${COOKIE_PREFIX}nonce`]: "Identifiant unique pour chaque demande",
    [`${COOKIE_PREFIX}state`]: "État de l'URL pendant l'authentification",
    [`${COOKIE_PREFIX}pkce.code_verifier`]:
      "Empêche les attaques par injection de code",
  },
  it: {
    [`${COOKIE_PREFIX}session-token`]:
      "Memorizza il tuo identificatore di sessione corrente",
    [`${COOKIE_PREFIX}csrf-token`]:
      'Previene <a href="https://it.wikipedia.org/wiki/Cross-site_request_forgery" target="_blank">attacchi CSRF</a>',
    [`${COOKIE_PREFIX}callback-url`]:
      "Ti reindirizzeremo qui dopo l'autenticazione",
    [`${COOKIE_PREFIX}nonce`]: "Identificatore univoco per ogni richiesta",
    [`${COOKIE_PREFIX}state`]: "Stato dell'URL durante l'autenticazione",
    [`${COOKIE_PREFIX}pkce.code_verifier`]:
      "Previene attacchi di iniezione di codice",
  },
} as const;

export default (lang: Language): CookieTableItem[] => [
  {
    name: `${COOKIE_PREFIX}session-token`,
    service: LABELS.en.necessary.tilliX,
    description: translations[lang][`${COOKIE_PREFIX}session-token`],
    expiration: commonTranslations[lang]["session-end"],
  },
  {
    name: `${COOKIE_PREFIX}csrf-token`,
    service: LABELS.en.necessary.tilliX,
    description: translations[lang][`${COOKIE_PREFIX}csrf-token`],
    expiration: commonTranslations[lang]["1 year"],
  },
  {
    name: `${COOKIE_PREFIX}callback-url`,
    service: LABELS.en.necessary.tilliX,
    description: translations[lang][`${COOKIE_PREFIX}callback-url`],
    expiration: commonTranslations[lang]["1 year"],
  },
  // {
  //   name: `${COOKIE_PREFIX}nonce`,
  //   service: LABELS.en.necessary.tilliX,
  //   description: translations[lang][`${COOKIE_PREFIX}nonce`],
  //   expiration: commonTranslations[lang]["1 year"],
  // },
  // {
  //   name: `${COOKIE_PREFIX}state`,
  //   service: LABELS.en.necessary.tilliX,
  //   description: translations[lang][`${COOKIE_PREFIX}state`],
  //   expiration: commonTranslations[lang]["15 minutes"],
  // },
  // {
  //   name: `${COOKIE_PREFIX}pkce.code_verifier`,
  //   service: LABELS.en.necessary.tilliX,
  //   description: translations[lang][`${COOKIE_PREFIX}pkce.code_verifier`],
  //   expiration: commonTranslations[lang]["15 minutes"],
  // },
];
