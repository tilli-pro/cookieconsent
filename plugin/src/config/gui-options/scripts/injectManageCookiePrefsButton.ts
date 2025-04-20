"use client";

import type * as _CookieConsent from "@tilli-pro/cookieconsent";

import type { HTMLDivElementWithDragObserver } from "./cookiePrefsButtonDragObserver";
import ManageCookiePrefsButton, {
  containerId,
} from "../html-components/ManageCookiePrefsButton";
import cookiePrefsButtonDragObserver, {
  ontouchend,
  ontouchstart,
} from "./cookiePrefsButtonDragObserver";

declare const CookieConsent:
  | {
      showPreferences?: typeof _CookieConsent.showPreferences;
    }
  | undefined;

export const showPreferences =
  typeof CookieConsent !== "undefined" &&
  typeof CookieConsent.showPreferences === "function"
    ? CookieConsent.showPreferences
    : (await import("@tilli-pro/cookieconsent")).showPreferences;

/** injects the floating cookie consent "manage preferences" icon button into the DOM */
const inject = (): HTMLDivElement => {
  const container = document.body.appendChild(
    Object.assign(document.createElement("div"), {
      id: containerId,
      innerHTML: ManageCookiePrefsButton(/* TODO: __LANGUAGE__ */),
      onclick:
        showPreferences /** prefer over `data-cc="show-preferencesModal"` -- @see https://cookieconsent.orestbida.com/reference/api-reference.html#showpreferences */,
      onmouseover: cookiePrefsButtonDragObserver,
      // [mobile (touch) support]
      ontouchend,
      ontouchstart,
    } satisfies Partial<HTMLDivElement>),
  ) as HTMLDivElementWithDragObserver;

  /** load drag observer upon DOM injection (unfortunate fix to prevent the need for 2x "ontouchstart" events) */
  cookiePrefsButtonDragObserver.call(container);

  return container;
};

/** entry point */
export function injectManageCookiePrefsButton(): ReturnType<typeof inject> {
  return ((container) => {
    /** observe the DOM (to handle the case where the injected manage prefs button somehow gets removed) */
    new MutationObserver(() => {
      const alreadyInjected: boolean =
        !!document.getElementById(containerId) ||
        document.body.contains(container);
      if (alreadyInjected) return;

      /** if the container is no longer in <body>, re-inject */
      container = inject();
    }).observe(document.body, { childList: true, subtree: true });

    return container;
  })(
    (document.getElementById(containerId) as HTMLDivElement | null) ?? inject(),
  );
}