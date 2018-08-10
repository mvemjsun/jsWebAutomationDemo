'use strict';

class LoginHelper {

    constructor(credentials) {
      this.un = credentials.un;
      this.pw = credentials.pw;
    }

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
