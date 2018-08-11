'use strict';

const BasePage = require('./basePage');

const PAGE_IDENTIFIER = '#welcome-container';
const PAGE_WELCOME_HEADER = '#welcomeHeader';
const PAGE_ACCOUNT_SUMMARY_HEADER = '#accountSummaryHeader';
const PAGE_ACCOUNT_BALANCE = '#accountBalance';
const PAGE_CARD_BALANCE = '#cardBalance';
const PAGE_ADDRESS = '#addressText';

class WelcomePage extends BasePage {

      constructor(driver) {
        super(driver, PAGE_IDENTIFIER);
      }

      async isPageLoaded() {
        return await this.exists();
      }

      async getWelcomeHeader() {
        let welcomeHeader = await this.findElementByCss(PAGE_WELCOME_HEADER);
        return welcomeHeader;
      }

      async getAccountBalance() {
        let accountBalance = await this.findElementByCss(PAGE_ACCOUNT_BALANCE);
        return accountBalance;
      }

      async getCreditCardBalance() {
        let creditCardBalance = await this.findElementByCss(PAGE_CARD_BALANCE);
        return creditCardBalance;
      }
}

module.exports = WelcomePage;
