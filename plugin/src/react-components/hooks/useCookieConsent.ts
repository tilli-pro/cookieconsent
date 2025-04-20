"use client";

import { useEffect } from "react";

import { run } from "@tilli-pro/cookieconsent";

import { COOKIE_CONSENT_ENABLED } from "../../_consts";
import config from "../../config";
import { makeInitFn } from "../../init/utils";
import { showPreferences } from "../../config/gui-options/scripts/showPreferences.node";

export function useCookieConsent() {
  useEffect(() => {
    if (!COOKIE_CONSENT_ENABLED) return;

    const init = makeInitFn(run, config, showPreferences);
    void init();
  }, []);
}
