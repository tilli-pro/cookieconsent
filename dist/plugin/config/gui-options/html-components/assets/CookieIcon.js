"use client";
import assets from "../../../../assets/index.js";
export default (centered /* 😉 */, scale = 0.6667, // -> 0.6667 ((100 * n)%)
topOffset = 0, // -> -0.25 (em)
rightOffset = 0) => `
<span style="display: inline-block; vertical-align: middle; transform: scale(${scale}); transform-origin: top left; margin-right: ${((centered ? -0.5 : -0.25) + rightOffset).toFixed(4)}em; height: 1em${topOffset ? `; margin-top: ${topOffset.toFixed(4)}em` : ""};">
  ${assets.cookie}
  <!-- invisible "🍪" icon (used for copy-paste/a11y purposes) -->
  <span style="max-width: 0; max-height: 0; opacity: 0; position: absolute">🍪</span>
</span>`;
