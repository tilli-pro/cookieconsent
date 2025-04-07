import _config from "../config/index.js";
import init from "../init.js";
const config = {
    ..._config,
};
console.debug({ config }, "Initializing Cookie Consent (BRF)...");
init(config);
