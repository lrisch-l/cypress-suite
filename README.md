<h2>Featured Project</h2>

<h3><a href="https://github.com/lrisch-l/cypress-suite">cypress-suite</a></h3>
<p>Unified test automation suite using <strong>Cypress</strong> for both <strong>UI</strong> and <strong>API</strong> testing. Includes custom commands, modular helpers, tag-based execution, and <strong>Mochawesome</strong> reports with HTML </p>

<h4>Project Structure</h4>
<ul>
  <li><code>cypress/e2e/ui/</code> — UI test scripts (e.g. <code>auth.cy.js</code>, <code>dashboard.cy.js</code>)</li>
  <li><code>cypress/e2e/api/</code> — API test scripts (e.g. <code>usuarios.cy.js</code>, <code>produtos.cy.js</code>, <code>login.cy.js</code>, <code>carrinhos.cy.js</code>)</li>
  <li><code>cypress/support/commands.js</code> — Custom Cypress commands</li>
  <li><code>cypress/support/helpersUI/</code> — UI helper functions and test data</li>
  <li><code>cypress/support/helpers/</code> — API helper functions</li>
  <li><code>cypress/reports/</code> — Generated Mochawesome reports</li>
</ul>

<h4>Helpers Overview</h4>
<ul>
  <li><code>uiActions.js</code> — Functions for interacting with UI elements (e.g. fill forms, click buttons)</li>
  <li><code>testData.js</code> — Centralized test data (valid/invalid users, products)</li>
  <li><code>usuariosHelper.js</code> — API helper for user-related operations</li>
  <li><code>produtosHelper.js</code> — API helper for product-related operations</li>
  <li><code>loginHelper.js</code> — API helper for login and token management</li>
  <li><code>carrinhosHelper.js</code> — API helper for cart-related operations</li>
</ul>


<h4>Run All Tests</h4>
<pre><code>npm install
npm run cy:run</code></pre>

<h4>Run Only UI Tests</h4>
<pre><code>npm run test:ui</code></pre>

<h4>Run Only API Tests</h4>
<pre><code>npm run test:api</code></pre>

<h4>Generate UI Report</h4>
<pre><code>npm run report:ui</code></pre>

<h4>Generate API Report</h4>
<pre><code>npm run report:api</code></pre>

<hr />

<h2>Test Reporting</h2>

<ul>
  <li>CI/CD pipeline with GitHub Actions</li>
  <li>Tag-based execution via <code>cypress-grep</code> (e.g. <code>@ui</code>, <code>@api</code>, <code>@smoke</code>)</li>
  <li><a href="https://github.com/lrisch-l/cypress-suite/tree/main/cypress/reports">Latest Mochawesome Report</a></li>
  <li>Screenshots captured automatically on test failure</li>
  <li>Reports uploaded as artifacts in CI (HTML and screenshots only — no video)</li>
</ul>
