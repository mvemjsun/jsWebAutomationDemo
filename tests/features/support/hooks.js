'use strict';

const fs = require('fs');

const { Before, After, setDefaultTimeout, Status } = require('cucumber');
const webdriver = require('selenium-webdriver');
const STEP_TIMEOUT = 5 * 1000
const SENARIO_HOOK_TIMEOUT = 5 * 1000

const RESULTS_FOLDER_PATH = './tests/results';
const APP_URL = 'http://localhost:9294/login';

const EVENTS = {
  EXIT: 'exit',
  SIGINT: 'SIGINT',
  SIGUSR1: 'SIGUSR1',
  SIGUSR2: 'SIGUSR2',
  UNCAUGHTEXCEPTION: 'uncaughtException'
};

let driver;

async function deinitWebdriver() {
    if (!driver) {
        return;
    }
    try {
        await driver.quit();
    } catch (error) {
    }
    driver = undefined;
}

async function terminationEventHandler() {
    await deinitWebdriver();
    process.exit();
};

function createTestResultFolderIfNeeded() {
    if (!fs.existsSync(RESULTS_FOLDER_PATH)) {
        fs.mkdirSync(RESULTS_FOLDER_PATH);
    }
}

async function tryAttachScreenshot(world) {
    try {
        const screenshot = await world.driver.takeScreenshot();
        world.attach(screenshot, 'image/png');
    } catch (error) {
        console.warn('Unable to capture screenshot.');
    }
}

Before({ timeout: SENARIO_HOOK_TIMEOUT }, async function(scenario) {
    setDefaultTimeout(STEP_TIMEOUT);

    const browserName = this.parameters.browserName;
    const scenarioName = scenario.pickle.name;
    const builder = new webdriver.Builder();

    this.appUrl = APP_URL;

    console.log(`Creating driver for ${browserName}`);
    driver = await builder
        // .usingServer("http://localhost:9515/wd")
        .forBrowser(browserName)
        .build();

    this.driver = driver;
    await this.driver.get(this.appUrl);
});

After({ timeout: SENARIO_HOOK_TIMEOUT }, async function(scenario) {
    if (!this.driver) {
        return;
    }

    if (scenario.result.status === Status.FAILED) {
        await tryAttachScreenshot(this);
        console.log(`Test failed - ${scenario.pickle.name}`)
    }

    await deinitWebdriver();
    delete this.driver;
});

process.on(EVENTS.EXIT, terminationEventHandler);
// catches ctrl+c event
process.on(EVENTS.SIGINT, terminationEventHandler);
// catches "kill pid" (for example: nodemon restart)
process.on(EVENTS.SIGUSR1, terminationEventHandler);
process.on(EVENTS.SIGUSR2, terminationEventHandler);
// catches uncaught exceptions
process.on(EVENTS.UNCAUGHTEXCEPTION, terminationEventHandler);

createTestResultFolderIfNeeded();
