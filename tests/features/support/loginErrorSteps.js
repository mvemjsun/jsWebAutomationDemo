const assert = require('chai').assert;
const { Given, When, Then} = require('cucumber');
const And = Then;
const LoginErrorPage = require('../pages/loginErrorPage');
const timeouts = require('../support/constants');

Then('I should see login error message', async function () {
  const loginErrorPage = new LoginErrorPage(this.driver);
  await this.driver.wait(async () => await loginErrorPage.getLoginErrorText(), timeouts.STEP_TIMEOUTS.TIMEOUT);
});
