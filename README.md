## Demo Node App to experiment with selenium & javascript

### Summary

This project consists of a simple node app that presents a login page with the ability to enter login credentials.
If correct credentials are entered then the welcome page is presented otherwise an error page is displayed.

The tests in the project are BDD style tests that are driven by cucumber features and drive the tests using
selenium webdriver.

### Quick Start (TL;DR)

1. Clone the project using `git clone git@github.com:mvemjsun/jsWebAutomationDemo.git`
2. Install node modules - `npm install`.
3. Start demo app using `npm run start`.
4. This should have started the server at port `9294`. Visit `http://localhost:9294/login` to confirm.
5. Correct credentials to login are `me@email.com` / `password`
5. To run tests - `npm run test`.

```
npm run test
> webloginauto@1.0.0 test user1$/jsAutomationDemo
> cucumber-js tests/features --require tests/features/support --require tests/step_definitions --world-parameters {\"browserName\":\"chrome\"} --format json:tests/results/chrome.json

.......................

4 scenarios (4 passed)
15 steps (15 passed)
0m08.415s
```

### Tests

#### Introduction
The tests are BDD (Behaviour driven development) style. The feature describe the behaviour of the system under
test & are written in `gerkhin`. This can be found in the `login.feature` file. The feature files are also commonly
referred to as so called living or executable documentation. The features are backed by executable code called the `step definitions` (for example `loginSteps.js`). The step definitions are the actual javascript code that gets executed to run the tests.

- [Cucumber JS] (https://github.com/cucumber/cucumber-js)
- [Cucumber] (https://cucumber.io)

#### package.json
The so called `devDependencies` section of the `package.json` file includes the below node modules to help us test
the app
```
"devDependencies": {
  "chai": "4.1.2",
  "cucumber": "4.2.1",
  "selenium-webdriver": "3.6.0"
}
```
The first of this is `chai` which provides support for writing easily readable assertions in our tests. Second is `cucumber` which provides us the ability of writing feature files and mapping them to step definition. Finally we have `selenium-webdriver` which actually acts a glue between the browser and the browser driver. In our case we are using "Chrome" and "Chromium".

- [Chai] (http://www.chaijs.com/guide/styles/#assert)
- [Selenium JS] (https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs)
- [Webdriver API] (http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html)
- [Chromedriver] (https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver)

#### Test code architecture

##### Page Object classes
The so called page object design pattern for testing encapsulates the properties and actions of a page (screen) into its own class so that the test code (step definitions) can interact with the pages without having to include any screen specific logic into the tests itself. The main advantage of this model is that the tests become
isolated from the screen design, they become simple to write and understand & are easier to maintain.

In the code that we have, the `loginPage.js` file contains the `LoginPage` class that abstracts away the interactions with the login page.

All of the page object classes inherit (extend) from the `BasePage` class that is defined in the `basePage.js` file. This file essentially abstracts away the `selenium-webdriver` method `findElements...` into various utility methods that help to locate web elements using css. Other utility/ helper methods can be abstracted into this class.

##### Async & Await
The newer version of the java script standards have introduced the `async` and `await` keywords that have greatly simplified the writing of asynchronous code. An function marked as `async` always returns a `Promise`. Async functions are started synchronously but then are executed asynchronously removing the need to write the flaky waiting code which is not reliable.

The `await` keyword before an promise expression waits until the expression is resolved (the result is returned).

- [Async function] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Await] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

#### Cucumber

The cucumber discussion can be split into 3 parts. First how its being invoked, secondly the cucumber hooks and last but not the least the step definitions.

##### Invoking cucumber-js
The cucumber test run is invoked using the command `npm run test` which maps to the package script

```
"test": "./node_modules/.bin/cucumber-js tests/features --require tests/features/support --require tests/step_definitions --world-parameters {\\\"browserName\\\":\\\"chrome\\\"} --format json:tests/results/chrome.json"
```

if we split this,  `./node_modules/.bin/cucumber-js` invokes the right version of cucumber-js, `--require` tells it the location of the code files, `--world-parameters` injects dependencies into cucumber and finally `--format` sets the format of the output test report.

##### hooks.js
Cucumber hooks are functions that are invoked during the lifecycle of a test run. They can be `Before` or `After`. These are opportunities for us to implement any setup or teardown code that is relevant at these points. For example we might want to load the login page before each test, set up the right web-driver instance, set global parameters etc.

Hooks are included in the code using

```
const { Before, After } = require('cucumber');
```

Hook functions could have the below signature.

```
Before({ options }, async function(scenario) { code });
After({ options }, async function(scenario) { code });
```

The `scenario` object passed to the function above will have the format `{sourceLocation: {line, uri}, result: {duration, status}, pickle}` for `After` hooks. For `Before` hook it does NOT have the `result` property.

Some of the `options` include `tags` & `timeout`. There can be more than one Before or After hook function declared. Before hooks are executed in the order they are declared. After hooks run in the opposite order of there declaration.
- [API] (https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/api_reference.md#afteroptions-fn)

BEFORE HOOK
```
Before({ timeout: CONSTANTS.HOOK_TIMEOUTS.BEFORE }, async function(scenario) {
    setDefaultTimeout(CONSTANTS.STEP_TIMEOUTS.TIMEOUT); // 1

    const browserName = this.parameters.browserName; // 2
    const scenarioName = scenario.pickle.name; // 3
    const builder = new webdriver.Builder(); // 4

    this.appUrl = APP_URL;

    driver = await builder
        .forBrowser(browserName)
        .build(); // 5

    this.driver = driver; // 6
    await this.driver.get(this.appUrl); // 7
});
```

The `Before` hook in our code above does the below
1. uses the cucumber supplied `setDefaultTimeout` method to set the default step timeout.
2. set the `browserName` property from the injected cucumber world property of the same name.
3. Extracts the scenario name.
4. Instantiates a webdriver Builder instance.
5. Creates the driver for the browser.
6. Sets the driver variable.
7. Loads the application starting url.

AFTER HOOK
```
After({ timeout: CONSTANTS.HOOK_TIMEOUTS.AFTER }, async function(scenario) {
    if (!this.driver) {
        return;
    } // 1

    if (scenario.result.status === Status.FAILED) {
        await tryAttachScreenshot(this);
        console.log(`Scenario - ${scenario.pickle.name} - FAILED`)
    } // 2

    await deinitWebdriver(); // 3
    delete this.driver; // 4
});
```
The After hook does the below
1. Checks if the driver instance exists else returns.
2. If scenario failed tries to take a screen shot and prints the failed scenario name on console.
3. Invokes the function `deinitWebdriver`
4. Deletes the driver property from cucumber world.

### Screens

#### Login
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/login.png?raw=true)
#### Welcome
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/welcome.png?raw=true)
#### Error
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/loginError.png?raw=true)
