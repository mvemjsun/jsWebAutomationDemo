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
referred to as so called living or executable documentation. The features are backed by executable code called the `step definitions`. The step definitions are the actual javascript code that gets executed to run the tests.
Ref 1 [Cucumber JS] (https://github.com/cucumber/cucumber-js)
Ref 2 [Cucumber] (https://cucumber.io)

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
Ref 1 [Chai] (http://www.chaijs.com/guide/styles/#assert)
Ref 2 [Selenium JS] (https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs)
Ref 3 [Selenium webdriver API] (http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html)
Ref 4 [Chromedriver] (https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver)

#### Test code architecture
wip

### Screens

#### Login
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/login.png?raw=true)
#### Welcome
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/welcome.png?raw=true)
#### Error
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/loginError.png?raw=true)
