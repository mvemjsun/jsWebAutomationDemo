const assert = require('chai').assert;
const { Given, When, Then} = require('cucumber');
const And = Then;
const LoginPage = require('../pages/loginPage');
const timeouts = require('../support/constants');

// async needed to use await inside the function
Then('I should see a text box for entering the email', async function () {
  const loginPage = new LoginPage(this.driver);
  await this.driver.wait(async () => await loginPage.getUserEmailTextbox(), timeouts.STEP_TIMEOUTS.TIMEOUT);
});

Then('I should see a text box for entering the password', async function () {
  const loginPage = new LoginPage(this.driver);
  await this.driver.wait(async () => await loginPage.getUserPasswordTextbox(), timeouts.STEP_TIMEOUTS.TIMEOUT);
});

And('I should see a sign in button', async function () {
  const loginPage = new LoginPage(this.driver);
  await this.driver.wait(async () => await loginPage.getSignInButton(), timeouts.STEP_TIMEOUTS.TIMEOUT);
});

And('I should see a login header with text {string}', async function (expectedText) {
  const loginPage = new LoginPage(this.driver);
  const header = await loginPage.getLoginHeader();
  const headerText = await header.getText();
  assert.strictEqual(headerText, expectedText);
}, timeouts.STEP_TIMEOUTS.TIMEOUT);

And('I should see a email address label with text {string}', async function (expectedText) {
  const loginPage = new LoginPage(this.driver);
  const emailLabel = await loginPage.getEmailLabel();
  const emailLabelText = await emailLabel.getText();
  assert.strictEqual(emailLabelText, expectedText);
}, timeouts.STEP_TIMEOUTS.TIMEOUT);
