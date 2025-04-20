"use client";
import { useEffect } from "react";
import { run } from "@tilli-pro/cookieconsent";
import { COOKIE_CONSENT_ENABLED } from "../../_consts.js";
import { showPreferences } from "../../config/gui-options/scripts/showPreferences.node.js";
import { getConfig } from "../../init/_configs.js";
import { makeInitFn } from "../../init/utils.js";
export function useCookieConsent(configId) {
    useEffect(() => {
        if (!COOKIE_CONSENT_ENABLED)
            return;
        const config = getConfig(configId);
        if (!config)
            throw new Error(`Unable to initialize the cookie consent banner (unable to find specified config: "${configId}")`);
        const init = makeInitFn(run, config, showPreferences);
        void init();
    }, []);
}
