"use client";

import type * as _CookieConsent from "@tilli-pro/cookieconsent";

import { buttonId } from "../html-components/ManageCookiePrefsButton";
// import { showPreferences } from "./injectManageCookiePrefsButton";

const showPreferences = () => {
  console.debug("showPreferences");
};

/**
 * attach a MutationObserver the **first time** the user hovers over–
 * enabling a limited "drag up" functionality for the floating button.
 *  > this is a purposeful UX enhancement to allow users to move the button
 *    out of the way in case it’s blocking content/functionality underneath.
 *
 * @usage simply attach this function to the `onmouseover` event of the floating button.
 * @see {@link ./injectManageCookiePrefsButton.tsx HTMLDivElement["onmouseover"]} for the full implementation.
 */
export default (function <IsTouch extends boolean = false>(
  this: HTMLDivElement,
  e: MouseEvent,
) {
  /** we store a data-attribute (`hasTilliCookiePrefsDragObserverInit`) to avoid reattaching
   * the logic on multiple hovers -- this ensures the script is only initiated once. */
  if (this.dataset.hasTilliCookiePrefsDragObserverInit === "true") return;
  this.dataset.hasTilliCookiePrefsDragObserverInit = "true";

  let isDragging = false;
  let startY = 0;
  let initialBottomPx = 0;
  let hasListeners = false; // track whether we've attached the events yet

  /** we'll dynamically calculate these values on the first drag */
  let lowestBottomPx = 0;
  let highestBottomPx = 0;

  // DRAG LOGIC
  function onMouseDown(this: HTMLElement, e: MouseEvent) {
    if (e.button !== 0) return; // only drag on left-click
    e.preventDefault();

    isDragging = true;
    startY = e.clientY;

    /** on each new drag, read the button’s *current* bottom */
    const buttonStyle = window.getComputedStyle(this);
    initialBottomPx = parseFloat(buttonStyle.bottom) || 16;
  }

  function onMouseMove(this: HTMLElement, e: MouseEvent) {
    if (!isDragging) return;

    /** positive delta => pointer moving down => button goes up */
    const dragDelta = startY - e.clientY;
    let newBottomPx = initialBottomPx + dragDelta;

    /** clamp between lowestBottomPx and highestBottomPx */
    if (newBottomPx < lowestBottomPx) newBottomPx = lowestBottomPx;
    if (newBottomPx > highestBottomPx) newBottomPx = highestBottomPx;

    this.style.bottom = `${newBottomPx}px`;
  }

  function onMouseUp() {
    isDragging = false;
  }

  // [mobile (touch) support]
  // - we also want to allow dragging on touch devices
  // - we're using the same logic as mouse dragging, but with touch events
  function onTouchStart(this: HTMLElement, e: TouchEvent) {
    if (e.touches?.length !== 1) return; // only drag with one finger
    e.preventDefault();
    isDragging = true;
    startY = e.touches[0]?.clientY ?? startY;

    const buttonStyle = window.getComputedStyle(this);
    initialBottomPx = parseFloat(buttonStyle.bottom) || 16;
  }

  function onTouchMove(this: HTMLElement, e: TouchEvent) {
    if (!isDragging) return;

    if (!e.touches?.[0]) return;
    const dragDelta = startY - e.touches[0].clientY;
    let newBottomPx = initialBottomPx + dragDelta;

    if (newBottomPx < lowestBottomPx) newBottomPx = lowestBottomPx;
    if (newBottomPx > highestBottomPx) newBottomPx = highestBottomPx;

    this.style.bottom = `${newBottomPx}px`;
  }

  function onTouchEnd() {
    isDragging = false;
  }

  function attachDragEvents(buttonEl: HTMLElement) {
    if (hasListeners) return; // only attach once
    hasListeners = true;

    /** determine max drag distance (based on button height) */
    const buttonStyle = window.getComputedStyle(buttonEl);
    const originalBottomPx = parseFloat(buttonStyle.bottom) || 16; // fallback to ~1rem
    const buttonHeightPx = parseFloat(buttonStyle.height) || 32; // fallback to ~2rem
    const maxDragPx = buttonHeightPx * 1.1; // added 10% extra to be safe

    /** the user can drag from the original position (lowestBottomPx) up by that computed distance (highestBottomPx). */
    lowestBottomPx = originalBottomPx;
    highestBottomPx = originalBottomPx + maxDragPx;

    /** attach the mouse events for dragging */
    buttonEl.addEventListener("mousedown", onMouseDown.bind(buttonEl));
    document.addEventListener("mousemove", onMouseMove.bind(buttonEl));
    document.addEventListener("mouseup", onMouseUp);
    // [mobile (touch) support]
    buttonEl.addEventListener("touchstart", onTouchStart.bind(buttonEl));
    document.addEventListener("touchmove", onTouchMove.bind(buttonEl));
    document.addEventListener("touchend", onTouchEnd);
  }

  // MUTATION OBSERVER – for if the button is removed/re-added
  const observer = new MutationObserver(() => {
    const button = document.getElementById(buttonId);
    if (!button) {
      hasListeners = false; // if button was removed, reset flags
      isDragging = false;
      return;
    }
    attachDragEvents(button);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  /** if the button is already present, attach drag events immediately */
  const button = document.getElementById(buttonId);
  if (button) attachDragEvents(button);
} as <IsTouch extends boolean = false>() => HTMLDivElement[IsTouch extends true
  ? "ontouchstart"
  : "onmouseover"]);

export type HTMLDivElementWithDragObserver = HTMLDivElement & {
  _startX?: number | null;
  _startY?: number | null;
};

/** determine whether the user "tapped" or "dragged" (open prefs if "tapped") */
export const ontouchend = function ontouchend(
  this: HTMLDivElementWithDragObserver,
  e: TouchEvent,
): void {
  const touch = e.changedTouches[0];
  const { clientX: endX, clientY: endY } = touch ?? {};
  if (!endX || !endY) return;

  /** retrieve stored start coordinates */
  const startX = this._startX ?? endX;
  const startY = this._startY ?? endY;

  /** threshold for "same spot" */
  const threshold = 10; // maximum allowable movement (in pixels)

  /** make sure the user ended their touch in *relatively* the "same spot" as they started */
  if (
    Math.abs(endX - startX) <= threshold &&
    Math.abs(endY - startY) <= threshold
  )
    /** user ended the touch near where it started, open preferences */
    showPreferences(); /** prefer over `data-cc="show-preferencesModal"` -- @see https://cookieconsent.orestbida.com/reference/api-reference.html#showpreferences */

  /** reset coordinates to avoid future issues */
  this._startX = null;
  this._startY = null;
} as HTMLDivElementWithDragObserver["ontouchend"];

/** store the touch start coordinates */
export const ontouchstart = function ontouchstart(
  this: HTMLDivElementWithDragObserver,
  e: TouchEvent,
): void {
  const touch = e.touches[0];
  this._startX = touch?.clientX;
  this._startY = touch?.clientY;
} as HTMLDivElementWithDragObserver["ontouchstart"];
