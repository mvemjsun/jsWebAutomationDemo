'use strict';

class LoginHelper {

    constructor(credentials) {
      this.un = credentials.un;
      this.pw = credentials.pw;
    }

    /*
    * This is a mock function that allows a successful resolution only when
    * the username and password match to the coded values. This is for demonstration
    * only. In real life this would be validated against a stored values possibly
    * in an encrypted database table.
    */
    validateCredentials() {
        return new Promise((resolve, reject) => {
          if (this.un.toUpperCase() === 'ME@EMAIL.COM' && this.pw === 'password') {
            resolve();
          } else {
            reject();
          }
        });
    }
}

module.exports = LoginHelper;
