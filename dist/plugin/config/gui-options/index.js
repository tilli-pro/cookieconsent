/** IMPORTANT NOTES FOR GDPR COMPLIANCE:
 * > the "Accept" and "Reject" buttons should be equally weighted in terms of size, color, and font. This means that the buttons should be equally accessible and prominent– `equalWeightButtons` must be `true`. */
export default {
    consentModal: {
        layout: "box",
        position: "bottom left",
        equalWeightButtons: true, // IMPORTANT: MUST BE `true` TO BE GDPR-COMPLIANT
        flipButtons: false,
    },
    preferencesModal: {
        layout: "box",
        position: "right", // not in use since we use "box" (aka a modal)– if we use "bar" (aka a drawer), this will be used
        equalWeightButtons: true, // IMPORTANT: MUST BE `true` TO BE GDPR-COMPLIANT
        flipButtons: false,
    },
};
