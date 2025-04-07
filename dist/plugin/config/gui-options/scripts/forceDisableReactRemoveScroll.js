"use client";
// IMPORTANT: this is a fix to force-disable the "React Remove Scroll" wheel listener -- this handles the edge case where there's a shadcn (radix-ui) dialog open underneath the cookie banner's "manage preferences" dialog, which prevents the user from scrolling within the manage prefs dialog.
/** IMPORTANT: this is what we'll be looking for in the listener's source code -- @see https://github.com/theKashey/react-remove-scroll/blob/master/src/SideEffect.tsx#L107-L145 */
const DISTINCTIVE_SUBSTRINGS = ["shards", "noIsolation"];
const eventListenersMap = new WeakMap();
let isPatched = false; // ensure patching happens only ONCE.
/** 🦧 monkey(orangutan)-patch `addEventListener` and `removeEventListener` to track listeners. */
function patchEventListeners() {
    if (isPatched)
        return; // prevent multiple patches
    isPatched = true;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
        let records = eventListenersMap.get(this);
        if (!records) {
            records = [];
            eventListenersMap.set(this, records);
        }
        records.push({ type, listener, options });
        originalAddEventListener.call(this, type, listener, options);
    };
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalRemoveEventListener = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.removeEventListener = function (type, listener, options) {
        const records = eventListenersMap.get(this);
        if (records) {
            const index = records.findIndex((r) => r.type === type && r.listener === listener && r.options === options);
            if (index !== -1) {
                records.splice(index, 1);
                if (records.length === 0)
                    eventListenersMap.delete(this);
            }
        }
        originalRemoveEventListener.call(this, type, listener, options);
    };
}
/** attempt to find the "React Remove Scroll" wheel listeners by searching for unique strings in its source code */
const findReactRemoveScrollListeners = () => 
/** find all matching listeners that have ALL required substrings */
(eventListenersMap.get(document) ?? []).filter((record) => {
    if (record.type === "wheel" ||
        record.type === "touchmove" ||
        record.type === "touchstart" ||
        record.type === "pointerdown" ||
        record.type === "click") {
        const fnStr = record.listener.toString();
        return DISTINCTIVE_SUBSTRINGS.every((sub) => fnStr.includes(sub));
    }
    return false;
});
/**
 * force the "React Remove Scroll" wheel listener to be passive or not.
 *
 * @param isPassive - Set `true` to make it `{ passive: true }`,
 *                    `false` for `{ passive: false }`.
 */
export function forceDisableReactRemoveScroll(isPassive, debug = false) {
    const targets = findReactRemoveScrollListeners();
    if (!targets || targets.length === 0) {
        if (debug)
            console.debug('No matching "React Remove Scroll" listener found.');
        return;
    }
    /** remove the existing listener */
    for (const target of targets) {
        document.removeEventListener(target.type, target.listener, target.options);
        /** re-add with the new passive value */
        document.addEventListener(target.type, target.listener, {
            ...(typeof target.options === "boolean" ? {} : target.options),
            passive: isPassive,
        });
        if (debug)
            console.debug(`"React Remove Scroll" ${target.type} listener set to passive: ${isPassive} (aka, we've ${isPassive ? "bypassed" : "re-enabled"} it)`);
    }
}
/**
 * inject event listeners for CookieConsent's modal show/hide events,
 * toggling the "React Remove Scroll" listener's passive state.
 *
 * listens for:
 *  - "cc:onModalShow": If "preferencesModal", we set passive = true.
 *  - "cc:onModalHide": If "preferencesModal", we set passive = false.
 */
export function injectReactRemoveScrollToggle() {
    patchEventListeners(); // ensure patching happens only once
    window.addEventListener("cc:onModalShow", (event) => {
        const { detail } = event ?? {};
        if (detail?.modalName === "preferencesModal")
            forceDisableReactRemoveScroll(true); // force passive
    });
    window.addEventListener("cc:onModalHide", (event) => {
        const { detail } = event ?? {};
        if (detail?.modalName === "preferencesModal")
            forceDisableReactRemoveScroll(false); // force non-passive
    });
}
