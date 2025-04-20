/** extracts the `theme` parameter from the script URL */
export function getThemeFromScriptUrl(scriptUrl: string): string | null {
  const url = new URL(scriptUrl, document.baseURI);
  return url.searchParams.get("theme");
}

/** adds a `cc--<theme>` CSS class to the <html> element, if not already present */
export function addHtmlClass(theme: string): void {
  const className = `cc--${theme}`;
  const htmlEl = document.documentElement;
  console.debug({ className }, "[cc-plugin]: addHtmlClass");
  console.debug({ htmlEl }, "[cc-plugin]: addHtmlClass");

  if (!htmlEl.classList.contains(className)) htmlEl.classList.add(className);

  console.debug({ classList: htmlEl.classList }, "[cc-plugin]: addHtmlClass");
}

/**
 * determines the URL of the currently executing script
 *  - (works for both ES modules (`import.meta.url`) and classic scripts (`document.currentScript`))
 * @returns The script URL, or `undefined` if it cannot be determined.
 */
export function getCurrentScriptUrl(): string | undefined {
  if (
    typeof document !== "undefined" &&
    document.currentScript instanceof HTMLScriptElement
  ) return document.currentScript.src;

  if (
    typeof import.meta !== "undefined" &&
    typeof import.meta.url === "string"
  ) return import.meta.url;

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
export function initTheme(scriptUrl?: string): void {
  const url = scriptUrl ?? getCurrentScriptUrl();
  console.debug({ url }, "[cc-plugin]: initTheme");
  if (!url) return;

  const theme = getThemeFromScriptUrl(url);
  console.debug({ theme }, "[cc-plugin]: initTheme");
  if (theme) addHtmlClass(theme);
}