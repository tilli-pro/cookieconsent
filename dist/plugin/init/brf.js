import { run } from "../init.js";
import { makeInitFn } from "./utils.js";
import { showPreferences } from "../config/gui-options/scripts/showPreferences.mjs.js";
import { config } from "./brf.config.js";
// console.debug({ config }, "Initializing Cookie Consent (BRF)...");
const init = makeInitFn(run, config, showPreferences);
void init();
