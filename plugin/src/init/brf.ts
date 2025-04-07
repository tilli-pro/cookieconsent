import _config from "../config";
import init from "../init";

const config = {
  ..._config,
};

console.debug({ config }, "Initializing Cookie Consent (BRF)...");
init(config);
