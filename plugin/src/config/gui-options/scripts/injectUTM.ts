"use client";

/**
 *
 * UTM Parameters -- @see https://en.wikipedia.org/wiki/UTM_parameters#Parameters
 *
 * There are six different UTM parameters, which may be used in any order:
 *
 * _____________________________________________________________________________________________________________________________________________________________
 * | Parameter    | Purpose                                                                                     | Example                                      |
 * |--------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
 * | utm_id       | Identifies which ads campaign this referral references.                                     | utm_id=abc.123                               |
 * | utm_source   | Identifies which site sent the traffic, and is a required parameter.                        | utm_source=google                            |
 * | utm_medium   | Identifies what type of link was used, such as email or pay-per-click advertising.          | utm_medium=ppc                               |
 * | utm_campaign | Identifies a specific product promotion or strategic campaign.                              | utm_campaign=spring_sale                     |
 * | utm_term     | Identifies search terms.                                                                    | utm_term=running+shoes                       |
 * | utm_content  | Identifies what specifically was clicked to bring the user to the site, such as a banner ad | utm_content=logolink or utm_content=textlink |
 * |              |  or a text link. It is often used for A/B testing and content-targeted ads.                 |                                              |
 * -------------------------------------------------------------------------------------------------------------------------------------------------------------
 */

interface UTMParameters {
  id: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

const DEFAULT_UTM_PARAMETERS: UTMParameters = {
  id: "tilli-cc",
  source: "unknown",
  medium: "unknown",
  campaign: "unknown",
  term: "unknown",
  content: "tilli-cc-banner",
};

const A_TAG_IDS_TO_INJECT_UTM_PARAMETERS = [
  /** powered by tilliX (callout) */
  "tilli-cc-powered-by-tillix-link",
  "tilli-cc-powered-by-tillix-link-preferences",

  /** footer */
  "tilli-cc-privacy-policy-link-footer",
  "tilli-cc-terms-and-conditions-link-footer",

  /** consent modal */
  "tilli-cc-privacy-policy-link-consent",
  "tilli-cc-privacy-policy-link-revision",

  /** preferences modal */
  "tilli-cc-privacy-policy-link-preferences",
];

export const injectUTMParametersIntoATags = (attempt: number = 1) => {
  const _preferences = {
    ...DEFAULT_UTM_PARAMETERS,
    source: new URL(window.location.href).hostname, // use the hostname of the current page as the source
  };

  const aTags = document.querySelectorAll("a");
  aTags.forEach((aTag) => {
    if (A_TAG_IDS_TO_INJECT_UTM_PARAMETERS.includes(aTag.id)) {
      const parameters = aTag.id.endsWith("-preferences")
        ? {
            // handle the case where the a tag is via the preferences modal instead of the banner
            ..._preferences,
            content: _preferences.content.replace("-banner", "-preferences"),
          }
        : _preferences;

      aTag.href = addUTMParameters(new URL(aTag.href), parameters).toString();
      aTag.setAttribute("data-tilli-cc-utm-injected", "true");
    }
  });

  if (attempt <= 3) setTimeout(() => injectUTMParametersIntoATags(attempt + 1), 1_000); // retry up to 3 times, handles edge case where the a tags are not yet loaded (e.g., for the preferences modal)
};

/**
 * adds UTM parameters to a URL.
 *
 * - ⚠️ note: overrides existing UTM parameters (1. strips out all existing UTM parameters, 2. injects the new ones)
 * - if "unknown" is provided for any parameter, it will just be stripped out from the resultant URL.
 *
 * @param {UTMParameters} parameters - The parameters for the UTM parameter.
 */
export const addUTMParameters = (
  url: URL,
  parameters: Partial<UTMParameters> = {},
): URL => {
  // strip out existing UTM parameters
  url.searchParams.forEach(
    (_, key) => key.startsWith("utm_") && url.searchParams.delete(key),
  );

  // add new parameters
  Object.entries(parameters).forEach(
    ([key, value]) =>
      !!value &&
      value !== "unknown" &&
      url.searchParams.set(`utm_${key}`, value),
  );

  return url;
};
