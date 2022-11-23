// <reference types="cypress" />
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  trashAssetsBeforeRuns: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  retries: 0,
  videoCompression: false,
  viewportWidth: 1400,
  viewportHeight: 1100,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },

  e2e: {
    baseUrl:"https://api.apilayer.com/fixer",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    setupNodeEvents
  },
  env:{
    apikey: "h0Cyw7DiF9LWSPQQVvu5kAQmgwx8D7h2"
  }
});
