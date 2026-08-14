# Development workflow
If you would like to contribute an improvement or a fix please pay attention to these items:
* [Requirements](#requirements)
* [Installation](#installation)
* [How to build](#how-to-build)
* [How to lint the source code](#how-to-lint-the-source-code)
* [How to run unit tests locally](#how-to-run-unit-tests-locally)

## Requirements
To start development and improvement of the source code you should have the following things:
* [git](https://git-scm.com)
* [node.js](https://nodejs.org) (we recommend the latest LTS version)
* [npm](https://www.npmjs.com) (the minimal supported version is 3.0.0)
* [Playwright Chromium](https://playwright.dev/docs/browsers), installed as described in [How to run unit tests locally](#how-to-run-unit-tests-locally)

## Installation
Firstly, you should clone a copy of the repository by using one of the following commands:
* HTTPS: ```git clone https://github.com/Microsoft/powerbi-visuals-utils-chartutils.git```
* SSH: ```git clone git@github.com:Microsoft/powerbi-visuals-utils-chartutils.git```

After that, you should change the current working directory to ```powerbi-visuals-utils-chartutils``` by using the following command:

```bash
cd powerbi-visuals-utils-chartutils
```

After that, you should install dependencies by using the following command:

```bash
npm install
```

The final step is installation of necessary type declarations by using the following command:

```bash
npm run typings:install
```

The repository is ready for development now.

## How to build
We use [Less](https://github.com/less/less.js) and [TypeScript](https://github.com/Microsoft/TypeScript) for the repository. To build source code you should run the following command:

```bash
npm run build
```

This command compiles less code to CSS and TypeScript code to JavaScript. The result of the compilation is available in the ```lib``` directory.

## How to lint the source code
We use [eslint](https://github.com/eslint/eslint) as a linter for TypeScript code. To check source code you should run the following command:

```bash
npm run lint
```

This command checks style of TypeScript code and provides a list of problems. Please address all of problems reported by eslint before sending a pull request to the [repository](https://github.com/Microsoft/powerbi-visuals-utils-chartutils).

## How to run unit tests locally
We use [Vitest](https://vitest.dev/) in browser mode to run unit tests. Tests are executed in headless Chromium provided by [Playwright](https://playwright.dev/), so make sure the browser is installed:

```bash
npx playwright install --with-deps chromium
```

To run unit tests locally on your machine you should run the following command:

```bash
npm run test
```

To collect code coverage run:

```bash
npm run test:coverage
```

## How to debug unit tests locally
To run unit tests in watch mode you should run the following command:

```bash
npm run test:watch
```

This command runs unit tests in the browser and watches tests files, in other words, you have an ability to run unit tests automatically after any changing.
