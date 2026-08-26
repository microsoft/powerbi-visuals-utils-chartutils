## Changelog

## 9.0.0

### Breaking changes

* Updated `tsconfig.json` to `ES2020` / `bundler` module resolution and compilation of the whole `src` folder.
* ChartUtils now requires a JavaScript runtime with ES2020 support.
* Updated the runtime dependencies `powerbi-visuals-utils-formattingutils`, `powerbi-visuals-utils-svgutils` and `powerbi-visuals-utils-typeutils` to 7.x.
* Removed the unused `jsnext:main` field from the package manifest.

### Tooling and packaging

* Migrated the test infrastructure from Karma + Jasmine + webpack to Vite/Vitest browser mode (Playwright Chromium).
* Removed `karma.conf.ts`, `webpack.config.js` and the related dependencies; added `vitest.config.mts` and `test/tsconfig.json`.
* Added `test:watch`, `test:coverage` and `test:typecheck` npm scripts.
* Lint stack migrated to ESLint 10 flat config.
* Enabled the `alwaysStrict`, `noImplicitThis`, `strictBindCallApply` and `useUnknownInCatchVariables` compiler options and pinned `strict` explicitly.
* Development TypeScript upgraded to 6.x.
* Updated the development-only dependencies `powerbi-visuals-utils-colorutils` and `powerbi-visuals-utils-testutils` to 7.x.
* Enabled `skipLibCheck`, which is now required rather than cosmetic: TypeScript 6 rejects the legacy `declare module X {}` form used by the `powerbi-visuals-api` 5.11.1 declaration files (80 `TS1540` errors). It cannot be removed until an upstream fix ships.
* Removed the decorator compiler options.
* The build now removes stale `lib` output before compiling.
* The published package now also ships `README.md`, `LICENSE` and `CHANGELOG.md`.
* CI now tests Node.js 20 and 22, installs Playwright Chromium and collects Vitest coverage.
* Release workflow now runs linting, test type-checking and browser tests before publishing artifacts.
* Removed the advanced `codeql-analysis.yml` workflow, which cannot upload results while CodeQL default setup is enabled on the repository.

## 8.3.0

### Module `legend`
* Added `LegendPosition.TopRight` and `LegendPosition.BottomRight` — horizontal legend with items right-aligned to the chart area; falls back to left-aligned with a navigation arrow on overflow.
* Added matching `legendPosition` string constants `topRight` and `bottomRight`.
* Exported orientation helpers: `isLeft`, `isRight`, `isTop`, `isBottom`, `isTopOrBottom`, `isCentered`, `isRightAligned`. `isTop`/`isBottom` now also match the new right-aligned variants.
* Fixed clipping of vertical centered legends (`LeftCenter`/`RightCenter`) when items overflowed (missing `Math.max(0, ...)` clamp).

## 8.2.2

* Updated packages

## 8.2.1

* Updated packages

## 8.2.0

* Updated packages

## 8.1.0

* Added `fontWeight`, `fontStyle`, `textDecoration` to `LegendData` interface
* Added `fontWeight`, `fontStyle`, `textDecoration` to `LabelOld` interface
* Updated packages

## 8.0.0

### Module `axis`
* `getTickLabelMargins` has changed props interface to `GetTickLabelMarginsOptions` and now returns `IMargin` instead of `TickLabelMargins`
* `TickLabelMargins` interface has been removed
* `getBestNumberOfTicks` has changed props interface to `GetBestNumberOfTicksOptions`
* `createFormatter` has changed props interface to `CreateFormatterOptions`

### Module `dataLabel`
* `drawDefaultLabelsForDataPointChart` has changed props interface to `DrawDefaultLabelsForDataPointChartOptions`

### Other
* All code was refactored
* Packages update

## 7.0.0
* Removed interactivityutils and related code
* Removed interactiveLegend class
* Changed createLegend function signature -> createLegend(HTMLElement, boolean, LegendPosition)

## 6.0.4
* Updated powerbi-visuals-api to 5.9.0 and other utils

## 6.0.3
* Fixed legend title bug

## 6.0.2
* Fixed vulnerabilities
* Packages update

## 6.0.1
* Packages update
* Removed coveralls

## 6.0.0
* Packages update
* Vulnerabilities fixes

## 3.0.0
* Updated powerbi-visuals-utils
* Fixed vulnerabilities
* Migrated to Eslint
* Migrated to playwright

## 2.6.0
* Removed Jquery
* D3.v6 code refactored
* Packages update
* Added new tests

## 2.5.0
* Packages update
* Github actions

## 2.4.3
* FIX: navigation arrows not displayed on first visual render

## 2.4.2
* Export as default `DataLabelArrangeGrid`, `DataLabelManager` classes
* Update packages

## 2.4.1
* Packages update
* Removal of LabelLayoutStrategy module definition, now it is imported from a file

## 2.4.0
* Update interactivity utils to 5.5.0
* Update powerbi-visual-api to 2.6
* Update packages to fix vulnerabilities

## 2.3.1
* Fixes measurement of legend items to fit available viewport width
* Supports `fontFamily` for legend component

## 2.3.0
* Update interactivity utils to 5.4.0

## 2.2.1
* FIX: d3 v5 wrong usage in Label Utils

## 2.2.0
* Implements legend marker shapes
* New Label Utils

## 2.1.0
* Update packages to fix vulnerabilities

## 2.0.6
* Added OpacityLegendBehavior for legend

## 1.5.1
* FIX: Was removed a wrong instruction from auto generated code that impacted on tests in visuals

## 1.5.0
* Added two new optional parameters for CreateScale function -- innerPadding and useRangePoint. The first lets set inner padding for scale instead of receive it from constant. The second lets use rangePoint instead of rangeBands function for creation of ordinal scale.

## 1.4.0
* Remove width restriction of title in legend
* Added new option to drawDefaultLabelsForDataPointChart function to control behavior of collided labels

## 1.3.0
* Updated packages

## 1.2.0
* Added 'disableNiceOnlyForScale' to 'CreateAxisOptions' interface
and added verification with this property to createAxis func

## 1.1.0
* Removed `lodash`
* Updated dependencies

## 1.0.1
* Update ChartUtils to use SVG utils version 1.0.0
* Add CHANGELOG
