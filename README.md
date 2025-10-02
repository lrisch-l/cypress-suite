<h2>🚀 Featured Project</h2>

<h3>🧪 <a href="https://github.com/lrisch-l/cypress-suite">cypress-suite</a></h3>
<p>Unified test automation suite using <strong>Cypress</strong> for both <strong>UI</strong> and <strong>API</strong> testing. Includes custom commands, modular helpers, and <strong>Mochawesome</strong> reporting.</p>

<h4>📁 Project Structure</h4>
<ul>
  <li><code>cypress/e2e/ui/</code> — UI test scripts (e.g. <code>auth.cy.js</code>, <code>dashboard.cy.js</code>)</li>
  <li><code>cypress/e2e/api/</code> — API test scripts (e.g. <code>users.cy.js</code>, <code>products.cy.js</code>)</li>
  <li><code>cypress/support/commands.js</code> — Custom Cypress commands</li>
  <li><code>cypress/support/helpersUI/</code> — UI helper functions and test data</li>
  <li><code>cypress/reports/</code> — Generated Mochawesome reports</li>
</ul>

<h4>🧠 Helpers Overview</h4>
<ul>
  <li><code>uiActions.js</code> — Functions for interacting with UI elements (e.g. fill forms, click buttons)</li>
  <li><code>testData.js</code> — Centralized test data (valid/invalid users, products)</li>
</ul>

<h4>💻 Run All Tests</h4>
<pre><code>npm install
npx cypress run</code></pre>

<h4>🎯 Run Only UI Tests</h4>
<pre><code>npx cypress run --env grepTags=@ui</code></pre>

<h4>🔬 Run Only API Tests</h4>
<pre><code>npx cypress run --env grepTags=@api</code></pre>

<hr />

<h2>📊 GitHub Activity</h2>

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=lrisch-l&show_icons=true&theme=github_dark" width="450"/>
</p>

<hr />

<h2>📊 Test Reporting</h2>

<ul>
  <li>✅ CI/CD pipeline with GitHub Actions</li>
  <li>📄 <a href="https://github.com/lrisch-l/cypress-suite/tree/main/cypress/reports">Latest Mochawesome Report</a></li>
  <li>📸 Screenshots captured automatically on test failure</li>
</ul>
