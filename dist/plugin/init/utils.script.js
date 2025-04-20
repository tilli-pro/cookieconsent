/** extracts the `theme` parameter from the script URL */
export function getThemeFromScriptUrl(scriptUrl) {
    const url = new URL(scriptUrl, document.baseURI);
    return url.searchParams.get("theme");
}
/** adds a `cc--<theme>` CSS class to the <html> element, if not already present */
export function addHtmlClass(theme) {
    const className = `cc--${theme}`;
    const htmlEl = document.documentElement;
    if (!htmlEl.classList.contains(className))
        htmlEl.classList.add(className);
}
/**
 * determines the URL of the currently executing script
 *  - (works for both ES modules (`import.meta.url`) and classic scripts (`document.currentScript`))
 * @returns The script URL, or `undefined` if it cannot be determined.
 */
export function getCurrentScriptUrl() {
    if (typeof document !== "undefined" &&
        document.currentScript instanceof HTMLScriptElement)
        return document.currentScript.src;
    if (typeof import.meta !== "undefined" &&
        typeof import.meta.url === "string")
        return import.meta.url;
    console.warn("[cc-plugin]: unable to resolve current script URL");
    return undefined;
}
/**
 * inits theme by reading the `theme` query param from the provided script URL (or auto-detected script)
 * and then adding the corresponding CSS class to <html>.
 *
 * @param scriptUrl - Optional explicit URL; if omitted, auto-detection is used
 *
 * @usage in an ES module entry point:
 *    import { initTheme } from './init/utils.script.ts';
 *    initTheme(import.meta.url);
 *
 * @usage in a classic script:
 *    import { initTheme } from './init/utils.script.ts';
 *    initTheme();
 */
export function initTheme(scriptUrl) {
    const src = scriptUrl ?? getCurrentScriptUrl();
    if (!src)
        return;
    /** first, try to get theme from the direct script URL */
    let theme = getThemeFromScriptUrl(src);
    /** otherwise, try checking the URL of the script that loaded this script */
    if (!theme) {
        /** extract git SHA from the URL (looking for @<sha>/ in the path) */
        const shaMatch = src.match(/@([0-9a-f]{7,40})\b/);
        const sha = shaMatch ? shaMatch[1] : null;
        if (sha && typeof document !== "undefined") {
            /** find a <script> whose src contains the same SHA and "/init" in the path */
            const scripts = Array.from(document.getElementsByTagName("script"));
            const candidate = scripts.find((s) => s.src.includes(`@${sha}/`) && s.src.includes("/init"));
            if (candidate)
                theme = getThemeFromScriptUrl(candidate.src);
        }
    }
    if (theme)
        addHtmlClass(theme);
}
