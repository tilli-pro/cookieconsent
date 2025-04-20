import { run } from "../init";
import { makeInitFn } from "./utils";
import { showPreferences } from "../config/gui-options/scripts/showPreferences.mjs";
import { config } from "./brf.config";

// console.debug({ config }, "Initializing Cookie Consent (BRF)...");
const init = makeInitFn(run, config, showPreferences);
void init();
