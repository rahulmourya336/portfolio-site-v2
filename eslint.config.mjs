import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config. `next lint` was removed in Next 16, and ESLint 9 no longer
 * reads .eslintrc.json by default, so lint runs through the eslint CLI.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "public/**",
      "*.config.js",
      "scripts/**",
    ],
  },
];

export default config;
