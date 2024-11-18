import powerbiVisualsConfigs from "eslint-plugin-powerbi-visuals";
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ["node_modules/", "dist/", ".vscode/", ".tmp/", "test/", "lib/", "mocks/", "coverage/", "webpack.config.js", "karma.conf.ts"],
    },
    ...tseslint.configs.recommended,
    powerbiVisualsConfigs.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off"
        }
    },
];