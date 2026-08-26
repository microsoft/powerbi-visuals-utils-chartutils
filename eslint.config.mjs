import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import powerbiVisualsConfigs from "eslint-plugin-powerbi-visuals";

export default [
    {
        ignores: ["node_modules/", "dist/", ".vscode/", ".tmp/", "test/", "lib/", "mocks/", "coverage/", "eslint.config.mjs", "vitest.config.mts"],
    },
    js.configs.recommended,
    ...tsPlugin.configs["flat/recommended"],
    powerbiVisualsConfigs.configs.recommended,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            // 182 pre-existing occurrences, mostly in the public API surface; tightening this is its own change.
            "@typescript-eslint/no-explicit-any": "off",
            "no-useless-assignment": "warn"
        }
    },
];