"use client";
import { useEffect } from "react";
import { run } from "@tilli-pro/cookieconsent";
import { COOKIE_CONSENT_ENABLED } from "../_consts.js";
import config from "../config/index.js";
import { makeInitFn } from "../init/utils.js";
export default function CookieConsentInit() {
    useEffect(() => {
        if (!COOKIE_CONSENT_ENABLED)
            return;
        const init = makeInitFn(run, config);
        void init();
    }, []);
    return null;
}
