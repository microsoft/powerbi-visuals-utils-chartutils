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
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "no-useless-assignment": "off"
        }
    },
];