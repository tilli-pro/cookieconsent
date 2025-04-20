"use client";
import CookieIcon from "./assets/CookieIcon.js";
const translations = {
    en: {
        manageCookiePreferences: "Manage cookie preferences",
    },
};
export const buttonId = "tilli-manage-cookie-preferences-floating-button";
export const containerId = `${buttonId}-container`;
/**
 * returns HTML for a floating "manage cookie preferences" button.
 *
 *  > by default, the button is visible -- however, if `#cc-main` (which
 *    appears *earlier* in the DOM and is thus a preceding sibling to
 *    `#${containerId}`) is still visible (i.e., the cookie consent modal),
 *    the entire container (`#${containerId}`) will be hidden.
 */
export default (lang = "en") => `
<!-- floating cookie consent "manage preferences" icon button -->
<abbr title="${translations[lang].manageCookiePreferences}">
  <button
    id="${buttonId}"
    type="button"
    data-cc="${
/**
 * auto-add "onClick" functionality -- @see https://cookieconsent.orestbida.com/essential/getting-started.html#how-to-open-the-preferences-modal
 *
 * @deprecated (can stay, no harm) prefer `CookieConsent.showPreferences()` since `data-cc="show-preferencesModal"` will only work if this cookie prefs button is injected PRIOR to running `CookieConsent.run()` -- @see https://cookieconsent.orestbida.com/reference/api-reference.html#showpreferences
 */
"show-preferencesModal"}"
    aria-label="${translations[lang].manageCookiePreferences}"
  >
    <style>
      #${buttonId} {
        /* floats @ the bottom right */
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 9999999;

        /* sizing + layout */
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        /* circular button background -- NOTE(IMPORTANT): must adhere to contrast guidelines -- @see https://webaim.org/resources/contrastchecker */
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 50%;
        padding: 0.25rem;              /* "fat-finger"-friendly padding */
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        cursor: pointer;

        /* transitions for hover/focus states */
        transition: box-shadow 0.2s ease;
        animation: fadeIn var(--cc-modal-transition-duration) ease-in-out forwards;

        /* ensure always-interactable + visible */
        pointer-events: auto;
        visibility: visible !important;

        /* prevent default <button> text color override */
        color: inherit;
      }

      .dark #${buttonId} {
        background-color: #000;
        border-color: #333;
      }

      #${buttonId}:hover,
      #${buttonId}:focus {
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }

      #${buttonId}:focus-visible {
        outline: none;                 /* remove default blue outline */
      }

      /* the icon itself (SVG), scaled: */
      #${buttonId} svg {
        width: 1.5rem;
        height: 1.5rem;
        display: block;
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
          transform: translateY(50%);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* default: display the container so the button is visible */
      #${containerId} {
        display: block;
      }

      /* 
        hide the entire container IF AND ONLY IF:
        - #cc-main (earlier sibling) has .cm-wrapper
        - That .cm-wrapper has a .cm
        - That .cm has [aria-hidden="false"] (i.e., the cookie consent modal is visible)
      */
      #cc-main:has(.cm-wrapper .cm[aria-hidden="false"]) ~ #${containerId} {
        display: none !important;
      }
    </style>

    ${CookieIcon(1)}
  </button>
</abbr>
`;
