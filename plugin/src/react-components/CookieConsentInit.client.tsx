"use client";

import { useEffect } from "react";

import { run } from "@tilli-pro/cookieconsent";

import { COOKIE_CONSENT_ENABLED } from "../_consts";
import config from "../config";
import { injectReactRemoveScrollToggle } from "../config/gui-options/scripts/forceDisableReactRemoveScroll";
import injectManageCookiePrefsButton from "../config/gui-options/scripts/injectManageCookiePrefsButton";
import { makeInitFn } from "../init/utils";

export default function CookieConsentInit() {
  useEffect(() => {
    if (!COOKIE_CONSENT_ENABLED) return;

    const init = makeInitFn(run, config);
    void init();
  }, []);

  return null;
}
