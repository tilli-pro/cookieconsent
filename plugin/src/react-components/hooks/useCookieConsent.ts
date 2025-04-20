"use client";

import { useEffect } from "react";

import { run } from "@tilli-pro/cookieconsent";

import type { ConfigId } from "../../init/_configs";
import { COOKIE_CONSENT_ENABLED } from "../../_consts";
import { showPreferences } from "../../config/gui-options/scripts/showPreferences.node";
import { getConfig } from "../../init/_configs";
import { makeInitFn } from "../../init/utils";

export function useCookieConsent(configId: ConfigId) {
  useEffect(() => {
    if (!COOKIE_CONSENT_ENABLED) return;
    
    const config = getConfig(configId);
    if (!config)
      throw new Error(
        `Unable to initialize the cookie consent banner (unable to find specified config: "${configId}")`,
      );

    const init = makeInitFn(run, config, showPreferences);
    void init();
  }, []);
}
