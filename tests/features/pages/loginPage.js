'use strict';

const BasePage = require('./basePage');

const PAGE_IDENTIFIER = '#login-container';
const PAGE_USEREMAIL_TEXTBOX = '#emailId';
const PAGE_USERPASSWORD_TEXTBOX = '#passwordId';
const PAGE_LOGIN_BUTTON = '#signInButtonId';
const PAGE_LOGIN_HEADER = "#login-header";
const PAGE_EMAIL_LABEL = "#email-label";
const PAGE_PASSWORD_LABEL = "#password-label";

class LoginPage extends BasePage {

      constructor(driver) {
          super(driver, PAGE_IDENTIFIER);
      }

      async isPageLoaded() {
        return await this.exists();
      }

      async getUserEmailTextbox() {
        let email = await this.findElementByCss(PAGE_USEREMAIL_TEXTBOX);
        return email;
      }

      async getUserPasswordTextbox() {
        return await this.findElementByCss(PAGE_USERPASSWORD_TEXTBOX);
      }

      async getSignInButton() {
        return await this.findElementByCss(PAGE_LOGIN_BUTTON);
      }

      async signIn() {
        let loginButton = await this.findElementByCss(PAGE_LOGIN_BUTTON);
        loginButton.click();
      }

      async getLoginHeader() {
        return await this.findElementByCss(PAGE_LOGIN_HEADER);
      }

      async getEmailLabel() {
        return await this.findElementByCss(PAGE_EMAIL_LABEL);
      }

      async getPasswordLabel() {
        return await this.findElementByCss(PAGE_PASSWORD_LABEL);
      }
}

module.exports = LoginPage;
