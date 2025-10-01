const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  video: false,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
  defaultCommandTimeout: 8000,
  chromeWebSecurity: false,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportFilename: "index",
    reportPageTitle: "Serverest Test Suite Report",
    overwrite: true,
    html: true,
    json: true,
    inlineAssets: true,
    charts: true,
    embeddedScreenshots: true,
  },

  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
    baseTags: "@ui or @api",
  },

  e2e: {
    // Dynamically switch between front-end and API base URLs
    baseUrl: process.env.CYPRESS_baseUrl || "https://front.serverest.dev",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      require("cypress-grep/src/plugin")(config);

      on("task", {
        nextEmailCount() {
          const file = path.resolve("cypress/emailCounter.json");
          const data = fs.existsSync(file)
            ? JSON.parse(fs.readFileSync(file))
            : { count: 0 };

          data.count++;
          fs.writeFileSync(file, JSON.stringify(data, null, 2));
          return data.count;
        },
      });

      return config;
    },
  },
});
