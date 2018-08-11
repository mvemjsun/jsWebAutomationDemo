'use strict';

const BasePage = require('./basePage');

const PAGE_IDENTIFIER = '#login-error-container';
const PAGE_ERROR_LABEL = '#login-error-label';

class LoginErrorPage extends BasePage {

      constructor(driver) {
          super(driver, PAGE_IDENTIFIER);
      }

      async isPageLoaded() {
        return await this.exists();
      }

      async getLoginErrorText() {
        let errorLabel = await this.findElementByCss(PAGE_ERROR_LABEL);
        return errorLabel;
      }

}

module.exports = LoginErrorPage;
