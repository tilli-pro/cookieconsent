import { run } from "../init.js";
import { makeInitFn } from "./utils.js";
import { showPreferences } from "../config/gui-options/scripts/showPreferences.mjs.js";
import { config } from "./tilli-pay.config.js";
// console.debug({ config }, "Initializing Cookie Consent (tilli Website)...");
const init = makeInitFn(run, config, showPreferences);
void init();
