const webdriver = require('selenium-webdriver');
const until = webdriver.until;
const using = webdriver.By;

class BasePage {

    constructor(driver, selector = '') {
        if (!driver) {
            throw new Error('driver not specified');
        }

        this.driver = driver;
        this.selector = selector;
    }

    async findElement() {
        const elements = await this.driver.findElements(using.css(this.selector));
        return elements[0];
    }

    async findElementByCss(selector) {
        const elements = await this.driver.findElements(using.css(selector));
        return elements[0];
    }

    async findElementsByCss(selector) {
        return await this.driver.findElements(using.css(selector));
    }

    async findChildByCss(childselector) {
        const children = await this.findChildrenByCss(childselector);
        return children[0];
    }

    async findChildrenByCss(childSelector) {
        const fullSelector = `${this.selector} ${childSelector}`;
        return await this.driver.findElements(using.css(fullSelector));
    }

    async exists() {
        const elements = await this.driver.findElements(using.css(this.selector));
        return elements.length > 0;
    }

    async isVisible() {
        const element = await this.findElement();
        if (!element) {
            return false;
        }
        return await element.isDisplayed();
    }

    async waitUntilExists(timeout) {
        const waitCondition = until.elementLocated(using.css(this.selector));
        await this.driver.wait(waitCondition, timeout);
    }
}

module.exports = BasePage;
