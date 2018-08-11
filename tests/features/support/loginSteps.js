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

And('I attempt to login without any credentials', async function () {
  const loginPage = new LoginPage(this.driver);
  await loginPage.signIn();
}, timeouts.STEP_TIMEOUTS.TIMEOUT);

When('I enter email as {string}', async function (emailAddress) {
  const loginPage = new LoginPage(this.driver);
  await loginPage.enterUserEmail(emailAddress);
});

When('I enter password as {string}', async function (password) {
  const loginPage = new LoginPage(this.driver);
  await loginPage.enterUserPassword(password);
});

When('I attempt to login', async function () {
  const loginPage = new LoginPage(this.driver);
  await loginPage.signIn();
}, timeouts.STEP_TIMEOUTS.TIMEOUT);
