import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
    test: {
        include: ["test/**/*Test.ts", "test/**/*Tests.ts"],
        globals: true,
        setupFiles: ["./test/setup.ts"],
        browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [
                { browser: "chromium" }
            ]
        },
        coverage: {
            provider: "v8",
            include: ["src/**/*.ts"],
            reporter: ["text", "html", "lcov"]
        }
    }
});
