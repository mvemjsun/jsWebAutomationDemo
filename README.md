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
wip

### Screens

#### Login
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/login.png?raw=true)
#### Welcome
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/welcome.png?raw=true)
#### Error
![](https://github.com/mvemjsun/jsWebAutomationDemo/blob/master/loginError.png?raw=true)
