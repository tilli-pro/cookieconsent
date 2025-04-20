import { run } from "../init";
import { makeInitFn } from "./utils";
import { showPreferences } from "../config/gui-options/scripts/showPreferences.mjs";
import { config } from "./tilli-website.config";

// console.debug({ config }, "Initializing Cookie Consent (tilli Website)...");
const init = makeInitFn(run, config, showPreferences);
void init();
