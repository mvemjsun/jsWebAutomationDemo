const assert = require('chai').assert;
const { Given, When, Then} = require('cucumber');
const And = Then;
const WelcomePage = require('../pages/welcomePage');
const timeouts = require('../support/constants');

// async needed to use await inside the function
Then('I should see welcome page', async function () {
  const welcomePage = new WelcomePage(this.driver);
  const welcomePageLoaded = await welcomePage.isPageLoaded();
  assert.equal(welcomePageLoaded, true);
  }, timeouts.STEP_TIMEOUTS.TIMEOUT);
