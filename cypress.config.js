const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  video: false,
  videosFolder: "cypress/videos",

  // Use Mochawesome reporter with embedded screenshots and charts
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

  // Enable tag-based filtering with cypress-grep
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },

  e2e: {
    baseUrl: "https://serverest.dev", // Default base URL (can be overridden)
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      // Register Mochawesome plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      // Register cypress-grep plugin for tag-based test filtering
      require("cypress-grep/src/plugin")(config);

      // Custom task to increment email counter stored in a JSON file
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
